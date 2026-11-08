import type { IconName } from "@/components/ui/Icon";

/**
 * Blog listing + blog single copy (Figma "Blog Listing - Final" 132:140 and "Blog Single - Final" 99:140).
 * Posts themselves come from `@/lib/blog` (admin panel); only static UI copy lives here.
 */
export const blogContent = {
  band: {
    label: "Insights",
    href: "/blog/",
    copy: "Plain-language guides on Wikipedia notability, sourcing and review, written by our editorial team for founders, executives and PR leads.",
    link: { label: "Get new guides by email", href: "/blog/#newsletter" },
  },

  featured: {
    eyebrow: "Insights & Guides",
    title: "Plain-Language Guides",
    highlight: "to Getting on Wikipedia",
    searchPlaceholder: "Search guides, e.g. “notability”",
    searchLabel: "Search",
    /** Slug of the featured guide; falls back to the newest post. */
    featuredSlug: "wikipedia-notability-requirements-explained",
    featuredTag: "Featured guide",
    featuredCta: "Read the guide",
    mostRead: {
      label: "Most read",
      period: "This month",
      /** Curated list; missing slugs are skipped and topped up with the newest posts. */
      slugs: [
        "how-long-does-it-take-to-create-a-wikipedia-page",
        "paid-wikipedia-editing-disclosure-and-coi",
        "why-wikipedia-pages-get-deleted",
        "can-i-pay-someone-to-write-my-wikipedia-page",
      ],
    },
  },

  guides: {
    title: "Browse all guides",
    allLabel: "All articles",
    moreTopics: "More topics",
    /** Number of category chips shown before the "More topics" menu. */
    visibleChips: 6,
    sort: { label: "Sort:", newest: "Newest first", oldest: "Oldest first" },
    empty: "No guides match that search yet. Try another word, or browse all guides.",
    clear: "Clear filters",
    readArticle: "Read article",
  },

  newsletter: {
    title: "New guides, once a month",
    copy: "Plain-language explainers on notability, sourcing and review. No spam, unsubscribe anytime.",
    placeholder: "Your work email",
    button: "Subscribe",
    done: "Thanks, sign-up opens soon.",
  },

  topics: {
    eyebrow: "Browse by Topic",
    title: "Start With the",
    highlight: "Question You Have",
    lede: "Every guide is filed under the question it answers, so you can go straight to what matters for your subject.",
    help: {
      icon: "search" as IconName,
      title: "Not sure where to start?",
      copy: "Try the free notability checker. It takes two minutes and needs no sign-up.",
      link: { label: "Open the checker", href: "/wikipedia-notability-checker/" },
    },
    /** Topic groups → post categories (case-insensitive). `slug` is used as `/blog/?topic=<slug>`. */
    groups: [
      { slug: "eligibility-notability", title: "Eligibility & Notability", question: "Am I eligible for a Wikipedia page?", categories: ["Eligibility", "Notability", "Entity"] },
      { slug: "research-sourcing", title: "Research & Sourcing", question: "Which sources actually count?", categories: ["Research", "Sourcing"] },
      { slug: "process-review", title: "Process & Review", question: "How long will it take to go live?", categories: ["Process", "Review"] },
      { slug: "compliance-risk", title: "Compliance & Risk", question: "What are the rules, and what gets pages deleted?", categories: ["Compliance", "Risk"] },
      { slug: "pricing-buying", title: "Pricing & Buying", question: "What should it cost, and who should I hire?", categories: ["Pricing", "Buying guide"] },
      { slug: "editing-maintenance", title: "Editing & Maintenance", question: "How do I fix or protect an existing page?", categories: ["Editing", "Maintenance"] },
    ],
  },

  contact: {
    eyebrow: "Get in Touch",
    title: "Have a Question",
    highlight: "We Have Not Answered?",
    lede: "Tell us about the subject and the coverage you have. An editor will reply in writing with an honest view.",
  },

  paged: {
    eyebrow: "Insights & Guides",
    title: "Editorial Guides",
    lede: "More notes on notability, sourcing, disclosure, and how Wikipedia review actually behaves.",
  },
};

export const blogSingleContent = {
  guideLabel: "Guide",
  rail: {
    writtenBy: "Written by",
    published: "Published",
    updated: "Updated",
    readingTime: "Reading time",
    share: "Share this guide",
    onThisPage: "On this page",
    help: {
      eyebrow: "Need hands-on help?",
      title: "Get a written notability assessment in 2-5 days.",
      cta: { label: "Request an Assessment", href: "/contact/" },
    },
  },
  keyTakeaway: "Key takeaway",
  sources: {
    title: "Sources & further reading",
    links: [
      { label: "Wikipedia: Notability", href: "https://en.wikipedia.org/wiki/Wikipedia:Notability" },
      { label: "Wikipedia: Reliable sources", href: "https://en.wikipedia.org/wiki/Wikipedia:Reliable_sources" },
      { label: "Wikipedia: Conflict of interest", href: "https://en.wikipedia.org/wiki/Wikipedia:Conflict_of_interest" },
    ],
  },
  allInsights: { label: "All insights", href: "/blog/" },
  author: {
    eyebrow: "Written by",
    skills: ["Notability policy", "Source verification", "Articles for Creation", "Disclosure rules"],
    factCheck: "Fact-checked by a second editor before publication",
    more: "More from this author",
  },
  related: {
    eyebrow: "Keep Reading",
    title: "Related Guides",
    highlight: "Worth Your Time",
  },
  contact: {
    eyebrow: "Get in Touch",
    title: "Questions About",
    highlight: "Your Own Page?",
    lede: "Tell us about the subject and the coverage you have. An editor will reply in writing with an honest view.",
  },
};

/**
 * FAQ schema for the refreshed mid-sized companies guide (was `src/lib/data/blog-refresh/mid-sized-companies.ts`).
 * Emitted as FAQPage JSON-LD on that post only.
 */
export const midSizedCompaniesSlug = "how-mid-sized-companies-get-a-wikipedia-page";
export const midSizedCompaniesFaqs = [
  {
    q: "How does a mid-sized company get a Wikipedia entry?",
    a: "Size is not the test - independent coverage is. Under WP:NCORP the company needs significant coverage in reliable, independent secondary sources. Run a source audit first, then draft neutrally and submit with paid-editing disclosure if applicable.",
  },
  {
    q: "Does revenue or headcount make a company notable?",
    a: "No. Wikipedia does not use revenue, employee count, or office locations as notability shortcuts. Reviewers look for independent, in-depth coverage that is not controlled by the company.",
  },
  {
    q: "What are the most common reasons company Wikipedia pages get deleted?",
    a: "Thin or non-independent sourcing, promotional tone, over-reliance on the company website and press releases, undisclosed paid editing, and coverage that was only a short launch burst without sustained significance.",
  },
  {
    q: "Is paid Wikipedia editing allowed for companies?",
    a: "Paid editing is allowed when disclosed under the Wikimedia Terms of Use. Hiding the paid relationship is a common path to deletion and account scrutiny.",
  },
  {
    q: "Should we wait if coverage is mostly funding news?",
    a: "Usually yes. Routine funding announcements and directory listings rarely meet the independent, significant-coverage bar. Earn deeper editorial coverage first, then revisit a draft.",
  },
  {
    q: "What should we do after a page is published?",
    a: "Watch for vandalism, unsourced additions, and outdated figures. Monitoring and occasional sourced updates keep the article stable; nobody can lock a company page against volunteer edits.",
  },
];
