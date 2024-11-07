import { Provider } from 'react-redux';
import Todo from './component/Todo';
import { createSlice, configureStore } from '@reduxjs/toolkit';

// Redux 방식 -> Redux Toolkit 방식

// 차이점
// 1. 스토어를 슬라이스 단위로 나눌 수 있음
// 2. 이전 state값을 유지할 필요가 없음

// 변경!
// reducer + createStore -> createSlie + configureStore

// 1. todo 슬라이스 생성
// 인자: {} 슬라이스이름, state초기값, 리듀서함수
const todoSlice = createSlice({
  name: 'todoSlice',
  initialState: { todolist: [] },
  // 액션타입별로 리듀서함수 정의
  reducers: {
    ADD: (state, action) => {
      let newId = 0;
      if (state.todolist.length !== 0) {
        newId = state.todolist.length;
      }
      state.todolist.push({ id: newId, text: action.text });
    },
    DELETE: (state, action) => {
      state.todolist = state.todolist.filter(todo => todo.id !== action.id);
    },
    RESET: (state, action) => {
      state.todolist = [];
    }
  }
});

// 2. 슬라이스를 모아서 스토어 생성
// 각 슬라이스의 이름과 리듀서 함수 정의
const store = configureStore({
  reducer: {
    // 슬라이스이름: 정의
    todo: todoSlice.reducer
  }
});

function App() {

  return (
    <div>
      <h3>To-Do List</h3>
      <Provider store={store}>
        <Todo></Todo>
      </Provider>
    </div>
  );
}

export default App;
