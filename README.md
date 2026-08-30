# SeaArt Proxy Hub

Plataforma própria (proxy/hub) que expõe **chat**, **geração de imagem via SeaArt** e **workflows via ComfyUI** através de uma única API, com painel administrativo, quotas freemium e um gateway MCP para automação por agentes.

Este repositório é a base técnica para transformar contas gratuitas (SeaArt, ComfyUI, VPS) em um produto testável, com caminho claro para produção: multi-conta, filas, billing e workers distribuídos entre clouds.

## Por que este projeto existe

- Centralizar SeaArt + ComfyUI + MCP atrás de uma única API, sem expor segredos no frontend.
- Ter um limite freemium claro (ex.: 5 gerações grátis por usuário) e caminho de upgrade.
- Rodar hoje em uma VPS simples (Oracle/Alibaba/Tencent Always Free) e escalar depois para múltiplos workers.
- Servir como base de um SaaS de geração de imagem/roleplay para nicho anime/mangá.

## Arquitetura em uma imagem

```
Usuário → Painel Web → API (Fastify) → [SeaArt SDK/MCP] [ComfyUI local/cloud]
                              │
                              ├─ Quota Service (free/paid)
                              ├─ Session Store (token SeaArt)
                              └─ MCP Gateway (bearer hoje, OAuth 2.1 depois)
```

Detalhes completos em [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md).

## Stack

| Camada | Tecnologia |
|---|---|
| API | Node.js 22 + Fastify 5 |
| Auth interna | JWT próprio (nunca expõe token do SeaArt/Comfy) |
| Motor de imagem | SeaArt (SDK não oficial ou MCP oficial) |
| Motor de workflow | ComfyUI (local ou Cloud API) |
| Painel | HTML/CSS/JS estático, sem build step |
| Infra | Docker Compose (API + Redis + Postgres) |
| Deploy | VPS (Oracle/Alibaba/Tencent Always Free) com PM2 ou systemd |

## Estrutura do repositório

```
api/                  API principal (Fastify)
  src/routes/         Rotas HTTP (auth, chat, images, comfy, bootstrap, mcp, health)
  src/services/       Regras de negócio (quota, sessão, integrações)
  src/middleware/      Tratamento de erro central
web/                  Painel administrativo estático (console de testes)
workers/              Documentação dos workers futuros (SeaArt, ComfyUI)
infra/                Docker Compose, Dockerfile, systemd, script de deploy
docs/                 Arquitetura, guia de integração, segurança, deploy em VPS
.github/workflows/    CI básico (lint/syntax check)
```

## Rodando localmente em 3 passos

```bash
cd api
cp .env.example .env
npm install && npm run dev
```

Abra `http://127.0.0.1:8788/health` e o arquivo `web/seaart-proxy-console.html` no navegador.

Guia completo de comandos e endpoints em [`docs/DEPLOY_VPS.md`](docs/DEPLOY_VPS.md) e [`docs/INTEGRATION_GUIDE.md`](docs/INTEGRATION_GUIDE.md).

## Endpoints principais

```
GET  /health
POST /v1/auth/login
GET  /v1/auth/me
POST /v1/chat
POST /v1/images/generate
GET  /v1/users/quota
POST /v1/comfy/run
POST /v1/bootstrap/seaart
GET  /v1/bootstrap/seaart
ALL  /mcp
```

## Modelo de monetização planejado

- **Free:** 5 gerações de imagem por usuário (contador em memória hoje, Postgres depois).
- **Starter/Pro:** créditos mensais + prioridade de fila + sem marca d'água.
- **BYOK (opcional):** usuário traz sua própria chave SeaArt/ComfyUI, você cobra só pelo painel.

## Segurança

Ver [`docs/SECURITY.md`](docs/SECURITY.md) — nunca commitar `.env`, tokens sempre no backend, gateway MCP com bearer token até migrar para OAuth 2.1.

## Roadmap

1. Login real via SDK do SeaArt (capturar token programaticamente).
2. Persistência em Postgres (usuários, contas, jobs, quotas).
3. Fila com Redis/BullMQ e múltiplos workers por cloud.
4. Billing real (Stripe ou gateway nacional) sobre o modelo freemium.
5. Separar SeaArt-worker e Comfy-worker em processos próprios.

## Status

Projeto em fase de teste local/VPS única, antes de produção multi-tenant.
