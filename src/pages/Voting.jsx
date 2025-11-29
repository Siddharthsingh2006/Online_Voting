import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/voting.css";

function Voting() {
  const navigate = useNavigate();

  const voterId = localStorage.getItem("userId");

  const [candidates, setCandidates] = useState([]);
  const [hasVoted, setHasVoted] = useState(false);
  const [votedCandidate, setVotedCandidate] = useState("");

  useEffect(() => {
    if (!voterId) {
      alert("Session expired. Please login again.");
      navigate("/login");
      return;
    }

    axios
      .get("http://localhost:8081/api/voter/candidates")
      .then((res) => setCandidates(res.data))
      .catch((err) => {
        console.error(err);
        alert("Error loading candidates");
      });

    axios
      .get(`http://localhost:8081/api/voter/hasVoted/${voterId}`)
      .then((res) => setHasVoted(res.data))
      .catch((err) => {
        console.error(err);
        alert("Error checking vote status");
      });
  }, []);

  const castVote = (candidateId, candidateName) => {
    if (hasVoted) {
      alert("You have already voted!");
      return;
    }

    axios
      .post(`http://localhost:8081/api/voter/vote/${voterId}/${candidateId}`)
      .then((res) => {
        alert("Vote submitted successfully!");
        setVotedCandidate(candidateName);
        setHasVoted(true);
        navigate("/confirmation");
      })
      .catch((err) => {
        console.error(err);
        alert("Error submitting vote");
      });
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="voting">
      <div className="voting-header">
        <h2>Cast Your Vote</h2>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>

      <div className="candidate-list">
        {candidates.map((c) => (
          <div className="candidate-card" key={c.id}>
            <h4>{c.name}</h4>
            <button
              onClick={() => castVote(c.id, c.name)}
              disabled={hasVoted}
            >
              {hasVoted && votedCandidate === c.name ? "Voted" : "Vote"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Voting;