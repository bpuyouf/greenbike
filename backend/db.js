import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function connectDb() {
  const client = await pool.connect();
  try {
    await client.query('SELECT 1');
    console.log('✅ Connected to the database');
  } finally {
    client.release();
  }
}

export default pool;
