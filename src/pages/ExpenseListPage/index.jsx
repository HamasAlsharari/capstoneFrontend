import { useState, useEffect } from "react";
import ExpenseCard from "../../components/ExpenseCard";
import * as expenseAPI from "../../utilities/expense-api";
import "./styles.css";

export default function ExpenseListPage() {
  const [expenses, setExpenses] = useState([
    { id: 1, title: "Groceries", amount: 120, category: "Food" },
    { id: 2, title: "Internet Bill", amount: 60, category: "Utilities" },
    { id: 3, title: "Gym Membership", amount: 40, category: "Health" },
  ]);

  useEffect(() => {
    async function getExpenses() {
      try {
        const data = await expenseAPI.index();
        if (data) setExpenses(data);
      } catch (err) {
        console.log(err);
      }
    }
    if (expenses.length === 0) getExpenses();
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