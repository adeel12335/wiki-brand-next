import type { IconName } from "@/components/ui/Icon";

/** Case Studies copy (Figma "Case Studies - Final" 176:931). */
export const caseStudiesContent = {
  hero: {
    title: "Source-First Wikipedia",
    highlight: "Case Studies",
    lede: "Short narratives from published portfolio work: what we looked for in the sources, how drafting stayed neutral, and why disclosure and aftercare matter. Outcomes are never guaranteed.",
    actions: [
      { label: "Request a Free Assessment", href: "/contact/" },
      { label: "View Full Portfolio", href: "/portfolio/" },
    ],
    panel: {
      title: "Inside every case",
      items: [
        { icon: "search" as IconName, title: "Source audit", copy: "What independent outlets actually published" },
        { icon: "write" as IconName, title: "Neutral drafting", copy: "Claims enter only with a reliable citation" },
        { icon: "shield" as IconName, title: "Disclosure", copy: "Paid editing declared on the record" },
        { icon: "manage" as IconName, title: "Aftercare", copy: "Monitoring, without promising a locked page" },
      ],
    },
  },

  cases: {
    eyebrow: "Featured Cases",
    title: "Two Engagements,",
    highlight: "Told Source by Source",
    aside: "Each case is shown with the client’s permission and links to the live, independently reviewed article.",
    liveBadge: "Live on Wikipedia",
    readCase: "Read the Full Case",
    viewOnWikipedia: "View on Wikipedia",
    /** `slug` links to the portfolio item; image/url fall back to these values when the CMS item is missing. */
    items: [
      {
        slug: "david-bianchi",
        subject: "David Bianchi",
        role: "American-Brazilian actor",
        image: "/assets/portfolio/david-bianchi.jpg",
        wikipedia: "https://en.wikipedia.org/wiki/David_Bianchi",
        title: "Independent Coverage First, Then a Durable Biography Structure",
        story:
          "The engagement started with a source audit: which outlets covered the subject independently, how deep that coverage ran, and whether the record could support a durable article. Claims entered only when a reliable citation could carry them.",
        focus: ["Disclosed paid editing", "Source audit", "Biography policy"],
      },
      {
        slug: "markell-johnson",
        subject: "Markell Johnson",
        role: "American professional basketball player",
        image: "/assets/portfolio/markell-johnson.jpg",
        wikipedia: "https://en.wikipedia.org/wiki/Markell_Johnson",
        title: "Proportion, Neutrality and Post-Publication Realism",
        story:
          "Work focused on verifying independent reporting, avoiding résumé padding and keeping living-person material inside policy. After acceptance, monitoring catches vandalism and contested edits, but nobody can lock a page.",
        focus: ["Independent verification", "Post-publication monitoring", "Living-person care"],
      },
    ],
  },

  lessons: {
    eyebrow: "What Both Cases Share",
    title: "Three Rules That",
    highlight: "Shaped Every Draft",
    items: [
      {
        icon: "research" as IconName,
        title: "Sources Before Prose",
        copy: "Both engagements began with what independent outlets had actually published, and claims entered only when a reliable citation could carry them.",
      },
      {
        icon: "write" as IconName,
        title: "Neutral, Not Promotional",
        copy: "Proportion over résumé padding, living-person material kept inside policy, and paid editing disclosed on the record.",
      },
      {
        icon: "manage" as IconName,
        title: "Aftercare Is Realistic",
        copy: "Review still decides outcomes. After acceptance, accuracy depends on new reporting: monitoring helps, but no one can lock a page.",
      },
    ],
  },

  contact: {
    eyebrow: "Get in Touch",
    title: "Want This Level of",
    highlight: "Source Discipline on Your File?",
    lede: "Tell us about the subject and the coverage you have. An editor will reply in writing with an honest view.",
  },
};
