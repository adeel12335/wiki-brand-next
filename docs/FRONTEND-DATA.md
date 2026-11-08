# Frontend data access (kept after the frontend wipe)

The public site UI (`src/app/(site)`, `src/components` except `admin/` and `seo/`, all site CSS,
and the static content files in `src/lib/data`) was removed on 2026-11-07 for the Figma redesign.
The admin panel, API routes, database models and data helpers below are untouched.
Old UI is recoverable from git (`git show HEAD:<path>`).

## Blog — `src/lib/blog.ts`

Source: MongoDB `BlogPost` (status `published`), managed at `/admin/blog`.
Falls back to the static seed `src/lib/data/blog-posts.ts` when the DB is not configured.
Results are cached (Redis + in-memory); the admin API calls `revalidatePath` on save.

| Function | Returns | Use on |
|---|---|---|
| `getAllBlogPosts()` | `BlogPost[]` newest first | Home Insights, Author page, sitemap/feed |
| `getBlogPostsPage(page)` | `{ posts, totalPages, page }` (6 per page, `BLOG_PAGE_SIZE`) | `/blog`, `/blog/page/[page]` |
| `getBlogPostBySlug(slug)` | `BlogPost \| null` | `/blog/[slug]` (call `notFound()` on null) |
| `getRelatedBlogPosts(slug, 3)` | `BlogPost[]` | Related guides row |
| `formatBlogDate(iso)` | display date string | cards, article meta |

`BlogPost` (`src/types/index.ts`): `slug, title, metaTitle, metaDescription, keywords, excerpt,
category, publishedAt, modifiedAt, readingMinutes, ogImage, relatedService?, authorSlug?, body (HTML), wordCount?`

Authors: `src/lib/data/authors.ts` → `getAuthor(slug)`, `getAllAuthors()` (name, role, bio, slug).

Old page pattern:

```tsx
export const revalidate = 60;
export async function generateStaticParams() {
  const posts = await getAllBlogPosts();
  return posts.map((p) => ({ slug: p.slug }));
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();
  const related = await getRelatedBlogPosts(post.slug, 3);
  const author = getAuthor(post.authorSlug);
  // render post.body with dangerouslySetInnerHTML
}
```

## Portfolio — `src/lib/portfolio.ts`

Source: MongoDB `PortfolioItem` (status `published`, ordered by `sortOrder`), managed at `/admin/portfolio`.
Falls back to `src/lib/data/portfolio-fallback.json` when the DB is not configured.

| Function | Returns | Use on |
|---|---|---|
| `getPublishedPortfolio()` | `PublicPortfolioItem[]` | `/portfolio`, Related cases |
| `getFeaturedPortfolio()` | items with `featuredOnHome` | Home portfolio slider |
| `getPortfolioBySlug(slug)` | item or `null` | `/portfolio/[slug]` |
| `isIndexablePortfolioItem(item)` | boolean | sitemap / noindex decision |

`PublicPortfolioItem`: `id, slug, title, category, summary, body (HTML), externalUrl, featuredOnHome,
imageUrl (Cloudinary), imageAlt, metaTitle, metaDescription, keywords, updatedAt, isFallback?`

Old pages used `revalidate = 60` (listing) and `3600` (single) with `generateStaticParams` from `getPublishedPortfolio()`.

## Other backend pieces still in place

- Contact form → `POST /api/contact` (zod-validated, reCAPTCHA via `src/lib/captcha`, saved as `ContactEnquiry`, emailed with Resend). Subjects allowed: service names from `src/lib/data/services.ts` plus the generic list in the route.
- Trustpilot summary → `src/lib/trustpilot.ts` (`getTrustpilotSummary()`).
- SEO → `src/lib/seo.ts` (`buildPageMetadata`, `articleNode`, `faqNode`, `itemListNode`, `seoId`), `src/components/seo/JsonLd.tsx`, `src/app/sitemap.ts`, `src/app/robots.ts`, `src/app/feed.xml/route.ts`.
- Site config/URLs → `src/lib/config.ts` (`url()`, `absUrl()`, `SITE_NAME`).
