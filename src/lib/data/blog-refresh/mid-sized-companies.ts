/**
 * Refresh payload for /blog/how-mid-sized-companies-get-a-wikipedia-page/
 * Applied to Mongo + used for FAQPage JSON-LD on the post page.
 */
export const midSizedCompaniesFaqs = [
  {
    q: "How does a mid-sized company get a Wikipedia entry?",
    a: "Size is not the test — independent coverage is. Under WP:NCORP the company needs significant coverage in reliable, independent secondary sources. Run a source audit first, then draft neutrally and submit with paid-editing disclosure if applicable.",
  },
  {
    q: "Does revenue or headcount make a company notable?",
    a: "No. Wikipedia does not use revenue, employee count, or office locations as notability shortcuts. Reviewers look for independent, in-depth coverage that is not controlled by the company.",
  },
  {
    q: "What are the most common reasons company Wikipedia pages get deleted?",
    a: "Thin or non-independent sourcing, promotional tone, over-reliance on the company website and press releases, undisclosed paid editing, and coverage that was only a short launch burst without sustained significance.",
  },
  {
    q: "Is paid Wikipedia editing allowed for companies?",
    a: "Paid editing is allowed when disclosed under the Wikimedia Terms of Use. Hiding the paid relationship is a common path to deletion and account scrutiny.",
  },
  {
    q: "Should we wait if coverage is mostly funding news?",
    a: "Usually yes. Routine funding announcements and directory listings rarely meet the independent, significant-coverage bar. Earn deeper editorial coverage first, then revisit a draft.",
  },
  {
    q: "What should we do after a page is published?",
    a: "Watch for vandalism, unsourced additions, and outdated figures. Monitoring and occasional sourced updates keep the article stable; nobody can lock a company page against volunteer edits.",
  },
] as const;

export const midSizedCompaniesMeta = {
  metaTitle: "How Mid-Sized Companies Get a Wikipedia Page (2026)",
  title: "How Mid-Sized Companies Get a Wikipedia Page, and Why It Gets Deleted",
  excerpt:
    "What WP:NCORP requires for mid-sized companies in 2026, a practical source checklist, why pages get deleted, and how disclosed editing plus monitoring keep an article stable.",
};

/** HTML appended when refreshing the live post (keeps existing sections, adds 2026 + FAQ). */
export const midSizedCompaniesRefreshHtml = `
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
