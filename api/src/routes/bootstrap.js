import { bootstrapSeaartSession, getSeaartBootstrapStatus } from '../services/seaartBootstrapService.js';

export default async function bootstrapRoutes(app) {
  app.post('/v1/bootstrap/seaart', async () => {
    const data = await bootstrapSeaartSession();
    return {
      ok: true,
      data,
      notes: {
        sdk: 'from seaart import SyncClient; session = SyncClient().auth.login(email, password); token = session.value.token',
        mcp: 'SeaArt MCP usa login local da CLI (seaart login) antes de expor seaart-mcp serve.'
      }
    };
  });

  app.get('/v1/bootstrap/seaart', async () => ({ ok: true, data: getSeaartBootstrapStatus() }));
}
