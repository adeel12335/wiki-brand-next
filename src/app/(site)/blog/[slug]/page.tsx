import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { BlogCard } from "@/components/module/BlogCard";
import { ContactSection } from "@/components/module/ContactForm";
import { SectionHeading } from "@/components/module/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { ArchiveIntroBand } from "@/components/sections/blog/ArchiveIntroBand";
import { ArticleRail } from "@/components/sections/blog/ArticleRail";
import { AuthorBox } from "@/components/sections/blog/AuthorBox";
import { withHeadingIds } from "@/components/sections/blog/articleBody";
import { sanitizeRichText } from "@/lib/sanitize";
import { slugifyTopic, splitTitle } from "@/components/sections/blog/utils";
import prose from "@/components/sections/blog/prose.module.css";
import { blogContent, blogSingleContent, midSizedCompaniesFaqs, midSizedCompaniesSlug } from "@/content/blog";
import { getAllBlogPosts, getBlogPostBySlug, getRelatedBlogPosts } from "@/lib/blog";
import { services, type ServiceSlug } from "@/lib/data";
import { getAuthor } from "@/lib/data/authors";
import { absUrl } from "@/lib/config";
import { safeImageSrc } from "@/lib/image";
import { articleNode, buildPageMetadata, faqNode } from "@/lib/seo";

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

const DEFAULT_POST_IMAGE = "/assets/og/hero-orbital-globe.jpg";

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  const related = await getRelatedBlogPosts(post.slug, 3);
  const author = getAuthor(post.authorSlug);
  const serviceSlug = post.relatedService as ServiceSlug | undefined;
  const relatedService = serviceSlug && services[serviceSlug] ? { name: services[serviceSlug].name, href: `/services/${serviceSlug}/` } : null;

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
      ...(post.slug === midSizedCompaniesSlug ? [faqNode([...midSizedCompaniesFaqs], `blog/${post.slug}`)] : []),
    ],
  };

  const s = blogSingleContent;
  const { html, toc } = withHeadingIds(sanitizeRichText(post.body));
  const [line1, line2] = splitTitle(post.title);
  const tags = post.keywords
    .split(",")
    .map((k) => k.trim())
    .filter(Boolean)
    .slice(0, 3);

  return (
    <>
      <JsonLd page={pageMeta} />
      <ArchiveIntroBand {...blogContent.band} />

      {/* Article title */}
      <header className="bg-white pt-12 md:pt-20">
        <div className="shell flex flex-col gap-6 md:gap-7" data-aos="fade-up">
          <p className="flex flex-wrap items-center gap-3.5">
            {post.category ? (
              <Link
                href={`/blog/?topic=${slugifyTopic(post.category)}#guides`}
                className="rounded-full border border-gold bg-gold/12 px-3.5 py-1.5 text-[11px] leading-none font-bold tracking-[0.16em] text-gold-dark uppercase transition-colors hover:bg-gold hover:text-on-gold"
              >
                {post.category}
              </Link>
            ) : null}
            <span className="text-sm text-body">
              {s.guideLabel}
              <span className="px-2">·</span>
              {post.readingMinutes} min read
            </span>
          </p>
          <h1 className="max-w-[980px] text-[34px] leading-[1.15] font-bold text-heading md:text-[48px] lg:text-[58px]">
            {line1}
            {line2 ? (
              <>
                <br />
                <span className="text-gold">{line2}</span>
              </>
            ) : null}
          </h1>
          {post.excerpt ? <p className="max-w-[820px] text-[17px] leading-relaxed text-body md:text-xl">{post.excerpt}</p> : null}
          <hr className="mt-1 border-heading/10" />
        </div>
      </header>

      {/* Article body */}
      <div className="bg-white pt-10 pb-16 md:pt-14 md:pb-30">
        <div className="shell grid gap-12 lg:grid-cols-[280px_minmax(0,1fr)] xl:grid-cols-[320px_760px] xl:justify-between">
          <ArticleRail
            author={author}
            publishedAt={post.publishedAt}
            modifiedAt={post.modifiedAt}
            readingMinutes={post.readingMinutes}
            shareUrl={absUrl(`blog/${post.slug}`)}
            title={post.title}
            toc={toc}
            relatedService={relatedService}
          />

          <article className="flex min-w-0 flex-col gap-7">
            <div className="relative aspect-[760/440] overflow-hidden rounded-[20px] bg-mist">
              <Image src={safeImageSrc(post.ogImage, DEFAULT_POST_IMAGE)} alt={post.title} fill priority sizes="(min-width: 1280px) 760px, 100vw" className="object-cover" />
            </div>

            {post.excerpt ? (
              <aside aria-label={s.keyTakeaway} className="flex gap-5 rounded-2xl bg-cream py-7 pr-6 pl-6 md:pr-8 md:pl-7">
                <span className="w-1 shrink-0 rounded-sm bg-gold" />
                <div className="flex flex-col gap-2.5">
                  <p className="text-[11px] font-bold tracking-[0.16em] text-gold-dark uppercase">{s.keyTakeaway}</p>
                  <p className="text-[17px] leading-relaxed font-semibold text-heading md:text-lg">{post.excerpt}</p>
                </div>
              </aside>
            ) : null}

            <div className={prose.prose} dangerouslySetInnerHTML={{ __html: html }} />

            <div className="flex flex-col gap-3.5 rounded-2xl border border-heading/10 p-7">
              <p className="text-[11px] font-bold tracking-[0.16em] text-gold-dark uppercase">{s.sources.title}</p>
              <ul className="flex flex-col gap-3.5">
                {s.sources.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2.5 text-[15px] font-semibold text-heading transition-colors hover:text-gold-dark"
                    >
                      <Icon name="arrow" size={14} className="text-gold" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-4 border-t border-heading/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
              {tags.length ? (
                <ul className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <li key={tag} className="rounded-full border border-heading/10 px-3.5 py-1.5 text-[13px] text-heading first-letter:uppercase">
                      {tag}
                    </li>
                  ))}
                </ul>
              ) : (
                <span />
              )}
              <Link href={s.allInsights.href} className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-heading transition-colors hover:text-gold-dark">
                <Icon name="chevron-left" size={14} />
                {s.allInsights.label}
              </Link>
            </div>

            <AuthorBox author={author} />
          </article>
        </div>
      </div>

      <ContactSection heading={s.contact} />

      {related.length ? (
        <section className="bg-white pt-14 pb-16 md:pt-24 md:pb-30">
          <div className="shell flex flex-col gap-10 md:gap-14">
            <SectionHeading eyebrow={s.related.eyebrow} title={s.related.title} highlight={s.related.highlight} />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {related.map((item, i) => (
                <div key={item.slug} data-aos="fade-up" data-aos-delay={i * 80}>
                  <BlogCard post={item} />
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
