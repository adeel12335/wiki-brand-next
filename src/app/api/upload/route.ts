import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-guard";
import { configureCloudinary, cloudinary } from "@/lib/cloudinary";

const MAX_BYTES = 5 * 1024 * 1024;
const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

export async function POST(request: Request) {
  const { response } = await requireAdmin();
  if (response) return response;

  if (!configureCloudinary()) {
    return NextResponse.json(
      { error: "Cloudinary is not configured" },
      { status: 503 },
    );
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  if (!ALLOWED_TYPES.has(file.type)) {
    return NextResponse.json(
      { error: "Only JPEG, PNG, WebP, and GIF images are allowed" },
      { status: 400 },
    );
  }

  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { error: "Image must be 5 MB or smaller" },
      { status: 400 },
    );
  }

  const bytes = Buffer.from(await file.arrayBuffer());

  const result = await new Promise<{
    public_id: string;
    secure_url: string;
    width: number;
    height: number;
  }>((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder: "portfolio",
          resource_type: "image",
          transformation: [{ fetch_format: "auto", quality: "auto" }],
        },
        (error, uploadResult) => {
          if (error || !uploadResult) {
            reject(error ?? new Error("Upload failed"));
            return;
          }
          resolve({
            public_id: uploadResult.public_id,
            secure_url: uploadResult.secure_url,
            width: uploadResult.width,
            height: uploadResult.height,
          });
        },
      )
      .end(bytes);
  });

  return NextResponse.json({
    image: {
      cloudinaryId: result.public_id,
      url: result.secure_url,
      alt: "",
      width: result.width,
      height: result.height,
    },
  });
}
