import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function runMigrations() {
  // Create the products table if it does not exist.
  // Adjust this migration logic for more complex schemas.
  await pool.query(`
    CREATE TABLE IF NOT EXISTS products (
      products_id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      category INTEGER NOT NULL,
      price NUMERIC(12, 2) NOT NULL,
      description TEXT
    );
  `);
}

export async function closePool() {
  await pool.end();
}
