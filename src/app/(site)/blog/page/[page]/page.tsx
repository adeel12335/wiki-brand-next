import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { ContactSection } from "@/components/module/ContactForm";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ArchiveIntroBand } from "@/components/sections/blog/ArchiveIntroBand";
import { GuidesView } from "@/components/sections/blog/BlogBrowser";
import { PaginationSeoLinks } from "@/components/sections/blog/PaginationSeoLinks";
import { TopicIndex } from "@/components/sections/blog/TopicIndex";
import { topicChips, topicRows } from "@/components/sections/blog/topics";
import { toCardPost } from "@/components/sections/blog/utils";
import { blogContent } from "@/content/blog";
import { getAllBlogPosts, getBlogPostsPage } from "@/lib/blog";
import { absUrl, url } from "@/lib/config";
import { buildPageMetadata, itemListNode } from "@/lib/seo";

interface PageProps {
  params: Promise<{ page: string }>;
}

export const revalidate = 60;

export async function generateStaticParams() {
  const { totalPages } = await getBlogPostsPage(1);
  return Array.from({ length: Math.max(0, totalPages - 1) }, (_, index) => ({ page: String(index + 2) }));
}

function metaTrimPagination(text: string): string {
  const normalized = text.trim().replace(/\s+/g, " ");
  if (normalized.length <= 160) return normalized;
  return `${normalized.slice(0, 157).replace(/[ ,.;:]+$/, "")}…`;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { page: raw } = await params;
  const page = Number(raw);
  if (!Number.isFinite(page) || page < 2) return {};
  const { posts, totalPages } = await getBlogPostsPage(page);
  if (page > totalPages) return {};

  const titles = posts
    .slice(0, 3)
    .map((post) => post.title)
    .join("; ");

  return buildPageMetadata({
    slug: `blog/page/${page}`,
    // Self-canonical so each paginated view can be crawled and ranked as a hub.
    title: `Wikipedia Insights, Page ${page} of ${totalPages}`,
    shortTitle: `Blog · Page ${page}`,
    description: metaTrimPagination(
      `Page ${page} of ${totalPages}, Wikipedia editorial guides including ${titles || "notability, sourcing, and page creation"}.`,
    ),
    keywords: "wikipedia blog, wikipedia notability guide, paid wikipedia editing, wikipedia page creation tips",
    ogImage: "/assets/og/hero-orbital-globe.jpg",
    breadcrumbs: [{ label: "Blog", slug: "blog" }],
  });
}

export default async function BlogPagedPage({ params }: PageProps) {
  const { page: raw } = await params;
  const page = Number(raw);
  if (!Number.isFinite(page) || page < 2) {
    redirect(url("blog"));
  }

  const [{ posts, totalPages, page: safePage }, allPosts] = await Promise.all([getBlogPostsPage(page), getAllBlogPosts()]);
  if (page > totalPages) notFound();

  const pageMeta = {
    slug: `blog/page/${page}`,
    title: `Wikipedia Insights, Page ${page} of ${totalPages}`,
    description: `Page ${page} of ${totalPages} of editorial guides on Wikipedia notability, sourcing, disclosure, and page creation.`,
    breadcrumbs: [{ label: "Blog", slug: "blog" }],
    breadcrumbName: `Page ${page}`,
    schema: [
      itemListNode(
        `blog/page/${page}`,
        `Wikipedia Studio guides, page ${page}`,
        posts.map((post) => ({ name: post.title, description: post.excerpt, url: absUrl(`blog/${post.slug}`) })),
      ),
    ],
  };

  const c = blogContent.paged;

  return (
    <>
      <PaginationSeoLinks page={safePage} totalPages={totalPages} />
      <JsonLd page={pageMeta} />
      <ArchiveIntroBand {...blogContent.band} />

      <section id="guides" className="bg-white pt-12 pb-16 md:pt-20 md:pb-28">
        <div className="shell flex flex-col gap-8 md:gap-10">
          <div className="flex flex-col gap-4" data-aos="fade-up">
            <Eyebrow>{c.eyebrow}</Eyebrow>
            <h1 className="h2 text-heading">
              {c.title}
              <br />
              <span className="text-gold">
                Page {page} of {totalPages}
              </span>
            </h1>
            <p className="lede max-w-[640px] text-body">{c.lede}</p>
          </div>
          <GuidesView posts={posts.map(toCardPost)} total={allPosts.length} chips={topicChips(allPosts)} page={safePage} totalPages={totalPages} />
        </div>
      </section>

      <TopicIndex rows={topicRows(allPosts)} />
      <ContactSection heading={blogContent.contact} />
    </>
  );
}
