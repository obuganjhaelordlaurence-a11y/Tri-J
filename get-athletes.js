// api/get-athletes.js
const { Pool } = require('@neondatabase/serverless');

export default async function handler(req, res) {
  // process.env.DATABASE_URL is set in your Vercel Project Settings
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  try {
    const { rows } = await pool.query('SELECT * FROM athletes');
    res.status(200).json(rows);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
