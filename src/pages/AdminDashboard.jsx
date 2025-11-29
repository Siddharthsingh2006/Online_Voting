import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/adminDashboard.css";

function AdminDashboard() {
  const [candidates, setCandidates] = useState([]);
  const [newCandidate, setNewCandidate] = useState({ 
    name: "", 
    party: "", 
    description: "" 
  });
  const [results, setResults] = useState({});
  const navigate = useNavigate();

  const BASE_URL = "http://localhost:8081/api/admin";

  const fetchCandidates = async () => {
    try {
      const response = await fetch(`${BASE_URL}/candidates`);
      const data = await response.json();
      setCandidates(data);
    } catch (err) {
      console.error("Error fetching candidates:", err);
    }
  };

  const fetchResults = async () => {
    try {
      const response = await fetch(`${BASE_URL}/results`);
      const data = await response.json();
      setResults(data);
    } catch (err) {
      console.error("Error fetching results:", err);
    }
  };

  useEffect(() => {
    fetchCandidates();
    fetchResults();
  }, []);

  const addCandidate = async (e) => {
    e.preventDefault();
    if (!newCandidate.name.trim()) return;

    try {
      const response = await fetch(`${BASE_URL}/candidate/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCandidate),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        setNewCandidate({ name: "", party: "", description: "" });
        fetchCandidates();
        fetchResults();
      } else {
        alert("❌ Error: " + data.message);
      }
    } catch (err) {
      console.error(err);
      alert("⚠️ Server error");
    }
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("isLoggedIn");
      navigate("/admin-login");
    }
  };

  return (
    <div className="admin-dashboard container">
      <h2 className="text-center">Welcome, Admin</h2>

      <div className="dashboard-row">
        
        <div className="dashboard-card">
          <h5>Add New Candidate</h5>
          <form onSubmit={addCandidate}>
            <input
              type="text"
              placeholder="Candidate Name"
              value={newCandidate.name}
              onChange={(e) =>
                setNewCandidate({ ...newCandidate, name: e.target.value })
              }
              required
            />
            <input
              type="text"
              placeholder="Party"
              value={newCandidate.party}
              onChange={(e) =>
                setNewCandidate({ ...newCandidate, party: e.target.value })
              }
            />
            <textarea
              placeholder="Description"
              value={newCandidate.description}
              onChange={(e) =>
                setNewCandidate({ ...newCandidate, description: e.target.value })
              }
            ></textarea>

            <button type="submit">Add Candidate</button>
          </form>
        </div>
        
        <div className="dashboard-card">
          <h5>Election Results</h5>
          <table>
            <thead>
              <tr>
                <th>Candidate</th>
                <th>Votes</th>
              </tr>
            </thead>
            <tbody>
              {candidates.map((c) => (
                <tr key={c.id}>
                  <td>{c.name}</td>
                  <td>{results[c.name] || 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default AdminDashboard;