import type { IconName } from "@/components/ui/Icon";

/**
 * Pricing page copy (Figma "Pricing - Final", 179:4573).
 * Replace text here when final content is provided - components read only from this file.
 */

export interface PricingTier {
  id: string;
  name: string;
  /** Numeric price for schema offers. */
  price: number;
  priceLabel: string;
  blurb: string;
  bestFor: string;
  features: string[];
  featured?: boolean;
  badge?: string;
}

/** Comparison cell: `true` = check, `false` = dash, string = text. */
export type CompareCell = string | boolean;

export const pricingContent = {
  hero: {
    pill: "Published pricing  ·  Fixed in writing  ·  Free assessment first",
    title: "Wikipedia Page Pricing,",
    highlight: "Fixed Before Work Starts",
    lede: "Every engagement starts with a free notability assessment. Which tier applies depends on how much source material exists, and the figure is fixed in writing before any work begins.",
    checks: ["No approval guarantees, ever", "Reviewer revisions included", "50% upfront, 50% on submission"],
  },

  tiers: {
    eyebrow: "Packages",
    title: "Four Published Tiers,",
    highlight: "One Honest Starting Point",
    fromLabel: "From",
    bestForLabel: "BEST FOR",
    cta: { label: "Start With an Assessment", href: "/contact/" },
    note: "All prices in USD. The free assessment decides which tier applies, not guesswork.",
    items: [
      {
        id: "essential",
        name: "Essential",
        price: 700,
        priceLabel: "$700",
        blurb: "For subjects where the coverage is already clear and easy to verify.",
        bestFor: "Straightforward subjects with clear, easy-to-find coverage",
        features: ["Written notability report", "Up to 12 sources", "800-1,200 words", "1 editor + review pass", "1 revision round", "30 days monitoring"],
      },
      {
        id: "standard",
        name: "Standard",
        price: 1100,
        priceLabel: "$1,100",
        blurb: "The tier most engagements land in.",
        bestFor: "Founders, executives and companies with solid multi-source coverage",
        features: ["Up to 25 sources", "1,500-2,000 words", "2 editors with claim check", "Images + Wikidata entry", "Revisions until accepted", "90 days monitoring"],
        featured: true,
        badge: "MOST CHOSEN",
      },
      {
        id: "comprehensive",
        name: "Comprehensive",
        price: 1800,
        priceLabel: "$1,800",
        blurb: "For subjects rejected before, or where sourcing needs real digging.",
        bestFor: "Previously rejected subjects and complex histories",
        features: [
          "Unlimited sources, incl. archives",
          "2,500+ words",
          "Senior lead + compliance review",
          "Citation map + archived links",
          "1 language version included",
          "6 months + quarterly report",
        ],
      },
      {
        id: "custom",
        name: "Custom",
        price: 2500,
        priceLabel: "$2,500",
        blurb: "For contested subjects, corporate groups or multi-language rollouts.",
        bestFor: "Contested subjects, prior AfD, multi-language",
        features: ["Specialist research", "Scoped length and languages", "Full editorial team", "Full citation handling", "Revisions until accepted", "12 months monitoring"],
      },
    ] satisfies PricingTier[],
  },

  compare: {
    eyebrow: "Compare Packages",
    title: "Everything Included,",
    highlight: "Tier by Tier",
    firstColumn: "What’s included",
    columns: ["Essential · $700", "Standard · $1,100", "Comprehensive · $1,800", "Custom · $2,500+"],
    /** Index of the highlighted (featured) column. */
    featuredColumn: 1,
    swipeHint: "Swipe to compare all four tiers",
    rows: [
      { label: "Free notability assessment", values: [true, true, true, true] },
      { label: "Sources researched", values: ["Up to 12", "Up to 25", "Unlimited", "Unlimited + specialist"] },
      { label: "Article length", values: ["800-1,200 words", "1,500-2,000 words", "2,500+ words", "Scoped"] },
      { label: "Editors", values: ["1 + review pass", "2 editors", "Senior + 2nd + compliance", "Full team"] },
      { label: "Infobox", values: ["Basic", "Full", "Full", "Full"] },
      { label: "Images & Wikidata", values: [false, true, true, true] },
      { label: "Paid-editing disclosure", values: [true, true, true, true] },
      { label: "Reviewer revisions", values: ["1 round", "Until accepted", "Until accepted", "Until accepted"] },
      { label: "Talk-page support", values: [false, true, true, true] },
      { label: "Monitoring", values: ["30 days", "90 days", "6 months", "12 months"] },
      { label: "Extra language", values: [false, false, "1 included", "Scoped"] },
    ] satisfies Array<{ label: string; values: CompareCell[] }>,
  },

  addOns: {
    eyebrow: "Add-Ons",
    title: "Extras You Can Add",
    highlight: "to Any Package",
    aside: "Priced separately, quoted in writing, and only recommended when they help.",
    items: [
      { icon: "manage" as IconName, price: "$250/month or $2,500/year", title: "Ongoing Page Management", copy: "Watchlist monitoring, edit assessment, milestone updates and a quarterly report." },
      { icon: "edit" as IconName, price: "From $450", title: "Existing Page Editing & Expansion", copy: "Scope depends on the article’s current state." },
      { icon: "globe" as IconName, price: "$400 each", title: "Additional Language Version", copy: "Beyond any language version already in your tier." },
      { icon: "network" as IconName, price: "$250", title: "Wikidata Entry Only", copy: "A standalone structured-data entry." },
      { icon: "shield" as IconName, price: "From $600", title: "Deletion (AfD) Response", copy: "Defence at a deletion discussion. Outcome never guaranteed." },
      { icon: "clock" as IconName, price: "+25%", title: "Rush Handling", copy: "Drafting timeline only; the review queue is outside our control." },
    ],
  },

  drivers: {
    eyebrow: "What Moves the Price",
    title: "Why Two Quotes",
    highlight: "Can Differ",
    lede: "Price follows research load and risk, not how badly someone wants a page. These six factors decide which tier applies.",
    headers: ["FACTOR", "KEEPS PRICE DOWN", "PUSHES PRICE UP"],
    rows: [
      { factor: "Source availability", down: "Several substantial pieces in established outlets", up: "Many thin mentions, or mostly paywalled" },
      { factor: "Source accessibility", down: "Openly available online", up: "Print archives, books, non-English sources" },
      { factor: "Subject history", down: "No prior Wikipedia activity", up: "Rejected draft, deleted page or active dispute" },
      { factor: "Subject type", down: "Clear subject-specific guideline", up: "Company or founder, judged more strictly" },
      { factor: "Controversy in sources", down: "Factual and consistent coverage", up: "Sources disagree or include unwanted material" },
      { factor: "Languages", down: "English only", up: "Additional language versions" },
    ],
  },

  faq: {
    eyebrow: "Pricing Questions",
    title: "Straight Answers",
    highlight: "About Cost",
    lede: "Refunds, payment plans, retainers and what we will never charge for.",
    items: [
      {
        q: "Do you charge for the notability assessment?",
        a: "No. The assessment is free and comes with a written verdict. If the coverage is not there, we tell you before any work is commissioned.",
      },
      {
        q: "Why do Wikipedia agencies charge such different prices?",
        a: "Because they are pricing different work. Some price the writing, which is the small part. Some price the research, which is most of it. And some price a guaranteed outcome, which nobody can actually deliver. Ask any agency what proportion of the fee covers source research before you compare quotes.",
      },
      {
        q: "Do I pay again if the page is rejected at review?",
        a: "No. Reviewer-feedback revisions are included in your tier. On Standard and above we keep responding to reviewer comments until the article is accepted or a genuine blocker is documented in writing.",
      },
      {
        q: "Is there a refund if the page is never published?",
        a: "We do not refund research that was properly done: the notability report and source pack are real deliverables you keep. What we do instead is prevent that situation at the assessment stage, which is exactly why the assessment is free and honest.",
      },
      {
        q: "Do you offer payment plans?",
        a: "Engagements are split 50% at the start and 50% on submission as standard. For Comprehensive and Custom tiers we can stage payments across the research and drafting milestones.",
      },
      {
        q: "What does ongoing management cost?",
        a: "$250 a month or $2,500 a year. You need it if the subject is active enough that facts change or the article attracts edits. If neither is true, a page can sit stable for years without it, and we will say so rather than sell you a retainer.",
      },
    ],
  },

  contact: {
    eyebrow: "Get in Touch",
    title: "Find Out Which Tier",
    highlight: "Applies to You",
    lede: "Tell us about the subject and the coverage you have. An editor will reply in writing with an honest view.",
  },
};
