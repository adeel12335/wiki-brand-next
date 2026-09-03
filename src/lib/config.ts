export const SITE_NAME = "The Wikipedia Studio";
export const SITE_TAGLINE = "Professional Wikipedia Editorial Services";
export const SITE_EMAIL = "info@thewikipediastudio.com";
export const SITE_PHONE = "+1 (218) 305-9586";
export const SITE_PHONE_RAW = "+12183059586";
export const SITE_LOCALE = "en_GB";
export const SITE_LANG = "en-GB";
export const SITE_TWITTER = "@wikipediastudio";
export const PRODUCTION_SITE_URL = "https://thewikipediastudio.com";

export const SEO_DEFAULT_OG_IMAGE = "/assets/og/hero-orbital-globe.jpg";
export const SEO_DEFAULT_ROBOTS =
  "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

export const NAV_ITEMS = [
  { slug: "", label: "Home" },
  { slug: "about-us", label: "About Us" },
  { slug: "services", label: "Services" },
  { slug: "wikipedia-page-cost", label: "Pricing" },
  { slug: "our-process", label: "Our Process" },
  { slug: "portfolio", label: "Portfolio" },
  { slug: "blog", label: "Blog" },
  { slug: "faq", label: "FAQ" },
  { slug: "contact", label: "Contact" },
] as const;

export function getSiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");

  // Never ship localhost canonicals/OG/sitemap when NODE_ENV=production.
  if (
    configured &&
    !(
      process.env.NODE_ENV === "production" &&
      /localhost|127\.0\.0\.1/i.test(configured)
    )
  ) {
    return configured;
  }

  return process.env.NODE_ENV === "production"
    ? PRODUCTION_SITE_URL
    : "http://localhost:3000";
}

/** Root-relative URL with trailing slash (matches PHP canonical URLs). */
export function url(slug = ""): string {
  const clean = slug.replace(/^\/+|\/+$/g, "");
  return clean ? `/${clean}/` : "/";
}

export function absUrl(slug = ""): string {
  return `${getSiteUrl()}${url(slug)}`;
}

export function asset(path: string): string {
  return `/${path.replace(/^\/+/, "")}`;
}

export function assetUrl(path: string): string {
  return `${getSiteUrl()}${asset(path)}`;
}

export function metaTrim(text: string, limit = 160): string {
  const normalized = text.trim().replace(/\s+/g, " ");
  if (normalized.length <= limit) return normalized;
  const cut = normalized.slice(0, limit - 1);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > 0 ? cut.slice(0, lastSpace) : cut).replace(/[ ,.;:]+$/, "")}…`;
}

export function navIsActive(slug: string, currentSlug: string): boolean {
  const s = slug.replace(/^\/+|\/+$/g, "");
  const c = currentSlug.replace(/^\/+|\/+$/g, "");
  if (!s) return !c;
  return s === c || c.startsWith(`${s}/`);
}
