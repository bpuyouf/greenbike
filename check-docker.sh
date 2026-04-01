#!/usr/bin/env bash
set -e

echo "[1/3] Dockerfile content:"
cat Dockerfile

echo "\n[2/3] docker-compose content:"
cat docker-compose.yml

echo "\n[3/3] Building the stack..."
docker compose build

echo "\n[4/3] Starting stack in detached mode..."
docker compose up -d

echo "\n[5/3] Waiting 10s for containers to be healthy..."
sleep 10

echo "\n[6/3] Container status:"
docker compose ps

echo "\nValidate by curling localhost:3000 (adjust port/path as needed):"
set +e
curl -I http://localhost:3000
RESULT=$?
if [ $RESULT -ne 0 ]; then
  echo "WARNING: curl failed; check app logs with docker compose logs app"
else
  echo "OK: got HTTP response from app"
fi
set -e

echo "\nDone. To clean up run: docker compose down -v"
