// src/VotersTest.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "./App"; // import BASE_URL from App.jsx

const VotersTest = () => {
  const [voters, setVoters] = useState([]);

  useEffect(() => {
    axios.get(`${BASE_URL}/voters`) // use BASE_URL
      .then(res => setVoters(res.data))
      .catch(err => console.error("Error connecting to backend:", err));
  }, []);

  return (
    <div>
      <h2>Voters List (Test Connection)</h2>
      <ul>
        {voters.length === 0 ? (
          <li>No voters found or connection failed</li>
        ) : (
          voters.map(voter => (
            <li key={voter.id}>
              {voter.name} ({voter.email})
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default VotersTest;
