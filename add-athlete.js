const { Pool } = require('@neondatabase/serverless');

export default async function handler(req, res) {
  console.log("API Route Hit!"); // This will now correctly appear in your Vercel logs

  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { name, sport, email, country } = JSON.parse(req.body);
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });

  try {
    await pool.query(
      'INSERT INTO athletes (name, sport, email, country) VALUES ($1, $2, $3, $4)',
      [name, sport, email, country]
    );
    res.status(200).json({ message: 'Success!' });
  } catch (e) {
    console.error("Database Error:", e); // This will help us see the error in the logs
    res.status(500).json({ error: e.message });
  }
}
