import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(request: Request) {
  const secret = request.headers.get("x-revalidate-secret");
  if (!secret || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as { slug?: string };
  revalidatePath("/portfolio/");
  if (body.slug) {
    revalidatePath(`/portfolio/${body.slug}/`);
  }

  return NextResponse.json({ revalidated: true });
}
