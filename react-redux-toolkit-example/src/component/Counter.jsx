import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { countSlice } from './../store/countSlice';

const Counter = () => {
  const num = useSelector((state) => {
    return state.counter.num;
  });

  const dispatch = useDispatch();

  return (
    <div>
      <button onClick={()=>{
        dispatch(countSlice.actions.up(2));
      }}>+</button>
      {num}
    </div>
  )
}

export default Counter;