#!/bin/sh
set -e

echo "⏳ Waiting for database..."
until nc -z "${DB_HOST:-db}" "${DB_PORT:-5432}"; do
  sleep 1
done

echo "🚀 Running migrations..."
node_modules/.bin/prisma migrate deploy

echo "✅ Starting app..."
exec node server.js