import type { BlogPost } from "@/types";
import { blogContent } from "@/content/blog";
import type { TopicChip, TopicGroup } from "./BlogBrowser";
import type { TopicRow } from "./TopicIndex";
import { slugifyTopic } from "./utils";

/** Category chips (most guides first) for the "Browse all guides" filter bar. */
export function topicChips(posts: BlogPost[]): TopicChip[] {
  const map = new Map<string, TopicChip>();
  posts.forEach((post) => {
    if (!post.category) return;
    const slug = slugifyTopic(post.category);
    const chip = map.get(slug) ?? { slug, label: post.category, count: 0 };
    chip.count += 1;
    map.set(slug, chip);
  });
  return [...map.values()].sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));
}

export function topicGroups(): TopicGroup[] {
  return blogContent.topics.groups.map(({ slug, title, categories }) => ({ slug, title, categories }));
}

/** Topic rows for "Browse by topic": count + latest guide per group (groups without posts are hidden). */
export function topicRows(posts: BlogPost[]): TopicRow[] {
  return blogContent.topics.groups
    .map((group) => {
      const cats = group.categories.map(slugifyTopic);
      const matching = posts.filter((post) => cats.includes(slugifyTopic(post.category || "")));
      return { slug: group.slug, title: group.title, question: group.question, count: matching.length, latest: matching[0]?.title ?? null };
    })
    .filter((row) => row.count > 0);
}
