# Backend (Node.js + PostgreSQL)

## 🛠️ Local setup (PostgreSQL + database + schema)

### 1) Install PostgreSQL (one of the following)

#### macOS / Linux (bash)
```bash
cd backend
./scripts/install-postgres.sh
```

#### Windows (PowerShell)
```powershell
cd backend
./scripts/install-postgres.ps1
```

### 2) Configure your connection

Copy the example env file:
```bash
cp .env.example .env
```

Edit `.env` and set the credentials for your local PostgreSQL installation.
- `PG_ADMIN_USER` and `PG_ADMIN_PASSWORD` should match an existing superuser (often `postgres`).
- `DATABASE_URL` is how the app connects; it can use the same superuser or a dedicated app user.

Example:
```ini
PORT=3000
PG_ADMIN_USER=postgres
PG_ADMIN_PASSWORD=your_superuser_password

DATABASE_URL=postgres://postgres:your_superuser_password@localhost:5432/greenbike
```

### 3) Create the database + schema (required before running the app)

Run the init script once to create the database and required tables:

```bash
npm run db:init
```

This will:
- create the database if it doesn’t exist
- create the configured user (if not already existing)
- create the `products` table

### 4) Start the server (app does not create tables)

Once the database is initialized, start the app:

```bash
npm run dev
```

The app will establish a connection to the database on startup but will not attempt to create tables.
