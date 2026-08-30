import { env } from '../lib/env.js';

export async function runComfyWorkflow(payload) {
  const provider = env.comfyMode === 'local' ? 'comfy-local' : 'comfy-cloud';
  return {
    provider,
    accepted: true,
    workflow_id: payload.workflow_id || 'demo-workflow',
    message: env.comfyMode === 'local'
      ? 'Stub pronto para enviar prompt ao endpoint local do ComfyUI (/prompt, /history, /view).'
      : 'Stub pronto para enviar workflow ao Comfy Cloud com header X-API-Key.',
    preview_url: 'https://placehold.co/1280x720/png?text=comfy+preview'
  };
}
