import dotenv from 'dotenv';
dotenv.config();

function required(name, fallback) {
  return process.env[name] || fallback;
}

export const env = {
  port: Number(process.env.PORT || 8788),
  host: process.env.HOST || '0.0.0.0',
  nodeEnv: process.env.NODE_ENV || 'development',
  jwtSecret: required('JWT_SECRET', 'change-me'),

  seaartMode: process.env.SEAART_MODE || 'sdk',
  seaartEmail: process.env.SEAART_EMAIL || '',
  seaartPassword: process.env.SEAART_PASSWORD || '',
  seaartMcpUrl: process.env.SEAART_MCP_URL || 'http://127.0.0.1:8787/mcp',
  seaartToken: process.env.SEAART_TOKEN || '',

  comfyMode: process.env.COMFY_MODE || 'cloud',
  comfyApiKey: process.env.COMFY_API_KEY || '',
  comfyCloudBase: process.env.COMFY_CLOUD_BASE || 'https://cloud.comfy.org/api',
  comfyLocalBase: process.env.COMFY_LOCAL_BASE || 'http://127.0.0.1:8188',

  mcpRemoteMode: process.env.MCP_REMOTE_MODE || 'bearer',
  mcpBearerToken: required('MCP_BEARER_TOKEN', 'change-me-mcp-token'),
  mcpPublicBase: process.env.MCP_PUBLIC_BASE || 'https://your-domain.com',

  defaultFreeImageLimit: Number(process.env.DEFAULT_FREE_IMAGE_LIMIT || 5),

  rateLimitMax: Number(process.env.RATE_LIMIT_MAX || 60),
  rateLimitWindow: process.env.RATE_LIMIT_WINDOW || '1 minute'
};

export function assertProductionSafety() {
  if (env.nodeEnv === 'production') {
    if (env.jwtSecret === 'change-me') throw new Error('JWT_SECRET must be set in production');
    if (env.mcpBearerToken === 'change-me-mcp-token') throw new Error('MCP_BEARER_TOKEN must be set in production');
  }
}
