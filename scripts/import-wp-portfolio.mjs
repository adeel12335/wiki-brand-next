/**
 * Import portfolio items scraped from thewikistudio.com into MongoDB.
 * Downloads images locally to public/assets/portfolio/.
 * Usage: node --env-file=.env.local scripts/import-wp-portfolio.mjs [--force]
 */
import "./configure-mongodb-dns.mjs";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, extname, join } from "node:path";
import { fileURLToPath } from "node:url";
import mongoose from "mongoose";
import { scrapeWpPortfolio, slugify } from "./lib/scrape-wp-portfolio.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const MONGODB_URI = process.env.MONGODB_URI;
const force = process.argv.includes("--force");
const ASSETS_DIR = join(__dirname, "../public/assets/portfolio");

if (!MONGODB_URI) {
  console.error("MONGODB_URI is not set");
  process.exit(1);
}

const portfolioItemSchema = new mongoose.Schema(
  {
    slug: { type: String, unique: true },
    title: String,
    category: String,
    summary: String,
    body: String,
    externalUrl: { type: String, default: null },
    featuredOnHome: { type: Boolean, default: false },
    image: {
      cloudinaryId: String,
      url: String,
      alt: String,
      width: Number,
      height: Number,
    },
    seo: {
      metaTitle: String,
      metaDescription: String,
      keywords: String,
    },
    status: { type: String, enum: ["draft", "published"], default: "published" },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const PortfolioItem =
  mongoose.models.PortfolioItem ||
  mongoose.model("PortfolioItem", portfolioItemSchema);

async function downloadImage(remoteUrl, slug) {
  mkdirSync(ASSETS_DIR, { recursive: true });
  const ext = extname(new URL(remoteUrl).pathname) || ".jpg";
  const filename = `${slug}${ext}`;
  const filePath = join(ASSETS_DIR, filename);
  const publicPath = `assets/portfolio/${filename}`;

  try {
    const res = await fetch(remoteUrl);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buffer = Buffer.from(await res.arrayBuffer());
    writeFileSync(filePath, buffer);
    return publicPath;
  } catch (error) {
    console.warn(`  Image download failed for ${slug}, using remote URL: ${error.message}`);
    return remoteUrl;
  }
}

console.log("Scraping WordPress portfolio...");
const scraped = await scrapeWpPortfolio();

if (scraped.length === 0) {
  console.error("No items scraped — check the WordPress page structure");
  process.exit(1);
}

console.log(`Scraped ${scraped.length} items`);

const fallbackItems = [];

for (const [index, item] of scraped.entries()) {
  console.log(`Downloading image: ${item.title}`);
  const imagePath = await downloadImage(item.imageUrl, item.slug);
  const isLocal = !imagePath.startsWith("http");
  fallbackItems.push({
    image: isLocal ? imagePath : item.imageUrl,
    alt: item.imageAlt,
    title: item.title,
    copy: item.summary,
    detail: item.body,
    externalUrl: item.externalUrl,
    featuredOnHome: index < 6,
  });
}

writeFileSync(
  join(__dirname, "../src/lib/data/portfolio-fallback.json"),
  JSON.stringify(fallbackItems, null, 4) + "\n",
);
writeFileSync(
  join(__dirname, "../src/lib/data/portfolio-imported.json"),
  JSON.stringify(
    scraped.map((item, index) => ({
      ...item,
      featuredOnHome: index < 6,
      sortOrder: index,
    })),
    null,
    2,
  ) + "\n",
);

await mongoose.connect(MONGODB_URI);

const existing = await PortfolioItem.countDocuments();
if (existing > 0 && !force) {
  console.log(
    `Portfolio already has ${existing} items. Run with --force to replace.`,
  );
  await mongoose.disconnect();
  process.exit(0);
}

if (force && existing > 0) {
  await PortfolioItem.deleteMany({});
  console.log(`Removed ${existing} existing items`);
}

for (const [index, item] of scraped.entries()) {
  const fallback = fallbackItems[index];
  const imagePath = fallback.image;
  const isLocal = !imagePath.startsWith("http");

  await PortfolioItem.create({
    slug: item.slug,
    title: item.title,
    category: "",
    summary: item.summary,
    body: item.body,
    externalUrl: item.externalUrl,
    featuredOnHome: index < 6,
    image: {
      cloudinaryId: isLocal ? `local/${item.slug}` : `wp-import/${item.slug}`,
      url: isLocal ? `/${imagePath}` : imagePath,
      alt: item.imageAlt,
      width: 400,
      height: 400,
    },
    seo: {
      metaTitle: `${item.title} | The Wikipedia Studio`,
      metaDescription: item.summary,
      keywords: "",
    },
    status: "published",
    sortOrder: index,
  });
  console.log(`Imported: ${item.title}`);
}

await mongoose.disconnect();
console.log(`Done. Imported ${scraped.length} items with local images.`);
