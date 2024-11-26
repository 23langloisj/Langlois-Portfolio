import express from "express";
import sqlite3 from "sqlite3";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const port = 5001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// SQLite Database Setup
const db = new sqlite3.Database("./suggestions.db", (err) => {
  if (err) {
    console.error("Error connecting to SQLite database:", err);
  } else {
    console.log("Connected to SQLite database.");
  }
});

// Create the suggestions table if it doesn't exist
db.run(
  `CREATE TABLE IF NOT EXISTS suggestions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`
);

// GET: Get all suggestions
app.get("/api/suggestions", (req, res) => {
  db.all("SELECT * FROM suggestions ORDER BY created_at DESC", [], (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).send("Server error");
    } else {
      res.json(rows);
    }
  });
});

// POST: Add a new suggestion
app.post("/api/suggestions", (req, res) => {
  const { name, message } = req.body;
  if (!name || !message) {
    return res.status(400).send("Name and message are required.");
  }
  db.run(
    "INSERT INTO suggestions (name, message) VALUES (?, ?)",
    [name, message],
    function (err) {
      if (err) {
        console.error(err);
        res.status(500).send("Server error");
      } else {
        res.status(201).json({ id: this.lastID });
      }
    }
  );
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
