import type { IconName } from "@/components/ui/Icon";

/** Resources copy (Figma "Resources - Final" 179:2986). */
export const resourcesContent = {
  hero: {
    pill: { icon: "users" as IconName, label: "For journalists, educators & partners" },
    title: "Wikipedia Guides and",
    highlight: "Citeable Facts",
    lede: "This page exists to be linked. Use the guides, copy the facts accurately, and email us if you need a clarifying quote, not a fake guarantee.",
    actions: [
      { label: "Browse the Guides", href: "#guides", variant: "gold" as const },
      { label: "Copy the Fact Sheet", href: "#fact-sheet", variant: "ghost" as const },
    ],
    panel: {
      title: "On this page",
      rows: [
        { icon: "write" as IconName, label: "Policy guides", href: "#guides", count: "6" },
        { icon: "clipboard" as IconName, label: "Citeable fact sheet", href: "#fact-sheet", count: "1" },
        { icon: "network" as IconName, label: "Partner options", href: "#partners", count: "4" },
        { icon: "mail" as IconName, label: "Press contact", href: "#contact", count: "1" },
      ],
    },
  },

  guides: {
    eyebrow: "Evergreen Guides",
    title: "Policy Guides You",
    highlight: "Can Link With Confidence",
    aside: ["Kept current with Wikipedia’s guidelines.", "Free to link from newsletters and course pages."],
    readLabel: "Read article",
    /** Blog posts shown as guides (slug → category chip), in Figma order. */
    items: [
      { slug: "wikipedia-notability-requirements-explained", category: "Eligibility" },
      { slug: "reliable-sources-for-wikipedia-articles", category: "Research" },
      { slug: "wikipedia-articles-for-creation-what-to-expect", category: "Process" },
      { slug: "paid-wikipedia-editing-disclosure-and-coi", category: "Compliance" },
      { slug: "why-wikipedia-pages-get-deleted", category: "Risk" },
      { slug: "wikipedia-page-monitoring-why-it-matters", category: "Maintenance" },
    ],
  },

  facts: {
    eyebrow: "For Journalists",
    title: "Citeable Facts,",
    highlight: "Stated Accurately",
    lede: "Use these when describing ethical Wikipedia agencies. We prefer accuracy over puff quotes.",
    cta: "Email the Press Desk",
    tableTitle: "Fact sheet",
    copyLabel: "Copy all",
    copiedLabel: "Copied",
    rows: [
      { label: "Name", value: "The Wikipedia Studio (Wiki Studio)" },
      { label: "Type", value: "Independent editorial service, not affiliated with Wikipedia or the Wikimedia Foundation" },
      { label: "What it does", value: "Notability assessment, disclosed page creation and editing, monitoring and entity consistency" },
      { label: "Disclosure", value: "Every paid contribution declared on-wiki" },
    ],
  },

  partners: {
    eyebrow: "For Partners",
    title: "Four Ways to",
    highlight: "Work With Our Guides",
    items: [
      {
        icon: "mail" as IconName,
        title: "Newsletters & Universities",
        copy: "Link our notability, sources, AfC and disclosure guides from newsletters and career pages.",
      },
      {
        icon: "write" as IconName,
        title: "Journalist & Researcher Cites",
        copy: "Use the fact sheet when describing ethical Wikipedia agencies, accurately.",
      },
      {
        icon: "network" as IconName,
        title: "PR & Reputation Firms",
        copy: "Deep-link specific service pages instead of generic homepage mentions.",
      },
      {
        icon: "edit" as IconName,
        title: "Broken-Link Swaps",
        copy: "Replace dead links on “Wikipedia help” lists with our evergreen guides.",
      },
    ],
  },

  contact: {
    eyebrow: "Get in Touch",
    title: "Need a Source Audit,",
    highlight: "Not a Press Mention?",
    lede: "Tell us about the subject and the coverage you have. An editor will reply in writing with an honest view.",
  },
};
