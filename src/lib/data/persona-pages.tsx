import type { Metadata } from "next";
import Link from "next/link";
import { BodyClass } from "@/components/layout/BodyClass";
import { JsonLd } from "@/components/seo/JsonLd";
import { CtaBand } from "@/components/ui/CtaBand";
import { Icon } from "@/components/ui/Icon";
import { PageHero } from "@/components/ui/PageHero";
import { url } from "@/lib/config";
import { buildPageMetadata } from "@/lib/seo";
import { titleCase } from "@/lib/utils";

interface PersonaPage {
  slug: string;
  title: string;
  shortTitle: string;
  h1: string;
  lede: string;
  description: string;
  keywords: string;
  guidelineName: string;
  guidelineUrl: string;
  points: Array<{ title: string; copy: string }>;
}

export const personaPages: PersonaPage[] = [
  {
    slug: "wikipedia-page-for-authors",
    title: "Wikipedia Page Creation for Authors",
    shortTitle: "For Authors",
    h1: "Wikipedia pages for <span>authors</span> — when WP:NAUTHOR actually applies",
    lede: "Author notability is about independent literary or scholarly attention, not sales rank alone. We assess coverage against author-specific guidelines before any drafting fee.",
    description:
      "Wikipedia page creation for authors: how WP:NAUTHOR works, what coverage counts, and how our free assessment decides whether a biography draft is worth attempting.",
    keywords:
      "wikipedia page for authors, wikipedia author notability, WP:NAUTHOR, wikipedia page creation for writers",
    guidelineName: "Wikipedia:Notability (people) / creative professionals",
    guidelineUrl: "https://en.wikipedia.org/wiki/Wikipedia:Notability_(people)",
    points: [
      {
        title: "Independent reviews matter more than blurbs",
        copy: "Publisher marketing, Amazon descriptions, and author-site bios do not establish notability. Multiple independent reviews or profiles usually do more work.",
      },
      {
        title: "Multiple works help — they are not automatic",
        copy: "A catalogue of titles helps context, but significant coverage of the person or their work is still required.",
      },
      {
        title: "Avoid résumé drafting",
        copy: "Award lists and speaking calendars without secondary sources are the fastest path to a decline.",
      },
    ],
  },
  {
    slug: "wikipedia-page-for-companies",
    title: "Wikipedia Page Creation for Companies",
    shortTitle: "For Companies",
    h1: "Wikipedia pages for <span>companies</span> under WP:NCORP",
    lede: "Company articles fail when coverage is routine business reporting or PR. We screen for significant, independent coverage before recommending a corporate draft.",
    description:
      "Wikipedia page creation for companies: WP:NCORP, significant coverage vs routine reporting, and a free assessment before you commission a draft.",
    keywords:
      "wikipedia page for companies, WP:NCORP, wikipedia company page, wikipedia page creation for businesses",
    guidelineName: "Wikipedia:Notability (organizations and companies)",
    guidelineUrl:
      "https://en.wikipedia.org/wiki/Wikipedia:Notability_(organizations_and_companies)",
    points: [
      {
        title: "Routine coverage is not enough",
        copy: "Funding announcements, directory listings, and republished press releases rarely meet organisational notability.",
      },
      {
        title: "Independence from the company",
        copy: "Coverage must not be controlled by the organisation or its marketers. We grade outlets before drafting.",
      },
      {
        title: "Criticism stays if sourced",
        copy: "We will not sell removal of well-sourced negative coverage. Encyclopedic articles summarise the record.",
      },
    ],
  },
  {
    slug: "wikipedia-page-for-academics",
    title: "Wikipedia Page Creation for Academics",
    shortTitle: "For Academics",
    h1: "Wikipedia pages for <span>academics</span> — citations are not enough alone",
    lede: "Academic notability looks for independent evidence of impact — named chairs, major awards, and secondary coverage — not only a long publication list.",
    description:
      "Wikipedia page creation for academics and researchers: how academic notability is assessed, what sources help, and when we decline a biography draft.",
    keywords:
      "wikipedia page for academics, wikipedia professor page, academic notability wikipedia, wikipedia page creation for researchers",
    guidelineName: "Wikipedia:Notability (academics)",
    guidelineUrl: "https://en.wikipedia.org/wiki/Wikipedia:Notability_(academics)",
    points: [
      {
        title: "H-index is context, not a pass",
        copy: "Citation metrics can support a case but usually need secondary commentary or clear guideline criteria.",
      },
      {
        title: "Primary papers vs secondary profiles",
        copy: "Your own papers are primary. Independent profiles, obituaries of the field, or major award coverage do more encyclopedic work.",
      },
      {
        title: "Conflict of interest care",
        copy: "Self-requested academic biographies require careful disclosure and neutral tone — we will not draft promotional CVs.",
      },
    ],
  },
  {
    slug: "wikipedia-page-for-musicians",
    title: "Wikipedia Page Creation for Musicians",
    shortTitle: "For Musicians",
    h1: "Wikipedia pages for <span>musicians</span> under WP:NMUSIC",
    lede: "Chart positions and streaming totals help only when paired with significant independent coverage. We assess music notability before any page draft.",
    description:
      "Wikipedia page creation for musicians and bands: WP:NMUSIC criteria, coverage quality, and a free assessment before drafting fees.",
    keywords:
      "wikipedia page for musicians, WP:NMUSIC, wikipedia page for singers, wikipedia band page creation",
    guidelineName: "Wikipedia:Notability (music)",
    guidelineUrl: "https://en.wikipedia.org/wiki/Wikipedia:Notability_(music)",
    points: [
      {
        title: "Streaming ≠ significant coverage",
        copy: "Playlist numbers without independent journalism rarely carry a biography through review.",
      },
      {
        title: "Multiple criteria, one dossier",
        copy: "NMUSIC lists several paths. We map which criteria might apply and which sources actually support them.",
      },
      {
        title: "Discography without sources fails",
        copy: "Track listings scraped from stores are not a substitute for secondary coverage of the artist’s career.",
      },
    ],
  },
];

export function buildPersonaMetadata(page: PersonaPage): Metadata {
  return buildPageMetadata({
    slug: page.slug,
    title: page.title,
    shortTitle: page.shortTitle,
    description: page.description,
    keywords: page.keywords,
    modified: "2026-09-07",
  });
}

const PERSONA_ICONS: Record<string, string> = {
  "wikipedia-page-for-authors": "i-write",
  "wikipedia-page-for-companies": "i-building",
  "wikipedia-page-for-academics": "i-research",
  "wikipedia-page-for-musicians": "i-globe",
};

const approachSteps = [
  {
    icon: "i-search",
    title: "Free Notability Assessment",
    copy: "We search for independent coverage and check it against the guideline that applies to you — before any fee is agreed.",
  },
  {
    icon: "i-research",
    title: "Source Map & Written Verdict",
    copy: "You get a plain-language read on what the coverage supports, what is missing, and whether a draft is worth attempting.",
  },
  {
    icon: "i-write",
    title: "Neutral Draft, Disclosed Submission",
    copy: "If the sources are there, editors draft a neutral, fully cited article and submit it with paid-contribution disclosure.",
  },
];

export function PersonaPageView({ page }: { page: PersonaPage }) {
  const pageMeta = {
    slug: page.slug,
    title: page.title,
    shortTitle: page.shortTitle,
    description: page.description,
    keywords: page.keywords,
    modified: "2026-09-07",
    schema: [
      {
        "@type": "Service",
        name: page.title,
        serviceType: "Wikipedia page creation",
        areaServed: { "@type": "Place", name: "Worldwide" },
        description: page.description,
      },
    ],
  };
  const otherAudiences = personaPages.filter((item) => item.slug !== page.slug);

  return (
    <>
      <BodyClass className="page-persona" />
      <JsonLd page={pageMeta} />
      <PageHero
        eyebrow="Audience Guide"
        h1={titleCase(page.h1)}
        lede={page.lede}
        current={page.shortTitle}
        actions={[
          { label: "Free Notability Checker", href: url("wikipedia-notability-checker") },
          { label: "Request Assessment", href: url("contact"), style: "button-outline" },
        ]}
      />

      {/* 1. What reviewers look for (white) */}
      <section className="section-pad tone-light pa-focus" aria-labelledby="pa-focus-title">
        <div className="shell">
          <div className="section-heading center reveal">
            <p className="micro-label">Guideline Focus</p>
            <h2 id="pa-focus-title">
              What Reviewers <span>Actually Look For</span>
            </h2>
            <p className="section-heading-copy">Primary reading: {page.guidelineName}.</p>
          </div>
          <ol className="pa-points reveal">
            {page.points.map((item, index) => (
              <li key={item.title} className="pa-point">
                <span className="pa-point-num" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{titleCase(item.title)}</h3>
                <p>{item.copy}</p>
              </li>
            ))}
          </ol>
          <div className="pa-guideline reveal">
            <span className="pa-icon" aria-hidden="true">
              <Icon name="i-review" />
            </span>
            <div>
              <p className="pa-guideline-label">The guideline reviewers apply</p>
              <a href={page.guidelineUrl} target="_blank" rel="noopener noreferrer">
                {page.guidelineName} ↗
              </a>
            </div>
            <Link className="button button-gold button-small" href={url("wikipedia-notability-checker")}>
              Check Your Coverage <Icon name="i-arrow" />
            </Link>
          </div>
        </div>
      </section>

      {/* 2. How we approach it (dark) */}
      <section className="section-pad tone-dark pa-approach" aria-labelledby="pa-approach-title">
        <div className="shell">
          <div className="section-heading center reveal">
            <p className="micro-label">How We Approach It</p>
            <h2 id="pa-approach-title">
              Evidence First, <span>Drafting Second</span>
            </h2>
          </div>
          <ol className="pa-steps reveal">
            {approachSteps.map((step, index) => (
              <li key={step.title} className="pa-step">
                <div className="pa-step-top">
                  <span className="pa-icon" aria-hidden="true">
                    <Icon name={step.icon} />
                  </span>
                  <span className="pa-step-num" aria-hidden="true">
                    Step {index + 1}
                  </span>
                </div>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </li>
            ))}
          </ol>
          <div className="section-actions reveal">
            <Link className="button button-outline button-small" href={url("our-process")}>
              See the Full Process <Icon name="i-arrow" />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Explore more (white) */}
      <section className="section-pad tone-light pa-more" aria-labelledby="pa-more-title">
        <div className="shell">
          <div className="section-heading center reveal">
            <p className="micro-label">Other Audiences</p>
            <h2 id="pa-more-title">
              Guides for <span>Other Subjects</span>
            </h2>
          </div>
          <ul className="pa-audiences reveal">
            {otherAudiences.map((item) => (
              <li key={item.slug}>
                <Link className="pa-audience" href={url(item.slug)}>
                  <span className="pa-icon" aria-hidden="true">
                    <Icon name={PERSONA_ICONS[item.slug] ?? "i-page"} />
                  </span>
                  <strong>{item.title}</strong>
                  <span className="pa-audience-copy">{item.lede}</span>
                  <span className="pa-audience-link">
                    Read the guide <Icon name="i-arrow" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="pa-related reveal">
            <span>Related:</span>
            <Link href={url("services/wikipedia-notability-assessment")}>Notability assessment</Link>
            <Link href={url("services/wikipedia-page-creation")}>Page creation</Link>
            <Link href={url("wikipedia-page-cost")}>Pricing</Link>
          </p>
        </div>
      </section>

      <CtaBand
        heading="Not Sure Your Coverage <span>Qualifies?</span>"
        copy="Run the free checker or ask for a human source map."
        label="Start Free Assessment"
      />
    </>
  );
}
