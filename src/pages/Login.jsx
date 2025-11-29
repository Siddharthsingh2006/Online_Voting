import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/login.css";

function UserLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    backend: "",
  });

  const validateEmail = (email) => {
    const invalidPattern = /^[a-zA-Z]@[0-9]+\.com$/;
    const validEmailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!validEmailPattern.test(email)) {
      setErrors((prev) => ({ ...prev, email: "Invalid email format." }));
      return false;
    }

    if (invalidPattern.test(email)) {
      setErrors((prev) => ({
        ...prev,
        email: "Email like a@123.com is not allowed.",
      }));
      return false;
    }

    setErrors((prev) => ({ ...prev, email: "" }));
    return true;
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;

    if (!regex.test(password)) {
      setErrors((prev) => ({
        ...prev,
        password:
          "Password must contain uppercase, lowercase & special character (min 8 chars).",
      }));
      return false;
    }

    setErrors((prev) => ({ ...prev, password: "" }));
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({ email: "", password: "", backend: "" });

    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (!isEmailValid || !isPasswordValid) return;

    try {
      const response = await fetch("http://localhost:8081/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.role !== "VOTER") {
          setErrors((prev) => ({ ...prev, backend: "This is not a voter account" }));
          return;
        }

        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("role", data.role);
        navigate("/voting");
      } else {
        setErrors((prev) => ({
          ...prev,
          backend: data.message || "Login failed",
        }));
      }
    } catch (err) {
      setErrors((prev) => ({
        ...prev,
        backend: "Server error. Please try again later.",
      }));
    }
  };

  return (
    <div className="login">
      <form className="login-box" onSubmit={handleSubmit}>
        <h3>User Login</h3>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            validateEmail(e.target.value);
          }}
          required
        />
        {errors.email && (
          <p className="error" style={{ color: "red" }}>{errors.email}</p>
        )}

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            validatePassword(e.target.value);
          }}
          required
        />
        {errors.password && (
          <p className="error" style={{ color: "red" }}>{errors.password}</p>
        )}

        {errors.backend && (
          <p className="error" style={{ color: "red" }}>{errors.backend}</p>
        )}

        <button type="submit">Login</button>
        <p style={{ marginTop: "10px", fontSize: "14px" }}>
          <b>Not registered....?</b>{" "}
          <Link to="/register" style={{ color: "#007bff" }}>
            Register
          </Link>
        </p>

      </form>
    </div>
  );
}

export default UserLogin;
