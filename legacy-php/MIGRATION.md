# Wikipedia Studio — PHP → Next.js Migration

## Status

| Phase | Description | Status |
| --- | --- | --- |
| 1 | Foundation (scaffold, layout, static data) | **In progress** |
| 2 | Static pages (all marketing pages) | Pending |
| 3 | Portfolio (MongoDB + ISR + Cloudinary) | Pending |
| 4 | Admin panel (NextAuth + CRUD) | Pending |
| 5 | Contact API + email (Resend) | Pending |
| 6 | Deploy (Vercel) + DNS cutover | Pending |

## Stack

| Layer | Technology |
| --- | --- |
| Framework | Next.js 15 (App Router) + TypeScript |
| Styling | Ported CSS from `legacy-php/styles.css` |
| Database | MongoDB Atlas (portfolio, admin) |
| Images | Cloudinary |
| Cache | Upstash Redis |
| Auth | NextAuth.js v5 (admin) |
| Email | Resend |
| Hosting | Vercel |

## Rendering

| Route | Strategy |
| --- | --- |
| `/`, `/about-us`, `/services/*`, `/faq`, etc. | SSG |
| `/portfolio`, `/portfolio/[slug]` | ISR (revalidate: 3600s) |
| `/admin/*` | SSR (noindex) |
| `/api/*` | API Routes |

## Project layout

```
app/                  Next.js App Router pages
components/           React components (layout, sections, ui, seo)
lib/
  data/               Static content (services, faqs, testimonials)
  db/                 MongoDB models + connection
  cache/              Upstash Redis helpers
  seo.ts              Metadata + JSON-LD builders
  cloudinary.ts       Image upload helpers
public/assets/        Brand images (from legacy-php/assets)
legacy-php/           Original PHP site (reference + rollback)
scripts/              Seed, migrate, SEO gate checks
```

## Environment variables

Copy `.env.example` → `.env.local` and fill in:

```
NEXT_PUBLIC_SITE_URL=
MONGODB_URI=
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
NEXTAUTH_SECRET=
NEXTAUTH_URL=
RESEND_API_KEY=
CONTACT_TO=
REVALIDATE_SECRET=
```

## What you need to provide

1. **MongoDB Atlas** — connection string (`MONGODB_URI`)
2. **Upstash Redis** — REST URL + token (free tier)
3. **Cloudinary** — cloud name, API key, API secret
4. **Resend** — API key for contact form emails
5. **NEXTAUTH_SECRET** — run `openssl rand -base64 32`
6. **Production domain** — for `NEXT_PUBLIC_SITE_URL`

## URL parity

All public URLs match the PHP site (trailing slashes preserved via `trailingSlash: true`).

## Rollback

The full PHP site lives in `legacy-php/`. Point Apache/XAMPP back to that folder if needed.
