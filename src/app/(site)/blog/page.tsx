import type { Metadata } from "next";
import Link from "next/link";
import { BodyClass } from "@/components/layout/BodyClass";
import { BlogIndex } from "@/components/blog/BlogIndex";
import { BlogPaginationSeoLinks } from "@/components/blog/BlogPaginationSeoLinks";
import { JsonLd } from "@/components/seo/JsonLd";
import { CtaBand } from "@/components/ui/CtaBand";
import { Icon } from "@/components/ui/Icon";
import { PageHero } from "@/components/ui/PageHero";
import { getAllBlogPosts, getBlogPostsPage } from "@/lib/blog";
import { absUrl, url } from "@/lib/config";
import { buildPageMetadata, itemListNode } from "@/lib/seo";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    slug: "blog",
    title: "Wikipedia Insights & Editorial Guides",
    shortTitle: "Blog",
    description:
      "Practical guides on Wikipedia notability, reliable sources, paid-editing disclosure, page timelines, and how articles survive review.",
    keywords:
      "wikipedia blog, wikipedia notability guide, paid wikipedia editing, wikipedia page creation tips, wikipedia sources",
    ogImage: "/assets/og/hero-orbital-globe.jpg",
    ogImageAlt: "Wikipedia editorial insights from The Wikipedia Studio",
  });
}

const starters = [
  {
    icon: "i-search",
    title: "Check Your Notability",
    copy: "Answer a few questions about your coverage and see whether a page is realistic.",
    href: "wikipedia-notability-checker",
    label: "Use the checker",
  },
  {
    icon: "i-plan",
    title: "See How the Process Runs",
    copy: "Five stages, research first — what happens at each step and how long it takes.",
    href: "our-process",
    label: "Read the process",
  },
  {
    icon: "i-page",
    title: "Understand the Cost",
    copy: "Published tiers from $700, what drives the price, and what is never for sale.",
    href: "wikipedia-page-cost",
    label: "View pricing",
  },
];

export default async function BlogPage() {
  const posts = await getAllBlogPosts();
  const { totalPages } = await getBlogPostsPage(1);
  const topics = [...new Set(posts.map((post) => post.category).filter(Boolean))];

  const pageMeta = {
    slug: "blog",
    title: "Wikipedia Insights & Editorial Guides",
    shortTitle: "Blog",
    description:
      "Practical guides on Wikipedia notability, reliable sources, paid-editing disclosure, page timelines, and how articles survive review.",
    keywords:
      "wikipedia blog, wikipedia notability guide, paid wikipedia editing, wikipedia page creation tips, wikipedia sources",
    ogImage: "/assets/og/hero-orbital-globe.jpg",
    ogImageAlt: "Wikipedia editorial insights from The Wikipedia Studio",
    schema: [
      // Full catalog on page 1 so crawlers discover every article URL from the hub.
      itemListNode(
        "blog",
        "Wikipedia Studio editorial guides",
        posts.map((post) => ({
          name: post.title,
          description: post.excerpt,
          url: absUrl(`blog/${post.slug}`),
        })),
      ),
    ],
  };

  return (
    <>
      <BlogPaginationSeoLinks page={1} totalPages={totalPages} />
      <BodyClass className="page-blog" />
      <JsonLd page={pageMeta} />
      <PageHero
        eyebrow="Insights"
        h1="Clear Writing on How Wikipedia <span>Actually Works.</span>"
        lede="Guides on notability, sourcing, disclosure, and timelines — written for people deciding whether a page is realistic, not for keyword stuffing."
        current="Blog"
        actions={[
          { label: "Ask About Your Subject", href: url("contact") },
          { label: "Read the FAQ", href: url("faq"), style: "button-outline" },
        ]}
        image="/assets/services-hero-knowledge-archive.webp"
        imageWidth={1536}
        imageHeight={1024}
        visualClass="page-hero-visual--archive"
      />

      <section className="section-pad tone-light blog-section bl-index" aria-labelledby="bl-index-title">
        <div className="shell">
          <div className="bl-head reveal">
            <div>
              <p className="micro-label">Latest Guides</p>
              <h2 id="bl-index-title">
                Editorial Guides, <span>Written Plainly</span>
              </h2>
            </div>
            <p className="bl-count">
              <strong>{posts.length}</strong> guides
            </p>
          </div>
          {topics.length ? (
            <ul className="bl-topics reveal" aria-label="Topics covered">
              {topics.map((topic) => (
                <li key={topic}>{topic}</li>
              ))}
            </ul>
          ) : null}
          <BlogIndex page={1} featureFirst />
        </div>
      </section>

      <section className="bl-start-band" aria-labelledby="bl-start-title">
        <div className="shell reveal">
          <div className="bl-start-head">
            <p className="bl-band-label">Start Here</p>
            <h2 id="bl-start-title">
              New to Wikipedia? <span>Begin With These</span>
            </h2>
            <p>
              Prefer short answers? See the{" "}
              <Link href={url("faq")}>Wikipedia FAQ</Link> — or start with one of these.
            </p>
          </div>
          <ul className="bl-start-grid">
            {starters.map((item) => (
              <li key={item.href}>
                <Link className="bl-start-card" href={url(item.href)}>
                  <span className="bl-start-icon" aria-hidden="true">
                    <Icon name={item.icon} />
                  </span>
                  <strong>{item.title}</strong>
                  <span className="bl-start-copy">{item.copy}</span>
                  <span className="bl-start-link">
                    {item.label} <Icon name="i-arrow" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        heading="Need a Notability Read <span>Before You Draft?</span>"
        copy="Send the strongest coverage you already have. We will tell you what holds up under review."
        label="Start With An Assessment"
      />
    </>
  );
}
