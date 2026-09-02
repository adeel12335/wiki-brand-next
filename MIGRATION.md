# Wikipedia Studio — PHP → Next.js Migration

## Status: Complete (pending your credentials)

| Phase | Description | Status |
| --- | --- | --- |
| 1 | Foundation (scaffold, layout, static data) | Done |
| 2 | All marketing pages | Done |
| 3 | Portfolio (MongoDB + ISR + Cloudinary) | Done |
| 4 | Admin panel (NextAuth + CRUD) | Done |
| 5 | Contact API + Resend email | Done |
| 6 | Deploy (Vercel) | Pending |

## Setup after adding credentials

```bash
# 1. Fill in .env.local (see below)
# 2. Create admin user
npm run create-admin admin YourSecurePassword123

# 3. Seed portfolio (optional — uses fallback data)
npm run seed-portfolio

# 4. Run dev server
npm run dev
```

## Environment variables (.env.local)

| Variable | Where to get it |
| --- | --- |
| `MONGODB_URI` | [MongoDB Atlas](https://www.mongodb.com/atlas) → Connect → Drivers |
| `UPSTASH_REDIS_REST_URL` + `TOKEN` | [Upstash](https://upstash.com) → Redis → REST API |
| `CLOUDINARY_*` | [Cloudinary](https://cloudinary.com) → Dashboard → API Keys |
| `RESEND_API_KEY` | [Resend](https://resend.com) → API Keys |
| `NEXTAUTH_SECRET` + `AUTH_SECRET` | Run: `openssl rand -base64 32` |
| `NEXT_PUBLIC_SITE_URL` | Your domain (or `http://localhost:3000` for dev) |
| `REVALIDATE_SECRET` | Any random string |

## URLs

| Page | URL |
| --- | --- |
| Home | `/` |
| Admin | `/admin/` |
| Portfolio admin | `/admin/portfolio/` |
| API contact | `/api/contact/` |

## Rollback

Original PHP site: `legacy-php/`
