import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-guard";
import { connectDB } from "@/lib/db/mongodb";
import { ContactEnquiry } from "@/lib/db/models";

export async function GET() {
  const { response } = await requireAdmin();
  if (response) return response;

  await connectDB();
  const items = await ContactEnquiry.find()
    .sort({ createdAt: -1 })
    .limit(200)
    .lean();

  return NextResponse.json({ items });
}
