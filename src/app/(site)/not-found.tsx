import { JsonLd } from "@/components/seo/JsonLd";
import { NotFoundGuides, NotFoundHero } from "@/components/sections/not-found/NotFoundSections";
import { getAllBlogPosts } from "@/lib/blog";
import { buildPageMetadata } from "@/lib/seo";

const pageMeta = {
  slug: "404",
  title: "Page Not Found",
  shortTitle: "Page not found",
  description: "The page you were looking for could not be found. Browse our Wikipedia services, process, and resources instead.",
  robots: "noindex, follow",
};

export const metadata = buildPageMetadata(pageMeta);

export default async function NotFound() {
  const posts = (await getAllBlogPosts().catch(() => [])).slice(0, 3);
  return (
    <>
      <JsonLd page={pageMeta} />
      <NotFoundHero />
      <NotFoundGuides posts={posts} />
    </>
  );
}
