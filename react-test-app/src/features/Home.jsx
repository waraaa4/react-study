import React from "react";
import { CustomCard, CustomContainer } from "../components/Styles";
import { useSelector } from "react-redux";

// useSelector: 스토어에서 state를 가져오는 함수
const Home = () => {
  // 스토어에서 user info 가져오기
  // 매개변수: state 리스트
  // 리턴값: state 중 하나를 선택
  const memberInfo = useSelector((state) => {
    return state.member.info;
  });

  return (
    <CustomCard>
      <CustomContainer>
        <h3>Home</h3>
        {/* 첫번째 항이 false라면 두번째 항은 실행되지 않는다 */}
        {/* info가 존재할 때만 문자열이 생성된다 */}
        {memberInfo !== null && `안녕하세요. ${memberInfo.name} 님`}
      </CustomContainer>
    </CustomCard>
  );
};

export default Home;
