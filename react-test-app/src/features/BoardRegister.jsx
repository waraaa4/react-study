import styled from "styled-components";
// bootstrap에서 가져오기
import { Form, Button } from "react-bootstrap";
import { CustomCard, CustomContainer } from "../components/Styles";
import axios from "axios";
import { useState } from "react";

const BoardRegister = () => {
  // 사용자가 입력한 새로운 게시물을 state로 저장
  let [board, setBoard] = useState({});

  // 제목과 내용 입력필드에서 이벤트가 발생되면
  // 값을 꺼내어 state에 저장
  const handler = (e) => {
    // 입력필드에서 이름과 값 꺼내기
    const { name, value } = e.target;

    // 새로운 게시물 만들기
    // 기존 게시물을 사용하지 않고 복제하는 이유는?
    // 객체는 주소값을 가지므로 값을 추가해도 변화가 감지되지 않음
    let newBoard = { ...board };

    newBoard[name] = value;

    // 변경된 게시물을 state에 업데이트
    setBoard(newBoard);
  };
  // 폼의 submit 버튼을 클릭하면
  // 등록 API가 호출됨
  const handleSubmit = async () => {
    // 등록은 post 조회는 get
    // 인지: 주소, 헤더
    const response = await axios.post(
      "http://localhost:8080/board/register",
      board,
      {
        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MzE0NjM3NTgsImV4cCI6MTczNDA1NTc1OCwic3ViIjoidXNlciJ9.jEg12gAxdAereXxir19hFXepj8n_EN2HPyUW81f4IuA",
        },
      }
    );
    // 요청에 실패했으면
    if (response.status !== 201) {
      throw new Error(`api error ${response.status} ${response.statusText}`);
    }
  };
  return (
    <CustomCard>
      <CustomContainer>
        <h3>게시물 등록</h3>
        <form onSubmit={handleSubmit}>
          <Form.Group controlId="board.title">
            <Form.Label>제목</Form.Label>
            <Form.Control type="text" name="title" onChange={handler} />
          </Form.Group>
          <Form.Group controlId="board.content">
            <Form.Label>내용</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="content"
              onChange={handler}
            />
          </Form.Group>
          <Button variant="secondary" type="submit">
            등록
          </Button>
        </form>
      </CustomContainer>
    </CustomCard>
  );
};

export default BoardRegister;
