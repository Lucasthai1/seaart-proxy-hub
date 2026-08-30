import { runComfyWorkflow } from '../services/comfyService.js';

export default async function comfyRoutes(app) {
  app.post('/v1/comfy/run', async (request, reply) => {
    const body = request.body || {};
    if (!body.workflow_id && !body.input) {
      return reply.code(400).send({ ok: false, error: 'workflow_id or input is required' });
    }
    const result = await runComfyWorkflow(body);
    return { ok: true, data: result };
  });
}
