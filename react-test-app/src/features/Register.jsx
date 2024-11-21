import { Form, Button } from "react-bootstrap";
import { CustomCard, CustomContainer } from "../components/Styles";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { Context } from "../index";
import { useContext } from "react";

const Register = () => {
  const navigate = useNavigate();

  const [member, setMember] = useState(null);

  // 컨텍스트에서 host 데이터 가져오기
  const { host } = useContext(Context);

  function handleChange(e) {
    const { name, value } = e.target;

    const newMember = { ...member };

    newMember[name] = value;

    setMember(newMember);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await axios.post(`${host}/register`, member);

    // const response = await axios.post(
    //   'http://3.35.231.182:8080/register',
    //   member
    // );

    if (response.status !== 201) {
      throw new Error(`api error: ${response.status} ${response.statusText}`);
    } else {
      navigate("/login");
    }
  };

  return (
    <CustomCard>
      <CustomContainer>
        <h3>회원가입</h3>
        <form onSubmit={handleSubmit}>
          <Form.Group controlId="member.id">
            <Form.Label>아이디</Form.Label>
            <Form.Control
              type="text"
              onChange={handleChange}
              name="id"
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="member.password">
            <Form.Label>비밀번호</Form.Label>
            <Form.Control
              type="password"
              onChange={handleChange}
              name="password"
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="member.name">
            <Form.Label>이름</Form.Label>
            <Form.Control
              type="text"
              onChange={handleChange}
              name="name"
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="member.role">
            <Form.Check
              value="ROLE_USER"
              type="radio"
              name="role"
              id="role1"
              label="사용자"
              onChange={handleChange}
            />
            <Form.Check
              value="ROLE_ADMIN"
              type="radio"
              name="role"
              id="role2"
              label="관리자"
              onChange={handleChange}
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

export default Register;
