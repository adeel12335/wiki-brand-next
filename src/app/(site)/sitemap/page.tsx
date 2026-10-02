import type { Metadata } from "next";
import Link from "next/link";
import { BodyClass } from "@/components/layout/BodyClass";
import { JsonLd } from "@/components/seo/JsonLd";
import { CtaBand } from "@/components/ui/CtaBand";
import { PageHero } from "@/components/ui/PageHero";
import { Icon } from "@/components/ui/Icon";
import { NAV_ITEMS, absUrl, url } from "@/lib/config";
import { getAllBlogPosts } from "@/lib/blog";
import { serviceSlugs, services } from "@/lib/data";
import { buildPageMetadata, itemListNode } from "@/lib/seo";

const pageMeta = {
  slug: "sitemap",
  title: "HTML Sitemap",
  shortTitle: "Sitemap",
  description:
    "Browse every public page on The Wikipedia Studio — services, pricing, process, portfolio, blog, and resources.",
  ogImage: "/assets/og/hero-orbital-globe.jpg",
  schema: [
    itemListNode("sitemap", "Site pages", [
      ...NAV_ITEMS.map((item) => ({
        name: item.label,
        url: absUrl(item.slug),
      })),
      ...serviceSlugs.map((slug) => ({
        name: services[slug].name,
        url: absUrl(`services/${slug}`),
      })),
    ]),
  ],
};

export const metadata: Metadata = buildPageMetadata(pageMeta);

const guideLinks = [
  { label: "Hire a Wikipedia Writer", slug: "hire-wikipedia-writer" },
  { label: "Resources", slug: "resources" },
  { label: "Notability Checker", slug: "wikipedia-notability-checker" },
  { label: "How to Choose an Agency", slug: "how-to-choose-wikipedia-agency" },
  { label: "Case Studies", slug: "case-studies" },
  { label: "Wikipedia Page for Authors", slug: "wikipedia-page-for-authors" },
  { label: "Wikipedia Page for Companies", slug: "wikipedia-page-for-companies" },
  { label: "Wikipedia Page for Academics", slug: "wikipedia-page-for-academics" },
  { label: "Wikipedia Page for Musicians", slug: "wikipedia-page-for-musicians" },
];

const legalLinks = [
  { label: "Privacy Policy", slug: "privacy-policy" },
  { label: "Terms & Conditions", slug: "terms-conditions" },
];

export default async function HtmlSitemapPage() {
  const posts = await getAllBlogPosts();

  return (
    <>
      <BodyClass className="page-sitemap" />
      <JsonLd page={pageMeta} />
      <PageHero
        eyebrow="Sitemap"
        h1="Every Public Page, <span>in One Place.</span>"
        lede="A crawlable HTML directory of services, pricing, process, portfolio, and editorial guides."
        current="Sitemap"
      />

      <section className="section-pad tone-light sm-section" aria-label="Site directory">
        <div className="shell sm-grid">
          <div className="sm-col">
            <section className="sm-card reveal" aria-labelledby="sm-main">
              <header>
                <span className="sm-icon" aria-hidden="true"><Icon name="i-globe" /></span>
                <h2 id="sm-main">Main Pages</h2>
                <span className="sm-count">{NAV_ITEMS.length}</span>
              </header>
              <ul className="sm-list">
                {NAV_ITEMS.map((item) => (
                  <li key={item.slug || "home"}>
                    <Link href={url(item.slug)}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </section>
            <section className="sm-card reveal" aria-labelledby="sm-legal">
              <header>
                <span className="sm-icon" aria-hidden="true"><Icon name="i-shield" /></span>
                <h2 id="sm-legal">Legal</h2>
                <span className="sm-count">{legalLinks.length}</span>
              </header>
              <ul className="sm-list">
                {legalLinks.map((item) => (
                  <li key={item.slug}>
                    <Link href={url(item.slug)}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <div className="sm-col">
            <section className="sm-card reveal" data-delay="60" aria-labelledby="sm-services">
              <header>
                <span className="sm-icon" aria-hidden="true"><Icon name="i-page" /></span>
                <h2 id="sm-services">Editorial Services</h2>
                <span className="sm-count">{serviceSlugs.length + 1}</span>
              </header>
              <ul className="sm-list">
                <li>
                  <Link href={url("services")}>All Services</Link>
                </li>
                {serviceSlugs.map((slug) => (
                  <li key={slug}>
                    <Link href={url(`services/${slug}`)}>{services[slug].name}</Link>
                  </li>
                ))}
              </ul>
            </section>
            <section className="sm-card reveal" data-delay="60" aria-labelledby="sm-guides">
              <header>
                <span className="sm-icon" aria-hidden="true"><Icon name="i-search" /></span>
                <h2 id="sm-guides">Guides &amp; Tools</h2>
                <span className="sm-count">{guideLinks.length}</span>
              </header>
              <ul className="sm-list">
                {guideLinks.map((item) => (
                  <li key={item.slug}>
                    <Link href={url(item.slug)}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <div className="sm-col">
            <section className="sm-card reveal" data-delay="120" aria-labelledby="sm-blog">
              <header>
                <span className="sm-icon" aria-hidden="true"><Icon name="i-write" /></span>
                <h2 id="sm-blog">Blog Guides</h2>
                <span className="sm-count">{posts.length + 1}</span>
              </header>
              <ul className="sm-list">
                <li>
                  <Link href={url("blog")}>All Articles</Link>
                </li>
                {posts.map((post) => (
                  <li key={post.slug}>
                    <Link href={url(`blog/${post.slug}`)}>{post.title}</Link>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </section>

      <CtaBand
        heading="Looking for <span>Pricing?</span>"
        copy="Published packages start from $700. Every engagement begins with a free notability assessment."
        label="View Pricing"
        href={url("wikipedia-page-cost")}
      />
    </>
  );
}
