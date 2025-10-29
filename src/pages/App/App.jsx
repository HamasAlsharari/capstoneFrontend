import { Routes, Route, Link, Navigate, useLocation } from "react-router-dom";
import HomePage from "../HomePage";
import AboutPage from "../AboutPage";
import ExpenseListPage from "../ExpenseListPage";
import ExpenseDetailPage from "../ExpenseDetailPage";
import ExpenseFormPage from "../ExpenseFormPage";
import "./App.css";

export default function App() {
  const location = useLocation();

  const mainCSS = location.pathname.includes("/about")
    ? "about"
    : location.pathname.includes("/expenses")
      ? "expenses"
      : "home";

  return (
    <div className="app-container">
      <header className="app-header">
        <h2 className="logo">💸 ExpenseTracker</h2>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/expenses">Expenses</Link>
          <Link to="/expenses/new">Add Expense</Link>
        </nav>
      </header>

      <main className={mainCSS}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/expenses" element={<ExpenseListPage />} />
          <Route path="/expenses/:id" element={<ExpenseDetailPage />} />
          <Route path="/expenses/new" element={<ExpenseFormPage createExpense={true} />} />
          <Route path="/expenses/edit/:id" element={<ExpenseFormPage editExpense={true} />} />
          <Route path="/expenses/confirm_delete/:id" element={<ExpenseFormPage deleteExpense={true}/>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  );
}