import type { Metadata } from "next";
import Link from "next/link";
import { BodyClass } from "@/components/layout/BodyClass";
import { JsonLd } from "@/components/seo/JsonLd";
import { CtaBand } from "@/components/ui/CtaBand";
import { FaqList } from "@/components/ui/FaqList";
import { Icon } from "@/components/ui/Icon";
import { PageHero } from "@/components/ui/PageHero";
import { url } from "@/lib/config";
import { faqs } from "@/lib/data";
import { buildPageMetadata, faqNode } from "@/lib/seo";

const pageMeta = {
  slug: "faq",
  title: "Wikipedia Service FAQ",
  shortTitle: "Resources",
  breadcrumbName: "Resources & FAQ",
  description:
    "Straight answers on Wikipedia notability, publication timelines, paid-editing disclosure, page approval, and ongoing maintenance.",
  keywords:
    "wikipedia faq, wikipedia notability guidelines, wikipedia paid editing disclosure, how long wikipedia page approval, wikipedia page requirements, wikipedia resources",
  ogImage: "/assets/og/hero-orbital-globe.jpg",
  ogImageAlt: "Wikipedia FAQ and resources from The Wikipedia Studio",
  schema: [faqNode(faqs, "faq")],
};

export const metadata: Metadata = buildPageMetadata(pageMeta);

const concepts = [
  {
    icon: "i-search",
    title: "Notability",
    copy: "A subject qualifies when multiple reliable, independent sources have covered it significantly.",
    policy: "https://en.wikipedia.org/wiki/Wikipedia:Notability",
  },
  {
    icon: "i-check",
    title: "Verifiability",
    copy: "Readers must be able to check every claim against a published source.",
    policy: "https://en.wikipedia.org/wiki/Wikipedia:Verifiability",
  },
  {
    icon: "i-shield",
    title: "Neutral Point of View",
    copy: "Articles describe subjects fairly and without promotion.",
    policy: "https://en.wikipedia.org/wiki/Wikipedia:Neutral_point_of_view",
  },
];

const trustPoints = [
  {
    icon: "i-users",
    title: "100% Confidential",
    copy: "Your information is always secure with us.",
  },
  {
    icon: "i-shield",
    title: "Ethical & Compliant",
    copy: "We follow Wikipedia's policies and guidelines.",
  },
  {
    icon: "i-check",
    title: "Transparent Process",
    copy: "Clear communication at every step.",
  },
];

export default function FaqPage() {
  return (
    <>
      <BodyClass className="page-faq" />
      <JsonLd page={pageMeta} />
      <PageHero
        eyebrow="Resources & FAQ"
        h1="Wikipedia Questions, Answered Without the <span>Sales Pitch.</span>"
        lede="The Wikipedia questions clients ask most, answered the way we would answer them on a call — including the parts that make a commission less likely."
        current="Resources & FAQ"
        actions={[{ label: "Ask Us Something Else", href: url("contact") }]}
        image="/assets/services-hero-knowledge-archive.webp"
        imageWidth={1536}
        imageHeight={1024}
        visualClass="page-hero-visual--archive page-hero-visual--faq"
      />

      {/* 1. FAQ library (white) */}
      <section className="section-pad tone-light faq-library-section fq-library" aria-labelledby="fq-library-title">
        <div className="shell faq-library">
          <div className="faq-library-intro reveal">
            <p className="micro-label">Knowledge Library</p>
            <h2 id="fq-library-title">
              Clear Answers, Organised Around <span>What Actually Matters.</span>
            </h2>
            <p>
              Start with eligibility, then understand how editorial review works and
              what happens after a page is published.
            </p>
            <div className="faq-topic-list" aria-label="FAQ topics">
              <span><b>01</b> Eligibility &amp; notability</span>
              <span><b>02</b> Drafting &amp; editorial review</span>
              <span><b>03</b> Publication &amp; maintenance</span>
            </div>
            <Link className="button button-gold button-small" href={url("contact")}>
              Ask an Editor Directly <Icon name="i-arrow" />
            </Link>
            <Link className="fq-arrow-link" href={url("wikipedia-page-cost")}>
              See Wikipedia page cost &amp; packages <Icon name="i-arrow" />
            </Link>
          </div>
          <div className="faq-wide reveal">
            <FaqList items={faqs} wide />
          </div>
        </div>
      </section>

      {/* 2. Key concepts (dark) */}
      <section className="section-pad tone-dark fq-concepts" aria-labelledby="fq-concepts-title">
        <div className="shell">
          <div className="section-heading center reveal">
            <p className="micro-label">Key Concepts</p>
            <h2 id="fq-concepts-title">
              Three Rules That Decide <span>Most Outcomes</span>
            </h2>
            <p className="section-heading-copy">
              Wikipedia publishes the policies we work to. If an agency&apos;s promises
              conflict with these documents, the documents win.
            </p>
          </div>
          <ol className="fq-concept-grid reveal">
            {concepts.map((item, index) => (
              <li key={item.title} className="fq-concept">
                <div className="fq-concept-top">
                  <span className="fq-icon" aria-hidden="true">
                    <Icon name={item.icon} />
                  </span>
                  <span className="fq-concept-num" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
                <a
                  className="fq-arrow-link"
                  href={item.policy}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read the Wikipedia policy <Icon name="i-arrow" />
                </a>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 3. Trust band (gold, full width) */}
      <section className="fq-trust-band" aria-labelledby="fq-trust-title">
        <div className="shell reveal">
          <div className="fq-trust-head">
            <p className="fq-band-label">Why Clients Trust Us</p>
            <h2 id="fq-trust-title">
              Built on Trust. <span>Driven by Excellence.</span>
            </h2>
            <p>
              We follow strict editorial standards and maintain complete transparency in
              everything we do — including{" "}
              <a
                href="https://foundation.wikimedia.org/wiki/Policy:Terms_of_Use#4._Refraining_from_Certain_Activities"
                target="_blank"
                rel="noopener noreferrer"
              >
                paid-contribution disclosure
              </a>
              .
            </p>
          </div>
          <ul className="fq-trust-grid">
            {trustPoints.map((item) => (
              <li key={item.title}>
                <span className="fq-trust-icon" aria-hidden="true">
                  <Icon name={item.icon} />
                </span>
                <strong>{item.title}</strong>
                <span>{item.copy}</span>
              </li>
            ))}
          </ul>
          <div className="fq-trust-actions">
            <Link className="fq-pill" href={url("our-process")}>
              See How We Apply Them <Icon name="i-arrow" />
            </Link>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
