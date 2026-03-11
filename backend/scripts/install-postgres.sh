#!/usr/bin/env bash

# Install PostgreSQL for common platforms (Ubuntu / Debian / macOS).
# Run as a normal user; it will prompt for sudo if needed.

set -euo pipefail

if command -v psql >/dev/null 2>&1; then
  echo "PostgreSQL is already installed (psql found at $(command -v psql))."
  exit 0
fi

if [[ "$OSTYPE" == "linux-gnu" ]]; then
  if command -v apt-get >/dev/null 2>&1; then
    echo "Installing PostgreSQL via apt..."
    sudo apt-get update
    sudo apt-get install -y postgresql postgresql-contrib
    echo "Installed PostgreSQL."
    exit 0
  fi
fi

if [[ "$OSTYPE" == "darwin" ]]; then
  if ! command -v brew >/dev/null 2>&1; then
    echo "Homebrew not found. Install it from https://brew.sh/ and retry."
    exit 1
  fi

  echo "Installing PostgreSQL via Homebrew..."
  brew update
  brew install postgresql
  echo "Installed PostgreSQL. You can start it with 'brew services start postgresql'."
  exit 0
fi

cat <<EOF
Unable to auto-install PostgreSQL on this platform.
Please install PostgreSQL manually and ensure 'psql' is on your PATH.
- Linux: use your package manager (apt/yum/pacman)
- macOS: brew install postgresql
- Windows: install from https://www.postgresql.org/download/windows/ or use Chocolatey (choco install postgresql)
EOF
exit 1
