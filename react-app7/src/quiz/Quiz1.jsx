import './App.css';
import { useState } from 'react';

// 카운터 버튼
function ButtonDiv({count, setCount}){

  return (
    <div>
      <a href="/" onClick={(event) => {
          event.preventDefault(); 
          setCount(count - 1);
        }}> - </a>
      <a href="/" onClick={(event) => {
          event.preventDefault(); 
          setCount(0);
        }}> 0 </a>
      <a href="/" onClick={(event) => {
          event.preventDefault(); 
          setCount(count + 1); 
        }}> + </a>
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
