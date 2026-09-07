import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { BodyClass } from "@/components/layout/BodyClass";
import { BlogIndex } from "@/components/blog/BlogIndex";
import { BlogPaginationSeoLinks } from "@/components/blog/BlogPaginationSeoLinks";
import { JsonLd } from "@/components/seo/JsonLd";
import { CtaBand } from "@/components/ui/CtaBand";
import { PageHero } from "@/components/ui/PageHero";
import { getBlogPostsPage } from "@/lib/blog";
import { absUrl, url } from "@/lib/config";
import { buildPageMetadata, itemListNode } from "@/lib/seo";

interface PageProps {
  params: Promise<{ page: string }>;
}

export const revalidate = 60;

export async function generateStaticParams() {
  const { totalPages } = await getBlogPostsPage(1);
  return Array.from({ length: Math.max(0, totalPages - 1) }, (_, index) => ({
    page: String(index + 2),
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { page: raw } = await params;
  const page = Number(raw);
  if (!Number.isFinite(page) || page < 2) {
    return {};
  }
  const { posts, totalPages } = await getBlogPostsPage(page);
  if (page > totalPages) return {};

  const titles = posts
    .slice(0, 3)
    .map((post) => post.title)
    .join("; ");

  return buildPageMetadata({
    slug: `blog/page/${page}`,
    // Self-canonical so each paginated view can be crawled and ranked as a hub.
    title: `Wikipedia Insights — Page ${page} of ${totalPages}`,
    shortTitle: `Blog · Page ${page}`,
    description: metaTrimPagination(
      `Page ${page} of ${totalPages} — Wikipedia editorial guides including ${titles || "notability, sourcing, and page creation"}.`,
    ),
    keywords:
      "wikipedia blog, wikipedia notability guide, paid wikipedia editing, wikipedia page creation tips",
    ogImage: "/assets/og/hero-orbital-globe.jpg",
    breadcrumbs: [{ label: "Blog", slug: "blog" }],
  });
}

function metaTrimPagination(text: string): string {
  const normalized = text.trim().replace(/\s+/g, " ");
  if (normalized.length <= 160) return normalized;
  return `${normalized.slice(0, 157).replace(/[ ,.;:]+$/, "")}…`;
}

export default async function BlogPagedPage({ params }: PageProps) {
  const { page: raw } = await params;
  const page = Number(raw);
  if (!Number.isFinite(page) || page < 2) {
    redirect(url("blog"));
  }

  const { posts, totalPages, page: safePage } = await getBlogPostsPage(page);
  if (page > totalPages) notFound();

  const pageMeta = {
    slug: `blog/page/${page}`,
    title: `Wikipedia Insights — Page ${page} of ${totalPages}`,
    description: `Page ${page} of ${totalPages} of editorial guides on Wikipedia notability, sourcing, disclosure, and page creation.`,
    breadcrumbs: [{ label: "Blog", slug: "blog" }],
    breadcrumbName: `Page ${page}`,
    schema: [
      itemListNode(
        `blog/page/${page}`,
        `Wikipedia Studio guides — page ${page}`,
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
      <BlogPaginationSeoLinks page={safePage} totalPages={totalPages} />
      <BodyClass className="page-blog" />
      <JsonLd page={pageMeta} />
      <PageHero
        eyebrow="Insights"
        h1={`Editorial guides <span>· page ${page} of ${totalPages}</span>`}
        lede="More notes on notability, sourcing, disclosure, and how Wikipedia review actually behaves. Each guide is also listed in the sitemap for crawlers."
        breadcrumbs={[{ label: "Blog", slug: "blog" }]}
        current={`Page ${page}`}
        actions={[
          { label: "Back to Blog", href: url("blog") },
          ...(page < totalPages
            ? [{ label: "Next page", href: url(`blog/page/${page + 1}`) }]
            : []),
        ]}
      />

      <section className="section-pad blog-section">
        <div className="shell">
          <BlogIndex page={page} />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
