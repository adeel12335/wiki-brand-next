import type { IconName } from "@/components/ui/Icon";

/** Author page copy (Figma "Author - Final" 179:3466). Author name/role/bio come from `src/lib/data/authors.ts`. */
export const authorContent = {
  hero: {
    chip: "Author profile",
    org: "The Wikipedia Studio",
    /** Two-line H1 for the editorial desk; other authors fall back to their name + role. */
    titles: {
      "editorial-team": { title: "The Editorial Team", highlight: "Behind Every Guide" },
    } as Record<string, { title: string; highlight: string }>,
    lede: {
      "editorial-team":
        "Research and article editors who write every guide on this site under dual review. Named bylines appear when individual editors consent to be listed publicly.",
    } as Record<string, string>,
    actions: [
      { label: "Read the Latest Guides", href: "#articles" },
      { label: "Ask the Editors", href: "/contact/" },
    ],
    image: { src: "/assets/og/hero-orbital-globe.jpg", alt: "" },
    stats: { guides: "Guides", topics: "Topics", editors: "Editors / draft", editorsValue: "2" },
  },

  about: {
    eyebrow: "About the Desk",
    title: "How This Team",
    highlight: "Writes and Reviews",
    copy: "Assessments, source dossiers, neutral drafts and disclosed submissions are produced by our research and article editors under dual review. Every guide on this site goes through the same process: researched against the policy it describes, then checked by a second editor before it is published or updated.",
    expertise: [
      { icon: "search" as IconName, title: "Notability policy", copy: "General and subject-specific guidelines" },
      { icon: "research" as IconName, title: "Source verification", copy: "Independence, reliability and depth" },
      { icon: "publish" as IconName, title: "Articles for Creation", copy: "Review queues, feedback and disclosure" },
      { icon: "manage" as IconName, title: "Page monitoring", copy: "Stabilisation after publication" },
    ],
    standards: {
      title: "Editorial standards",
      items: [
        { title: "Sourced to policy", copy: "Every claim about Wikipedia links back to the guideline it describes." },
        { title: "Second-editor review", copy: "A second editor checks each guide before it is published or updated." },
        { title: "Kept current", copy: "Guides are revised when policy or review practice changes." },
        { title: "Disclosed always", copy: "Paid contributions are declared on-wiki, without exception." },
      ],
    },
  },

  articles: {
    eyebrow: "Latest Articles",
    title: "Recent Guides",
    highlight: "From This Desk",
    viewAll: "View all {count} articles",
    empty: "No published guides yet.",
    limit: 3,
  },

  contact: {
    eyebrow: "Get in Touch",
    title: "Need a Named Editor",
    highlight: "on Your File?",
    lede: "Tell us about the subject and the coverage you have. An editor will reply in writing with an honest view.",
  },
};
