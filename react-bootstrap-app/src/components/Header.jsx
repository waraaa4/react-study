import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import styled from 'styled-components';
// rafce로 생성

// styled: React에서 css 문법을 사용할 수 있도록 도와주는 기능

// 태그이름 + 백틱`
const HeaderContainer = styled.div`
  width: 100%;
  height: 100px;
  background-color: white;
  display: flex; /* flex 컨테이너 */
  align-items: center;
  /* 그림자. 아래쪽으로 0.5rem만큼 */
  box-shadow: 0 .5rem 1rem rgba(0, 0, 0, .15);
`;

const Header = () => {
  return (
    <HeaderContainer>
      <Navbar expand="lg">
        <Container>
          <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/login">로그인</Nav.Link>
              <Nav.Link href="/logout">로그아웃</Nav.Link>
              <Nav.Link href="/register">회원가입</Nav.Link>
              <Nav.Link href="/">홈</Nav.Link>
              <Nav.Link href="/board/list">게시물관리</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </HeaderContainer>
  )
}

export default Header;