import { z } from "zod";

const optionalUrl = z
  .string()
  .trim()
  .url({ message: "Must be a valid URL" })
  .refine((value) => value.startsWith("https://"), {
    message: "Only HTTPS links are allowed",
  })
  .optional()
  .or(z.literal(""))
  .nullable();

const portfolioImageSchema = z
  .object({
    cloudinaryId: z.string().min(1).max(300),
    url: z.string().min(1).max(2000),
    alt: z.string().max(300).optional(),
    width: z.number().int().positive().optional(),
    height: z.number().int().positive().optional(),
  })
  .nullable()
  .optional();

export const portfolioPayloadSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(200),
  slug: z.string().trim().max(200).optional(),
  category: z.string().trim().max(100).optional(),
  summary: z.string().trim().min(1, "Description is required").max(2000),
  body: z.string().trim().max(10000).optional(),
  externalUrl: optionalUrl,
  featuredOnHome: z.boolean().optional(),
  status: z.enum(["draft", "published"]).optional(),
  image: portfolioImageSchema,
  seo: z
    .object({
      metaTitle: z.string().max(200).optional(),
      metaDescription: z.string().max(500).optional(),
      keywords: z.string().max(300).optional(),
    })
    .optional(),
});

export type PortfolioPayload = z.infer<typeof portfolioPayloadSchema>;

export function parsePortfolioPayload(body: unknown) {
  return portfolioPayloadSchema.safeParse(body);
}
