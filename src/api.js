// src/api.js
import axios from "axios";

// Backend URL
const API_URL = "http://localhost:8081"; // Replace with deployed backend URL when live

// Example: Get all voters
export const getVoters = () => axios.get(`${API_URL}/voters`);

// Example: Register user
export const registerUser = (userData) => axios.post(`${API_URL}/registerUser`, userData);

// Example: Cast vote
export const castVote = (voteData) => axios.post(`${API_URL}/vote`, voteData);
