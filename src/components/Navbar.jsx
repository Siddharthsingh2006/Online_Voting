import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../styles/navbar.css";
import Logo from "../assets/logo.png";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <NavLink to="/" className="logo-link" onClick={() => setIsOpen(false)}>
          <img src={Logo} alt="Online Voting Logo" className="logo-img" />
        </NavLink>

        <div className={`nav-links ${isOpen ? "active" : ""}`}>
          <NavLink to="/" className="nav-item" onClick={() => setIsOpen(false)}>
            Home
          </NavLink>
          <NavLink to="/about" className="nav-item" onClick={() => setIsOpen(false)}
          >
            About
          </NavLink>
          <NavLink
            to="/login"
            className="nav-item"
            onClick={() => setIsOpen(false)}
          >
            User Login
          </NavLink>
          <NavLink
            to="/register"
            className="nav-item"
            onClick={() => setIsOpen(false)}
          >
            Register
          </NavLink>
          <NavLink
            to="/admin-login"
            className="nav-item"
            onClick={() => setIsOpen(false)}
          >
            Admin Login
          </NavLink>
        </div>

        <div
          className={`hamburger ${isOpen ? "open" : ""}`}
          onClick={toggleMenu}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
