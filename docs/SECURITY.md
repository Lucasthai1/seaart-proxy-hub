# Segurança

## Regras não-negociáveis

1. Nunca commitar `.env`.
2. Tokens de provedores externos só existem no backend.
3. JWT da plataforma é independente dos tokens dos provedores.
4. `/mcp` sempre exige bearer/OAuth.
5. Rotacione `JWT_SECRET`/`MCP_BEARER_TOKEN` se houver suspeita de vazamento.

## Antes de expor a VPS

- Firewall (`ufw`) só com portas necessárias.
- Reverse proxy com HTTPS.
- Postgres/Redis nunca públicos.

## Riscos de multi-conta

Usar SDKs não oficiais ou múltiplas contas pode violar Termos de Serviço. Considere modelo BYOK antes de escalar comercialmente.
