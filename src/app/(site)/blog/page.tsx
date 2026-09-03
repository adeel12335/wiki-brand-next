import type { Metadata } from "next";
import Link from "next/link";
import { BodyClass } from "@/components/layout/BodyClass";
import { BlogIndex } from "@/components/blog/BlogIndex";
import { JsonLd } from "@/components/seo/JsonLd";
import { CtaBand } from "@/components/ui/CtaBand";
import { PageHero } from "@/components/ui/PageHero";
import { getAllBlogPosts } from "@/lib/blog";
import { absUrl, url } from "@/lib/config";
import { buildPageMetadata, itemListNode } from "@/lib/seo";

const posts = getAllBlogPosts();

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

export const metadata: Metadata = buildPageMetadata(pageMeta);

export default function BlogPage() {
  return (
    <>
      <BodyClass className="page-blog" />
      <JsonLd page={pageMeta} />
      <PageHero
        eyebrow="Insights"
        h1="Clear writing on how Wikipedia <span>actually works.</span>"
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

      <section className="section-pad blog-section">
        <div className="shell">
          <BlogIndex page={1} />
          <p className="blog-index-note reveal">
            Prefer short answers? See the{" "}
            <Link href={url("faq")}>Wikipedia FAQ</Link>.
          </p>
        </div>
      </section>

      <CtaBand
        heading="Need a notability read before you draft?"
        copy="Send the strongest coverage you already have. We will tell you what holds up under review."
        label="Start With An Assessment"
      />
    </>
  );
}
