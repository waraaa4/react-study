import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTransaction, deleteTransaction } from "./features/budgetSlice";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";

function App() {
  // 수입과 지출 상태
  const [type, setType] = useState("income");

  // 금액 상태
  const [money, setMoney] = useState(0);

  // 수입과 지출을 합친 총 금액
  const total = useSelector((state) => state.budget.total);

  // budgetSlicedml transactions 배열 가져오기
  const transactions = useSelector((state) => state.budget.transactions);

  // 액션 사용하기
  const dispatch = useDispatch();

  // 입력한 금액이 0보다 크면 실행
  // budgetSlice에 addTransaction로 전달
  const handleAddTransaction = () => {
    if (money > 0) {
      dispatch(addTransaction({ type, money }));
      setMoney(0);
    }
  };

  // 삭제하려는 거래의 id
  // budgetSlice에 deleteTransaction로 전달
  const handleDeleteTransaction = (id) => {
    dispatch(deleteTransaction(id));
  };

  return (
    <div>
      <h1>가계부</h1>
      <TransactionForm
        type={type}
        setType={setType}
        money={money}
        setMoney={setMoney}
        onAdd={handleAddTransaction}
      />
      <h3>총금액: {total}</h3>
      <TransactionList
        transactions={transactions}
        onDelete={handleDeleteTransaction}
      />
    </div>
  );
}

export default App;
