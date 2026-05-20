const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const app = express();

// Gamitin ang port mula sa Render, o default sa 3000
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// --- DITO ANG IDINAGDAG KO PARA SA FRONTEND ---
// Nagsisilbi itong gateway para mabasa ang index.html at assets mo
app.use(express.static(path.join(__dirname))); 

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});
// ----------------------------------------------

// Siguraduhin na ang path ng DB ay absolute para hindi mag-error sa deployment
const dbPath = path.resolve(__dirname, 'trij.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Database connection error:', err.message);
  } else {
    console.log('Connected to the Tri J SQLite database at:', dbPath);
  }
});

// Database Initialization
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
  const sql = `INSERT INTO users (name, email, password, country) VALUES (?, ?, ?, ?)`;
  db.run(sql, [name, email, password, country], function(err) {
    if (err) return res.status(400).json({ error: 'Email already exists or database error.' });
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
   BOOKINGS & RECEIPTS ENDPOINTS
───────────────────────────────────────────── */
app.post('/api/bookings', (req, res) => {
  const { user_email, sport, coach, date, time, package_name, package_price } = req.body;
  const sql = `INSERT INTO bookings (user_email, sport, coach, date, time, package_name, package_price) VALUES (?, ?, ?, ?, ?, ?, ?)`;
  db.run(sql, [user_email, sport, coach, date, time, package_name, package_price], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ booking_id: this.lastID });
  });
});

app.get('/api/receipts/:email', (req, res) => {
  db.all(`SELECT * FROM receipts WHERE user_email = ?`, [req.params.email], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ receipts: rows });
  });
});

app.post('/api/receipts', (req, res) => {
  const { user_email, booking_id, sport, coach, package_name, amount, card_last4, payment_method, date } = req.body;
  const sql = `INSERT INTO receipts (user_email, booking_id, sport, coach, package_name, amount, card_last4, payment_method, date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  db.run(sql, [user_email, booking_id, sport, coach, package_name, amount, card_last4, payment_method, date], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true, id: this.lastID });
  });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
