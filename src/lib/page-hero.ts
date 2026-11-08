import { z } from "zod";
import { connectDB, isDbConfigured } from "@/lib/db/mongodb";
import { PageHero } from "@/lib/db/models";

export type HeroStyle = "default" | "split" | "background" | "simple";

export interface HeroImageValue {
  cloudinaryId?: string;
  url: string;
  alt?: string;
  width?: number;
  height?: number;
}

export interface PageHeroSettings {
  key: string;
  style: HeroStyle;
  eyebrow: string;
  title: string;
  highlight: string;
  lede: string;
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
  image: HeroImageValue | null;
  backgroundImage: HeroImageValue | null;
  backgroundImageMobile: HeroImageValue | null;
  overlay: number;
  updatedAt?: string;
}

const imageSchema = z
  .object({
    cloudinaryId: z.string().max(300).optional().default(""),
    url: z.string().trim().url().max(1000),
    alt: z.string().trim().max(200).optional().default(""),
    width: z.number().int().positive().max(10000).optional(),
    height: z.number().int().positive().max(10000).optional(),
  })
  .nullable();

const actionSchema = z.object({
  label: z.string().trim().max(60).default(""),
  href: z
    .string()
    .trim()
    .max(300)
    .refine((v) => v === "" || (v.startsWith("/") && !v.startsWith("//")) || v.startsWith("#") || /^https?:\/\//.test(v) || v.startsWith("mailto:") || v.startsWith("tel:"), {
      message: "Use a path like /contact/ or a full https:// link",
    })
    .default(""),
});

/** Payload accepted by PUT /api/page-heroes/[key]. */
export const pageHeroPayloadSchema = z
  .object({
    style: z.enum(["default", "split", "background", "simple"]),
    eyebrow: z.string().trim().max(80).default(""),
    title: z.string().trim().max(120).default(""),
    highlight: z.string().trim().max(120).default(""),
    lede: z.string().trim().max(600).default(""),
    primary: actionSchema.default({ label: "", href: "" }),
    secondary: actionSchema.default({ label: "", href: "" }),
    image: imageSchema.default(null),
    backgroundImage: imageSchema.default(null),
    backgroundImageMobile: imageSchema.default(null),
    overlay: z.number().min(0).max(95).default(75),
  })
  .superRefine((v, ctx) => {
    if (v.style !== "default" && !v.title) {
      ctx.addIssue({ code: "custom", path: ["title"], message: "Heading is required for a custom hero." });
    }
    if (v.style === "split" && !v.image) {
      ctx.addIssue({ code: "custom", path: ["image"], message: "Upload a side image for this style." });
    }
    if (v.style === "background" && !v.backgroundImage) {
      ctx.addIssue({ code: "custom", path: ["backgroundImage"], message: "Upload a background image for this style." });
    }
  });

export type PageHeroPayload = z.infer<typeof pageHeroPayloadSchema>;

function toSettings(doc: Record<string, unknown> | null): PageHeroSettings | null {
  if (!doc) return null;
  const d = doc as Partial<PageHeroSettings> & { updatedAt?: Date | string };
  return {
    key: String(d.key ?? ""),
    style: (d.style as HeroStyle) ?? "default",
    eyebrow: d.eyebrow ?? "",
    title: d.title ?? "",
    highlight: d.highlight ?? "",
    lede: d.lede ?? "",
    primary: { label: d.primary?.label ?? "", href: d.primary?.href ?? "" },
    secondary: { label: d.secondary?.label ?? "", href: d.secondary?.href ?? "" },
    image: d.image?.url ? { ...d.image } : null,
    backgroundImage: d.backgroundImage?.url ? { ...d.backgroundImage } : null,
    backgroundImageMobile: d.backgroundImageMobile?.url ? { ...d.backgroundImageMobile } : null,
    overlay: typeof d.overlay === "number" ? d.overlay : 75,
    updatedAt: d.updatedAt ? new Date(d.updatedAt).toISOString() : undefined,
  };
}

/** Saved hero settings for one page, or null (no DB, nothing saved, or DB unreachable → designed hero). */
export async function getPageHero(key: string): Promise<PageHeroSettings | null> {
  if (!isDbConfigured()) return null;
  try {
    await connectDB();
    const doc = await PageHero.findOne({ key }).lean();
    return toSettings(doc as Record<string, unknown> | null);
  } catch {
    return null;
  }
}

/** All saved hero settings, keyed by page key (admin list). */
export async function getAllPageHeroes(): Promise<Record<string, PageHeroSettings>> {
  if (!isDbConfigured()) return {};
  await connectDB();
  const docs = await PageHero.find({}).lean();
  const out: Record<string, PageHeroSettings> = {};
  for (const doc of docs) {
    const s = toSettings(doc as Record<string, unknown>);
    if (s) out[s.key] = s;
  }
  return out;
}
