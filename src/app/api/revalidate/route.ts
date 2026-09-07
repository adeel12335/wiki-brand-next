import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { invalidateBlogCache } from "@/lib/blog";
import { invalidatePortfolioCache } from "@/lib/portfolio";

export async function POST(request: Request) {
  const secret = request.headers.get("x-revalidate-secret");
  if (!secret || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json().catch(() => ({}))) as {
    slug?: string;
    path?: string;
    type?: "portfolio" | "blog";
  };

  if (body.type === "blog") {
    await invalidateBlogCache(body.slug);
  } else {
    await invalidatePortfolioCache(body.slug);
  }

  const paths = new Set<string>([
    "/",
    "/portfolio/",
    "/sitemap.xml",
    "/blog/",
    "/feed.xml",
    "/resources/",
    "/sitemap/",
  ]);
  if (body.path) paths.add(body.path);
  if (body.slug && body.type === "blog") paths.add(`/blog/${body.slug}/`);
  if (body.slug && body.type !== "blog") paths.add(`/portfolio/${body.slug}/`);

  for (const path of paths) {
    revalidatePath(path);
  }

  return NextResponse.json({
    revalidated: true,
    paths: [...paths],
  });
}
