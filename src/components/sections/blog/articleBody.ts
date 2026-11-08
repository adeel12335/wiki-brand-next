import { slugifyTopic } from "./utils";

export interface TocItem {
  id: string;
  label: string;
}

function stripTags(html: string): string {
  return html
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/&#39;|&rsquo;|&lsquo;/g, "’")
    .replace(/&quot;|&ldquo;|&rdquo;/g, "\"")
    .trim();
}

/** Adds stable ids to every <h2> of the article HTML and returns the "On this page" list. */
export function withHeadingIds(html: string): { html: string; toc: TocItem[] } {
  const toc: TocItem[] = [];
  const used = new Set<string>();
  const out = html.replace(/<h2(\s[^>]*)?>([\s\S]*?)<\/h2>/gi, (match, attrs: string | undefined, inner: string) => {
    const label = stripTags(inner);
    if (!label) return match;
    const existing = attrs?.match(/\sid=["']([^"']+)["']/i)?.[1];
    let id = existing ?? (slugifyTopic(label) || `section-${toc.length + 1}`);
    if (!existing) {
      let n = 2;
      const base = id;
      while (used.has(id)) id = `${base}-${n++}`;
    }
    used.add(id);
    toc.push({ id, label });
    return existing ? match : `<h2${attrs ?? ""} id="${id}">${inner}</h2>`;
  });
  return { html: out, toc };
}
