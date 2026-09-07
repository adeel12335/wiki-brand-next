import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin-guard";
import { invalidateBlogCache, parsePublishedAt } from "@/lib/blog";
import { connectDB } from "@/lib/db/mongodb";
import { BlogPostModel } from "@/lib/db/models";
import { parseBlogPayload } from "@/lib/validators/blog";
import { slugify } from "@/lib/utils";

async function revalidateBlogPaths(slug?: string) {
  revalidatePath("/blog", "layout");
  revalidatePath("/");
  revalidatePath("/resources/");
  revalidatePath("/sitemap/");
  revalidatePath("/sitemap.xml");
  revalidatePath("/feed.xml");
  if (slug) revalidatePath(`/blog/${slug}/`);
}

export async function GET() {
  const { response } = await requireAdmin();
  if (response) return response;

  await connectDB();
  const items = await BlogPostModel.find().sort({ publishedAt: -1, createdAt: -1 });

  return NextResponse.json({ items });
}

export async function POST(request: Request) {
  const { response } = await requireAdmin();
  if (response) return response;

  const body = await request.json();
  const parsed = parseBlogPayload(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid input", details: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  const data = parsed.data;
  await connectDB();

  const slug = slugify(data.slug || data.title || "post");
  const existing = await BlogPostModel.findOne({ slug });
  if (existing) {
    return NextResponse.json({ error: "Slug already exists" }, { status: 400 });
  }

  const item = await BlogPostModel.create({
    slug,
    title: data.title,
    excerpt: data.excerpt,
    body: data.body,
    category: data.category ?? "",
    relatedService: data.relatedService || null,
    ogImage: data.ogImage || "/assets/og/hero-orbital-globe.jpg",
    metaTitle: data.metaTitle || data.title,
    metaDescription: data.metaDescription || data.excerpt,
    keywords: data.keywords ?? "",
    publishedAt: parsePublishedAt(data.publishedAt),
    status: data.status === "published" ? "published" : "draft",
  });

  await invalidateBlogCache(slug);
  await revalidateBlogPaths(slug);

  return NextResponse.json({ item });
}
