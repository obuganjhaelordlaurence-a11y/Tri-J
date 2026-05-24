const { Pool } = require('@neondatabase/serverless');

export default async function handler(req, res) {
  // This uses the DATABASE_URL you will set in Vercel
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  
  try {
    const { rows } = await pool.query('SELECT NOW()');
    res.status(200).json({ status: 'Connected Successfully!', time: rows[0].now });
  } catch (e) {
    res.status(500).json({ status: 'Connection Failed', error: e.message });
  }
}
