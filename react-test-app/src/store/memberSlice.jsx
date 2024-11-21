import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  info: null,
};

// 슬라이스 생성
// 인자: 슬라이스 이름, 초기상태, 리듀서
export const memberSlice = createSlice({
  name: "memberSlice",
  initialState,
  reducers: {
    // 로그인시 생성된 토큰과 회원정보를 state에 저장
    login: (state, action) => {
      // state 중에서 token과 info를 변경
      state.token = action.payload.token;
      state.info = action.payload.user;
      // 로컬스토리지에 토큰과 사용자정보를 저장
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    // 로그아웃시 state를 초기화
    logout: (state) => {
      state.token = null;
      state.info = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
});

// 슬라이스를 생성하면 리듀서에 대응되는 액션함수가 자동으로 생성됨
// 액션함수 중 login, logout을 추출
export const { login, logout } = memberSlice.actions;
