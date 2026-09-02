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
