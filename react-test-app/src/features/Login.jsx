import { Form, Button } from "react-bootstrap";
import { CustomCard, CustomContainer } from "../components/Styles";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useContext } from "react";
import axios from "axios";

import { Context } from "../index";
import { login } from "../store/memberSlice";

// 로그인 데이터(아이디와 패스워드)를 받아서 로그인 요청을 하는 컴포넌트

const Login = () => {
  const navigate = useNavigate();
  // dispatch: 스토어의 state 값을 변경
  const dispatch = useDispatch();

  // 로그인 데이터를 저장할 state를 생성
  const [user, setUser] = useState(null);

  // 컨텍스트에서 host 데이터 가져오기
  const { host } = useContext(Context);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newMember = { ...user };

    newMember[name] = value;

    setUser(newMember);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 로그인 API 호출
    // 주소, 바디데이터, 헤더
    const response = await axios.post(
      // 'http://localhost:8080/login',
      `${host}/login`,
      user
    );

    if (response.status === 200) {
      // 리듀서 호출
      // dispatch를 사용하여 login 액션함수를 호출
      dispatch(login(response.data));
      navigate("/");
    } else {
      throw new Error(`api error: ${response.status} ${response.statusText}`);
    }
  };

  return (
    <CustomCard>
      <CustomContainer>
        <h3>로그인</h3>
        <form onSubmit={handleSubmit}>
          <Form.Group controlId="board.title">
            <Form.Label>아이디</Form.Label>
            <Form.Control
              type="text"
              name="id"
              onChange={handleChange}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="board.content">
            <Form.Label>패스워드</Form.Label>
            <Form.Control
              type="password"
              name="password"
              onChange={handleChange}
            ></Form.Control>
          </Form.Group>
          <Button variant="secondary" type="submit">
            로그인
          </Button>
        </form>
      </CustomContainer>
    </CustomCard>
  );
};

export default Login;
