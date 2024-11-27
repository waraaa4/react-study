import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createContext } from "react";
import store from "./store/store";
import { login } from "./store/memberSlice";

// createContext: 여러 컴포넌트에서 값을 공유할 때 사용
// 스토어, 슬라이스: 여러 컴포넌트에서 state를 공유할 때 사용
// context 생성하고 export
export const Context = createContext();

// API 주소
// let host = "http://localhost:8080";

// AWS 서버의 API 주소
// let host =
//   "http://ec2-43-201-100-137.ap-northeast-2.compute.amazonaws.com:8080";

// 로컬 컴퓨터에서 React App을 실행할 때는
// API 주소도 localhost로 설정
// 그렇지 않으면 (Netlify에서) AWS 서버로 설정
let host;
if (window.location.hostname === "localhost") {
  host = "http://localhost:8080";
} else {
  host = "http://ec2-43-201-100-137.ap-northeast-2.compute.amazonaws.com:8080";
}
console.log(host);

// 앱이 시작될 때 스토리지에 있는 로그인 정보를 확인하여 로그인상태 유지

// 로그인 정보 유지하기
// 브라우저를 다시 열었을 때 로컬 스토리지에 인증정보가 있는지 확인
// 인증정보가 있으면 로그인 처리
const userStr = localStorage.getItem("user");
const token = localStorage.getItem("token");

// dispatch를 사용하여 login 액션 함수 호출
if (userStr !== null) {
  const user = JSON.parse(userStr);
  store.dispatch(login({ user: user, token: token }));
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    {/* 컨텍스트를 통해 하위 컴포넌트들에게 host 데이터를 공유 */}
    <Context.Provider value={{ host }}>
      {/* Provider를 통해 앱에 store 주입 */}
      {/* 하위컴포넌트들이 state를 공유 */}
      <Provider store={store}>
        <App />
      </Provider>
    </Context.Provider>
  </BrowserRouter>
);
