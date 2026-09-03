import dns from "node:dns";

/**
 * Some routers/ISPs refuse DNS SRV lookups required by mongodb+srv:// URIs.
 * Set MONGODB_DNS_SERVERS (comma-separated) in .env.local to use public DNS locally.
 * In development, falls back to public resolvers when the env var is unset.
 *
 * Note: Next.js/Turbopack may isolate this dns binding from mongoose's copy.
 * `connectDB()` also resolves mongodb+srv to a direct mongodb:// URI.
 */
export function configureMongoDbDns(): void {
  const fromEnv = process.env.MONGODB_DNS_SERVERS?.split(",")
    .map((server) => server.trim())
    .filter(Boolean);

  if (fromEnv?.length) {
    dns.setServers(fromEnv);
    return;
  }

  if (
    process.env.NODE_ENV !== "production" &&
    process.env.MONGODB_URI?.startsWith("mongodb+srv://")
  ) {
    dns.setServers(["8.8.8.8", "1.1.1.1"]);
  }
}
