import "./styles.css";

export default function ExpenseCard({ expense }) {
  return (
    <div className="expense-card">
      <h2>{expense.title}</h2>
      <p><strong>Category:</strong> {expense.category}</p>
      <p><strong>Amount:</strong> ${expense.amount}</p>
    </div>
  );
}