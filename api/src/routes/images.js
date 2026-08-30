import { generateSeaartImage } from '../services/seaartService.js';
import { consumeImageQuota, getQuota } from '../services/quotaService.js';

export default async function imageRoutes(app) {
  app.post('/v1/images/generate', async (request, reply) => {
    const body = request.body || {};
    if (!body.prompt || typeof body.prompt !== 'string') {
      return reply.code(400).send({ ok: false, error: 'prompt is required' });
    }

    const userId = body.user_id || 'local-test-user';
    const quotaResult = consumeImageQuota(userId);
    if (!quotaResult.allowed) {
      return reply.code(402).send({ ok: false, error: 'free_quota_exceeded', quota: quotaResult.quota });
    }

    const result = await generateSeaartImage(body);
    return { ok: true, quota: quotaResult.quota, data: result };
  });

  app.get('/v1/users/quota', async (request) => {
    const userId = request.query.user_id || 'local-test-user';
    return { ok: true, data: getQuota(userId) };
  });
}
