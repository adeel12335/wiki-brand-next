# Frontend guide (redesign, Nov 2026)

Source of truth for design: Figma file `iSq9ipIUQpxrSYjTcM9XCI`
- Page **Final — Desktop** (`82:1212`) – one frame per page, 1440 wide.
- Page **Final — Mobile** (`191:140`) – same pages at 390 wide, named "<Page> — Mobile".
- Page **Foundations** (`0:1`) – components + "Shared Modules — Decision" board.

Next.js 16 (App Router): `params` / `searchParams` are **Promises** (`const { slug } = await params`).
Read `node_modules/next/dist/docs/` before using unfamiliar APIs.

## Folder structure

```
src/
  app/(site)/            public routes (layout = TrustBar + Header + main + Footer, AOS, Open Sans)
  components/
    module/<Name>/       shared modules (index.tsx + client parts)
    hero/<Name>/         hero variants (+ HeroContent.tsx shared copy block)
    sections/<page>/     page-specific sections that are NOT reused
    ui/                  primitives: Icon, Logo, Eyebrow, CheckRow
    providers/           AosProvider
    seo/ admin/          untouched
  config/navigation.ts   header / mega menu / footer links
  content/<page>.ts      ALL page copy lives here (client will replace text later)
  lib/                   backend helpers (blog.ts, portfolio.ts, seo.ts, config.ts, cn.ts, image.ts)
  styles/globals.css     Tailwind 4 + design tokens (@theme)
```

## Rules

- **Tailwind only** (tokens: `bg-ink`, `bg-ink-raised`, `bg-panel`, `bg-mist`, `bg-cream`, `text-gold`, `text-gold-dark`,
  `text-gold-eyebrow`, `text-heading`, `text-body`, `text-on-dark`, `text-on-dark-muted`, `text-on-gold`, `rounded-card`,
  `rounded-panel`, `rounded-btn`, `shadow-card`, `shadow-gold`). Utility classes: `.shell` (1200 container, 20px gutters),
  `.measure` (900px max on desktop, 100% mobile), `.section` (vertical rhythm), `.h1`, `.h2`, `.lede`.
- **Type scale = Figma** (do not invent sizes): `.h1-home` 68/38 ExtraBold (Home only); `.h1` inner hero 52 Bold desktop / 34 mobile,
  line-height 115%, tracking -1.5% — when a page's Figma H1 differs (e.g. 44, 46, 50, 54, 56) pass
  `titleClassName="lg:text-[46px]"` to the hero (mobile from Figma: 30 or 34); `.h2` 44/30 Bold; `.lede` 18/16 at 165%;
  body copy 15–17px at 160%; small labels 11–13px. Always read the font size from the Figma text node.
- Headings are 2 lines, second line gold → `SectionHeading` (`title` + `highlight`) or `HeroContent`.
  Every section heading has the globe Eyebrow above it (SectionHeading does this).
- Desktop hero text (heading, paragraph, jump links) max width 900px (`.measure`) except Home. Mobile = 100%.
- Hover on interactive things: colour changes; text never shifts position (no translate on text).
  Cards always render in Default state.
- Animations: add `data-aos="fade-up"` (optionally `data-aos-delay`) on blocks. Sliders: Swiper (`swiper/react`).
- Images: `next/image`. Remote/CMS URLs go through `safeImageSrc()` from `@/lib/image`.
  Export design images from Figma with `get_screenshot` (nodeId) and `curl` into `public/assets/redesign/<page>/`.
- Metadata: every page exports `metadata` via `buildPageMetadata()` from `@/lib/seo` and renders `<JsonLd page={pageMeta} />`.
  Reuse the old title/description/keywords from git: `git show "HEAD:src/app/(site)/<route>/page.tsx"`.
- Copy: take text from the Figma frame; put it in `src/content/<page>.ts`; components read from there.
- Do not edit `src/lib/*` backend files, `src/app/admin`, `src/app/api`.

## Shared modules (import, don't re-create)

| Import | Use |
|---|---|
| `Button`, `TextLink` from `@/components/module/Button` | variants `gold`, `navy`, `outline-dark`, `ghost`, `outline-light`; `arrow` prop |
| `SectionHeading` from `@/components/module/SectionHeading` | eyebrow, title, highlight, lede, align, tone |
| `ServiceCard`, `PortfolioCard`, `BlogCard` / `BlogRow` | cards |
| `FaqPanel`, `FaqList` from `@/components/module/Faq` | finalized FAQ (divider accordion) |
| `ContactSection`, `ContactForm` from `@/components/module/ContactForm` | "Get in Touch" section (pass `heading` to change eyebrow/title/highlight per page) |
| `Cta` from `@/components/module/Cta` | ink CTA band (props override copy) |
| `ArchiveBand` | slim band above Blog / Portfolio pages |
| `StepsTimeline`, `StatsStrip`, `Testimonials`, `TrustMarquee` | as named |
| `HeroImage` (layout split/background), `HeroWithoutImage`, `HeroSideContent` (+ `HeroSidePanel`), `HeroStats`, `HeroBgSlider` from `@/components/hero/*` | heroes |
| `Icon` (`@/components/ui/Icon`), `Eyebrow`, `CheckRow`, `Logo` | primitives |

Data: see `docs/FRONTEND-DATA.md` (blog + portfolio helpers).
