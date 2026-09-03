import { blogPosts } from "@/lib/data/blog-posts";
import { countWordsFromHtml, estimateReadingMinutes } from "@/lib/reading-time";
import type { BlogPost } from "@/types";

export const BLOG_PAGE_SIZE = 4;

function withComputedReading(post: BlogPost): BlogPost {
  return {
    ...post,
    readingMinutes: estimateReadingMinutes(post.body),
    wordCount: countWordsFromHtml(post.body),
  };
}

export function getAllBlogPosts(): BlogPost[] {
  return [...blogPosts]
    .map(withComputedReading)
    .sort((a, b) =>
      a.publishedAt < b.publishedAt ? 1 : a.publishedAt > b.publishedAt ? -1 : 0,
    );
}

export function getBlogPostBySlug(slug: string): BlogPost | null {
  const post = blogPosts.find((item) => item.slug === slug);
  return post ? withComputedReading(post) : null;
}

export function getBlogPageCount(pageSize = BLOG_PAGE_SIZE): number {
  return Math.max(1, Math.ceil(getAllBlogPosts().length / pageSize));
}

export function getBlogPostsPage(
  page: number,
  pageSize = BLOG_PAGE_SIZE,
): { posts: BlogPost[]; page: number; totalPages: number; total: number } {
  const all = getAllBlogPosts();
  const totalPages = Math.max(1, Math.ceil(all.length / pageSize));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * pageSize;
  return {
    posts: all.slice(start, start + pageSize),
    page: safePage,
    totalPages,
    total: all.length,
  };
}

export function getRelatedBlogPosts(slug: string, limit = 3): BlogPost[] {
  const current = getBlogPostBySlug(slug);
  if (!current) return getAllBlogPosts().slice(0, limit);
  return getAllBlogPosts()
    .filter((post) => post.slug !== slug)
    .sort((a, b) => {
      const aScore = a.category === current.category ? 1 : 0;
      const bScore = b.category === current.category ? 1 : 0;
      return bScore - aScore;
    })
    .slice(0, limit);
}

export function formatBlogDate(isoDate: string): string {
  const date = new Date(`${isoDate}T12:00:00Z`);
  return date.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
