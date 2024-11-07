import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import styled from 'styled-components'

// styled 컴포넌트를 사용해서 div 태그 생성
const LayoutContainer = styled.div`
  background-color: #e9ecef;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// Outlet: 자식 컴포넌트의 위치

// Layout: 부모컴포넌트
// Home, Login, Register: 자식컴포넌트
const Layout = () => {
  return (
    <LayoutContainer>
      <Header></Header>
      <Outlet></Outlet>
    </LayoutContainer>
  )
}

export default Layout