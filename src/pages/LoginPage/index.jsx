import "./styles.css";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import * as usersAPI from "../../utilities/users-api";

export default function LoginPage({ setUser }) {
  const initialState = { username: "", password: "" };
  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleChange(evt) {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      const loggedInUser = await usersAPI.login(formData);
      if (loggedInUser) {
        setUser(loggedInUser);
        navigate("/expenses");
      } else {
        setError("Invalid username or password");
      }
    } catch {
      setError("Login failed, please try again.");
    }
  }

  return (
    <div className="auth-container">
      <h1>Login to ExpenseTracker💸</h1>
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="id_username">Username</label>
          <input
            type="text"
            id="id_username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="id_password">Password</label>
          <input
            type="password"
            id="id_password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {error && <p className="error-msg">{error}</p>}

        <button type="submit" className="btn">Login</button>

        <p className="switch-link">
          Don’t have an account? <Link to="/signup">Sign up here</Link>
        </p>
      </form>
    </div>
  );
}