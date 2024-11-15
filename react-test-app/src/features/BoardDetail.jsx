// rafce => 자동완성
import { useState } from "react";
import { CustomCard, CustomContainer } from "../components/Styles";
import { Form, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

function BoardDetail() {
  // useParams: URL 주소에 포함된 파라미터를 추출하는 기능
  const params = useParams();

  console.log(params);

  // 게시물 데이터를 state로 저장
  let [board, setBoard] = useState(null);

  // 컴포넌트가 생성될 때 한번만 API를 호출하여
  // 게시물 데이터를 출력
  useEffect(() => {
    // 상세 조회 API 호출
    const apicall = async () => {
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
      }
      console.log(response.data);

      // API를 통해 응답받은 데이터를 state에 업데이트
      setBoard(response.data);
    };
    apicall();
  }, []);

  const navigate = new useNavigate();

  return (
    <CustomCard>
      <CustomContainer>
        <h3>게시물 상세</h3>
        {board !== null && (
          <>
            <Form.Group controlId="board.title">
              <Form.Label>제목</Form.Label>
              <Form.Control
                type="text"
                value={board.title}
                disabled
                readOnly
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="board.content">
              <Form.Label>내용</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={board.content}
                disabled
                readOnly
              />
            </Form.Group>
            <Form.Group controlId="board.content">
              <Form.Label>작성자</Form.Label>
              <Form.Control
                type="text"
                value={board.writer}
                disabled
                readOnly
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="board.content">
              <Form.Label>등록일</Form.Label>
              <Form.Control
                type="text"
                value={board.regDate}
                disabled
                readOnly
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="board.content">
              <Form.Label>수정일</Form.Label>
              <Form.Control
                type="text"
                value={board.modDate}
                disabled
                readOnly
              ></Form.Control>
            </Form.Group>
            <Button
              variant="primary"
              onClick={() => {
                navigate(`/board/modify/ + ${board.no}`);
              }}
            >
              게시물 수정
            </Button>
          </>
        )}
      </CustomContainer>
    </CustomCard>
  );
}

export default BoardDetail;
