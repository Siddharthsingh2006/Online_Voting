import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/confirmation.css";

function Confirmation() {
  const navigate = useNavigate();
  const votedCandidate = localStorage.getItem("votedCandidate");

  return (
    <div className="confirmation">
      <h2>Thank You for Voting! 🎉</h2>
      <p>
        You successfully cast your vote for:{" "}
        <strong>{votedCandidate || "Unknown Candidate"}</strong>
      </p>

      <button onClick={() => navigate("/")}>Go to Home</button>
    </div>
  );
}

export default Confirmation;
