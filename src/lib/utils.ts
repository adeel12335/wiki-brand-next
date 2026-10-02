export function slugify(value: string): string {
  const normalized = value
    .trim()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return normalized || "item";
}

const TITLE_CASE_MINOR = new Set([
  "a", "an", "and", "as", "at", "but", "by", "for", "in", "nor",
  "of", "on", "or", "the", "to", "vs", "with",
]);

/**
 * Title-cases heading copy ("what a page involves" → "What a Page Involves").
 * Minor words stay lowercase unless they open or close the heading; words that
 * already carry capitals (Wikipedia, GNG) are left alone. Safe on headings that
 * contain inline tags such as <span> — only the text between tags is changed.
 */
export function titleCase(html: string): string {
  // Entities (&amp; &#39; …) are matched as whole tokens and left untouched.
  const TOKEN = /&#?\w+;|[A-Za-z][\w'’-]*/g;
  const isEntity = (token: string) => token.startsWith("&");
  const parts = html.split(/(<[^>]+>)/);
  const total = parts
    .filter((part) => !part.startsWith("<"))
    .reduce(
      (sum, part) => sum + (part.match(TOKEN) ?? []).filter((t) => !isEntity(t)).length,
      0,
    );
  let index = 0;

  return parts
    .map((part) => {
      if (part.startsWith("<")) return part;
      return part.replace(TOKEN, (word, offset: number) => {
        if (isEntity(word)) return word;
        // Letters glued to a preceding entity ("Let&apos;s") continue that word.
        if (/&#?\w+;$/.test(part.slice(0, offset))) return word;
        const position = index++;
        if (/[A-Z]/.test(word)) return word;
        const edge = position === 0 || position === total - 1;
        if (!edge && TITLE_CASE_MINOR.has(word)) return word;
        return word.charAt(0).toUpperCase() + word.slice(1);
      });
    })
    .join("");
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Hero heading HTML for a portfolio item. The CMS title is escaped because
 *  the result is rendered with dangerouslySetInnerHTML (HtmlHeading). */
export function portfolioHeading(title: string): string {
  const safeTitle = escapeHtml(title);
  if (title.toLowerCase().includes("wikipedia")) {
    return safeTitle;
  }
  return `${safeTitle} <span>Wikipedia</span> page`;
}

export function portfolioMetaTitle(
  title: string,
  metaTitle?: string | null,
): string {
  return (metaTitle?.trim() || `${title} Portfolio`)
    .replace(/\s*(?:\||—|-)\s*The Wikipedia Studio$/i, "")
    .trim();
}

export function portfolioMetaDescription(
  summary: string,
  metaDescription?: string | null,
): string {
  let description = (metaDescription ?? summary).trim();

  const additions = [
    "Wikipedia engagement notes from The Wikipedia Studio.",
    "Sourcing, scope, and what the coverage would not support.",
  ];

  for (const addition of additions) {
    if (description.length >= 120) break;
    description = `${description} ${addition}`;
  }

  return description;
}
