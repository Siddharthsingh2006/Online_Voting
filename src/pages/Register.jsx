import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/register.css";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "VOTER",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    // validate instantly while typing
    if (e.target.name === "email") validateEmail(e.target.value);
    if (e.target.name === "password") validatePassword(e.target.value);
  };

  const validateEmail = (email) => {
    const invalidPattern = /^[a-zA-Z]@[0-9]+\.com$/;
    const validEmailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!validEmailPattern.test(email)) {
      setErrors((prev) => ({ ...prev, email: "Invalid email format." }));
      return false;
    }

    if (invalidPattern.test(email)) {
      setErrors((prev) => ({ ...prev, email: "Email like a@123.com is not allowed." }));
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

  const handleRegister = async (e) => {
    e.preventDefault();

    const isEmailValid = validateEmail(formData.email);
    const isPasswordValid = validatePassword(formData.password);

    if (!isEmailValid || !isPasswordValid) return;

    try {
      const response = await fetch("http://localhost:8081/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        navigate("/login");
      } else {
        const error = await response.text();
        setErrors((prev) => ({ ...prev, backend: error }));
      }
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        backend: "Something went wrong. Try again later.",
      }));
    }
  };

  return (
    <div className="register">
      <form className="register-box" onSubmit={handleRegister}>
        <h3>User Registration</h3>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        {errors.email && (
          <p style={{ color: "red", fontSize: "13px", marginTop: "-5px" }}>
            {errors.email}
          </p>
        )}

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        {errors.password && (
          <p style={{ color: "red", fontSize: "13px", marginTop: "-5px" }}>
            {errors.password}
          </p>
        )}

        {errors.backend && (
          <p style={{ color: "red", fontSize: "13px" }}>{errors.backend}</p>
        )}

        <button type="submit">Register</button>

        <p style={{ marginTop: "10px", fontSize: "14px" }}>
          <b>Already registered...?</b>{" "}
          <Link to="/login" style={{ color: "#007bff" }}>
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
