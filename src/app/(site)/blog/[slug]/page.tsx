import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BodyClass } from "@/components/layout/BodyClass";
import { BlogCard } from "@/components/blog/BlogCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { CtaBand } from "@/components/ui/CtaBand";
import { Icon } from "@/components/ui/Icon";
import { PageHero } from "@/components/ui/PageHero";
import {
  formatBlogDate,
  getAllBlogPosts,
  getBlogPostBySlug,
  getRelatedBlogPosts,
} from "@/lib/blog";
import { getService } from "@/lib/data";
import { url } from "@/lib/config";
import { articleNode, buildPageMetadata } from "@/lib/seo";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllBlogPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};

  return buildPageMetadata({
    slug: `blog/${post.slug}`,
    title: post.metaTitle,
    shortTitle: post.title,
    description: post.metaDescription,
    keywords: post.keywords,
    ogImage: post.ogImage,
    ogImageAlt: post.title,
    ogType: "article",
    publishedAt: post.publishedAt,
    modified: post.modifiedAt,
    articleSection: post.category,
    breadcrumbs: [{ label: "Blog", slug: "blog" }],
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedBlogPosts(post.slug, 3);
  const relatedService = post.relatedService
    ? getService(post.relatedService)
    : null;

  const pageMeta = {
    slug: `blog/${post.slug}`,
    title: post.metaTitle,
    description: post.metaDescription,
    keywords: post.keywords,
    ogImage: post.ogImage,
    ogImageAlt: post.title,
    ogType: "article" as const,
    publishedAt: post.publishedAt,
    modified: post.modifiedAt,
    articleSection: post.category,
    breadcrumbs: [{ label: "Blog", slug: "blog" }],
    breadcrumbName: post.title,
    schema: [
      articleNode({
        slug: post.slug,
        title: post.title,
        description: post.metaDescription,
        publishedAt: post.publishedAt,
        modifiedAt: post.modifiedAt,
        image: post.ogImage,
        category: post.category,
        keywords: post.keywords,
        wordCount: post.body.replace(/<[^>]+>/g, " ").trim().split(/\s+/).filter(Boolean)
          .length,
      }),
    ],
  };

  return (
    <>
      <BodyClass className="page-blog-post" />
      <JsonLd page={pageMeta} />
      <PageHero
        eyebrow={post.category}
        h1={post.title}
        lede={post.excerpt}
        breadcrumbs={[{ label: "Blog", slug: "blog" }]}
        current={post.title}
      />

      <article className="section-pad blog-article-section">
        <div className="shell blog-article-layout">
          <div className="blog-article-main reveal">
            <div className="blog-article-meta">
              <time dateTime={post.publishedAt}>
                {formatBlogDate(post.publishedAt)}
              </time>
              <span>{post.readingMinutes} min read</span>
              {post.modifiedAt !== post.publishedAt ? (
                <span>Updated {formatBlogDate(post.modifiedAt)}</span>
              ) : null}
            </div>
            <div
              className="blog-prose legal-body"
              dangerouslySetInnerHTML={{ __html: post.body }}
            />
          </div>

          <aside className="blog-article-aside reveal" data-delay="80">
            <div className="blog-aside-card">
              <p className="micro-label">On this topic</p>
              <h2>Need hands-on help?</h2>
              <p>
                These guides explain the rules. Engagements apply them to a specific
                subject and source pile.
              </p>
              {relatedService && post.relatedService ? (
                <Link
                  className="button button-gold button-small"
                  href={url(`services/${post.relatedService}`)}
                >
                  {relatedService.name} <Icon name="i-arrow" />
                </Link>
              ) : (
                <Link className="button button-gold button-small" href={url("contact")}>
                  Contact us <Icon name="i-arrow" />
                </Link>
              )}
              <Link className="text-link" href={url("blog")}>
                All insights
              </Link>
            </div>
            <div className="blog-aside-card">
              <p className="micro-label">Canonical references</p>
              <ul className="blog-aside-links">
                <li>
                  <a
                    href="https://en.wikipedia.org/wiki/Wikipedia:Notability"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Notability guideline
                  </a>
                </li>
                <li>
                  <a
                    href="https://en.wikipedia.org/wiki/Wikipedia:Reliable_sources"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Reliable sources
                  </a>
                </li>
                <li>
                  <a
                    href="https://en.wikipedia.org/wiki/Wikipedia:Conflict_of_interest"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Conflict of interest
                  </a>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </article>

      {related.length ? (
        <section className="section-pad blog-related-section">
          <div className="shell">
            <p className="micro-label">Keep reading</p>
            <h2 className="blog-related-heading">Related guides</h2>
            <div className="blog-grid blog-grid--related reveal">
              {related.map((item) => (
                <BlogCard key={item.slug} post={item} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <CtaBand
        heading="Ready for a source-first assessment?"
        copy="Bring the strongest independent coverage you have. We will tell you what a reviewer is likely to accept."
      />
    </>
  );
}
