import type { Metadata } from "next";
import Link from "next/link";
import { BodyClass } from "@/components/layout/BodyClass";
import { JsonLd } from "@/components/seo/JsonLd";
import { CtaBand } from "@/components/ui/CtaBand";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
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

const extraLinks = [
  { label: "Privacy Policy", slug: "privacy-policy" },
  { label: "Terms & Conditions", slug: "terms-conditions" },
];

export default function HtmlSitemapPage() {
  const posts = getAllBlogPosts();

  return (
    <>
      <BodyClass className="page-sitemap" />
      <JsonLd page={pageMeta} />
      <PageHero
        eyebrow="Sitemap"
        h1="Every public page, <span>in one place.</span>"
        lede="A crawlable HTML directory of services, pricing, process, portfolio, and editorial guides."
        current="Sitemap"
      />

      <section className="section-pad">
        <div className="shell sitemap-grid">
          <div className="reveal">
            <SectionHeading eyebrow="Main" heading="Primary pages" />
            <ul className="sitemap-list">
              {NAV_ITEMS.map((item) => (
                <li key={item.slug || "home"}>
                  <Link href={url(item.slug)}>{item.label}</Link>
                </li>
              ))}
              {extraLinks.map((item) => (
                <li key={item.slug}>
                  <Link href={url(item.slug)}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="reveal" data-delay="80">
            <SectionHeading eyebrow="Services" heading="Editorial services" />
            <ul className="sitemap-list">
              <li>
                <Link href={url("services")}>All services</Link>
              </li>
              {serviceSlugs.map((slug) => (
                <li key={slug}>
                  <Link href={url(`services/${slug}`)}>{services[slug].name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="reveal" data-delay="120">
            <SectionHeading eyebrow="Insights" heading="Blog guides" />
            <ul className="sitemap-list">
              <li>
                <Link href={url("blog")}>All articles</Link>
              </li>
              {posts.map((post) => (
                <li key={post.slug}>
                  <Link href={url(`blog/${post.slug}`)}>{post.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <CtaBand
        heading="Looking for <span>pricing?</span>"
        copy="Published packages start from $700. Every engagement begins with a free notability assessment."
        label="View pricing"
        href={url("wikipedia-page-cost")}
      />
    </>
  );
}
