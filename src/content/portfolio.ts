import type { IconName } from "@/components/ui/Icon";

/**
 * Portfolio listing + single copy (Figma "Portfolio Listing - Final" 179:608 and "Portfolio Single - Final" 156:140).
 * Items come from `@/lib/portfolio` (admin panel); only static UI copy lives here.
 */
export const portfolioContent = {
  band: {
    label: "Portfolio",
    href: "/portfolio/",
    copy: "Published Wikipedia articles researched, drafted and disclosed by our editors, each one reviewed by independent volunteers.",
    link: { label: "Request a free assessment", href: "/contact/" },
  },

  intro: {
    eyebrow: "Our Portfolio",
    title: "Published Pages,",
    highlight: "Independently Reviewed",
    searchPlaceholder: "Search by name or field",
    searchLabel: "Search",
    /** First stat value is replaced by the live item count. */
    stats: [
      { value: "32", label: "published case studies" },
      { value: "5", label: "subject areas, from science to sport" },
      { value: "100%", label: "of paid contributions disclosed" },
      { value: "NDA", label: "available for confidential clients" },
    ],
  },

  grid: {
    allLabel: "All work",
    sort: { label: "Sort:", featured: "Featured", az: "Name A-Z" },
    liveBadge: "Live on Wikipedia",
    viewCase: "View case",
    viewOnWikipedia: "View on Wikipedia",
    fallbackCategory: "Published",
    empty: "No published pages match that search.",
    clear: "Clear filters",
    perPage: 12,
  },

  confidential: {
    eyebrow: "Confidential Work",
    title: "Not Every Client",
    highlight: "Is Listed Here",
    lede: "Many clients prefer that their engagement stays private. The pages above are shown with permission. The rest of our work is never named, linked or hinted at.",
    points: [
      { icon: "mail" as IconName, title: "NDA on request", copy: "Signed before you share anything sensitive." },
      { icon: "users" as IconName, title: "Never named without consent", copy: "Only listed if you say yes in writing." },
      { icon: "shield" as IconName, title: "Still disclosed on-wiki", copy: "Paid work is declared, as Wikipedia requires." },
    ],
  },

  contact: {
    eyebrow: "Get in Touch",
    title: "Could Your Name",
    highlight: "Be on This List?",
    lede: "Tell us about the subject and the coverage you have. An editor will reply in writing with an honest view.",
  },
};

export const portfolioSingleContent = {
  chip: "Case study",
  engagement: "Page creation",
  fallbackHighlight: "Wikipedia Page",
  ledeSuffix: "A source-first article built from independent, secondary coverage, and disclosed on-wiki.",
  actions: {
    live: "View live article",
    similar: { label: "Request a Similar Assessment", href: "/contact/" },
  },
  liveBadge: "Live on Wikipedia",
  facts: {
    title: "Project facts",
    subject: "Subject",
    field: "Field",
    engagement: "Engagement",
    language: "Language",
    languageValue: "English",
    disclosure: "Disclosure",
    disclosureValue: "Declared on talk page",
    status: "Status",
    live: "Live on Wikipedia",
    profile: "Profile",
    updated: "Last updated",
  },
  help: {
    eyebrow: "Need hands-on help?",
    title: "Get a written notability assessment in 2-5 days.",
    cta: { label: "Request an Assessment", href: "/contact/" },
  },
  relatedReading: {
    title: "Related reading",
    links: [
      { label: "Source-first case studies", href: "/case-studies/" },
      { label: "Hire a Wikipedia writer for similar work", href: "/hire-wikipedia-writer/" },
    ],
  },
  notes: {
    eyebrow: "01 · Engagement notes",
    title: "How This Article",
    highlight: "Came Together",
  },
  quote: "We treat the encyclopedia as a reference work, not a promotional channel.",
  standards: {
    title: "Standards applied",
    items: [
      "Independent, secondary sources only for substantive claims",
      "Neutral tone, no promotional adjectives",
      "Paid contribution disclosed on-wiki",
      "Second-editor check against every source",
    ],
  },
  after: {
    eyebrow: "02 · After acceptance",
    title: "Accuracy Still",
    highlight: "Depends on Sources",
    copy: "After acceptance, accuracy still depends on new independent reporting. The article is monitored through its first stabilisation period, and future updates follow the same source-first rules.",
  },
  related: {
    eyebrow: "More Case Studies",
    title: "Related Pages",
    highlight: "From Our Portfolio",
    viewAll: { label: "View all portfolio work", href: "/portfolio/" },
  },
  contact: {
    eyebrow: "Get in Touch",
    title: "Want a Page Built",
    highlight: "the Same Way?",
    lede: "Tell us about the subject and the coverage you have. An editor will reply in writing with an honest view.",
  },
};
