# Wikipedia Studio — Next.js

Marketing website for **The Wikipedia Studio**, migrated from PHP to Next.js.

## Quick start

```bash
npm install
cp .env.example .env.local
npm run dev 
```

Open [http://localhost:3000](http://localhost:3000)

## Stack

- **Next.js 16** (App Router, TypeScript)
- **MongoDB** — portfolio + admin (Phase 3)
- **Cloudinary** — images (Phase 3)
- **Upstash Redis** — cache (Phase 3)
- **NextAuth** — admin auth (Phase 4)
- **Resend** — contact emails (Phase 5)

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run sync-data` | Re-export content from `legacy-php/` |

## Project structure

```
src/
  app/           Pages (App Router)
  components/    UI, layout, SEO
  lib/
    data/        Static content (JSON from legacy PHP)
    db/          MongoDB models
    cache/       Redis helpers
    seo.ts       Metadata + JSON-LD
legacy-php/      Original PHP site (reference)
MIGRATION.md     Full migration plan + status
```

## Environment

See `.env.example` for all variables. **Phase 1 works without any credentials** — only the home page needs env vars for later phases.

## Migration status

See [MIGRATION.md](./MIGRATION.md) for the full plan.

- [x] Phase 1: Scaffold, layout, home page, SEO, data export
- [ ] Phase 2: All static pages (about, services, FAQ, etc.)
- [ ] Phase 3: Portfolio (MongoDB + ISR + Cloudinary)
- [ ] Phase 4: Admin panel
- [ ] Phase 5: Contact form + Resend
- [ ] Phase 6: Vercel deploy
