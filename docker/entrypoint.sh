#!/bin/sh
set -e

echo "Waiting for PostgreSQL..."
until npx prisma db execute --stdin >/dev/null 2>&1 <<SQL
SELECT 1;
SQL
do
  sleep 2
done

echo "Applying Prisma migrations..."
npx prisma migrate deploy

echo "Seeding demo data..."
npx prisma db seed

echo "Starting Fintaro AI..."
exec "$@"
