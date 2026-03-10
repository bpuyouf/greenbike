import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function getProducts() {
  const result = await pool.query(
    'SELECT products_id, name, category, price, description FROM products ORDER BY products_id'
  );
  return result.rows;
}

export async function addProduct({ name, category, price, description }) {
  const result = await pool.query(
    `INSERT INTO products (name, category, price, description)
     VALUES ($1, $2, $3, $4)
     RETURNING products_id, name, category, price, description`,
    [name, category, price, description]
  );
  return result.rows[0];
}
