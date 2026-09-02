/**
 * Shared scrape logic for thewikistudio.com portfolio page.
 */
export const SOURCE_URL = "https://thewikistudio.com/portfolios/";

export function decodeHtml(text) {
  return text
    .replace(/&#8211;/g, "–")
    .replace(/&#8217;/g, "'")
    .replace(/&#039;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function scrapeWpPortfolio() {
  const html = await fetch(SOURCE_URL).then((r) => {
    if (!r.ok) throw new Error(`Failed to fetch ${SOURCE_URL}: ${r.status}`);
    return r.text();
  });

  const cardPattern =
    /<div class="team-item style-two">[\s\S]*?<img[^>]+src="([^"]+)"[^>]*>[\s\S]*?<h5><a href="([^"]+)"[^>]*>([\s\S]*?)<\/a><\/h5>[\s\S]*?<span class="designation">([\s\S]*?)<\/span>/gi;

  const items = [];
  let match;

  while ((match = cardPattern.exec(html)) !== null) {
    const title = decodeHtml(match[3]);
    if (!title) continue;
    items.push({
      title,
      slug: slugify(title),
      summary: decodeHtml(match[4]),
      body: decodeHtml(match[4]),
      externalUrl: match[2].trim(),
      imageUrl: match[1].trim(),
      imageAlt: title,
    });
  }

  return items;
}
