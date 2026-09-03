/**
 * Force-refresh portfolio caches after imports.
 * Usage: node --env-file=.env.local scripts/refresh-portfolio-cache.mjs
 */
import { Redis } from "@upstash/redis";

const url = process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN;

if (!url || !token) {
  console.log("Redis not configured — Next cache bump alone is enough after restart.");
  process.exit(0);
}

const redis = new Redis({ url, token });
const keys = [
  "portfolio:list:published",
  "portfolio:list:published:v3",
];

for (const key of keys) {
  const result = await redis.del(key);
  console.log(`del ${key} => ${result}`);
}

console.log("Done. Hard-refresh /portfolio/ (or restart next dev).");
