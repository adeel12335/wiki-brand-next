import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BodyClass } from "@/components/layout/BodyClass";
import { BlogCard } from "@/components/blog/BlogCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { CtaBand } from "@/components/ui/CtaBand";
import { PageHero } from "@/components/ui/PageHero";
import { getAllBlogPosts } from "@/lib/blog";
import { getAllAuthors, getAuthor } from "@/lib/data/authors";
import { absUrl, url } from "@/lib/config";
import { buildPageMetadata, seoId } from "@/lib/seo";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllAuthors().map((author) => ({ slug: author.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const author = getAuthor(slug);
  if (!author || author.slug !== slug) return {};

  return buildPageMetadata({
    slug: `author/${author.slug}`,
    title: `${author.name} — Wikipedia Editorial Guides`,
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

  const posts = (await getAllBlogPosts()).filter(
    (post) => (post.authorSlug || "editorial-team") === author.slug,
  );

  const pageMeta = {
    slug: `author/${author.slug}`,
    title: `${author.name} — Wikipedia Editorial Guides`,
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

  return (
    <>
      <BodyClass className="page-author" />
      <JsonLd page={pageMeta} />
      <PageHero
        eyebrow="Author"
        h1={author.name}
        lede={author.bio}
        breadcrumbs={[{ label: "Blog", slug: "blog" }]}
        current={author.name}
        actions={[{ label: "Back to blog", href: url("blog") }]}
      />

      <section className="section-pad">
        <div className="shell">
          <p className="micro-label">{author.role}</p>
          <h2>Guides by {author.name}</h2>
          {posts.length ? (
            <div className="blog-grid" style={{ marginTop: 28 }}>
              {posts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <p>
              No published guides yet.{" "}
              <Link href={url("blog")}>Browse the blog</Link>.
            </p>
          )}
        </div>
      </section>

      <CtaBand
        heading="Need a named editor on your file?"
        copy="Ask at enquiry — paid contributions are disclosed on-wiki either way."
        label="Request an assessment"
      />
    </>
  );
}
