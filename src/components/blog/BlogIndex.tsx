import { BlogCard } from "@/components/blog/BlogCard";
import { BlogPagination } from "@/components/blog/BlogPagination";
import { getBlogPostsPage } from "@/lib/blog";

export async function BlogIndex({
  page,
  featureFirst = false,
}: {
  page: number;
  /** Render the newest post as a wide featured card (blog page 1 only). */
  featureFirst?: boolean;
}) {
  const { posts, totalPages, page: safePage } = await getBlogPostsPage(page);
  const [featured, ...rest] = featureFirst ? posts : [];
  const gridPosts = featureFirst ? rest : posts;

  return (
    <div className="blog-index">
      {featured ? (
        <div className="blog-feature-row reveal">
          <BlogCard post={featured} featured />
        </div>
      ) : null}
      {gridPosts.length ? (
        <div className="blog-grid reveal">
          {gridPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      ) : null}
      <BlogPagination page={safePage} totalPages={totalPages} />
    </div>
  );
}
