import dns from "node:dns";
import { MongoClient } from "mongodb";

dns.setServers(["8.8.8.8", "1.1.1.1"]);

const MARKER = "2026 checklist before you commission a draft";

const meta = {
  title: "How Mid-Sized Companies Get a Wikipedia Page, and Why It Gets Deleted",
  metaTitle: "How Mid-Sized Companies Get a Wikipedia Page (2026)",
  excerpt:
    "What WP:NCORP requires for mid-sized companies in 2026, a practical source checklist, why pages get deleted, and how disclosed editing plus monitoring keep an article stable.",
};

const refreshHtml = `
<h2>2026 checklist before you commission a draft</h2>
<p>Wikipedia’s organisational notability guidance still centres on significant coverage in reliable, independent secondary sources — not on company size. Before anyone writes, tick this list:</p>
<ul>
<li><strong>Three or more independent pieces</strong> that discuss the company in depth (not a one-line mention in someone else’s story).</li>
<li><strong>Editorial outlets</strong> with a clear corrections culture — not sponsored “partner content” or wire reprints of your release.</li>
<li><strong>Secondary analysis</strong> — the article should do more than reprint what your spokesperson said.</li>
<li><strong>No reliance on your own site</strong> as the backbone of notability; primary pages can support basic facts later, not the notability test itself.</li>
<li><strong>Sustained attention</strong> — a single launch week of coverage, with silence afterwards, is a common deletion risk.</li>
</ul>
<p>If the checklist fails, the durable move is to earn real coverage first. For company-specific framing, see our guide to <a href="/wikipedia-page-for-companies/">Wikipedia pages for companies</a> and published <a href="/wikipedia-page-cost/">pricing</a>. After publication, plan for <a href="/blog/wikipedia-page-monitoring-why-it-matters/">page monitoring</a> so unsourced edits do not sit unnoticed.</p>

<h2>FAQ: mid-sized companies and Wikipedia</h2>
<h3>How does a mid-sized company get a Wikipedia entry?</h3>
<p>Confirm independent significant coverage under WP:NCORP, draft neutrally with citations, disclose paid editing if used, and expect volunteer review — not a paid approval.</p>
<h3>Does revenue or headcount make a company notable?</h3>
<p>No. Those facts may appear in a sourced article later; they do not replace independent coverage.</p>
<h3>What are the most common reasons company Wikipedia pages get deleted?</h3>
<p>Promotional tone, primary-source padding, undisclosed paid editing, and coverage that never met the independent, in-depth standard.</p>
<h3>Is paid Wikipedia editing allowed for companies?</h3>
<p>Yes when disclosed. Hidden paid editing is actively investigated and often fatal to the article.</p>
<h3>Should we wait if coverage is mostly funding news?</h3>
<p>Usually. Routine announcements without independent analysis rarely clear WP:NCORP.</p>
<h3>What should we do after a page is published?</h3>
<p>Monitor edits, fix clear errors with sources, and avoid turning the article into a brochure. See <a href="/blog/wikipedia-page-monitoring-why-it-matters/">why monitoring matters</a>.</p>
`;

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI missing");

  const client = new MongoClient(uri);
  await client.connect();
  const col = client.db().collection("blogposts");
  const post = await col.findOne({
    slug: "how-mid-sized-companies-get-a-wikipedia-page",
  });
  if (!post) throw new Error("Post not found in Mongo");

  let body = String(post.body || "");
  if (!body.includes(MARKER)) {
    body = `${body.trim()}\n${refreshHtml.trim()}\n`;
  }

  // Also ensure monitoring / deletion posts link here when present in static — Mongo bodies may differ.
  const result = await col.updateOne(
    { _id: post._id },
    {
      $set: {
        body,
        title: meta.title,
        metaTitle: meta.metaTitle,
        excerpt: meta.excerpt,
        metaDescription: meta.excerpt,
        updatedAt: new Date(),
      },
    },
  );

  // Add inbound links from related Mongo posts when they exist.
  const linkHtml =
    ' For company cases, see also <a href="/blog/how-mid-sized-companies-get-a-wikipedia-page/">how mid-sized companies get a Wikipedia page</a>.';
  for (const slug of [
    "wikipedia-page-monitoring-why-it-matters",
    "why-wikipedia-pages-get-deleted",
    "how-to-improve-an-existing-wikipedia-page",
  ]) {
    const related = await col.findOne({ slug });
    if (!related) continue;
    const relatedBody = String(related.body || "");
    if (relatedBody.includes("how-mid-sized-companies-get-a-wikipedia-page")) continue;
    const needle = "wikipedia-page-monitoring-why-it-matters";
    let nextBody = relatedBody;
    if (slug === "wikipedia-page-monitoring-why-it-matters") {
      if (!relatedBody.includes("how-mid-sized-companies-get-a-wikipedia-page")) {
        nextBody = `${relatedBody.trim()}<p>${linkHtml.trim()}</p>\n`;
      }
    } else if (!relatedBody.includes("wikipedia-page-monitoring-why-it-matters")) {
      nextBody = `${relatedBody.trim()}<p>After publication, <a href="/blog/wikipedia-page-monitoring-why-it-matters/">Wikipedia page monitoring</a> catches vandalism and unsourced edits before they spread.${slug.includes("deleted") ? linkHtml : ""}</p>\n`;
    } else if (slug.includes("deleted") || slug.includes("improve")) {
      nextBody = `${relatedBody.trim()}<p>${linkHtml.trim()}</p>\n`;
    }
    if (nextBody !== relatedBody) {
      await col.updateOne(
        { _id: related._id },
        { $set: { body: nextBody, updatedAt: new Date() } },
      );
      console.log("linked from", slug);
    } else if (relatedBody.includes(needle)) {
      // still try append mid-sized if missing
      if (!relatedBody.includes("how-mid-sized-companies-get-a-wikipedia-page")) {
        await col.updateOne(
          { _id: related._id },
          {
            $set: {
              body: `${relatedBody.trim()}<p>${linkHtml.trim()}</p>\n`,
              updatedAt: new Date(),
            },
          },
        );
        console.log("appended mid-sized link on", slug);
      }
    }
  }

  console.log("midsized matched", result.matchedCount, "modified", result.modifiedCount);
  await client.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
