import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/config";

const privatePaths = ["/admin/", "/api/"];

/** AI / answer-engine crawlers — allow grounding & citation; block training-only agents separately if needed later. */
const AI_USER_AGENTS = [
  "OAI-SearchBot",
  "GPTBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-Web",
  "Google-Extended",
  "GoogleOther",
  "PerplexityBot",
  "Perplexity-User",
  "Applebot-Extended",
  "Bytespider",
  "CCBot",
  "meta-externalagent",
  "Amazonbot",
  "Bingbot",
] as const;

export default function robots(): MetadataRoute.Robots {
  const base = getSiteUrl();

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: privatePaths,
      },
      ...AI_USER_AGENTS.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: privatePaths,
      })),
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
