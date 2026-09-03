/**
 * Submit key site + blog + portfolio URLs to IndexNow.
 * Usage: node --env-file=.env.local scripts/ping-indexnow.mjs
 */
import { readFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const INDEXNOW_KEY = "d1f7a91c3e4b4628b5c0f6e9a2d84731";
const site = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://thewikipediastudio.com"
).replace(/\/$/, "");

if (site.includes("localhost")) {
  console.error("Set NEXT_PUBLIC_SITE_URL to the production host before pinging.");
  process.exit(1);
}

const staticPaths = [
  "",
  "about-us",
  "services",
  "our-process",
  "portfolio",
  "blog",
  "faq",
  "contact",
  "privacy-policy",
  "terms-conditions",
  "services/wikipedia-page-creation",
  "services/wikipedia-page-editing",
  "services/wikipedia-content-writing",
  "services/wikipedia-page-management",
  "services/wikipedia-reputation-management",
];

const blogPostsPath = join(__dirname, "../src/lib/data/blog-posts.ts");
const blogSrc = readFileSync(blogPostsPath, "utf8");
const blogSlugs = [...blogSrc.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);

const portfolioSlugs = [];
const importedPath = join(__dirname, "../src/lib/data/portfolio-imported.json");
if (existsSync(importedPath)) {
  const imported = JSON.parse(readFileSync(importedPath, "utf8"));
  for (const row of imported) {
    if (row.slug) portfolioSlugs.push(row.slug);
  }
}

const urlList = [
  ...staticPaths.map((p) => (p ? `${site}/${p}/` : `${site}/`)),
  ...blogSlugs.map((slug) => `${site}/blog/${slug}/`),
  ...portfolioSlugs.map((slug) => `${site}/portfolio/${slug}/`),
  `${site}/sitemap.xml`,
  `${site}/feed.xml`,
  `${site}/llms.txt`,
];

const unique = [...new Set(urlList)];
console.log(`Submitting ${unique.length} URLs for ${new URL(site).host}`);

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "content-type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: new URL(site).host,
    key: INDEXNOW_KEY,
    keyLocation: `${site}/${INDEXNOW_KEY}.txt`,
    urlList: unique,
  }),
});

console.log(`IndexNow => ${res.status}`);
if (!res.ok && res.status !== 202) {
  console.error(await res.text());
  process.exit(1);
}
