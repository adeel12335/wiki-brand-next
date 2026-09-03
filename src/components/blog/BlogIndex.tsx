import { BlogCard } from "@/components/blog/BlogCard";
import { BlogPagination } from "@/components/blog/BlogPagination";
import { getBlogPostsPage } from "@/lib/blog";

export function BlogIndex({ page }: { page: number }) {
  const { posts, totalPages, page: safePage } = getBlogPostsPage(page);

  return (
    <div className="blog-index">
      <div className="blog-grid reveal">
        {posts.map((post, index) => (
          <BlogCard
            key={post.slug}
            post={post}
            featured={safePage === 1 && index === 0}
          />
        ))}
      </div>
      <BlogPagination page={safePage} totalPages={totalPages} />
    </div>
  );
}
