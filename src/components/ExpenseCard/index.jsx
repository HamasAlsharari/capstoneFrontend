import { Link } from "react-router-dom";
import "./styles.css";

export default function ExpenseCard({ expense }) {
  return (
    <Link to={`/expenses/${expense.id}`} className="expense-card-link">
      <div className="expense-card">
        <h2>{expense.title}</h2>
        <p><strong>Date:</strong> {expense.date}</p>
        <p><strong>Amount:</strong> ${expense.amount}</p>
        <p><strong>Description:</strong> {expense.description || "No description"}</p>
      </div>
    </Link>
  );
}