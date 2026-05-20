const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database('./trij.db', (err) => {
  if (err) console.error(err.message);
  console.log('Connected to the Tri J SQLite database.');
});

// Database Initialization with updated schema columns
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    name TEXT, 
    email TEXT UNIQUE, 
    password TEXT, 
    country TEXT
  )`);
  
  db.run(`CREATE TABLE IF NOT EXISTS bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    user_email TEXT, 
    sport TEXT, 
    coach TEXT, 
    date TEXT, 
    time TEXT, 
    package_name TEXT, 
    package_price REAL
  )`);
  
  // Added payment_method column to receipts table tracking architecture
  db.run(`CREATE TABLE IF NOT EXISTS receipts (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    user_email TEXT, 
    booking_id INTEGER, 
    sport TEXT, 
    coach TEXT, 
    package_name TEXT, 
    amount REAL, 
    card_last4 TEXT, 
    payment_method TEXT, 
    date TEXT
  )`);
});

/* ─────────────────────────────────────────────
   AUTHENTICATION ENDPOINTS
───────────────────────────────────────────── */
app.post('/api/register', (req, res) => {
  const { name, email, password, country } = req.body;
  db.run(`INSERT INTO users (name, email, password, country) VALUES (?, ?, ?, ?)`, [name, email, password, country], function(err) {
    if (err) return res.status(400).json({ error: 'Email already exists.' });
    res.json({ message: 'Success', user: { name, email, country } });
  });
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  db.get(`SELECT * FROM users WHERE email = ? AND password = ?`, [email, password], (err, row) => {
    if (err || !row) return res.status(400).json({ error: 'Invalid credentials.' });
    res.json({ message: 'Success', user: { name: row.name, email: row.email, country: row.country } });
  });
});

/* ─────────────────────────────────────────────
   BOOKINGS ENDPOINTS
───────────────────────────────────────────── */
app.post('/api/bookings', (req, res) => {
  const { user_email, sport, coach, date, time, package_name, package_price } = req.body;
  db.run(`INSERT INTO bookings (user_email, sport, coach, date, time, package_name, package_price) VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [user_email, sport, coach, date, time, package_name, package_price], function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ booking_id: this.lastID });
  });
});

/* ─────────────────────────────────────────────
   RECEIPTS ENDPOINTS
───────────────────────────────────────────── */
app.get('/api/receipts/:email', (req, res) => {
  db.all(`SELECT * FROM receipts WHERE user_email = ?`, [req.params.email], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ receipts: rows });
  });
});

app.post('/api/receipts', (req, res) => {
  const { user_email, booking_id, sport, coach, package_name, amount, card_last4, payment_method, date } = req.body;
  db.run(`INSERT INTO receipts (user_email, booking_id, sport, coach, package_name, amount, card_last4, payment_method, date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [user_email, booking_id, sport, coach, package_name, amount, card_last4, payment_method, date], function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true, id: this.lastID });
  });
});

app.listen(PORT, () => console.log(`Backend server running at http://localhost:${PORT}`));