# comfy-worker (planejado)

Worker dedicado para processar workflows ComfyUI fora da API principal.

## Responsabilidades futuras

- Consumir fila de jobs `comfy.run`.
- Enviar workflow ao Comfy Cloud (`X-API-Key`) ou instância local (`/prompt`, `/history/{id}`, `/view`).
- Fazer polling ou usar WebSocket para status e retornar `output_url` final.

## Por que separar depois

Workflows ComfyUI podem ser lentos ou pesados; rodar em worker próprio evita bloquear requisições rápidas (chat, quota) na API principal.
