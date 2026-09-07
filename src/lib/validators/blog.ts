import { z } from "zod";
import { serviceSlugs } from "@/lib/data";

const relatedServiceSchema = z
  .string()
  .trim()
  .optional()
  .or(z.literal(""))
  .nullable()
  .refine(
    (value) =>
      !value ||
      (serviceSlugs as readonly string[]).includes(value),
    { message: "Unknown service slug" },
  );

export const blogPayloadSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(200),
  slug: z.string().trim().max(200).optional(),
  excerpt: z.string().trim().min(1, "Excerpt is required").max(500),
  body: z.string().trim().min(1, "Body is required").max(100000),
  category: z.string().trim().max(100).optional(),
  relatedService: relatedServiceSchema,
  ogImage: z.string().trim().max(2000).optional(),
  metaTitle: z.string().trim().max(200).optional(),
  metaDescription: z.string().trim().max(500).optional(),
  keywords: z.string().trim().max(300).optional(),
  publishedAt: z.string().trim().max(40).optional(),
  status: z.enum(["draft", "published"]).optional(),
});

export type BlogPayload = z.infer<typeof blogPayloadSchema>;

export function parseBlogPayload(body: unknown) {
  return blogPayloadSchema.safeParse(body);
}
