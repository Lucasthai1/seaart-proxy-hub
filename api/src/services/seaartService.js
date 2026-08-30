import { env } from '../lib/env.js';
import { getSeaartSession } from './sessionStore.js';

export async function generateSeaartImage(payload) {
  const session = getSeaartSession();
  const ready = session && session.status === 'ready';

  return {
    provider: 'seaart',
    mode: env.seaartMode,
    session_ready: Boolean(ready),
    accepted: true,
    message: ready
      ? 'Sessão pronta. Substitua este bloco pela chamada real ao SDK/MCP do SeaArt.'
      : 'Sessão ainda não inicializada. Rode POST /v1/bootstrap/seaart antes de integrar de verdade.',
    prompt: payload.prompt,
    negative_prompt: payload.negative_prompt || null,
    output_url: 'https://placehold.co/1024x1024/png?text=seaart+preview'
  };
}

export async function chatSeaart(payload) {
  return {
    provider: 'seaart',
    mode: env.seaartMode,
    accepted: true,
    reply: `Stub de chat ativo. Você enviou: ${payload.message}`
  };
}
