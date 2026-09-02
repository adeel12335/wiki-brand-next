import dns from "node:dns";

/**
 * Some routers/ISPs refuse DNS SRV lookups required by mongodb+srv:// URIs.
 * Set MONGODB_DNS_SERVERS (comma-separated) in .env.local to use public DNS locally.
 */
export function configureMongoDbDns(): void {
  const servers = process.env.MONGODB_DNS_SERVERS?.split(",")
    .map((server) => server.trim())
    .filter(Boolean);

  if (!servers?.length) return;

  dns.setServers(servers);
}
