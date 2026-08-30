# seaart-worker (planejado)

Worker dedicado para processar jobs de SeaArt fora da API principal.

## Responsabilidades futuras

- Consumir fila (Redis/BullMQ) de jobs `chat` e `image`.
- Autenticar via SDK (`seaart.auth.login`) ou via MCP local.
- Escrever resultado e status de volta no banco (Postgres).

## Por que separar depois

Isolar chamadas externas de SeaArt em um processo próprio evita que instabilidade do provedor afete a API principal e o painel.
