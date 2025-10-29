import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import * as expenseAPI from "../../utilities/expense-api";
import "./styles.css";

export default function ExpenseDetailPage() {
  const { id } = useParams();
  const [expense, setExpense] = useState(null);

  useEffect(() => {
    async function getExpense() {
      try {
        const data = await expenseAPI.show(id);
        if (data) setExpense(data);
      } catch (err) {
        console.log(err);
      }
    }
    getExpense();
  }, [id]);

  if (!expense) return <p>Loading...</p>;

  return (
    <div className="expense-detail-page">
      <header className="page-header">
        <h1>💰Expense Detail</h1>
      </header>

      <div className="expense-detail-card">
        <h2>{expense.title}</h2>
        <p><strong>Date:</strong> {expense.date}</p>
        <p><strong>Amount:</strong> ${expense.amount}</p>
        <p><strong>Description:</strong> {expense.description || "No description"}</p>

        <div className="expense-actions">
          <Link to={`/expenses/edit/${expense.id}`} className="btn edit">Edit</Link>
          <Link to={`/expenses/confirm_delete/${expense.id}`} className="btn danger">Delete</Link>
        </div>
      </div>
    </div>
  );
}