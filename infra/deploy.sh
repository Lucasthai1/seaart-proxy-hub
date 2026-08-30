#!/usr/bin/env bash
set -euo pipefail

echo "==> Atualizando código"
git pull origin main

echo "==> Instalando dependências da API"
cd api
npm install --omit=dev
cd ..

echo "==> Reiniciando serviço"
if command -v pm2 >/dev/null 2>&1; then
  pm2 restart seaart-proxy-api || pm2 start api/src/server.js --name seaart-proxy-api
elif systemctl is-active --quiet seaart-proxy; then
  sudo systemctl restart seaart-proxy
else
  echo "Nenhum gerenciador de processo detectado (PM2 ou systemd). Suba manualmente com: node api/src/server.js"
fi

echo "==> Validando health check"
sleep 2
curl -sf http://127.0.0.1:8788/health && echo "OK" || echo "FALHOU - verifique os logs"
