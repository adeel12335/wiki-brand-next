import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin-guard";
import { connectDB } from "@/lib/db/mongodb";
import { PageHero } from "@/lib/db/models";
import { getEditablePage } from "@/config/page-heroes";
import { getPageHero, pageHeroPayloadSchema } from "@/lib/page-hero";

type RouteContext = { params: Promise<{ key: string }> };

export async function GET(_request: Request, context: RouteContext) {
  const { response } = await requireAdmin();
  if (response) return response;
  const { key } = await context.params;
  const page = getEditablePage(key);
  if (!page) return NextResponse.json({ error: "Unknown page" }, { status: 404 });
  const hero = await getPageHero(key);
  return NextResponse.json({ page, hero });
}

export async function PUT(request: Request, context: RouteContext) {
  const { response } = await requireAdmin();
  if (response) return response;
  const { key } = await context.params;
  const page = getEditablePage(key);
  if (!page) return NextResponse.json({ error: "Unknown page" }, { status: 404 });

  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  // Background-only pages always keep their designed hero, so only the background fields matter.
  const parsed = pageHeroPayloadSchema.safeParse(page.mode === "background" && body ? { ...body, style: "default" } : body);
  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    const first = Object.values(fieldErrors).flat()[0];
    return NextResponse.json({ error: first ?? "Invalid input", details: fieldErrors }, { status: 400 });
  }

  const data = parsed.data;
  // Pages whose hero holds a form / quiz / tabs only allow a background image.
  const update =
    page.mode === "background"
      ? { key, style: "default" as const, backgroundImage: data.backgroundImage, backgroundImageMobile: data.backgroundImageMobile, overlay: data.overlay }
      : { key, ...data };

  await connectDB();
  await PageHero.findOneAndUpdate({ key }, { $set: update }, { upsert: true, new: true, runValidators: true });
  revalidatePath(page.path);
  return NextResponse.json({ hero: await getPageHero(key) });
}

/** Reset: remove the override so the designed hero shows again. */
export async function DELETE(_request: Request, context: RouteContext) {
  const { response } = await requireAdmin();
  if (response) return response;
  const { key } = await context.params;
  const page = getEditablePage(key);
  if (!page) return NextResponse.json({ error: "Unknown page" }, { status: 404 });
  await connectDB();
  await PageHero.deleteOne({ key });
  revalidatePath(page.path);
  return NextResponse.json({ ok: true });
}
