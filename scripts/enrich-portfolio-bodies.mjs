/**
 * Expand thin portfolio bodies so detail pages can be indexed (>= 80 words).
 * Usage: node --env-file=.env.local scripts/enrich-portfolio-bodies.mjs
 */
import "./configure-mongodb-dns.mjs";
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import mongoose from "mongoose";
import { Redis } from "@upstash/redis";

const __dirname = dirname(fileURLToPath(import.meta.url));
const IMPORTED_PATH = join(__dirname, "../src/lib/data/portfolio-imported.json");
const FALLBACK_PATH = join(__dirname, "../src/lib/data/portfolio-fallback.json");

const FOCUS = [
  "independent secondary coverage and citation quality",
  "neutral tone, verifiability, and talk-page norms",
  "source hierarchy — what belongs in the article and what does not",
  "notability evidence before any promotional claims",
  "disclosure requirements for paid contributions",
];

function wordCount(text) {
  return String(text || "")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

function buildBody(item, index) {
  const title = item.title?.trim() || "This subject";
  const summary = (item.summary || item.copy || item.detail || "")
    .replace(/\s+/g, " ")
    .trim();
  const category = (item.category || "").trim();
  const focus = FOCUS[index % FOCUS.length];
  const roleLine = summary
    ? `${title} (${summary}${category ? `; ${category}` : ""})`
    : category
      ? `${title}, filed under ${category},`
      : `${title}`;

  return [
    `${roleLine} appears in our portfolio as a published Wikipedia engagement.`,
    `The brief started with a source audit: which outlets covered the subject independently, how deep that coverage ran, and whether the record could support a durable article under current notability and biography policies.`,
    `Drafting emphasised ${focus}. Claims entered the page only when a reliable citation could carry them; unsupported praise, resume padding, and marketing language were left out.`,
    `Where paid editing applied, the relationship was disclosed in line with Wikimedia Terms of Use and English Wikipedia conflict-of-interest guidance. Publication is never guaranteed — volunteer review decides outcomes — but a source-first draft is what gives an article its best chance to survive.`,
    `After acceptance, accuracy still depends on new independent reporting. We treat the encyclopedia as a reference work, not a promotional channel.`,
  ].join("\n\n");
}

function slugify(title) {
  return String(title)
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error("MONGODB_URI missing");
  process.exit(1);
}

await mongoose.connect(uri);
const col = mongoose.connection.collection("portfolioitems");
const docs = await col.find({ status: "published" }).sort({ sortOrder: 1 }).toArray();

let updated = 0;
const enriched = [];

for (let i = 0; i < docs.length; i++) {
  const doc = docs[i];
  const body = buildBody(doc, i);
  if (wordCount(body) < 80) {
    console.error(`Generated body too short for ${doc.slug}`);
    process.exit(1);
  }

  await col.updateOne(
    { _id: doc._id },
    {
      $set: {
        body,
        updatedAt: new Date(),
        ...(doc.seo?.metaDescription
          ? {}
          : {
              "seo.metaDescription": `${doc.title}: Wikipedia portfolio engagement by The Wikipedia Studio — source-led drafting, neutral tone, and disclosed paid editing where required.`,
            }),
      },
    },
  );

  enriched.push({
    slug: doc.slug,
    title: doc.title,
    body,
    summary: doc.summary,
    category: doc.category,
    externalUrl: doc.externalUrl,
    words: wordCount(body),
  });
  updated += 1;
  console.log(`ok ${doc.slug} (${wordCount(body)} words)`);
}

// Keep local JSON mirrors in sync for fallback/offline imports
if (existsSync(IMPORTED_PATH)) {
  const imported = JSON.parse(readFileSync(IMPORTED_PATH, "utf8"));
  for (let i = 0; i < imported.length; i++) {
    const row = imported[i];
    const match = enriched.find((e) => e.slug === row.slug) ?? {
      body: buildBody(row, i),
      slug: row.slug || slugify(row.title),
    };
    imported[i] = { ...row, body: match.body };
  }
  writeFileSync(IMPORTED_PATH, JSON.stringify(imported, null, 2) + "\n");
  console.log(`wrote ${IMPORTED_PATH}`);
}

if (existsSync(FALLBACK_PATH)) {
  const fallback = JSON.parse(readFileSync(FALLBACK_PATH, "utf8"));
  for (let i = 0; i < fallback.length; i++) {
    const row = fallback[i];
    const slug = slugify(row.title);
    const match = enriched.find((e) => e.slug === slug);
    fallback[i] = {
      ...row,
      detail: match?.body ?? buildBody(row, i),
    };
  }
  writeFileSync(FALLBACK_PATH, JSON.stringify(fallback, null, 2) + "\n");
  console.log(`wrote ${FALLBACK_PATH}`);
}

// Clear Redis list cache
const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;
if (redisUrl && redisToken) {
  const redis = new Redis({ url: redisUrl, token: redisToken });
  for (const key of [
    "portfolio:list:published",
    "portfolio:list:published:v3",
    "portfolio:list:published:v4",
  ]) {
    console.log(`del ${key} =>`, await redis.del(key));
  }
}

await mongoose.disconnect();
console.log(`Updated ${updated} portfolio bodies.`);

// On-demand ISR + IndexNow against production when secrets exist
const site = (process.env.NEXT_PUBLIC_SITE_URL || "https://thewikipediastudio.com").replace(
  /\/$/,
  "",
);
const revalidateSecret = process.env.REVALIDATE_SECRET?.trim();
if (revalidateSecret && !site.includes("localhost")) {
  const paths = ["/", "/portfolio/", "/sitemap.xml", ...enriched.map((e) => `/portfolio/${e.slug}/`)];
  for (const path of paths) {
    const slug = path.startsWith("/portfolio/") && path !== "/portfolio/"
      ? path.replace(/^\/portfolio\//, "").replace(/\/$/, "")
      : undefined;
    try {
      const res = await fetch(`${site}/api/revalidate`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-revalidate-secret": revalidateSecret,
        },
        body: JSON.stringify(slug ? { slug, path } : { path }),
      });
      console.log(`revalidate ${path} => ${res.status}`);
    } catch (error) {
      console.error(`revalidate failed for ${path}`, error);
    }
  }
}

const INDEXNOW_KEY = "d1f7a91c3e4b4628b5c0f6e9a2d84731";
if (!site.includes("localhost")) {
  const urlList = [
    `${site}/`,
    `${site}/portfolio/`,
    `${site}/sitemap.xml`,
    ...enriched.map((e) => `${site}/portfolio/${e.slug}/`),
  ];
  try {
    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "content-type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host: new URL(site).host,
        key: INDEXNOW_KEY,
        keyLocation: `${site}/${INDEXNOW_KEY}.txt`,
        urlList,
      }),
    });
    console.log(`IndexNow => ${res.status}`);
  } catch (error) {
    console.error("IndexNow failed", error);
  }
}
