import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { getUser } from "../../utilities/users-api";
import Navbar from "../../components/Navbar/Navbar";
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
import Profile from "../Profile";
import ProfileForm from "../ProfileForm";
import LoginPage from "../LoginPage";
import SignUpPage from "../SignUpPage";
import "./App.css";

export default function App() {
  const [user, setUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    async function checkUser() {
      const foundUser = await getUser();
      setUser(foundUser);
    }
    checkUser();
  }, []);

  const mainCSS = location.pathname.includes("/about")
    ? "about"
    : location.pathname.includes("/expenses")
      ? "expenses"
      : location.pathname.includes("/categories")
        ? "categories"
        : location.pathname.includes("/payment-methods")
          ? "payment-methods"
          : location.pathname.includes("/profile")
            ? "profile"
            : "home";

  return (
    <div className="app-container">
      <Navbar user={user} setUser={setUser} />

      <main className={mainCSS}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />

          <Route path="/login" element={<LoginPage setUser={setUser} />} />
          <Route path="/signup" element={<SignUpPage />} />

          {user ? (
            <>
              <Route path="/profile" element={<Profile user={user} setUser={setUser} />} />
              <Route path="/profile/edit" element={<ProfileForm user={user} setUser={setUser} editProfile={true} />} />

              <Route path="/expenses" element={<ExpenseListPage />} />
              <Route path="/expenses/:id" element={<ExpenseDetailPage />} />
              <Route path="/expenses/new" element={<ExpenseFormPage createExpense={true} user={user} />} />
              <Route path="/expenses/edit/:id" element={<ExpenseFormPage editExpense={true} user={user} />} />
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
            </>
          ) : (
            <>
              <Route path="/profile" element={<Navigate to="/login" />} />
              <Route path="/expenses/*" element={<Navigate to="/login" />} />
              <Route path="/categories/*" element={<Navigate to="/login" />} />
              <Route path="/payment-methods/*" element={<Navigate to="/login" />} />
            </>
          )}

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  );
}