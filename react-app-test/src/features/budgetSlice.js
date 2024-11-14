import { createSlice } from "@reduxjs/toolkit";

// 초기상태
const initialState = {
  total: 0,
  transactions: [],
  id: 0, // 마지막으로 사용된 ID (기존 lastId에서 이름만 변경)
};

const budgetSlice = createSlice({
  name: "budget",
  initialState,
  reducers: {
    // 추가
    addTransaction: (state, action) => {
      const { type, money } = action.payload;

      // 수입일 때 더하기, 지출일 때 빼기
      if (type === "income") {
        state.total += money;
      } else if (type === "expense") {
        state.total -= money;
      }

      // id 생성(1씩 증가)
      const newId = state.id + 1;
      state.id = newId;

      // 거래 추가
      state.transactions.push({ id: newId, type, money });
    },

    // 삭제
    deleteTransaction: (state, action) => {
      // 삭제할 아이디
      const transactionId = action.payload;
      const transaction = state.transactions.find(
        (t) => t.id === transactionId
      );

      // 수입일 때 빼기, 지출일 때 더하기
      if (transaction) {
        if (transaction.type === "income") {
          state.total -= transaction.money;
        } else if (transaction.type === "expense") {
          state.total += transaction.money;
        }

        // 거래 삭제
        state.transactions = state.transactions.filter(
          (t) => t.id !== transactionId
        );
      }
    },
  },
});

export const { addTransaction, deleteTransaction } = budgetSlice.actions;
export default budgetSlice.reducer;
