import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin-guard";
import { connectDB } from "@/lib/db/mongodb";
import { PortfolioItem } from "@/lib/db/models";
import { invalidatePortfolioCache } from "@/lib/portfolio";
import { parsePortfolioPayload } from "@/lib/validators/portfolio";
import { slugify } from "@/lib/utils";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: RouteContext) {
  const { response } = await requireAdmin();
  if (response) return response;

  const { id } = await context.params;
  await connectDB();
  const item = await PortfolioItem.findById(id);
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
  const parsed = parsePortfolioPayload(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid input", details: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  const data = parsed.data;
  await connectDB();

  const item = await PortfolioItem.findById(id);
  if (!item) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const oldSlug = item.slug;
  const newSlug = slugify(data.slug || data.title || item.slug);

  if (newSlug !== item.slug) {
    const clash = await PortfolioItem.findOne({ slug: newSlug, _id: { $ne: id } });
    if (clash) {
      return NextResponse.json({ error: "Slug already in use" }, { status: 400 });
    }
  }

  item.slug = newSlug;
  item.title = data.title;
  item.category = data.category ?? "";
  item.summary = data.summary;
  item.body = data.body ?? "";
  item.externalUrl = data.externalUrl || null;
  item.featuredOnHome = Boolean(data.featuredOnHome);
  if (data.image !== undefined) {
    item.image = data.image
      ? {
          cloudinaryId: data.image.cloudinaryId,
          url: data.image.url,
          alt: data.image.alt ?? "",
          width: data.image.width ?? 960,
          height: data.image.height ?? 640,
        }
      : null;
  }
  if (data.seo) {
    item.seo = {
      metaTitle: data.seo.metaTitle ?? "",
      metaDescription: data.seo.metaDescription ?? "",
      keywords: data.seo.keywords ?? "",
    };
  }
  item.status = data.status === "published" ? "published" : "draft";

  await item.save();

  await invalidatePortfolioCache(oldSlug);
  if (newSlug !== oldSlug) await invalidatePortfolioCache(newSlug);
  revalidatePath("/");
  revalidatePath("/portfolio/");
  revalidatePath(`/portfolio/${oldSlug}/`);
  revalidatePath(`/portfolio/${newSlug}/`);

  return NextResponse.json({ item });
}

export async function PATCH(request: Request, context: RouteContext) {
  const { response } = await requireAdmin();
  if (response) return response;

  const { id } = await context.params;
  const body = await request.json();
  await connectDB();

  const item = await PortfolioItem.findById(id);
  if (!item) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (body.action === "toggle") {
    item.status = item.status === "published" ? "draft" : "published";
    await item.save();
  } else if (body.action === "toggleFeatured") {
    item.featuredOnHome = !item.featuredOnHome;
    await item.save();
  } else if (
    body.action === "reorder" ||
    body.action === "up" ||
    body.action === "down"
  ) {
    const direction =
      body.direction ?? (body.action === "up" || body.action === "down" ? body.action : "");
    const items = await PortfolioItem.find().sort({ sortOrder: 1 });
    const index = items.findIndex((row) => row._id.toString() === id);
    const target = direction === "up" ? index - 1 : index + 1;
    if (index >= 0 && target >= 0 && target < items.length) {
      const a = items[index].sortOrder;
      items[index].sortOrder = items[target].sortOrder;
      items[target].sortOrder = a;
      await items[index].save();
      await items[target].save();
    }
  } else {
    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  }

  await invalidatePortfolioCache(item.slug);
  revalidatePath("/");
  revalidatePath("/portfolio/");
  revalidatePath(`/portfolio/${item.slug}/`);

  return NextResponse.json({ item });
}

export async function DELETE(_request: Request, context: RouteContext) {
  const { response } = await requireAdmin();
  if (response) return response;

  const { id } = await context.params;
  await connectDB();
  const item = await PortfolioItem.findByIdAndDelete(id);
  if (!item) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await invalidatePortfolioCache(item.slug);
  revalidatePath("/");
  revalidatePath("/portfolio/");
  revalidatePath(`/portfolio/${item.slug}/`);

  return NextResponse.json({ ok: true });
}
