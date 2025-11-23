const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors({
  origin: "http://localhost:8081/api/admin", // allow your React app
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

// your routes
app.post("/api/auth/register", (req, res) => {
  res.send("User registered successfully!");
});

app.listen(8080, () => console.log("Server running on port 8080"));
