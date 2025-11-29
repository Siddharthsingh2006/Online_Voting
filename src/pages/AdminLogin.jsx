import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/adminLogin.css";

function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8081/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password: password.trim() }),
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        if (data.role !== "ADMIN") {
          setError("This is not an admin account");
          return;
        }

        localStorage.setItem("user", JSON.stringify({
          isLoggedIn: true,
          userId: data.userId,
          role: data.role
        }));

        navigate("/admin-dashboard"); 
            } else {
        setError(data.message || "Login failed. Please check your credentials.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setLoading(false);
      setError("Server error. Please try again later.");
    }
  };

  return (
    <div className="admin-login">
      <form className="admin-login-box" onSubmit={handleSubmit}>
        <h3 style={{ color: "black" }}>Admin Login</h3>

        <label htmlFor="admin-email">Email</label>
        <input
          id="admin-email"
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="admin-password">Password</label>
        <input
          id="admin-password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className="error">{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default AdminLogin;
