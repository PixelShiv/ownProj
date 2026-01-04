const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const users = {};
const students = {};

// REGISTER
app.post("/api/register", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: "Required" });
  if (users[email]) return res.status(400).json({ error: "Exists" });

  users[email] = password;
  students[email] = []; // Initialize empty array for new user
  res.json({ token: "dummy-token" });
});

// LOGIN
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  if (users[email] && users[email] === password) {
    return res.json({ token: "dummy-token" });
  }
  res.status(401).json({ error: "Invalid credentials" });
});

// ADD STUDENT
app.post("/api/students", (req, res) => {
  const { email, name, course, gender } = req.body;
  if (!email || !name || !course || !gender) return res.status(400).send("Missing fields");

  if (!students[email]) students[email] = [];
  students[email].push({ name, course, gender });

  res.json({ message: "Success" });
});

// GET STUDENTS
app.get("/api/students/:email", (req, res) => {
  const email = req.params.email;
  // Use the email key to return that specific user's candidates
  res.json(students[email] || []);
});

app.listen(3000, '0.0.0.0', () => console.log("Backend running on port 3000"));