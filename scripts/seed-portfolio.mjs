/**
 * Seed portfolio items from exported JSON fallback data.
 * Usage: node --env-file=.env.local scripts/seed-portfolio.mjs
 */
import "./configure-mongodb-dns.mjs";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import mongoose from "mongoose";

const __dirname = dirname(fileURLToPath(import.meta.url));
const MONGODB_URI = process.env.MONGODB_URI;

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

function slugify(value) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "item";
}

const data = JSON.parse(
  readFileSync(join(__dirname, "../src/lib/data/portfolio-fallback.json"), "utf8"),
);

await mongoose.connect(MONGODB_URI);

const count = await PortfolioItem.countDocuments();
if (count > 0) {
  console.log(`Portfolio already has ${count} items — skipping seed`);
  await mongoose.disconnect();
  process.exit(0);
}

for (const [index, item] of data.entries()) {
  const slug = slugify(item.title);
  const imagePath = item.image.replace(/^\//, "");

  await PortfolioItem.create({
    slug,
    title: item.title,
    category: item.title,
    summary: item.copy,
    body: item.detail,
    externalUrl: null,
    image: {
      cloudinaryId: imagePath,
      url: `/${imagePath}`,
      alt: item.alt,
      width: 960,
      height: 640,
    },
    seo: {
      metaTitle: "",
      metaDescription: "",
      keywords: "",
    },
    status: "published",
    sortOrder: index,
  });
  console.log(`Seeded: ${item.title}`);
}

await mongoose.disconnect();
console.log("Done.");
