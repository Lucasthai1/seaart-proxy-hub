export default async function authRoutes(app) {
  app.post('/v1/auth/login', async (request, reply) => {
    const { email, password } = request.body || {};
    if (!email || !password) {
      return reply.code(400).send({ ok: false, error: 'email and password are required' });
    }
    return { ok: true, token: 'local-dev-token', user: { id: 'local-admin', email } };
  });

  app.get('/v1/auth/me', async () => ({ ok: true, user: { id: 'local-admin', role: 'admin' } }));
}
