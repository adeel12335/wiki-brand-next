/**
 * Seed blog posts from static JSON into MongoDB.
 * Usage: npm run seed-blog
 *        npm run seed-blog -- --force   (upsert by slug)
 */
import "./configure-mongodb-dns.mjs";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import mongoose from "mongoose";

const __dirname = dirname(fileURLToPath(import.meta.url));
const MONGODB_URI = process.env.MONGODB_URI;
const force = process.argv.includes("--force");

if (!MONGODB_URI) {
  console.error("MONGODB_URI is not set");
  process.exit(1);
}

const blogPostSchema = new mongoose.Schema(
  {
    slug: { type: String, unique: true },
    title: String,
    excerpt: String,
    body: String,
    category: String,
    relatedService: { type: String, default: null },
    ogImage: String,
    metaTitle: String,
    metaDescription: String,
    keywords: String,
    publishedAt: Date,
    status: { type: String, enum: ["draft", "published"], default: "published" },
  },
  { timestamps: true },
);

const BlogPost =
  mongoose.models.BlogPost || mongoose.model("BlogPost", blogPostSchema);

function parseDate(value) {
  if (!value) return new Date();
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return new Date(`${value}T12:00:00.000Z`);
  }
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? new Date() : parsed;
}

const blogPosts = JSON.parse(
  readFileSync(join(__dirname, "../src/lib/data/blog-posts.seed.json"), "utf8"),
);

await mongoose.connect(MONGODB_URI);

const count = await BlogPost.countDocuments();
if (count > 0 && !force) {
  console.log(
    `Blog already has ${count} posts — skipping (pass --force to upsert)`,
  );
  await mongoose.disconnect();
  process.exit(0);
}

let created = 0;
let updated = 0;

for (const post of blogPosts) {
  const payload = {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    body: String(post.body ?? "").trim(),
    category: post.category ?? "",
    relatedService: post.relatedService || null,
    ogImage: post.ogImage || "/assets/og/hero-orbital-globe.jpg",
    metaTitle: post.metaTitle || post.title,
    metaDescription: post.metaDescription || post.excerpt,
    keywords: post.keywords || "",
    publishedAt: parseDate(post.publishedAt),
    status: "published",
  };

  const existing = await BlogPost.findOne({ slug: post.slug });
  if (existing) {
    Object.assign(existing, payload);
    await existing.save();
    updated += 1;
  } else {
    await BlogPost.create(payload);
    created += 1;
  }
}

console.log(`Blog seed done — created ${created}, updated ${updated}`);
await mongoose.disconnect();
