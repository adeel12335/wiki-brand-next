import Link from "next/link";
import { formatBlogDate } from "@/lib/blog";
import { url } from "@/lib/config";
import type { BlogPost } from "@/types";

export function BlogCard({ post, featured = false }: { post: BlogPost; featured?: boolean }) {
  return (
    <article className={`blog-card${featured ? " blog-card--featured" : ""}`}>
      <div className="blog-card-meta">
        <span className="blog-card-category">{post.category}</span>
        <time dateTime={post.publishedAt}>{formatBlogDate(post.publishedAt)}</time>
      </div>
      <h2>
        <Link href={url(`blog/${post.slug}`)}>{post.title}</Link>
      </h2>
      <p>{post.excerpt}</p>
      <div className="blog-card-footer">
        <span>{post.readingMinutes} min read</span>
        <Link className="text-link" href={url(`blog/${post.slug}`)}>
          Read article
        </Link>
      </div>
    </article>
  );
}
