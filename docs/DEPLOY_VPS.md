# Deploy em VPS — Instruções para Agente

Este documento foi escrito para ser copiado e colado como instrução para um agente de automação (ou para você mesmo) configurar o projeto em uma VPS nova (Oracle/Alibaba/Tencent Always Free ou qualquer Ubuntu 22.04+).

## Prompt sugerido para o agente

> Clone o repositório `seaart-proxy-hub`, instale Node.js 22 e Docker, configure o `.env` a partir do `.env.example`, suba os serviços com Docker Compose, valide o endpoint `/health` e configure para reiniciar automaticamente com systemd ou PM2.

## Passo a passo detalhado

### 1. Preparar o servidor

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y git curl ufw
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER
```

### 2. Instalar Node.js 22

```bash
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs
node -v
```

### 3. Clonar o projeto

```bash
git clone https://github.com/Lucasthai1/seaart-proxy-hub.git
cd seaart-proxy-hub
```

### 4. Configurar variáveis de ambiente

```bash
cp api/.env.example api/.env
nano api/.env
```

Preencha no mínimo: `JWT_SECRET` e `MCP_BEARER_TOKEN` (gere com `openssl rand -hex 32`), e credenciais do SeaArt/ComfyUI quando for integrar de verdade.

### 5. Subir com Docker Compose

```bash
cd infra
docker compose up -d
docker compose logs -f api
```

### 6. Validar

```bash
curl http://127.0.0.1:8788/health
```

### 7. Firewall (se for expor externamente)

```bash
sudo ufw allow 8788/tcp
sudo ufw enable
```

**Importante:** em produção, use reverse proxy (Caddy/Nginx) com HTTPS na frente da porta 8788.

### 8. Alternativa com PM2

```bash
sudo npm install -g pm2
cd api && npm install
pm2 start src/server.js --name seaart-proxy-api
pm2 save
pm2 startup
```

### 9. Alternativa com systemd

```bash
sudo cp infra/seaart-proxy.service /etc/systemd/system/seaart-proxy.service
sudo systemctl daemon-reload
sudo systemctl enable seaart-proxy
sudo systemctl start seaart-proxy
```

### 10. Atualização contínua

```bash
bash infra/deploy.sh
```

## Checklist final

- [ ] `/health` responde 200.
- [ ] `.env` fora do git.
- [ ] Firewall configurado.
- [ ] Reverse proxy HTTPS se exposto externamente.
- [ ] Backup do `.env` fora da VPS.
