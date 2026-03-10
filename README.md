# GreenBike (Frontend + Backend)

This repository contains a small example project with a **frontend** (HTML/CSS/JS) and a **backend** (Node.js + Express). The app is designed to be simple to run locally and deploy to **Azure App Service** or **Azure Container Apps**.

## 🗂️ Project Structure

- `frontend/` — Static UI assets: `index.html`, `styles.css`, and `app.js`
- `backend/` — Node.js API server with Express, plus a simple example SQL-backed service

## 🚀 Running Locally

1. Copy the example env file:

   ```bash
   cd backend
   cp .env.example .env
   ```

2. Install dependencies and start the server:

   ```bash
   npm install
   npm run dev
   ```

3. Open http://localhost:3000 in your browser.

## 🗄️ Database Setup

The backend expects a SQL database whose connection is provided via `DATABASE_URL` in `.env`.

The example uses PostgreSQL, but you can adapt `backend/services/productService.js` for another SQL dialect.

Example table schema (`products`):

```sql
CREATE TABLE products (
  products_id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category INTEGER NOT NULL,
  price NUMERIC(12,2) NOT NULL,
  description TEXT
);
```

## 🧩 Notes for Azure Deployment

- The app is structured to run as a single HTTP service that serves both UI assets and API endpoints.
- All sensitive values (DB connection strings, keys) must be stored in **Azure App Service settings** or **Azure Key Vault**.
- For container deployment, you can build a Docker image using the `backend` folder as the working directory.
