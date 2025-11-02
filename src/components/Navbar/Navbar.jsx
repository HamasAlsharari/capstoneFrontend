import { Link, useNavigate } from "react-router-dom";
import "./styles.css";

export default function Navbar({ user, setUser }) {
  const navigate = useNavigate();

  function handleLogout() {
    setUser(null);
    navigate("/login");
  }

  return (
    <header className="app-header">
      <h2 className="logo">💸 ExpenseTracker</h2>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>

        {user ? (
          <>
            <Link to="/profile">Profile</Link>
            <Link to="/expenses">Expenses</Link>
            <Link to="/categories">Categories</Link>
            <Link to="/payment-methods">Payment Methods</Link>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </nav>
    </header>
  );
}