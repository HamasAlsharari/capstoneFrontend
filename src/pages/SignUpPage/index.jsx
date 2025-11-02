import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as userAPI from "../../utilities/users-api";
import "./styles.css";

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleChange(evt) {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
    setError("");
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    if (formData.password !== formData.confirm) {
      setError("Passwords do not match");
      return;
    }
    try {
      await userAPI.signup(formData);
      navigate("/login");
    } catch (err) {
      setError("Signup failed — try again");
    }
  }

  return (
    <div className="form-page auth-page">
      <h1>Sign Up</h1>
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
          <label htmlFor="id_email">Email</label>
          <input
            type="email"
            id="id_email"
            name="email"
            value={formData.email}
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

        <div className="form-group">
          <label htmlFor="id_confirm">Confirm Password</label>
          <input
            type="password"
            id="id_confirm"
            name="confirm"
            value={formData.confirm}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn">Sign Up</button>
      </form>

      <p className="auth-switch">
        Already have an account?{" "}
        <Link to="/login" className="auth-link">
          Log in
        </Link>
      </p>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}