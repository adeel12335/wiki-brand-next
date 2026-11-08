import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-guard";
import { getAllPageHeroes } from "@/lib/page-hero";

/** Admin: saved hero settings for every page (pages without a document use their designed hero). */
export async function GET() {
  const { response } = await requireAdmin();
  if (response) return response;
  const heroes = await getAllPageHeroes();
  return NextResponse.json({ heroes });
}
