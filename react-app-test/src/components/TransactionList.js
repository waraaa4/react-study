function TransactionList({ transactions, onDelete }) {
  return (
    <ul>
      {transactions.map((transaction) => (
        // 거래내역 키값 id
        // 수입 지출 텍스트, 금액, 삭제버튼
        <li key={transaction.id}>
          ({transaction.type === "income" ? "수입" : "지출"}){" "}
          {transaction.money}
          <button onClick={() => onDelete(transaction.id)}>삭제</button>
        </li>
      ))}
    </ul>
  );
}

export default TransactionList;
