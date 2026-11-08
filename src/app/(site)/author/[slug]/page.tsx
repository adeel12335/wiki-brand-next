import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { TextLink } from "@/components/module/Button";
import { ContactSection } from "@/components/module/ContactForm";
import { SectionHeading } from "@/components/module/SectionHeading";
import { AboutDesk } from "@/components/sections/author/AboutDesk";
import { AuthorHero } from "@/components/sections/author/AuthorHero";
import { ArticleCard } from "@/components/sections/blog/ArticleCard";
import { toCardPost } from "@/components/sections/blog/utils";
import { authorContent } from "@/content/author";
import { getAllBlogPosts } from "@/lib/blog";
import { getAllAuthors, getAuthor } from "@/lib/data/authors";
import { absUrl } from "@/lib/config";
import { buildPageMetadata, seoId } from "@/lib/seo";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 60;

export function generateStaticParams() {
  return getAllAuthors().map((author) => ({ slug: author.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const author = getAuthor(slug);
  if (!author || author.slug !== slug) return {};

  return buildPageMetadata({
    slug: `author/${author.slug}`,
    title: `${author.name}, Wikipedia Editorial Guides`,
    shortTitle: author.name,
    description: author.bio.slice(0, 155),
    breadcrumbs: [{ label: "Blog", slug: "blog" }],
    breadcrumbName: author.name,
  });
}

export default async function AuthorPage({ params }: PageProps) {
  const { slug } = await params;
  const author = getAuthor(slug);
  if (!author || author.slug !== slug) notFound();

  const posts = (await getAllBlogPosts()).filter((post) => (post.authorSlug || "editorial-team") === author.slug);
  const topics = new Set(posts.map((post) => post.category).filter(Boolean)).size;

  const pageMeta = {
    slug: `author/${author.slug}`,
    title: `${author.name}, Wikipedia Editorial Guides`,
    description: author.bio.slice(0, 155),
    breadcrumbs: [{ label: "Blog", slug: "blog" }],
    breadcrumbName: author.name,
    schema: [
      {
        "@type": "ProfilePage",
        "@id": `${absUrl(`author/${author.slug}`)}#profile`,
        mainEntity: {
          "@type": "Organization",
          name: author.name,
          description: author.bio,
          url: absUrl(`author/${author.slug}`),
          parentOrganization: { "@id": seoId("organization") },
        },
      },
    ],
  };

  const a = authorContent.articles;

  return (
    <>
      <JsonLd page={pageMeta} />
      <AuthorHero author={author} stats={{ guides: posts.length, topics }} />
      <AboutDesk />

      <section id="articles" className="section scroll-mt-24 bg-ink">
        <div className="shell flex flex-col gap-10 md:gap-12">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <SectionHeading eyebrow={a.eyebrow} title={a.title} highlight={a.highlight} tone="dark" />
            {posts.length ? <TextLink href="/blog/">{a.viewAll.replace("{count}", String(posts.length))}</TextLink> : null}
          </div>
          {posts.length ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.slice(0, a.limit).map((post, i) => (
                <div key={post.slug} data-aos="fade-up" data-aos-delay={i * 80}>
                  <ArticleCard post={toCardPost(post)} />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-on-dark-muted">
              {a.empty}{" "}
              <Link href="/blog/" className="font-semibold text-gold-light hover:text-white">
                Browse the blog
              </Link>
              .
            </p>
          )}
        </div>
      </section>

      <ContactSection heading={authorContent.contact} />
    </>
  );
}
