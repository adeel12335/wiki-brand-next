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
  const WORD = /[A-Za-z][\w'’-]*/g;
  const parts = html.split(/(<[^>]+>)/);
  const total = parts
    .filter((part) => !part.startsWith("<"))
    .reduce((sum, part) => sum + (part.match(WORD)?.length ?? 0), 0);
  let index = 0;

  return parts
    .map((part) => {
      if (part.startsWith("<")) return part;
      return part.replace(WORD, (word) => {
        const position = index++;
        if (/[A-Z]/.test(word)) return word;
        const edge = position === 0 || position === total - 1;
        if (!edge && TITLE_CASE_MINOR.has(word)) return word;
        return word.charAt(0).toUpperCase() + word.slice(1);
      });
    })
    .join("");
}

export function portfolioHeading(title: string): string {
  if (title.toLowerCase().includes("wikipedia")) {
    return title;
  }
  return `${title} <span>Wikipedia</span> page`;
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
