import type { Metadata } from "next";
import Link from "next/link";
import { BodyClass } from "@/components/layout/BodyClass";
import { JsonLd } from "@/components/seo/JsonLd";
import { CtaBand } from "@/components/ui/CtaBand";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { url } from "@/lib/config";
import { buildPageMetadata } from "@/lib/seo";

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

  return (
    <>
      <BodyClass className={`page-persona page-${page.slug}`} />
      <JsonLd page={pageMeta} />
      <PageHero
        eyebrow="Audience guide"
        h1={page.h1}
        lede={page.lede}
        current={page.shortTitle}
        actions={[
          { label: "Free notability checker", href: url("wikipedia-notability-checker") },
          { label: "Request assessment", href: url("contact"), style: "button-outline" },
        ]}
      />

      <section className="section-pad">
        <div className="shell">
          <SectionHeading
            eyebrow="Guideline focus"
            heading="What reviewers actually look for"
            copy={`Primary reading: ${page.guidelineName}.`}
          />
          <div className="card-grid reveal">
            {page.points.map((item) => (
              <article key={item.title} className="service-card">
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
          <p style={{ marginTop: 24 }}>
            Guideline:{" "}
            <a href={page.guidelineUrl} target="_blank" rel="noopener noreferrer">
              {page.guidelineName}
            </a>
            . Related:{" "}
            <Link href={url("services/wikipedia-notability-assessment")}>
              notability assessment
            </Link>
            ,{" "}
            <Link href={url("services/wikipedia-page-creation")}>page creation</Link>,{" "}
            <Link href={url("wikipedia-page-cost")}>pricing</Link>.
          </p>
        </div>
      </section>

      <CtaBand
        heading="Not sure your coverage qualifies?"
        copy="Run the free checker or ask for a human source map."
        label="Start free assessment"
      />
    </>
  );
}
