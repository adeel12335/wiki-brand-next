import { BlogCard } from "@/components/blog/BlogCard";
import { BlogPagination } from "@/components/blog/BlogPagination";
import { getBlogPostsPage } from "@/lib/blog";

export async function BlogIndex({ page }: { page: number }) {
  const { posts, totalPages, page: safePage } = await getBlogPostsPage(page);

  return (
    <div className="blog-index">
      <div className="blog-grid reveal">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
      <BlogPagination page={safePage} totalPages={totalPages} />
    </div>
  );
}
