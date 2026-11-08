import type { IconName } from "@/components/ui/Icon";

/**
 * Persona ("Wikipedia page for …") copy.
 * Source: Figma "Persona (Companies/Authors/Academics/Musicians) - Final" (179:1673, 182:1816, 182:2026, 182:2234).
 * One shared template (components/sections/persona) renders every entry.
 */

export type PersonaKey = "companies" | "authors" | "academics" | "musicians";

export interface PersonaPage {
  key: PersonaKey;
  slug: string;
  meta: { title: string; shortTitle: string; description: string; keywords: string };
  hero: { title: string; highlight: string; lede: string };
  guideline: {
    icon: IconName;
    name: string;
    url: string;
    counts: string[];
    doesNotCount: string[];
  };
  checks: {
    title: string;
    highlight: string;
    aside: string;
    items: Array<{ icon: IconName; title: string; copy: string }>;
  };
  faq: {
    eyebrow: string;
    title: string;
    highlight: string;
    lede: string;
    items: Array<{ q: string; a: string }>;
  };
}

/** Copy shared by every persona page. */
export const personaShared = {
  tabs: [
    { key: "companies" as PersonaKey, label: "Companies", icon: "building" as IconName, href: "/wikipedia-page-for-companies/" },
    { key: "authors" as PersonaKey, label: "Authors", icon: "write" as IconName, href: "/wikipedia-page-for-authors/" },
    { key: "academics" as PersonaKey, label: "Academics", icon: "research" as IconName, href: "/wikipedia-page-for-academics/" },
    { key: "musicians" as PersonaKey, label: "Musicians", icon: "chat" as IconName, href: "/wikipedia-page-for-musicians/" },
  ],
  actions: [
    { label: "Start Free Assessment", href: "/contact/" },
    { label: "Try the Notability Checker", href: "/wikipedia-notability-checker/" },
  ],
  guidelineLabel: "GUIDELINE THAT APPLIES",
  checksEyebrow: "What Reviewers Check",
  howItWorks: {
    eyebrow: "How It Works",
    title: "From Sources to a",
    highlight: "Disclosed Submission",
    steps: [
      {
        icon: "search" as IconName,
        label: "STEP 01",
        title: "Free Notability Assessment",
        copy: "We search for independent coverage and check it against the guideline that applies to you, before any fee is agreed.",
      },
      {
        icon: "plan" as IconName,
        label: "STEP 02",
        title: "Source Map & Written Verdict",
        copy: "A plain-language read on what the coverage supports, what is missing, and whether a draft is worth attempting.",
      },
      {
        icon: "publish" as IconName,
        label: "STEP 03",
        title: "Neutral Draft, Disclosed Submission",
        copy: "If the sources are there, editors draft a neutral, fully cited article and submit it with paid-contribution disclosure.",
      },
    ],
  },
  contact: {
    eyebrow: "Get in Touch",
    title: "Not Sure Your Coverage",
    highlight: "Qualifies?",
    lede: "Tell us about the subject and the coverage you have. An editor will reply in writing with an honest view.",
  },
};

export const personaPages: Record<PersonaKey, PersonaPage> = {
  companies: {
    key: "companies",
    slug: "wikipedia-page-for-companies",
    meta: {
      title: "Wikipedia Page Creation for Companies",
      shortTitle: "For Companies",
      description:
        "Wikipedia page creation for companies: WP:NCORP, significant coverage vs routine reporting, and a free assessment before you commission a draft.",
      keywords: "wikipedia page for companies, WP:NCORP, wikipedia company page, wikipedia page creation for businesses",
    },
    hero: {
      title: "Wikipedia Pages for",
      highlight: "Companies Under WP:NCORP",
      lede: "Company articles fail when coverage is routine business reporting or PR. We screen for significant, independent coverage before recommending a corporate draft.",
    },
    guideline: {
      icon: "building",
      name: "Wikipedia: Notability (organizations and companies)",
      url: "https://en.wikipedia.org/wiki/Wikipedia:Notability_(organizations_and_companies)",
      counts: ["In-depth business-press profiles", "Analytical or investigative features"],
      doesNotCount: ["Funding announcements and press releases", "Directory listings and routine news"],
    },
    checks: {
      title: "Three Things That Decide",
      highlight: "a Company Article",
      aside: "Size, revenue and funding are not the test. Independent, in-depth coverage is.",
      items: [
        {
          icon: "edit",
          title: "Routine coverage is not enough",
          copy: "Funding announcements, directory listings and republished press releases rarely meet organisational notability.",
        },
        {
          icon: "shield",
          title: "Independence from the company",
          copy: "Coverage must not be controlled by the organisation or its marketers. We grade every outlet before drafting.",
        },
        {
          icon: "review",
          title: "Criticism stays if sourced",
          copy: "We will not sell removal of well-sourced negative coverage. Encyclopedic articles summarise the record.",
        },
      ],
    },
    faq: {
      eyebrow: "Mid-Sized Company Guide",
      title: "Questions Companies",
      highlight: "Ask Us Most",
      lede: "Straight answers on what it takes for a company to qualify, and what to do after a deletion.",
      items: [
        {
          q: "How does a mid-sized company get a Wikipedia entry?",
          a: "Size is not the test, independent coverage is. A mid-sized company qualifies when several reliable, independent publications have written about it in depth. The usual path is a source audit first, then a neutral, fully cited draft submitted through Articles for Creation with disclosure.",
        },
        {
          q: "What are the most common reasons company pages get deleted?",
          a: "Most deletions come from the same problems: notability was assumed rather than shown with independent sources; the tone reads like marketing copy; citations are press releases, sponsored posts or routine announcements; the page was created by undisclosed insiders; or the article drifted into a product brochure over time.",
        },
        {
          q: "Is revenue, headcount or funding enough to qualify?",
          a: "No. Wikipedia does not set a revenue, employee or funding threshold. A large private company with no in-depth coverage can fail, while a smaller firm profiled by several independent outlets can pass. Funding rounds count only when journalists analyse them rather than repeat the announcement.",
        },
        {
          q: "Can a deleted company page be recreated?",
          a: "Yes, but only once the reason for deletion is fixed, usually by new independent coverage. Recreating a substantially identical page can be speedily deleted again, so the safer route is a fresh draft through Articles for Creation that addresses the points raised in the original discussion.",
        },
      ],
    },
  },

  authors: {
    key: "authors",
    slug: "wikipedia-page-for-authors",
    meta: {
      title: "Wikipedia Page Creation for Authors",
      shortTitle: "For Authors",
      description:
        "Wikipedia page creation for authors: how WP:NAUTHOR works, what coverage counts, and how our free assessment decides whether a biography draft is worth attempting.",
      keywords: "wikipedia page for authors, wikipedia author notability, WP:NAUTHOR, wikipedia page creation for writers",
    },
    hero: {
      title: "Wikipedia Pages for",
      highlight: "Authors Under WP:NAUTHOR",
      lede: "Author notability is about independent literary or scholarly attention, not sales rank alone. We assess coverage against author-specific guidelines before any drafting fee.",
    },
    guideline: {
      icon: "write",
      name: "Wikipedia: Notability (people) / creative professionals",
      url: "https://en.wikipedia.org/wiki/Wikipedia:Notability_(people)",
      counts: ["Independent reviews of your books", "Profiles or criticism in literary press"],
      doesNotCount: ["Publisher marketing and blurbs", "Sales rank and Amazon descriptions"],
    },
    checks: {
      title: "Three Things That Decide",
      highlight: "an Author Article",
      aside: "Sales rank and blurbs are not the test. Independent literary attention is.",
      items: [
        {
          icon: "edit",
          title: "Independent reviews matter more than blurbs",
          copy: "Publisher marketing, Amazon descriptions and author-site bios do not establish notability. Multiple independent reviews or profiles usually do more work.",
        },
        {
          icon: "shield",
          title: "Multiple works help, they are not automatic",
          copy: "A catalogue of titles helps context, but significant coverage of the person or their work is still required.",
        },
        {
          icon: "review",
          title: "Avoid résumé drafting",
          copy: "Award lists and speaking calendars without secondary sources are the fastest path to a decline.",
        },
      ],
    },
    faq: {
      eyebrow: "Author Questions",
      title: "Questions Authors",
      highlight: "Ask Us Most",
      lede: "Straight answers on what it takes for an author to qualify, and what does not count.",
      // TODO(content): answers 2-4 are placeholders (Figma shows only the first answer).
      items: [
        {
          q: "Is having a published book enough for a Wikipedia page?",
          a: "No. Wikipedia looks for significant independent coverage of you or your work, such as multiple reviews in reliable outlets. A catalogue of titles adds context but does not establish notability alone.",
        },
        {
          q: "Do self-published books count?",
          a: "Self-publishing does not rule you out, but the book itself is never the evidence. What counts is independent coverage of it: reviews, profiles or criticism in reliable outlets that you did not pay for or control.",
        },
        {
          q: "Do awards and bestseller lists help?",
          a: "Major, independently judged awards and recognised bestseller lists can support a case, especially when reliable sources report on them. Minor or pay-to-enter awards carry little weight.",
        },
        {
          q: "Can my publisher write the page for me?",
          a: "A publisher has a conflict of interest, so any edits must be disclosed and the article must stay neutral. Drafts written by marketing teams usually read as promotional and are declined at review.",
        },
      ],
    },
  },

  academics: {
    key: "academics",
    slug: "wikipedia-page-for-academics",
    meta: {
      title: "Wikipedia Page Creation for Academics",
      shortTitle: "For Academics",
      description:
        "Wikipedia page creation for academics and researchers: how academic notability is assessed, what sources help, and when we decline a biography draft.",
      keywords: "wikipedia page for academics, wikipedia professor page, academic notability wikipedia, wikipedia page creation for researchers",
    },
    hero: {
      title: "Wikipedia Pages for",
      highlight: "Academics Under WP:PROF",
      lede: "Academic notability looks for independent evidence of impact, such as named chairs, major awards and secondary coverage, not only a long publication list.",
    },
    guideline: {
      icon: "research",
      name: "Wikipedia: Notability (academics)",
      url: "https://en.wikipedia.org/wiki/Wikipedia:Notability_(academics)",
      counts: ["Named or distinguished chairs", "Major academic awards and fellowships"],
      doesNotCount: ["Publication lists on their own", "Department pages and CVs"],
    },
    checks: {
      title: "Three Things That Decide",
      highlight: "an Academic Article",
      aside: "A long publication list is not the test. Independent evidence of impact is.",
      items: [
        {
          icon: "edit",
          title: "H-index is context, not a pass",
          copy: "Citation metrics can support a case but usually need secondary commentary or clear guideline criteria.",
        },
        {
          icon: "shield",
          title: "Primary papers vs secondary profiles",
          copy: "Your own papers are primary. Independent profiles, field obituaries or major award coverage do more encyclopedic work.",
        },
        {
          icon: "review",
          title: "Conflict of interest care",
          copy: "Self-requested academic biographies need careful disclosure and a neutral tone. We will not draft promotional CVs.",
        },
      ],
    },
    faq: {
      eyebrow: "Academic Questions",
      title: "Questions Academics",
      highlight: "Ask Us Most",
      lede: "Straight answers on how academic notability is judged, and when we decline a draft.",
      // TODO(content): answers 2-4 are placeholders (Figma shows only the first answer).
      items: [
        {
          q: "Is my h-index enough to qualify?",
          a: "Citation metrics can support a case, but they usually need secondary commentary or a clear guideline criterion, such as a named chair or a major award.",
        },
        {
          q: "Do my own papers count as sources?",
          a: "They can verify what you published, but they are primary sources and do not establish notability. Independent profiles, reviews of your work and coverage of your awards carry that weight.",
        },
        {
          q: "Can my university write my Wikipedia page?",
          a: "University communications teams have a conflict of interest, so any involvement must be disclosed and the article must read neutrally. Department pages can confirm facts but cannot be the backbone of the article.",
        },
        {
          q: "Which academic criteria usually apply?",
          a: "The academic guideline looks for things like significant impact in the field shown by independent sources, a named or distinguished chair, a major award or fellowship, or a top editorial or institutional role. Meeting one clearly is usually enough.",
        },
      ],
    },
  },

  musicians: {
    key: "musicians",
    slug: "wikipedia-page-for-musicians",
    meta: {
      title: "Wikipedia Page Creation for Musicians",
      shortTitle: "For Musicians",
      description:
        "Wikipedia page creation for musicians and bands: WP:NMUSIC criteria, coverage quality, and a free assessment before drafting fees.",
      keywords: "wikipedia page for musicians, WP:NMUSIC, wikipedia page for singers, wikipedia band page creation",
    },
    hero: {
      title: "Wikipedia Pages for",
      highlight: "Musicians Under WP:NMUSIC",
      lede: "Chart positions and streaming totals help only when paired with significant independent coverage. We assess music notability before any page draft.",
    },
    guideline: {
      icon: "chat",
      name: "Wikipedia: Notability (music)",
      url: "https://en.wikipedia.org/wiki/Wikipedia:Notability_(music)",
      counts: ["Independent music journalism", "Charting on a national music chart"],
      doesNotCount: ["Streaming and playlist numbers alone", "Store-scraped discographies"],
    },
    checks: {
      title: "Three Things That Decide",
      highlight: "a Music Article",
      aside: "Streams and followers are not the test. Independent coverage is.",
      items: [
        {
          icon: "edit",
          title: "Streaming is not significant coverage",
          copy: "Playlist numbers without independent journalism rarely carry a biography through review.",
        },
        {
          icon: "shield",
          title: "Multiple criteria, one dossier",
          copy: "WP:NMUSIC lists several paths. We map which criteria might apply and which sources actually support them.",
        },
        {
          icon: "review",
          title: "Discography without sources fails",
          copy: "Track listings scraped from stores are not a substitute for secondary coverage of the artist’s career.",
        },
      ],
    },
    faq: {
      eyebrow: "Music Questions",
      title: "Questions Musicians",
      highlight: "Ask Us Most",
      lede: "Straight answers on what music notability needs, and what streaming numbers can and cannot do.",
      // TODO(content): answers 2-4 are placeholders (Figma shows only the first answer).
      items: [
        {
          q: "Are streaming numbers enough for a Wikipedia page?",
          a: "Rarely. Playlist and streaming totals without independent journalism seldom carry a biography through review.",
        },
        {
          q: "Does charting help?",
          a: "Charting on a recognised national chart is one of the music criteria and can support a case, but the article still needs reliable sources to verify it and say something about the artist.",
        },
        {
          q: "Should the page be about me or my band?",
          a: "It depends where the coverage sits. If journalists write about the band, the article is usually about the band; a separate biography only makes sense when members have significant coverage of their own.",
        },
        {
          q: "Can my label or manager write the page?",
          a: "Labels and managers have a conflict of interest, so their involvement must be disclosed and the tone must stay neutral. Press-kit copy is one of the most common reasons music drafts are declined.",
        },
      ],
    },
  },
};
