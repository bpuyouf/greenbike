import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
// import productsRouter from './routes/products.js';
// import { connectDb } from './db.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const app = express();
app.use(express.json());

// Serve frontend static assets
app.use(express.static(path.join(__dirname, '..', 'frontend')));

// DB-backed API routes are currently disabled for simplified local deploy
// app.use('/api/products', productsRouter);

app.get('/api/products', (req, res) => {
  res.json({ products: [] });
});

app.get('/health', (req, res) => {
  res.json({ healthcheck: 'success' });
});

// Fallback to frontend for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'));
});

async function start() {
  // DB connection disabled for a simplified deployment flow
  // await connectDb();

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
  });
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  start().catch((error) => {
    console.error('Failed to start server', error);
    process.exit(1);
  });
}
