import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin-guard";
import { invalidateBlogCache, parsePublishedAt } from "@/lib/blog";
import { connectDB } from "@/lib/db/mongodb";
import { BlogPostModel } from "@/lib/db/models";
import { parseBlogPayload } from "@/lib/validators/blog";
import { slugify } from "@/lib/utils";

type RouteContext = { params: Promise<{ id: string }> };

async function revalidateBlogPaths(...slugs: string[]) {
  revalidatePath("/blog", "layout");
  revalidatePath("/");
  revalidatePath("/resources/");
  revalidatePath("/sitemap/");
  revalidatePath("/sitemap.xml");
  revalidatePath("/feed.xml");
  for (const slug of slugs) {
    if (slug) revalidatePath(`/blog/${slug}/`);
  }
}

export async function GET(_request: Request, context: RouteContext) {
  const { response } = await requireAdmin();
  if (response) return response;

  const { id } = await context.params;
  await connectDB();
  const item = await BlogPostModel.findById(id);
  if (!item) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ item });
}

export async function PUT(request: Request, context: RouteContext) {
  const { response } = await requireAdmin();
  if (response) return response;

  const { id } = await context.params;
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

  const item = await BlogPostModel.findById(id);
  if (!item) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const oldSlug = item.slug;
  const newSlug = slugify(data.slug || data.title || item.slug);

  if (newSlug !== item.slug) {
    const clash = await BlogPostModel.findOne({
      slug: newSlug,
      _id: { $ne: id },
    });
    if (clash) {
      return NextResponse.json({ error: "Slug already in use" }, { status: 400 });
    }
  }

  item.slug = newSlug;
  item.title = data.title;
  item.excerpt = data.excerpt;
  item.body = data.body;
  item.category = data.category ?? "";
  item.relatedService = data.relatedService || null;
  item.ogImage = data.ogImage || "/assets/og/hero-orbital-globe.jpg";
  item.metaTitle = data.metaTitle || data.title;
  item.metaDescription = data.metaDescription || data.excerpt;
  item.keywords = data.keywords ?? "";
  item.publishedAt = parsePublishedAt(data.publishedAt);
  item.status = data.status === "published" ? "published" : "draft";

  await item.save();

  await invalidateBlogCache(oldSlug);
  if (newSlug !== oldSlug) await invalidateBlogCache(newSlug);
  await revalidateBlogPaths(oldSlug, newSlug);

  return NextResponse.json({ item });
}

export async function PATCH(request: Request, context: RouteContext) {
  const { response } = await requireAdmin();
  if (response) return response;

  const { id } = await context.params;
  const body = await request.json();
  await connectDB();

  const item = await BlogPostModel.findById(id);
  if (!item) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (body.action === "toggle") {
    item.status = item.status === "published" ? "draft" : "published";
    await item.save();
  } else {
    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  }

  await invalidateBlogCache(item.slug);
  await revalidateBlogPaths(item.slug);

  return NextResponse.json({ item });
}

export async function DELETE(_request: Request, context: RouteContext) {
  const { response } = await requireAdmin();
  if (response) return response;

  const { id } = await context.params;
  await connectDB();
  const item = await BlogPostModel.findByIdAndDelete(id);
  if (!item) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await invalidateBlogCache(item.slug);
  await revalidateBlogPaths(item.slug);

  return NextResponse.json({ ok: true });
}
