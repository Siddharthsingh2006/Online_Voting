import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/register.css";

function Register() {
  const navigate = useNavigate();

  // 🧠 State to store form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "VOTER", // default role
  });

  // 🔹 Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 🔹 Handle registration
  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8081/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // ✅ Successfully registered
        const data = await response.text(); // or .json() if backend returns JSON
        alert(`✅ ${data}`);
        navigate("/login");
      } else {
        // ❌ Error response from backend
        const error = await response.text();
        alert(`❌ Registration failed: ${error}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("⚠️ Something went wrong. Please try again later.");
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

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
