export default async function healthRoutes(app) {
  const startedAt = Date.now();
  app.get('/health', async () => ({
    ok: true,
    service: 'seaart-proxy-api',
    uptime_seconds: Math.floor((Date.now() - startedAt) / 1000)
  }));
}
