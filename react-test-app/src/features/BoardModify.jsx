import styled from "styled-components";
import { Form, Button } from "react-bootstrap";
import { CustomCard, CustomContainer } from "../components/Styles";

import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const BoardModify = () => {
  // 기존 게시물을 state에 저장
  let [board, setBoard] = useState({
    title: "",
    content: "",
    writer: "",
    regDate: "",
    modDate: "",
  });

  const params = useParams();

  console.log(params.no);

  // 첫번째 인자: 처리할 코드
  // 두번째 인자: useEffect가 실행되는 시점
  // 컴포넌트가 생성될때 한번만 실행됨
  useEffect(() => {
    // 게시물 조회 api 호출
    const apicall = async () => {
      // 조회는 get
      // 주소, 헤더
      const response = await axios.get(
        `http://localhost:8080/board/read?no=${params.no}`,
        {
          headers: {
            Authorization:
              "eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MzE0NjM3NTgsImV4cCI6MTczNDA1NTc1OCwic3ViIjoidXNlciJ9.jEg12gAxdAereXxir19hFXepj8n_EN2HPyUW81f4IuA",
          },
        }
      );
      // 요청에 실패했다면
      if (response.status !== 200) {
        throw new Error(`api error: ${response.status} ${response.statusText}`);
      } else {
        // api를 통해 받은 게시물 데이터를 stat에 업데이트
        setBoard(response.data);
      }
    };
    // 위에서 정의한 함수 호출
    apicall();
  }, []);

  // 입력필드 이벤트 처리
  const handleChange = (e) => {
    const { name, value } = e.target;

    const newBoard = { ...board };

    newBoard[name] = value;

    setBoard(newBoard);
  };

  return (
    <CustomCard>
      <CustomContainer>
        <h3>게시물 수정</h3>
        {board !== null && (
          <form>
            <Form.Group controlId="board.title">
              <Form.Label>제목</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={board.title}
                onChange={handleChange}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="board.content">
              <Form.Label>내용</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="content"
                value={board.content}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="board.writer">
              <Form.Label>작성자</Form.Label>
              <Form.Control
                type="text"
                value={board.writer}
                disabled
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="board.regDate">
              <Form.Label>등록일</Form.Label>
              <Form.Control
                type="text"
                value={board.regDate}
                disabled
                readOnly
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="board.modDate">
              <Form.Label>수정일</Form.Label>
              <Form.Control
                type="text"
                value={board.modDate}
                disabled
                readOnly
              ></Form.Control>
            </Form.Group>
            <Button variant="secondary" type="submit">
              수정
            </Button>
            <Button variant="secondary">삭제</Button>
          </form>
        )}
      </CustomContainer>
    </CustomCard>
  );
};

export default BoardModify;
