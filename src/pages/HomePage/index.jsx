import "./styles.css";
import { Link } from "react-router-dom";


export default function HomePage() {
  return (
    <div className="home-container">
      <h1>💸 Welcome to ExpenseTracker</h1>
      <p className="home-description">
        Manage your money easily — track expenses, set budgets, and stay on top of your goals.
      </p>

      <div className="home-emojis">
        <span>📊</span>
        <span>💰</span>
        <span>🧾</span>
      </div>

      <Link to="/login" className="home-btn">
        Get Started →
      </Link>
    </div>
  );
}

