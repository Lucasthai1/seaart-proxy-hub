import { env } from '../lib/env.js';

const usage = globalThis.__QUOTA_STORE__ || new Map();
globalThis.__QUOTA_STORE__ = usage;

export function getQuota(userId) {
  const used = usage.get(userId) || 0;
  const limit = env.defaultFreeImageLimit;
  return { userId, plan: 'free', image_limit: limit, image_used: used, remaining: Math.max(0, limit - used) };
}

export function consumeImageQuota(userId) {
  const quota = getQuota(userId);
  if (quota.remaining <= 0) return { allowed: false, quota };
  usage.set(userId, quota.image_used + 1);
  return { allowed: true, quota: getQuota(userId) };
}
