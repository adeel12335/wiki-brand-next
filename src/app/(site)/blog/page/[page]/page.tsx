import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { BodyClass } from "@/components/layout/BodyClass";
import { BlogIndex } from "@/components/blog/BlogIndex";
import { JsonLd } from "@/components/seo/JsonLd";
import { CtaBand } from "@/components/ui/CtaBand";
import { PageHero } from "@/components/ui/PageHero";
import { getBlogPageCount, getBlogPostsPage } from "@/lib/blog";
import { url } from "@/lib/config";
import { buildPageMetadata } from "@/lib/seo";

interface PageProps {
  params: Promise<{ page: string }>;
}

export async function generateStaticParams() {
  const total = getBlogPageCount();
  return Array.from({ length: Math.max(0, total - 1) }, (_, index) => ({
    page: String(index + 2),
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { page: raw } = await params;
  const page = Number(raw);
  if (!Number.isFinite(page) || page < 2) {
    return {};
  }
  const { totalPages } = getBlogPostsPage(page);
  if (page > totalPages) return {};

  return buildPageMetadata({
    slug: `blog/page/${page}`,
    title: `Wikipedia Insights — Page ${page}`,
    shortTitle: `Blog · Page ${page}`,
    description: `Page ${page} of editorial guides on Wikipedia notability, sourcing, disclosure, and page creation timelines.`,
    keywords:
      "wikipedia blog, wikipedia notability guide, paid wikipedia editing, wikipedia page creation tips",
    ogImage: "/assets/og/hero-orbital-globe.jpg",
  });
}

export default async function BlogPagedPage({ params }: PageProps) {
  const { page: raw } = await params;
  const page = Number(raw);
  if (!Number.isFinite(page) || page < 2) {
    redirect(url("blog"));
  }

  const { totalPages } = getBlogPostsPage(page);
  if (page > totalPages) notFound();

  const pageMeta = {
    slug: `blog/page/${page}`,
    title: `Wikipedia Insights — Page ${page}`,
    description: `Page ${page} of editorial guides on Wikipedia notability, sourcing, disclosure, and page creation timelines.`,
  };

  return (
    <>
      <BodyClass className="page-blog" />
      <JsonLd page={pageMeta} />
      <PageHero
        eyebrow="Insights"
        h1={`Editorial guides <span>· page ${page}</span>`}
        lede="More notes on notability, sourcing, disclosure, and how Wikipedia review actually behaves."
        breadcrumbs={[{ label: "Blog", slug: "blog" }]}
        current={`Page ${page}`}
        actions={[{ label: "Back to Blog", href: url("blog") }]}
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
