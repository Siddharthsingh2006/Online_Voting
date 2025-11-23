import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import VotersTest from "./VotersTest";

// 🔹 Import Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import Voting from "./pages/Voting";
import Contact from "./pages/Contact";
import Confirmation from "./pages/Confirmation";

import "./App.css";

// ✅ Base URL for connecting frontend ↔ backend
// Use environment variable for flexibility (Vercel or Localhost)
export const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8081/api/auth"; // No /api unless backend uses it

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <main>
        <Routes>
          {/* 🔹 Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* 🔹 User Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/voting" element={<Voting />} />
          <Route path="/confirmation" element={<Confirmation />} />

          {/* 🔹 Admin Routes */}
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />

          {/* 🔹 Test Route for API connection */}
          <Route path="/voters-test" element={<VotersTest />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
