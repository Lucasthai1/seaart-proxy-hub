import { env } from '../lib/env.js';
import { saveSeaartSession, getSeaartSession } from './sessionStore.js';

export async function bootstrapSeaartSession() {
  if (env.seaartToken) {
    return saveSeaartSession({ source: 'env_token', token: env.seaartToken, mode: env.seaartMode, status: 'ready' });
  }

  if (env.seaartMode === 'sdk' && env.seaartEmail && env.seaartPassword) {
    return saveSeaartSession({
      source: 'sdk_login_placeholder',
      mode: 'sdk',
      status: 'needs_real_sdk_call',
      email: env.seaartEmail,
      token: 'replace-with-real-sdk-token'
    });
  }

  if (env.seaartMode === 'mcp') {
    return saveSeaartSession({
      source: 'mcp_bridge_placeholder',
      mode: 'mcp',
      status: 'needs_cli_login_on_host',
      mcp_url: env.seaartMcpUrl
    });
  }

  return saveSeaartSession({ source: 'none', mode: env.seaartMode, status: 'missing_credentials' });
}

export function getSeaartBootstrapStatus() {
  return getSeaartSession();
}
