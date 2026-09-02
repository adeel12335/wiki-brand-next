import type { Metadata } from "next";
import Link from "next/link";
import { BodyClass } from "@/components/layout/BodyClass";
import { JsonLd } from "@/components/seo/JsonLd";
import { ProcessShowcase } from "@/components/sections/ProcessShowcase";
import { CtaBand } from "@/components/ui/CtaBand";
import { Icon } from "@/components/ui/Icon";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { url, absUrl } from "@/lib/config";
import { processSteps } from "@/lib/data";
import { buildPageMetadata } from "@/lib/seo";

const pageMeta = {
  slug: "our-process",
  title: "Our Wikipedia Process | Research, Writing & Publishing",
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
  ],
};

export const metadata: Metadata = buildPageMetadata(pageMeta);

export default function OurProcessPage() {
  return (
    <>
      <BodyClass className="page-our-process" />
      <JsonLd page={pageMeta} />
      <PageHero
        eyebrow="Our Process"
        h1="A proven <span>five-step Wikipedia process</span>, from research to publication."
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

      <section className="section-pad process-index-section">
        <div className="shell">
          <ProcessShowcase showHeading={false} />
        </div>
      </section>

      <section className="section-pad">
        <div className="shell stage-list">
          <SectionHeading
            eyebrow="Stage By Stage"
            heading="What actually happens at each step"
          />
          {processSteps.map((step, index) => (
            <article key={step.title} className="stage-row reveal" id={`step-${index + 1}`}>
              <div className="stage-marker" aria-hidden="true">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <Icon name={step.icon} />
              </div>
              <div>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
                <p>{step.detail}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-pad">
        <div className="shell">
          <SectionHeading eyebrow="Before We Start" heading="What we need from you" />
          <div className="shell-inner answer-block reveal">
            <p>
              The research stage moves faster when you arrive with links to
              independent press coverage, key milestones with dates, exact spellings
              of names, and any existing{" "}
              <Link href={url("services/wikipedia-reputation-management")}>
                Wikipedia or Wikidata entry
              </Link>
              .
            </p>
            <p>
              What we cannot use as citations is anything you control: company blogs,
              press releases, sponsored features, and your own website.
            </p>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="shell">
          <SectionHeading eyebrow="Timelines" heading="What to expect, realistically" />
          <div className="card-grid reveal">
            {[
              {
                icon: "i-search",
                title: "Assessment",
                copy: "A few days. We search for independent coverage and give you a written verdict on notability.",
              },
              {
                icon: "i-write",
                title: "Drafting & review",
                copy: "Typically a few weeks, depending on how much coverage exists.",
              },
              {
                icon: "i-clock",
                title: "Wikipedia review queue",
                copy: "Outside anyone's control. Volunteer reviewers work through a backlog.",
              },
              {
                icon: "i-manage",
                title: "Post-publication",
                copy: "Ongoing monitoring through the first stabilisation period matters as much as launch.",
              },
            ].map((item) => (
              <article key={item.title} className="service-card">
                <Icon name={item.icon} />
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        heading="Start with the <span>research stage.</span>"
        copy="The assessment tells you whether an article is viable before you commit to anything else."
        label="Request An Assessment"
      />
    </>
  );
}
