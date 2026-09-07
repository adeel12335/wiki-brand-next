import Image from "next/image";
import Link from "next/link";
import { formatBlogDate } from "@/lib/blog";
import { url } from "@/lib/config";
import { Icon } from "@/components/ui/Icon";
import type { BlogPost } from "@/types";

export function BlogCard({
  post,
  featured = false,
}: {
  post: BlogPost;
  featured?: boolean;
}) {
  const imageSrc = post.ogImage || "/assets/og/hero-orbital-globe.jpg";
  const remote = imageSrc.startsWith("http");

  return (
    <article className={`blog-card${featured ? " blog-card--featured" : ""}`}>
      <Link
        className="blog-card-media"
        href={url(`blog/${post.slug}`)}
        aria-label={post.title}
      >
        <Image
          src={imageSrc}
          alt=""
          fill
          sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
          className="blog-card-image"
          unoptimized={remote}
        />
        <span className="blog-card-media-shade" aria-hidden />
      </Link>

      <div className="blog-card-body">
        <div className="blog-card-meta">
          <span className="blog-card-category">{post.category}</span>
          <time dateTime={post.publishedAt}>
            {formatBlogDate(post.publishedAt)}
          </time>
        </div>

        <h2>
          <Link href={url(`blog/${post.slug}`)}>{post.title}</Link>
        </h2>

        <p>{post.excerpt}</p>

        <div className="blog-card-footer">
          <span>{post.readingMinutes} min read</span>
          <Link className="text-link" href={url(`blog/${post.slug}`)}>
            Read article <Icon name="i-arrow" />
          </Link>
        </div>
      </div>
    </article>
  );
}
