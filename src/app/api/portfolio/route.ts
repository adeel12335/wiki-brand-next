import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin-guard";
import { connectDB } from "@/lib/db/mongodb";
import { PortfolioItem } from "@/lib/db/models";
import { invalidatePortfolioCache } from "@/lib/portfolio";
import { parsePortfolioPayload } from "@/lib/validators/portfolio";
import { slugify } from "@/lib/utils";

export async function GET() {
  const { response } = await requireAdmin();
  if (response) return response;

  await connectDB();
  const items = await PortfolioItem.find().sort({ sortOrder: 1, createdAt: 1 });

  return NextResponse.json({ items });
}

export async function POST(request: Request) {
  const { response } = await requireAdmin();
  if (response) return response;

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

  const slug = slugify(data.slug || data.title || "item");
  const existing = await PortfolioItem.findOne({ slug });
  if (existing) {
    return NextResponse.json({ error: "Slug already exists" }, { status: 400 });
  }

  const maxOrder = await PortfolioItem.findOne().sort({ sortOrder: -1 }).lean();
  const sortOrder = (maxOrder?.sortOrder ?? -1) + 1;

  const item = await PortfolioItem.create({
    slug,
    title: data.title,
    category: data.category ?? "",
    summary: data.summary,
    body: data.body ?? "",
    externalUrl: data.externalUrl || null,
    featuredOnHome: Boolean(data.featuredOnHome),
    image: data.image ?? null,
    seo: data.seo ?? {},
    status: data.status === "published" ? "published" : "draft",
    sortOrder,
  });

  await invalidatePortfolioCache(slug);
  revalidatePath("/");
  revalidatePath("/portfolio/");
  revalidatePath(`/portfolio/${slug}/`);

  return NextResponse.json({ item });
}
