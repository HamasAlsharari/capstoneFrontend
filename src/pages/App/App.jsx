import { Routes, Route, Link } from "react-router-dom";
import HomePage from "../HomePage";
import AboutPage from "../AboutPage";
import "./App.css";

export default function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h2 className="logo">💸 ExpenseTracker</h2>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </main>
    </div>
  );
}

