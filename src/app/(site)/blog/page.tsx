import type { Metadata } from "next";
import { Suspense } from "react";
import { JsonLd } from "@/components/seo/JsonLd";
import { ContactSection } from "@/components/module/ContactForm";
import { ArchiveIntroBand } from "@/components/sections/blog/ArchiveIntroBand";
import { BlogFeatured } from "@/components/sections/blog/BlogFeatured";
import { BlogBrowser, GuidesView } from "@/components/sections/blog/BlogBrowser";
import { PaginationSeoLinks } from "@/components/sections/blog/PaginationSeoLinks";
import { TopicIndex } from "@/components/sections/blog/TopicIndex";
import { topicChips, topicGroups, topicRows } from "@/components/sections/blog/topics";
import { toCardPost } from "@/components/sections/blog/utils";
import { blogContent } from "@/content/blog";
import { getAllBlogPosts, getBlogPostsPage } from "@/lib/blog";
import { getAuthor } from "@/lib/data/authors";
import { absUrl } from "@/lib/config";
import { buildPageMetadata, itemListNode } from "@/lib/seo";

export const revalidate = 60;

const staticMeta = {
  slug: "blog",
  title: "Wikipedia Insights & Editorial Guides",
  shortTitle: "Blog",
  description:
    "Practical guides on Wikipedia notability, reliable sources, paid-editing disclosure, page timelines, and how articles survive review.",
  keywords: "wikipedia blog, wikipedia notability guide, paid wikipedia editing, wikipedia page creation tips, wikipedia sources",
  ogImage: "/assets/og/hero-orbital-globe.jpg",
  ogImageAlt: "Wikipedia editorial insights from The Wikipedia Studio",
};

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata(staticMeta);
}

export default async function BlogPage() {
  const [posts, { posts: firstPage, totalPages }] = await Promise.all([getAllBlogPosts(), getBlogPostsPage(1)]);

  const pageMeta = {
    ...staticMeta,
    schema: [
      // Full catalog on page 1 so crawlers discover every article URL from the hub.
      itemListNode(
        "blog",
        "Wikipedia Studio editorial guides",
        posts.map((post) => ({ name: post.title, description: post.excerpt, url: absUrl(`blog/${post.slug}`) })),
      ),
    ],
  };

  const f = blogContent.featured;
  const featured = posts.find((p) => p.slug === f.featuredSlug) ?? posts[0];
  const curated = f.mostRead.slugs.map((slug) => posts.find((p) => p.slug === slug)).filter((p): p is NonNullable<typeof p> => Boolean(p));
  const mostRead = [...curated, ...posts.filter((p) => p !== featured && !curated.includes(p))].slice(0, 4);

  const allCards = posts.map(toCardPost);
  const pageCards = firstPage.map(toCardPost);
  const chips = topicChips(posts);

  return (
    <>
      <PaginationSeoLinks page={1} totalPages={totalPages} />
      <JsonLd page={pageMeta} />
      <ArchiveIntroBand {...blogContent.band} />

      {featured ? <BlogFeatured featured={toCardPost(featured)} mostRead={mostRead.map(toCardPost)} authorName={getAuthor(featured.authorSlug).name} /> : null}

      <section id="guides" className="scroll-mt-24 bg-white pb-16 md:pb-28">
        <div className="shell">
          <Suspense fallback={<GuidesView posts={pageCards} total={allCards.length} chips={chips} page={1} totalPages={totalPages} />}>
            <BlogBrowser allPosts={allCards} pagePosts={pageCards} totalPages={totalPages} chips={chips} groups={topicGroups()} />
          </Suspense>
        </div>
      </section>

      <TopicIndex rows={topicRows(posts)} />
      <ContactSection heading={blogContent.contact} />
    </>
  );
}
