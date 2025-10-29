import { useState, useEffect } from "react";
import ExpenseCard from "../../components/ExpenseCard";
import * as expenseAPI from "../../utilities/expense-api";
import "./styles.css";

export default function ExpenseListPage() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    async function getExpenses() {
      try {
        const data = await expenseAPI.index();
        if (data) setExpenses(data);
      } catch (err) {
        console.log(err);
      }
    }
    getExpenses();
  }, []);

  const displayExpenses = expenses.map(exp => (
    <ExpenseCard key={exp.id} expense={exp} />
  ));

  return (
    <div className="expenses-page">
      <header className="page-header">
        <h1>💸 Your Expenses</h1>
        <p>Track all your expenses and manage your budget effectively.</p>
      </header>

      <section className="expenses-container">
        {displayExpenses}
      </section>
    </div>
  );
}