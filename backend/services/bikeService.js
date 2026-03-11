import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function getBikes() {
  const result = await pool.query('SELECT id, name, location FROM bikes ORDER BY id');
  return result.rows;
}

export async function addBike({ name, location }) {
  const result = await pool.query(
    'INSERT INTO bikes (name, location) VALUES ($1, $2) RETURNING id, name, location',
    [name, location]
  );
  return result.rows[0];
}
