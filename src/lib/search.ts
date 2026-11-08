import { getAllBlogPosts } from "@/lib/blog";
import { getPublishedPortfolio } from "@/lib/portfolio";
import { sitemapContent } from "@/content/sitemap";
import { serviceDetails, servicesContent } from "@/content/services";
import { faqContent } from "@/content/faq";

export type SearchKind = "Page" | "Service" | "Guide" | "Portfolio" | "FAQ";

export interface SearchResult {
  kind: SearchKind;
  title: string;
  href: string;
  excerpt: string;
  score: number;
}

interface Doc {
  kind: SearchKind;
  title: string;
  href: string;
  text: string;
}

const STOP = new Set(["a", "an", "the", "and", "or", "of", "to", "for", "in", "on", "my", "is", "do", "i", "how", "what", "can"]);

function terms(q: string): string[] {
  return q
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, " ")
    .split(/\s+/)
    .filter((t) => t.length > 1 && !STOP.has(t));
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, " ").replace(/&[a-z#0-9]+;/gi, " ").replace(/\s+/g, " ").trim();
}

/** Short excerpt around the first matching term. */
function excerptFor(text: string, words: string[], fallback: string): string {
  const lower = text.toLowerCase();
  const hit = words.map((w) => lower.indexOf(w)).filter((i) => i >= 0).sort((a, b) => a - b)[0];
  if (hit === undefined) return fallback.slice(0, 180);
  const start = Math.max(0, hit - 70);
  const slice = text.slice(start, start + 200).trim();
  return `${start > 0 ? "…" : ""}${slice}${start + 200 < text.length ? "…" : ""}`;
}

async function buildIndex(): Promise<Doc[]> {
  const docs: Doc[] = [];

  for (const group of sitemapContent.groups) {
    for (const link of group.links) {
      if (link.href.startsWith("/services/")) continue; // services indexed with full copy below
      docs.push({ kind: "Page", title: link.label, href: link.href, text: `${link.label} ${group.title}` });
    }
  }

  for (const s of serviceDetails) {
    const card = servicesContent.all.cards[s.slug];
    docs.push({
      kind: "Service",
      title: card?.title ?? s.name,
      href: `/services/${s.slug}/`,
      text: [s.name, card?.copy, s.meta.description, s.meta.keywords, s.hero.lede, s.overview.lead, s.overview.body, ...s.faqs.map((f) => `${f.q} ${f.a}`)]
        .filter(Boolean)
        .join(" "),
    });
  }

  for (const group of faqContent.groups) {
    for (const item of group.items) {
      docs.push({ kind: "FAQ", title: item.q, href: `/faq/#${group.id}`, text: `${item.q} ${item.a}` });
    }
  }

  const [posts, portfolio] = await Promise.all([getAllBlogPosts(), getPublishedPortfolio()]);
  for (const p of posts) {
    docs.push({ kind: "Guide", title: p.title, href: `/blog/${p.slug}/`, text: `${p.title} ${p.category} ${p.excerpt} ${p.keywords} ${stripHtml(p.body)}` });
  }
  for (const item of portfolio) {
    docs.push({ kind: "Portfolio", title: item.title, href: `/portfolio/${item.slug}/`, text: `${item.title} ${item.category} ${item.summary}` });
  }
  return docs;
}

/** Simple ranked full-text search across pages, services, FAQs, blog posts and portfolio items. */
export async function searchSite(query: string, limit = 40): Promise<SearchResult[]> {
  const words = terms(query);
  if (!words.length) return [];
  const docs = await buildIndex();
  const results: SearchResult[] = [];
  for (const d of docs) {
    const title = d.title.toLowerCase();
    const text = d.text.toLowerCase();
    let score = 0;
    let matched = 0;
    for (const w of words) {
      const inTitle = title.includes(w);
      const count = text.split(w).length - 1;
      if (inTitle || count) matched++;
      score += (inTitle ? 10 : 0) + Math.min(count, 8);
    }
    if (!matched) continue;
    score *= matched / words.length; // favour docs matching every term
    if (title.includes(query.toLowerCase().trim())) score += 15;
    results.push({ kind: d.kind, title: d.title, href: d.href, excerpt: excerptFor(d.text, words, d.text), score });
  }
  return results.sort((a, b) => b.score - a.score).slice(0, limit);
}
