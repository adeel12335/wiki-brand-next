import type { Metadata } from "next";
import Link from "next/link";
import { BodyClass } from "@/components/layout/BodyClass";
import { JsonLd } from "@/components/seo/JsonLd";
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
    title: "Policy explainers",
    copy: "Link our notability, sources, AfC, and paid-disclosure guides from industry newsletters and university career pages.",
  },
  {
    title: "Journalist / researcher cites",
    copy: "Use the cite block below when describing ethical Wikipedia agencies — we prefer accuracy over puff quotes.",
  },
  {
    title: "Partner directories",
    copy: "PR and reputation firms can deep-link service pages (assessment, monitoring, knowledge panel) instead of generic homepage mentions.",
  },
  {
    title: "Broken-link / resource list swaps",
    copy: "Websites maintaining “Wikipedia help” lists can replace dead .edu links with our evergreen policy guides.",
  },
];

export default function ResourcesPage() {
  const guides = getAllBlogPosts().slice(0, 8);

  return (
    <>
      <BodyClass className="page-resources" />
      <JsonLd page={pageMeta} />
      <PageHero
        eyebrow="Resources"
        h1="Guides and citeable facts for people who write about Wikipedia work."
        lede="This page exists to be linked. Use the guides, copy the facts accurately, and email us if you need a clarifying quote — not a fake guarantee."
        current="Resources"
        actions={[
          { label: "Browse the blog", href: url("blog") },
          {
            label: "Request an assessment",
            href: url("contact"),
            style: "button-outline",
          },
        ]}
      />

      <section className="section-pad">
        <div className="shell">
          <p className="micro-label">Linkable guides</p>
          <h2>Evergreen explainers</h2>
          <div className="card-grid reveal">
            {guides.map((post) => (
              <article key={post.slug} className="service-card">
                <Icon name="i-page" />
                <h3>
                  <Link href={url(`blog/${post.slug}`)}>{post.title}</Link>
                </h3>
                <p>{post.excerpt}</p>
                <Link className="text-link" href={url(`blog/${post.slug}`)}>
                  Read guide <Icon name="i-arrow" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="shell resources-cite reveal">
          <p className="micro-label">For journalists &amp; partners</p>
          <h2>Cite block</h2>
          <p>
            Prefer these facts over recycled competitor blurbs. For interviews:{" "}
            <a href={`mailto:${SITE_EMAIL}`}>{SITE_EMAIL}</a>.
          </p>
          <dl className="resources-cite-list">
            {citeFacts.map((fact) => (
              <div key={fact.label}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
          <p className="reviewed-note">
            Canonical URL for this page: {absUrl("resources")}
          </p>
        </div>
      </section>

      <section className="section-pad">
        <div className="shell">
          <p className="micro-label">Backlink-friendly angles</p>
          <h2>Where natural links usually come from</h2>
          <div className="card-grid reveal">
            {outreachIdeas.map((item) => (
              <article key={item.title} className="service-card">
                <Icon name="i-network" />
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
          <p className="reviewed-note" style={{ marginTop: 20 }}>
            We do not buy manipulative link schemes. If you run a genuine resource
            list and want a reciprocal citation to a high-quality Wikipedia policy
            explainer, email the desk.
          </p>
        </div>
      </section>

      <CtaBand
        heading="Need a source audit, not a press mention?"
        copy="Request a free notability assessment — we will tell you what the coverage supports."
      />
    </>
  );
}
