import type { Metadata } from "next";
import Link from "next/link";
import { BodyClass } from "@/components/layout/BodyClass";
import { JsonLd } from "@/components/seo/JsonLd";
import { ProcessScrollStepper } from "@/components/sections/ProcessScrollStepper";
import { CtaBand } from "@/components/ui/CtaBand";
import { Icon } from "@/components/ui/Icon";
import { PageHero } from "@/components/ui/PageHero";
import { url, absUrl } from "@/lib/config";
import { processSteps } from "@/lib/data";
import { buildPageMetadata } from "@/lib/seo";

const pageMeta = {
  slug: "our-process",
  title: "Our Wikipedia Editorial Process",
  shortTitle: "Our Process",
  description:
    "How a Wikipedia article gets built: notability research, source planning, neutral drafting, editorial review, and transparent submission.",
  keywords:
    "wikipedia process, how to create a wikipedia page, wikipedia notability research, wikipedia editorial review, wikipedia submission process, wikipedia article workflow",
  ogImage: "/assets/og/reference-dark.jpg",
  ogImageAlt: "The Wikipedia Studio five-step editorial process",
  schema: [
    {
      "@type": "ItemList",
      "@id": `${absUrl("our-process")}#process`,
      name: "The Wikipedia Studio editorial process",
      description:
        "The five-stage editorial process used for every Wikipedia page creation and expansion engagement.",
      itemListOrder: "https://schema.org/ItemListOrderAscending",
      numberOfItems: processSteps.length,
      itemListElement: processSteps.map((step, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: step.title,
        description: step.copy,
        url: `${absUrl("our-process")}#step-${index + 1}`,
      })),
    },
    {
      "@type": "HowTo",
      "@id": `${absUrl("our-process")}#howto`,
      name: "How The Wikipedia Studio creates a Wikipedia page",
      description:
        "Five editorial stages from notability research through disclosed submission and monitoring.",
      step: processSteps.map((step, index) => ({
        "@type": "HowToStep",
        position: index + 1,
        name: step.title,
        text: `${step.copy} ${step.detail}`,
        url: `${absUrl("our-process")}#step-${index + 1}`,
      })),
    },
  ],
};

export const metadata: Metadata = buildPageMetadata(pageMeta);

const bring = [
  "Links to independent press coverage — news, books, journals, trade press",
  "Key milestones with dates: founding, awards, publications, appointments",
  "Exact spellings of names, titles, and organisations",
  "Any existing Wikipedia article or Wikidata entry",
];

const cannotCite = [
  "Company blogs and your own website",
  "Press releases and newswire distributions",
  "Sponsored, paid, or advertorial features",
  "Interviews where you are the main source",
];

const timeline = [
  {
    icon: "i-search",
    title: "Assessment",
    duration: "A few days",
    copy: "We search for independent coverage and give you a written verdict on notability.",
  },
  {
    icon: "i-write",
    title: "Drafting & Review",
    duration: "A few weeks",
    copy: "Typically a few weeks, depending on how much coverage exists and how much it needs verifying.",
  },
  {
    icon: "i-clock",
    title: "Wikipedia Review Queue",
    duration: "Outside anyone's control",
    copy: "Volunteer reviewers work through a backlog. We give you a realistic range, never a promise.",
  },
  {
    icon: "i-manage",
    title: "Post-Publication",
    duration: "Ongoing",
    copy: "Monitoring through the first stabilisation period matters as much as the launch itself.",
  },
];

export default function OurProcessPage() {
  return (
    <>
      <BodyClass className="page-our-process" />
      <JsonLd page={pageMeta} />
      <PageHero
        eyebrow="Our Process"
        h1="A Proven <span>Five-Step Wikipedia Process</span>, From Research to Publication."
        lede="Our Wikipedia process runs the same five stages on every engagement, and it is deliberately front-loaded."
        current="Our Process"
        actions={[
          { label: "Start With An Assessment", href: url("contact") },
          { label: "View Services", href: url("services"), style: "button-outline" },
        ]}
        image="/assets/process-editorial-orbit.png"
        imageWidth={2048}
        imageHeight={2048}
        visualClass="page-hero-visual--process"
      />

      {/* 1. Why the process is front-loaded (white) */}
      <section className="section-pad tone-light pr-why" aria-labelledby="pr-why-title">
        <div className="shell pr-why-grid">
          <div className="pr-why-copy reveal">
            <p className="micro-label">Why It Works</p>
            <h2 id="pr-why-title">
              Research First, <span>Writing Second</span>
            </h2>
            <p>
              Most Wikipedia drafts fail for one reason: nobody checked whether
              independent coverage existed before the writing started. Our process is
              deliberately front-loaded so that question is answered first.
            </p>
            <p>
              Roughly two thirds of the work happens before a single sentence is
              drafted — in finding, reading, and grading the sources that decide what
              the article is allowed to say.
            </p>
          </div>

          <div className="pr-effort reveal" data-delay="100">
            <p className="pr-effort-title">Where the work goes</p>
            <div className="pr-effort-bar" aria-hidden="true">
              <span className="pr-effort-before">≈ 2/3</span>
              <span className="pr-effort-after">≈ 1/3</span>
            </div>
            <div className="pr-effort-legend">
              <div>
                <strong>Before drafting</strong>
                <span>Source search, notability verdict, source grading, and planning</span>
              </div>
              <div>
                <strong>Drafting and after</strong>
                <span>Neutral writing, second-editor review, disclosed submission, monitoring</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Stage by stage — vertical timeline (white) */}
      <section className="section-pad tone-light pr-stages pr-stages--stepper" aria-labelledby="pr-stages-title">
        <div className="shell">
          <div className="section-heading center reveal">
            <p className="micro-label">Stage By Stage</p>
            <h2 id="pr-stages-title">
              What Actually Happens at <span>Each Step</span>
            </h2>
          </div>
          <ProcessScrollStepper />
        </div>
      </section>

      {/* 4. What we need from you (dark) */}
      <section className="section-pad tone-dark pr-need" aria-labelledby="pr-need-title">
        <div className="shell">
          <div className="section-heading center reveal">
            <p className="micro-label">Before We Start</p>
            <h2 id="pr-need-title">
              What We Need <span>From You</span>
            </h2>
            <p className="section-heading-copy">
              The research stage moves faster when you arrive with the right material —
              and knowing what Wikipedia will not accept saves everyone time.
            </p>
          </div>
          <div className="pr-need-grid">
            <article className="pr-need-card pr-need-card--yes reveal">
              <h3>
                <span className="pr-need-badge" aria-hidden="true">
                  <Icon name="i-check" />
                </span>
                Helpful to Bring
              </h3>
              <ul>
                {bring.map((item) => (
                  <li key={item}>
                    <Icon name="i-check" />
                    {item}
                  </li>
                ))}
              </ul>
              <p>
                Already have a page?{" "}
                <Link href={url("services/wikipedia-reputation-management")}>
                  See how we handle Wikipedia and Wikidata entries
                </Link>
                .
              </p>
            </article>
            <article className="pr-need-card pr-need-card--no reveal" data-delay="100">
              <h3>
                <span className="pr-need-badge" aria-hidden="true">
                  <Icon name="i-close" />
                </span>
                What We Cannot Cite
              </h3>
              <ul>
                {cannotCite.map((item) => (
                  <li key={item}>
                    <Icon name="i-close" />
                    {item}
                  </li>
                ))}
              </ul>
              <p>
                This follows Wikipedia&apos;s published guidance on{" "}
                <a
                  href="https://en.wikipedia.org/wiki/Wikipedia:Identifying_reliable_sources"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  identifying reliable sources
                </a>{" "}
                and{" "}
                <a
                  href="https://en.wikipedia.org/wiki/Wikipedia:Independent_sources"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  source independence
                </a>
                .
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* 5. Timelines (white) */}
      <section className="section-pad tone-light pr-time" aria-labelledby="pr-time-title">
        <div className="shell">
          <div className="section-heading center reveal">
            <p className="micro-label">Timelines</p>
            <h2 id="pr-time-title">
              What to Expect, <span>Realistically</span>
            </h2>
          </div>
          <ol className="pr-time-grid reveal">
            {timeline.map((item, index) => (
              <li key={item.title} className="pr-time-card">
                <div className="pr-time-top">
                  <span className="pr-icon" aria-hidden="true">
                    <Icon name={item.icon} />
                  </span>
                  <span className="pr-time-index" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3>{item.title}</h3>
                <span className="pr-time-chip">{item.duration}</span>
                <p>{item.copy}</p>
              </li>
            ))}
          </ol>
          <div className="section-actions reveal">
            <Link className="button button-gold button-small" href={url("wikipedia-page-cost")}>
              View Wikipedia Page Cost &amp; Packages <Icon name="i-arrow" />
            </Link>
          </div>
        </div>
      </section>

      <CtaBand
        heading="Start With the <span>Research Stage.</span>"
        copy="The assessment tells you whether an article is viable before you commit to anything else. Published packages start from $700 — see the full pricing page for what each tier includes."
        label="Request An Assessment"
      />
    </>
  );
}
