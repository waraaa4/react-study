import "./App.css";
import { useState } from "react";

// 카운터 버튼
function ButtonDiv({ count, setCount }) {
  return (
    <div>
      <button
        onClick={(event) => {
          event.preventDefault();
          setCount(count - 1);
        }}
      >
        -
      </button>
      <button
        onClick={(event) => {
          event.preventDefault();
          setCount(0);
        }}
      >
        0
      </button>
      <button
        onClick={(event) => {
          event.preventDefault();
          setCount(count + 1);
        }}
      >
        +
      </button>
      <p>{count}</p>
    </div>
  );
}

function App() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <ButtonDiv count={count} setCount={setCount}></ButtonDiv>
    </div>
  );
}

export default App;
