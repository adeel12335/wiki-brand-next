import type { IconName } from "@/components/ui/Icon";

/** HTML Sitemap copy (Figma "HTML Sitemap - Final" 179:4195). Blog posts and portfolio items are appended from the data helpers. */

export interface SitemapLink {
  label: string;
  href: string;
}

export interface SitemapGroup {
  id: string;
  title: string;
  icon: IconName;
  links: SitemapLink[];
}

export const sitemapContent = {
  hero: {
    title: "Every Public Page,",
    highlight: "in One Place.",
    lede: "A crawlable directory of services, pricing, process, portfolio and editorial guides.",
    filterPlaceholder: "Filter pages…",
    noResults: "No pages match that filter.",
  },

  groups: [
    {
      id: "main",
      title: "Main pages",
      icon: "globe",
      links: [
        { label: "Home", href: "/" },
        { label: "About Us", href: "/about-us/" },
        { label: "Our Process", href: "/process/" },
        { label: "Pricing", href: "/wikipedia-page-cost/" },
        { label: "Contact", href: "/contact/" },
        { label: "FAQ", href: "/faq/" },
      ],
    },
    {
      id: "services",
      title: "Services",
      icon: "page",
      links: [
        { label: "Wikipedia Page Creation", href: "/services/wikipedia-page-creation/" },
        { label: "Page Editing & Expansion", href: "/services/wikipedia-page-editing/" },
        { label: "Content Writing & Research", href: "/services/wikipedia-content-writing/" },
        { label: "Page Management", href: "/services/wikipedia-page-management/" },
        { label: "Notability Assessment", href: "/services/wikipedia-notability-assessment/" },
        { label: "Knowledge Panel Creation", href: "/services/google-knowledge-panel-creation/" },
        { label: "Reputation & Entity Building", href: "/services/wikipedia-reputation-management/" },
        { label: "Page Monitoring", href: "/services/wikipedia-page-monitoring/" },
      ],
    },
    {
      id: "who-we-help",
      title: "Who we help",
      icon: "users",
      links: [
        { label: "Wikipedia Page for Companies", href: "/wikipedia-page-for-companies/" },
        { label: "Wikipedia Page for Authors", href: "/wikipedia-page-for-authors/" },
        { label: "Wikipedia Page for Academics", href: "/wikipedia-page-for-academics/" },
        { label: "Wikipedia Page for Musicians", href: "/wikipedia-page-for-musicians/" },
      ],
    },
    {
      id: "portfolio-proof",
      title: "Portfolio & proof",
      icon: "trophy",
      links: [
        { label: "Portfolio", href: "/portfolio/" },
        { label: "Case Studies", href: "/case-studies/" },
        { label: "Editorial Team", href: "/about-us/#team" },
      ],
    },
    {
      id: "insights",
      title: "Insights & guides",
      icon: "write",
      links: [
        { label: "Blog", href: "/blog/" },
        { label: "Resources", href: "/resources/" },
        { label: "Notability Checker", href: "/wikipedia-notability-checker/" },
        { label: "Hire a Wikipedia Writer", href: "/hire-wikipedia-writer/" },
        { label: "How to Choose an Agency", href: "/how-to-choose-wikipedia-agency/" },
      ],
    },
    {
      id: "legal",
      title: "Legal",
      icon: "shield",
      links: [
        { label: "Privacy Policy", href: "/privacy-policy/" },
        { label: "Terms & Conditions", href: "/terms-conditions/" },
        { label: "HTML Sitemap", href: "/sitemap/" },
      ],
    },
  ] satisfies SitemapGroup[],

  /** Data-driven groups (not in the Figma frame, rendered with the same card). */
  blogGroup: { id: "articles", title: "Blog articles", icon: "write" as IconName },
  portfolioGroup: { id: "published-work", title: "Published work", icon: "trophy" as IconName },

  pricingBand: {
    title: "Looking for",
    highlight: "Pricing?",
    copy: "Published packages start from $700. Every engagement begins with a free notability assessment.",
    actions: [
      { label: "See Pricing", href: "/wikipedia-page-cost/", variant: "gold" as const },
      { label: "Free Assessment", href: "/contact/", variant: "ghost" as const },
    ],
  },
};
