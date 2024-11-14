function TransactionForm({ type, setType, setMoney, onAdd }) {
  return (
    <div>
      <label>
        <input
          type="radio"
          value="income"
          checked={type === "income"}
          onChange={() => setType("income")}
        />
        수입
      </label>
      <label>
        <input
          type="radio"
          value="expense"
          checked={type === "expense"}
          onChange={() => setType("expense")}
        />
        지출
      </label>
      <div>
        <input
          type="number"
          onChange={(e) => setMoney(Number(e.target.value))}
        />
        <button onClick={onAdd}>등록</button>
      </div>
    </div>
  );
}

export default TransactionForm;
