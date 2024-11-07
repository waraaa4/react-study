import React from "react";
import { useSelector, useDispatch } from "react-redux";

const Counter = () => {
  const num = useSelector((state) => {
    console.log(state);
    return state.counter.num;
  });

  const dispatch = useDispatch();

  return (
    <div>
      <button onClick={()=>{
        // 타입 수정: 슬라이스이름 + 액션타입
        dispatch({type: 'counterSlice/up', step: 2});
      }}>+</button>
      {num}
    </div>
  )
}

export default Counter;