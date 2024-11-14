// rafce => 자동완성
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Button, Table } from "react-bootstrap";
import { CustomCard, CustomContainer } from "../components/Styles";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

// 아이템을 비율로 배치
const Row = styled.div`
  display: grid;
  grid-template-columns: 5fr 1fr;
`;

// API를 통해서 리스트 받아오기
async function callAPI() {
  const response = await axios.get("http://localhost:8080/board/list", {
    headers: {
      Authorization:
        "eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MzE0NjM3NTgsImV4cCI6MTczNDA1NTc1OCwic3ViIjoidXNlciJ9.jEg12gAxdAereXxir19hFXepj8n_EN2HPyUW81f4IuA",
    },
  });
  if (response.status !== 200) {
    throw new Error(`api error: ${response.status} ${response.statusText}`);
  }
  return response.data;
}

function BoardList() {
  const navigate = useNavigate();

  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await callAPI();
      setData(data); // state 업데이트
    };
    getData();
  }, []);

  // 날짜 포맷팅 함수 추가
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleString("ko-KR", {
      year: "numeric", // 연도 표시
      month: "2-digit", // 월 표시
      day: "2-digit", // 일 표시
      hour: "2-digit", // 시 표시
      minute: "2-digit", // 분 표시
      second: "2-digit", // 초 표시
    });
  };

  return (
    <CustomCard>
      <CustomContainer>
        <Row>
          <h3>게시물 목록</h3>
          <Button
            variant="primary"
            onClick={() => {
              navigate("/board/register");
            }}
          >
            게시물 등록
          </Button>
        </Row>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>제목</th>
              <th>작성자</th>
              <th>등록일</th>
            </tr>
          </thead>
          <tbody>
            {data !== null &&
              data.map((board) => {
                return (
                  <tr key={board.no}>
                    <td>
                      <Link to={"/board/read/" + board.no}>{board.no}</Link>
                    </td>
                    <td>{board.title}</td>
                    <td>{board.writer}</td>
                    <td>{formatDate(board.regDate)}</td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </CustomContainer>
    </CustomCard>
  );
}

export default BoardList;
