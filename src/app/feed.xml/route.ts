import { getAllBlogPosts } from "@/lib/blog";
import {
  PRODUCTION_SITE_URL,
  SITE_EMAIL,
  SITE_NAME,
  SITE_TAGLINE,
  getSiteUrl,
} from "@/lib/config";

export const revalidate = 3600;

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const base = getSiteUrl() || PRODUCTION_SITE_URL;
  const posts = getAllBlogPosts();
  const lastBuild = posts[0]?.modifiedAt ?? new Date().toISOString().slice(0, 10);

  const items = posts
    .map((post) => {
      const link = `${base}/blog/${post.slug}/`;
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${escapeXml(link)}</link>
      <guid isPermaLink="true">${escapeXml(link)}</guid>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
      <description>${escapeXml(post.excerpt)}</description>
      <category>${escapeXml(post.category)}</category>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_NAME)} Blog</title>
    <link>${escapeXml(`${base}/blog/`)}</link>
    <description>${escapeXml(SITE_TAGLINE)}</description>
    <language>en-us</language>
    <managingEditor>${escapeXml(SITE_EMAIL)} (${escapeXml(SITE_NAME)})</managingEditor>
    <webMaster>${escapeXml(SITE_EMAIL)} (${escapeXml(SITE_NAME)})</webMaster>
    <lastBuildDate>${new Date(lastBuild).toUTCString()}</lastBuildDate>
    <atom:link href="${escapeXml(`${base}/feed.xml`)}" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
