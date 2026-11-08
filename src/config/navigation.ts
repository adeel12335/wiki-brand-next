import type { IconName } from "@/components/ui/Icon";

/** Header, mega menu, mobile menu and footer links (from Figma "NAV / Mega Menu" + "O2 / Footer"). */

export interface MenuLink {
  label: string;
  href: string;
  description?: string;
  icon?: IconName;
}

export interface MenuGroup {
  label: string;
  links: MenuLink[];
}

export interface MenuFeature {
  kicker: string;
  title: string;
  copy: string;
  cta: MenuLink;
  icon: IconName;
}

export interface NavItem {
  label: string;
  href: string;
  groups?: MenuGroup[];
  feature?: MenuFeature;
  /** Paths that mark this item as current. Defaults to its href + every link in its groups. */
  activePaths?: string[];
}

export const primaryNav: NavItem[] = [
  {
    label: "Services",
    href: "/services/",
    groups: [
      {
        label: "Services",
        links: [
          { label: "Wikipedia Page Creation", description: "Researched, neutral, fully cited articles", href: "/services/wikipedia-page-creation/", icon: "page" },
          { label: "Page Editing & Expansion", description: "Fix tags, gaps and outdated sections", href: "/services/wikipedia-page-editing/", icon: "edit" },
          { label: "Content Writing & Research", description: "Source-first drafting for any subject", href: "/services/wikipedia-content-writing/", icon: "write" },
          { label: "Page Management", description: "Monitoring and stabilisation after launch", href: "/services/wikipedia-page-management/", icon: "manage" },
        ],
      },
      {
        label: "More Services",
        links: [
          { label: "Notability Assessment", description: "A free written verdict in 2-5 days", href: "/services/wikipedia-notability-assessment/", icon: "search" },
          { label: "Knowledge Panel Creation", description: "Entity consistency across Wikidata", href: "/services/google-knowledge-panel-creation/", icon: "network" },
          { label: "Reputation & Entity Building", description: "Accurate, neutral public records", href: "/services/wikipedia-reputation-management/", icon: "shield" },
          { label: "Page Monitoring", description: "Catch problem edits early", href: "/services/wikipedia-page-monitoring/", icon: "review" },
        ],
      },
      {
        label: "Who We Help",
        links: [
          { label: "Companies", description: "Under WP:NCORP", href: "/wikipedia-page-for-companies/", icon: "building" },
          { label: "Authors", description: "Under WP:NAUTHOR", href: "/wikipedia-page-for-authors/", icon: "write" },
          { label: "Academics", description: "Under WP:PROF", href: "/wikipedia-page-for-academics/", icon: "research" },
          { label: "Musicians", description: "Under WP:NMUSIC", href: "/wikipedia-page-for-musicians/", icon: "chat" },
        ],
      },
    ],
  },
  { label: "Pricing", href: "/wikipedia-page-cost/" },
  { label: "Process", href: "/process/" },
  { label: "Portfolio", href: "/portfolio/" },
  {
    label: "Insights",
    href: "/blog/",
    groups: [
      {
        label: "Learn",
        links: [
          { label: "Blog", description: "Plain-language guides to Wikipedia", href: "/blog/", icon: "write" },
          { label: "Resources", description: "Guides and citeable facts for partners", href: "/resources/", icon: "layers" },
          { label: "FAQ", description: "Straight answers to common questions", href: "/faq/", icon: "info" },
          { label: "Case Studies", description: "Source-first engagements, in full", href: "/case-studies/", icon: "clipboard" },
        ],
      },
      {
        label: "Guides & Tools",
        links: [
          { label: "Notability Checker", description: "Free two-minute preliminary screen", href: "/wikipedia-notability-checker/", icon: "search" },
          { label: "Hire a Wikipedia Writer", description: "Writers who check the sources first", href: "/hire-wikipedia-writer/", icon: "users" },
          { label: "How to Choose an Agency", description: "Spot red flags before you pay", href: "/how-to-choose-wikipedia-agency/", icon: "shield" },
          { label: "Sitemap", description: "Every public page in one place", href: "/sitemap/", icon: "layers" },
        ],
      },
    ],
    feature: {
      kicker: "Free Tool",
      title: "Check Your Notability in Two Minutes",
      copy: "Answer a few source questions and get an honest preliminary screen before you pay for a draft.",
      cta: { label: "Try the Checker", href: "/wikipedia-notability-checker/" },
      icon: "search",
    },
  },
];

export const aboutNav: NavItem = {
  label: "About Us",
  href: "/about-us/",
  // Process / Portfolio / Contact have their own nav items or buttons, so only About itself is "current".
  activePaths: ["/about-us/"],
  groups: [
    {
      label: "Company",
      links: [
        { label: "About Us", description: "Who we are and why we exist", href: "/about-us/", icon: "globe" },
        { label: "Our Process", description: "Five stages, evidence first", href: "/process/", icon: "plan" },
        { label: "Portfolio", description: "Published, reviewed pages", href: "/portfolio/", icon: "trophy" },
      ],
    },
    {
      label: "People & Contact",
      links: [
        { label: "Editorial Team", description: "The desk behind every article", href: "/about-us/#team", icon: "users" },
        { label: "Contact", description: "Talk to an editor, not sales", href: "/contact/", icon: "mail" },
        { label: "Call Us", description: "+1 (218) 305-9586", href: "tel:+12183059586", icon: "phone" },
      ],
    },
  ],
  feature: {
    kicker: "Reply Window",
    title: "Talk to an Editor Within One Business Day",
    copy: "Send the coverage that exists. You get an honest, written view, whatever the answer.",
    cta: { label: "Contact Us", href: "/contact/" },
    icon: "clock",
  },
};

export const headerActions = {
  primary: { label: "Free Assessment", href: "/contact/" },
  secondary: { label: "Contact Us", href: "/contact/" },
};

export const trustItems = [
  "Independent editorial services",
  "Not affiliated with the Wikimedia Foundation",
  "Trusted by individuals & organisations worldwide",
];

export const footerColumns: MenuGroup[] = [
  {
    label: "About Us",
    links: [
      { label: "Our Process", href: "/process/" },
      { label: "Pricing", href: "/wikipedia-page-cost/" },
      { label: "Editorial Team", href: "/about-us/#team" },
      { label: "Portfolio", href: "/portfolio/" },
      { label: "Case Studies", href: "/case-studies/" },
    ],
  },
  {
    label: "Services",
    links: [
      { label: "Page Creation", href: "/services/wikipedia-page-creation/" },
      { label: "Page Editing & Expansion", href: "/services/wikipedia-page-editing/" },
      { label: "Content Writing", href: "/services/wikipedia-content-writing/" },
      { label: "Page Management", href: "/services/wikipedia-page-management/" },
      { label: "Notability Assessment", href: "/services/wikipedia-notability-assessment/" },
    ],
  },
  {
    label: "Insights",
    links: [
      { label: "Blog", href: "/blog/" },
      { label: "Notability Checker", href: "/wikipedia-notability-checker/" },
      { label: "How to Choose an Agency", href: "/how-to-choose-wikipedia-agency/" },
      { label: "FAQ", href: "/faq/" },
    ],
  },
  {
    label: "Who We Help",
    links: [
      { label: "Companies", href: "/wikipedia-page-for-companies/" },
      { label: "Authors", href: "/wikipedia-page-for-authors/" },
      { label: "Academics", href: "/wikipedia-page-for-academics/" },
      { label: "Musicians", href: "/wikipedia-page-for-musicians/" },
    ],
  },
];

export const legalLinks: MenuLink[] = [
  { label: "Privacy Policy", href: "/privacy-policy/" },
  { label: "Terms & Conditions", href: "/terms-conditions/" },
  { label: "Sitemap", href: "/sitemap/" },
];

/** TODO(content): add the real LinkedIn / YouTube profile URLs. Empty href = icon hidden. */
export const socialLinks: MenuLink[] = [
  { label: "LinkedIn", href: "", icon: "linkedin" },
  { label: "X", href: "https://x.com/wikipediastudio", icon: "x-social" },
  { label: "YouTube", href: "", icon: "youtube" },
];
