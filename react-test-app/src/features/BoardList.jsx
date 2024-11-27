// rafce => 자동완성
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Button, Table } from "react-bootstrap";
import { CustomCard, CustomContainer } from "../components/Styles";

import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
// 아이템을 비율로 배치
const Row = styled.div`
  display: grid;
  grid-template-columns: 5fr 1fr;
`;

function BoardList() {
  const navigate = new useNavigate();

  // 리스트를 state로 생성
  const [data, setData] = useState([]);

  useEffect(() => {
    // 게시물 목록 요청 API
    const getDatea = async () => {
      // 주소, 헤더
      // 192.168.0.67
      const response = await axios.get("http://localhost:8080/board/list", {
        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MzIyMzY1NzAsImV4cCI6MTczNDgyODU3MCwic3ViIjoiYWRtaW4ifQ.Dtn4_L2GYHCWiDcKaN4rf5e3CYBlxH8YQ4EJFFR4tig",
        },
      });
      // 요청에 실패했을 경우
      if (response.status !== 200) {
        throw new Error(`api error ${response.status} ${response.statusText}`);
      }
      // state 변경 => 컴포넌트가 다시 랜더링
      setData(response.data); // API를 통해 응답받은 리스트를 업데이트
    };

    getDatea();

    // api 호출 -> state 변경 -> 컴포넌트 다시 랜더링
    // -> api 호출 -> state 변경 ... 무한 루프
  }, []);
  // useEffect: 컴포넌트가 생성될때 한번만 코드를 실행하기 위해 사용

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
