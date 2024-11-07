import './App.css';
import Calc from './component/Calc';
import { Provider } from 'react-redux';
import { createSlice, configureStore } from '@reduxjs/toolkit';

// redux -> redux toolkit 방식으로 수정

// redux toolkit이란?
// 1. 스토어를 기능별로 나눌 수 있음
// 2. state의 불변성을 유지할 필요가 없음

// 변경!
// reducer + createStore => createSlice + configureStore

// 1. 계산기 슬라이스 생성 (작은 스토어)
// 인자: {} 슬라이스이름, state초기값, 리듀서함수
const calcSlice = createSlice({
  name: 'calcSlice',
  initialState: {result: 0},
  // 액션타입별로 리듀서 함수 정의
  reducers: {
    '+': (state, action) => {
      state.result = action.num1 + action.num2;
    },
    '-': (state, action) => {
      state.result = action.num1 - action.num2;
    },
    '*': (state, action) => {
      state.result = action.num1 * action.num2;
    },
    '/': (state, action) => {
      state.result = action.num1 / action.num2;
    },
    '0': (state, action) => {
      state.result = null;
    }
  }
});

// 리듀서의 변화
// 1. if switch 조건문으로 액션타입을 분기 -> 액션타입만으로 분기
// 2. state 복제하고 변경된 state를 반환 -> state를 그대로 사용

// 2. 슬라이스를 모아서 스토어 생성
// 인자: {} 각 슬라이스의 리듀서 넣기
const store = configureStore({
  reducer: {
    // 슬라이스이름, 리듀서함수
    calc: calcSlice.reducer
  }
});


function App() {

  return (
    <div>
      <h3>계산기</h3>
      {/* 3. Provier로 앱에 스토어 주입 */}
      <Provider store={store}>
        <Calc></Calc>
      </Provider>
    </div>
  );
}

export default App;
