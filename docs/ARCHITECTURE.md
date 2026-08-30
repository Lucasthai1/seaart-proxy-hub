# Arquitetura

## Visão geral

O SeaArt Proxy Hub segue um padrão **hub-and-spoke**: uma API central (o hub) coordena provedores externos (SeaArt, ComfyUI) e, no futuro, workers dedicados por cloud (spokes).

## Camadas

### 1. API (hub)
- Recebe requisições do painel e de futuros clientes externos.
- Aplica autenticação própria (JWT), nunca expõe tokens de provedores externos.
- Controla quota por usuário antes de encaminhar qualquer geração.
- Roteia para o serviço certo (`seaartService`, `comfyService`).

### 2. Serviços de integração
- `seaartService.js`: fala com SeaArt (modo SDK ou MCP).
- `comfyService.js`: fala com ComfyUI (modo local ou Cloud API).
- `seaartBootstrapService.js`: prepara e valida a sessão SeaArt antes do primeiro uso real.
- `sessionStore.js`: guarda o token de sessão em memória (trocar por Redis/Postgres em produção).

### 3. Gateway MCP
- Endpoint `/mcp` protegido por bearer token para uso privado imediato.
- Endpoint `/.well-known/oauth-protected-resource` para descoberta, preparando migração para OAuth 2.1 + PKCE quando o produto for público.

### 4. Workers (futuro)
- `seaart-worker`: processo dedicado para chamadas SeaArt em fila.
- `comfy-worker`: processo dedicado para workflows ComfyUI.
- Cada worker pode rodar em uma cloud diferente (Oracle, Alibaba, Tencent), todos falando com a API central.

## Fluxo de uma geração de imagem

1. Usuário autentica no painel → recebe JWT da própria plataforma.
2. Painel chama `POST /v1/images/generate` com o JWT.
3. API verifica quota (`quotaService`); se estourou, retorna 402.
4. API delega para `seaartService.generateSeaartImage`.
5. Resposta com `output_url` volta ao painel; contador de uso é atualizado.

## Por que este design

- **Ponto único de entrada** simplifica autenticação, quota e logging.
- **Serviços isolados** por provedor facilitam trocar SeaArt/Comfy sem tocar no resto.
- **Gateway MCP separado** permite automação por agentes sem misturar credenciais de usuários finais com credenciais de provedores.
- **Sem estado pesado na API** (sessão em memória por enquanto) facilita rodar em uma única VPS pequena antes de escalar.
