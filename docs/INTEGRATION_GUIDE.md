# Guia de Integração Real

## Modo 1 — SeaArt via SDK

```python
from seaart import SyncClient
client = SyncClient()
session = client.auth.login(email=EMAIL, password=PASSWORD)
token = session.value.token
```

1. Defina `SEAART_MODE=sdk`.
2. Preencha `SEAART_EMAIL`/`SEAART_PASSWORD`.
3. Rode `POST /v1/bootstrap/seaart`.
4. Substitua o placeholder em `seaartService.js` por chamada real.

## Modo 2 — SeaArt via MCP oficial

Depende de login prévio na CLI (`seaart login`) antes de expor `seaart-mcp serve` (padrão `127.0.0.1:8787/mcp`).

## Modo 3 — ComfyUI

- Cloud: `COMFY_MODE=cloud` + `COMFY_API_KEY`.
- Local: `COMFY_MODE=local` + `COMFY_LOCAL_BASE`.

## Gateway MCP remoto

Bearer token simples hoje; migrar para OAuth 2.1 + PKCE antes de expor publicamente.

## Ordem recomendada

1. SeaArt real só na rota de imagem.
2. Validar quota ponta a ponta.
3. ComfyUI real.
4. Banco persistente, billing e workers depois.
