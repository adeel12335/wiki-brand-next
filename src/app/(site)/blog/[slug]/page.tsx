import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BodyClass } from "@/components/layout/BodyClass";
import { BlogCard } from "@/components/blog/BlogCard";
import { ReadingProgress } from "@/components/blog/ReadingProgress";
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
import { getAuthor } from "@/lib/data/authors";
import { absUrl, url } from "@/lib/config";
import { articleNode, buildPageMetadata } from "@/lib/seo";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 60;

export async function generateStaticParams() {
  const posts = await getAllBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
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

/** Hosts allowed by next.config images.remotePatterns; anything else falls back. */
const HERO_IMAGE_HOSTS = [
  "res.cloudinary.com",
  "thewikipediastudio.com",
  "www.thewikipediastudio.com",
  "thewikistudio.com",
];
const DEFAULT_POST_HERO = "/assets/og/hero-orbital-globe.jpg";

function heroImageFor(image?: string | null): string {
  if (!image) return DEFAULT_POST_HERO;
  if (image.startsWith("/")) return image;
  try {
    const { protocol, hostname } = new URL(image);
    return protocol === "https:" && HERO_IMAGE_HOSTS.includes(hostname)
      ? image
      : DEFAULT_POST_HERO;
  } catch {
    return DEFAULT_POST_HERO;
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  const related = await getRelatedBlogPosts(post.slug, 3);
  const relatedService = post.relatedService
    ? getService(post.relatedService)
    : null;
  const author = getAuthor(post.authorSlug);

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
        wordCount: post.wordCount,
        authorName: author.name,
        authorUrl: absUrl(`author/${author.slug}`),
      }),
    ],
  };

  return (
    <>
      <BodyClass className="page-blog-post" />
      <JsonLd page={pageMeta} />
      <ReadingProgress target=".ba-article" />
      <PageHero
        eyebrow={post.category}
        h1={post.title}
        lede={post.excerpt}
        breadcrumbs={[{ label: "Blog", slug: "blog" }]}
        current={post.title}
        image={heroImageFor(post.ogImage)}
        imageWidth={1200}
        imageHeight={630}
        visualClass="page-hero-visual--archive page-hero-visual--post"
      />

      <article className="section-pad tone-light blog-article-section ba-article">
        <div className="shell blog-article-layout">
          <div className="blog-article-main reveal">
            <div className="blog-article-meta">
              <span className="ba-byline">
                <span className="ba-avatar" aria-hidden="true">
                  {author.name.charAt(0)}
                </span>
                <span>
                  By{" "}
                  <Link href={url(`author/${author.slug}`)}>{author.name}</Link>
                </span>
              </span>
              <time dateTime={post.publishedAt}>
                {formatBlogDate(post.publishedAt)}
              </time>
              <span>{post.readingMinutes} min read</span>
              {post.modifiedAt !== post.publishedAt ? (
                <span>Updated {formatBlogDate(post.modifiedAt)}</span>
              ) : null}
            </div>
            {post.excerpt ? (
              <aside className="blog-key-takeaway" aria-label="Key takeaway">
                <p className="micro-label">Key Takeaway</p>
                <p>{post.excerpt}</p>
              </aside>
            ) : null}
            <div
              className="blog-prose legal-body"
              dangerouslySetInnerHTML={{ __html: post.body }}
            />
          </div>

          <aside className="blog-article-aside reveal" data-delay="80">
            <div className="blog-aside-card ba-help">
              <p className="micro-label">On This Topic</p>
              <h2>Need Hands-On Help?</h2>
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
              <Link className="text-link" href={url("wikipedia-page-cost")}>
                Wikipedia page cost &amp; packages
              </Link>
              <Link className="text-link" href={url("blog")}>
                All insights
              </Link>
            </div>
            <div className="blog-aside-card ba-refs">
              <p className="micro-label">Canonical References</p>
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

      <section className="ba-author-band" aria-labelledby="ba-author-title">
        <div className="shell ba-author-inner reveal">
          <span className="ba-author-avatar" aria-hidden="true">
            {author.name.charAt(0)}
          </span>
          <div>
            <p className="ba-band-label">About the Author</p>
            <h2 id="ba-author-title">{author.name}</h2>
            <p className="ba-author-role">{author.role}</p>
            <p>{author.bio}</p>
          </div>
          <Link className="ba-pill" href={url(`author/${author.slug}`)}>
            More From This Author <Icon name="i-arrow" />
          </Link>
        </div>
      </section>

      {related.length ? (
        <section className="section-pad tone-light bl-index ba-related" aria-labelledby="ba-related-title">
          <div className="shell">
            <div className="section-heading center reveal">
              <p className="micro-label">Keep Reading</p>
              <h2 id="ba-related-title">
                Related <span>Guides</span>
              </h2>
            </div>
            <div className="blog-grid reveal">
              {related.map((item) => (
                <BlogCard key={item.slug} post={item} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <CtaBand
        heading="Ready for a Source-First <span>Assessment?</span>"
        copy="Bring the strongest independent coverage you have. We will tell you what a reviewer is likely to accept."
      />
    </>
  );
}
