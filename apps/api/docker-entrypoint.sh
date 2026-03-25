#!/bin/sh
set -e

wait_for_db() {
  node <<'NODE'
const net = require('node:net');

const host = 'db';
const port = 5432;
const timeout = 2000;

const socket = net.createConnection({ host, port });

socket.setTimeout(timeout);

socket.on('connect', () => {
  socket.end();
  process.exit(0);
});

socket.on('timeout', () => {
  socket.destroy();
  process.exit(1);
});

socket.on('error', () => {
  socket.destroy();
  process.exit(1);
});
NODE
}

echo "⏳  Aguardando o banco ficar disponível..."
until wait_for_db; do
  sleep 2
done

echo "🔄  Rodando migrations..."
pnpm exec prisma migrate deploy

echo "🌱  Rodando seed..."
pnpm exec prisma db seed

echo "🚀  Iniciando a API..."
exec node dist/src/main.js
