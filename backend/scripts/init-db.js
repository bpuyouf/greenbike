#!/usr/bin/env node

import dotenv from 'dotenv';
import { Pool } from 'pg';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Load .env from backend directory if present
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: `${__dirname}/../.env` });

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  console.error('ERROR: DATABASE_URL is not set in .env');
  process.exit(1);
}

const url = new URL(databaseUrl);
const targetDb = url.pathname.replace(/^\//, '') || 'postgres';

// Allow explicit use of the Postgres superuser (commonly 'postgres') for provisioning.
// This must match an existing superuser and its password.
const adminUser = process.env.PG_ADMIN_USER || 'postgres';
const adminPassword = process.env.PG_ADMIN_PASSWORD;

if (!adminPassword) {
  console.error('ERROR: PG_ADMIN_PASSWORD must be set in .env (superuser password).');
  process.exit(1);
}

// Build a connection string to the maintenance database (postgres)
const maintenanceUrl = new URL(databaseUrl);
maintenanceUrl.pathname = '/postgres';
maintenanceUrl.username = adminUser;
maintenanceUrl.password = adminPassword;

async function ensureDatabase(pool, dbName) {
  const check = await pool.query('SELECT 1 FROM pg_database WHERE datname = $1', [dbName]);
  if (check.rowCount === 0) {
    console.log(`Creating database '${dbName}'...`);
    await pool.query(`CREATE DATABASE "${dbName}"`);
  } else {
    console.log(`Database '${dbName}' already exists.`);
  }
}

async function ensureUser(pool, username, password) {
  if (!username) return;
  const check = await pool.query('SELECT 1 FROM pg_roles WHERE rolname = $1', [username]);
  if (check.rowCount === 0) {
    console.log(`Creating user '${username}'...`);
    // PostgreSQL does not allow parameter markers in PASSWORD clause, so interpolate safely with client.escapeLiteral behavior.
    const safePassword = password.replace(/'/g, "''");
    await pool.query(`CREATE ROLE "${username}" WITH LOGIN PASSWORD '${safePassword}'`);
  } else {
    console.log(`User '${username}' already exists (password not changed).`);
  }
}

async function run() {
  const pgUser = url.username;
  const pgPassword = url.password;

  const maintenancePool = new Pool({ connectionString: maintenanceUrl.toString() });

  // Fail fast if the script takes too long
  const timeoutMs = 20000;
  const timeout = setTimeout(() => {
    console.error(`ERROR: init-db.js timed out after ${timeoutMs}ms`);
    process.exit(1);
  }, timeoutMs);

  try {
    console.log('Connecting to postgres server as admin user...');
    await maintenancePool.connect();

    if (pgUser && pgPassword) {
      await ensureUser(maintenancePool, pgUser, pgPassword);
    }

    await ensureDatabase(maintenancePool, targetDb);

    console.log('Creating required tables...');

    // Connect to target database and create tables.
    const targetPool = new Pool({
      connectionString: databaseUrl,
      connectionTimeoutMillis: 5000,
    });

    try {
      await targetPool.connect();
    } catch (error) {
      console.error('ERROR: Failed to connect to target database.');
      console.error(error.message || error);
      await targetPool.end();
      throw error;
    }

    try {
      await targetPool.query(`
        CREATE TABLE IF NOT EXISTS products (
          products_id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          category INTEGER NOT NULL,
          price NUMERIC(12,2) NOT NULL,
          description TEXT
        );
      `);

      console.log('✅ Database and tables are ready.');
    } finally {
      await targetPool.end();
    }

    clearTimeout(timeout);
    process.exit(0);
  } catch (error) {
    console.error('ERROR:', error.message || error);
    process.exit(1);
  } finally {
    await maintenancePool.end();
  }
}

run();
