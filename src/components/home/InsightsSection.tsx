import { BlogCard } from "@/components/blog/BlogCard";
import { ArrowLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { url } from "@/lib/config";
import type { BlogPost } from "@/types";

export function InsightsSection({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) return null;

  return (
    <Section tone="white" id="insights" labelledBy="insights-title">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeader
          id="insights-title"
          align="left"
          eyebrow="Insights"
          title={
            <>
              Guides Worth Reading <span>Before You Draft</span>
            </>
          }
        />
        <ArrowLink href={url("blog")} className="shrink-0">
          View all articles
        </ArrowLink>
      </div>

      <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <li key={post.slug}>
            <BlogCard post={post} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
