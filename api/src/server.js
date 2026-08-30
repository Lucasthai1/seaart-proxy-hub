import Fastify from 'fastify';
import cors from '@fastify/cors';
import rateLimit from '@fastify/rate-limit';
import { env, assertProductionSafety } from './lib/env.js';
import { requestLogPlugin } from './lib/logger.js';
import { registerErrorHandler } from './middleware/errorHandler.js';

import healthRoutes from './routes/health.js';
import authRoutes from './routes/auth.js';
import chatRoutes from './routes/chat.js';
import imageRoutes from './routes/images.js';
import comfyRoutes from './routes/comfy.js';
import bootstrapRoutes from './routes/bootstrap.js';
import mcpRoutes from './routes/mcp.js';

assertProductionSafety();

const app = Fastify({ logger: true });

await app.register(cors, { origin: true });
await app.register(rateLimit, { max: env.rateLimitMax, timeWindow: env.rateLimitWindow });

registerErrorHandler(app);
requestLogPlugin(app);

await app.register(healthRoutes);
await app.register(authRoutes);
await app.register(chatRoutes);
await app.register(imageRoutes);
await app.register(comfyRoutes);
await app.register(bootstrapRoutes);
await app.register(mcpRoutes);

const shutdown = async (signal) => {
  app.log.info(`received ${signal}, shutting down gracefully`);
  await app.close();
  process.exit(0);
};
process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));

app.listen({ port: env.port, host: env.host })
  .then(() => app.log.info(`seaart-proxy-api running on ${env.host}:${env.port}`))
  .catch((err) => { app.log.error(err); process.exit(1); });
