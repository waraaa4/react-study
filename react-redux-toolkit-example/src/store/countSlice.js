import { createSlice } from "@reduxjs/toolkit";

export const countSlice = createSlice({
  name: 'counterSlice',
  initialState: {num: 0},
  // 액션타입별로 리듀서 함수 정의
  // 액션타입: 함수
  reducers: {
    up: (state, action) => {
      console.log(action);
      state.num = state.num + action.payload;
    }
  }
});