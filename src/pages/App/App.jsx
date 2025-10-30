import { Routes, Route, Link, Navigate, useLocation } from "react-router-dom";
import HomePage from "../HomePage";
import AboutPage from "../AboutPage";
import ExpenseListPage from "../ExpenseListPage";
import ExpenseDetailPage from "../ExpenseDetailPage";
import ExpenseFormPage from "../ExpenseFormPage";
import CategoryListPage from "../Category/CategoryListPage";
import CategoryDetailPage from "../Category/CategoryDetailPage";
import CategoryFormPage from "../Category/CategoryFormPage";
import PaymentListPage from "../Payment/PaymentListPage";
import PaymentDetailPage from "../Payment/PaymentDetailPage";
import PaymentFormPage from "../Payment/PaymentFormPage";
import "./App.css";

export default function App() {
  const location = useLocation();

  const mainCSS = location.pathname.includes("/about")
    ? "about"
    : location.pathname.includes("/expenses")
    ? "expenses"
    : location.pathname.includes("/categories")
    ? "categories"
    : location.pathname.includes("/payment-methods")
    ? "payment-methods"
    : "home";

  return (
    <div className="app-container">
      <header className="app-header">
        <h2 className="logo">💸 ExpenseTracker</h2>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/expenses">Expenses</Link>
          <Link to="/categories">Categories</Link>
          <Link to="/payment-methods">Payment Methods</Link>
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
          <Route path="/expenses/confirm_delete/:id" element={<ExpenseFormPage deleteExpense={true} />} />

          <Route path="/categories" element={<CategoryListPage />} />
          <Route path="/categories/:id" element={<CategoryDetailPage />} />
          <Route path="/categories/new" element={<CategoryFormPage createCategory={true} />} />
          <Route path="/categories/edit/:id" element={<CategoryFormPage editCategory={true} />} />
          <Route path="/categories/confirm_delete/:id" element={<CategoryFormPage deleteCategory={true} />} />

          <Route path="/payment-methods" element={<PaymentListPage />} />
          <Route path="/payment-methods/:id" element={<PaymentDetailPage />} />
          <Route path="/payment-methods/new" element={<PaymentFormPage createPaymentMethod={true} />} />
          <Route path="/payment-methods/edit/:id" element={<PaymentFormPage editPaymentMethod={true} />} />
          <Route path="/payment-methods/confirm_delete/:id" element={<PaymentFormPage deletePaymentMethod={true} />} />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  );
}