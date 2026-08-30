import { env } from '../lib/env.js';

export default async function mcpRoutes(app) {
  app.get('/.well-known/oauth-protected-resource', async () => ({
    resource: `${env.mcpPublicBase}/mcp`,
    authorization_servers: [`${env.mcpPublicBase}/oauth`]
  }));

  app.all('/mcp', async (request, reply) => {
    const auth = request.headers.authorization || '';
    if (env.mcpRemoteMode === 'bearer' && auth !== `Bearer ${env.mcpBearerToken}`) {
      return reply
        .code(401)
        .header('WWW-Authenticate', `Bearer realm="mcp", resource_metadata="${env.mcpPublicBase}/.well-known/oauth-protected-resource"`)
        .send({ ok: false, error: 'unauthorized' });
    }
    return { ok: true, message: 'MCP gateway ativo. Conecte o SeaArt MCP upstream ou ferramentas internas aqui.' };
  });
}
