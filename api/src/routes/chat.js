import { chatSeaart } from '../services/seaartService.js';

export default async function chatRoutes(app) {
  app.post('/v1/chat', async (request, reply) => {
    const body = request.body || {};
    if (!body.message) return reply.code(400).send({ ok: false, error: 'message is required' });
    const result = await chatSeaart(body);
    return { ok: true, data: result };
  });
}
