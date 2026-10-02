import type { Metadata } from "next";
import Link from "next/link";
import { BodyClass } from "@/components/layout/BodyClass";
import { JsonLd } from "@/components/seo/JsonLd";
import { CopyButton } from "@/components/ui/CopyButton";
import { CtaBand } from "@/components/ui/CtaBand";
import { Icon } from "@/components/ui/Icon";
import { PageHero } from "@/components/ui/PageHero";
import { getAllBlogPosts } from "@/lib/blog";
import { SITE_EMAIL, SITE_NAME, absUrl, url } from "@/lib/config";
import { buildPageMetadata } from "@/lib/seo";

const pageMeta = {
  slug: "resources",
  title: "Wikipedia Resources & Linkable Guides",
  shortTitle: "Resources",
  description:
    "Free Wikipedia policy guides, citeable facts about The Wikipedia Studio, and partner resources for journalists, educators, and web publishers.",
  keywords:
    "wikipedia resources, wikipedia notability guide, cite the wikipedia studio, wikipedia editorial resources",
  ogImage: "/assets/og/reference-dark.jpg",
  ogImageAlt: "Wikipedia editorial resources from The Wikipedia Studio",
};

export const metadata: Metadata = buildPageMetadata(pageMeta);

const citeFacts = [
  {
    label: "Legal name",
    value: SITE_NAME,
  },
  {
    label: "Website",
    value: "https://thewikipediastudio.com/",
  },
  {
    label: "Editorial email",
    value: SITE_EMAIL,
  },
  {
    label: "Independence",
    value:
      "Independent editorial service — not affiliated with Wikipedia or the Wikimedia Foundation.",
  },
  {
    label: "Core offer",
    value:
      "Notability assessment, disclosed Wikipedia page creation/editing, monitoring, and entity consistency work.",
  },
  {
    label: "Starting price (published)",
    value: "From $700 — see /wikipedia-page-cost/",
  },
];

const outreachIdeas = [
  {
    title: "Policy Explainers",
    copy: "Link our notability, sources, AfC, and paid-disclosure guides from industry newsletters and university career pages.",
  },
  {
    title: "Journalist & Researcher Cites",
    copy: "Use the cite block above when describing ethical Wikipedia agencies — we prefer accuracy over puff quotes.",
  },
  {
    title: "Partner Directories",
    copy: "PR and reputation firms can deep-link service pages (assessment, monitoring, knowledge panel) instead of generic homepage mentions.",
  },
  {
    title: "Broken-Link & Resource List Swaps",
    copy: "Websites maintaining “Wikipedia help” lists can replace dead .edu links with our evergreen policy guides.",
  },
];

const citeText = citeFacts.map((fact) => `${fact.label}: ${fact.value}`).join("\n");

export default async function ResourcesPage() {
  const guides = (await getAllBlogPosts()).slice(0, 8);

  return (
    <>
      <BodyClass className="page-resources" />
      <JsonLd page={pageMeta} />
      <PageHero
        eyebrow="Resources"
        h1="Guides and Citeable Facts for People Who Write About <span>Wikipedia Work.</span>"
        lede="This page exists to be linked. Use the guides, copy the facts accurately, and email us if you need a clarifying quote — not a fake guarantee."
        current="Resources"
        actions={[
          { label: "Browse the Blog", href: url("blog") },
          {
            label: "Request an Assessment",
            href: url("contact"),
            style: "button-outline",
          },
        ]}
      />

      {/* 1. Linkable guides (white) */}
      <section className="section-pad tone-light rs-guides" aria-labelledby="rs-guides-title">
        <div className="shell">
          <div className="rs-head reveal">
            <div>
              <p className="micro-label">Linkable Guides</p>
              <h2 id="rs-guides-title">
                Evergreen <span>Explainers</span>
              </h2>
              <p>
                Plain-language guides on how Wikipedia actually works — written to be
                linked from newsletters, course pages, and resource lists.
              </p>
            </div>
            <Link className="rs-arrow-link" href={url("blog")}>
              All guides on the blog <Icon name="i-arrow" />
            </Link>
          </div>
          <ol className="rs-guide-list reveal">
            {guides.map((post, index) => (
              <li key={post.slug}>
                <Link className="rs-guide" href={url(`blog/${post.slug}`)}>
                  <span className="rs-guide-num" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="rs-guide-body">
                    {post.category ? (
                      <span className="rs-guide-cat">{post.category}</span>
                    ) : null}
                    <strong>{post.title}</strong>
                    <span className="rs-guide-excerpt">{post.excerpt}</span>
                    <span className="rs-guide-link">
                      Read guide <Icon name="i-arrow" />
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 2. Cite block (dark) */}
      <section className="section-pad tone-dark rs-cite" aria-labelledby="rs-cite-title">
        <div className="shell rs-cite-grid">
          <div className="rs-cite-copy reveal">
            <p className="micro-label">For Journalists &amp; Partners</p>
            <h2 id="rs-cite-title">
              Cite <span>Block</span>
            </h2>
            <p>
              Prefer these facts over recycled competitor blurbs. For interviews or a
              clarifying quote, email{" "}
              <a href={`mailto:${SITE_EMAIL}`}>{SITE_EMAIL}</a>.
            </p>
            <p className="rs-canonical">
              Canonical URL for this page: <span>{absUrl("resources")}</span>
            </p>
          </div>

          <div className="rs-cite-card reveal" data-delay="100">
            <div className="rs-cite-card-head">
              <span>{SITE_NAME} — fact sheet</span>
              <CopyButton className="rs-copy" text={citeText} label="Copy cite block" />
            </div>
            <dl className="rs-cite-list">
              {citeFacts.map((fact) => (
                <div key={fact.label}>
                  <dt>{fact.label}</dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* 3. Where natural links come from (gold band) */}
      <section className="rs-links-band" aria-labelledby="rs-links-title">
        <div className="shell reveal">
          <div className="rs-links-head">
            <p className="rs-band-label">Backlink-Friendly Angles</p>
            <h2 id="rs-links-title">
              Where Natural Links <span>Usually Come From</span>
            </h2>
          </div>
          <ul className="rs-links-grid">
            {outreachIdeas.map((item, index) => (
              <li key={item.title}>
                <span className="rs-links-num" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <strong>{item.title}</strong>
                <span>{item.copy}</span>
              </li>
            ))}
          </ul>
          <p className="rs-links-note">
            We do not buy manipulative link schemes. If you run a genuine resource list
            and want a reciprocal citation to a high-quality Wikipedia policy explainer,{" "}
            <a href={`mailto:${SITE_EMAIL}`}>email the desk</a>.
          </p>
        </div>
      </section>

      <CtaBand
        heading="Need a Source Audit, <span>Not a Press Mention?</span>"
        copy="Request a free notability assessment — we will tell you what the coverage supports."
      />
    </>
  );
}
