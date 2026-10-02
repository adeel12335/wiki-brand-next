import type { Metadata } from "next";
import Link from "next/link";
import { BodyClass } from "@/components/layout/BodyClass";
import { JsonLd } from "@/components/seo/JsonLd";
import { NotabilityCheckerForm } from "@/components/tools/NotabilityCheckerForm";
import { CtaBand } from "@/components/ui/CtaBand";
import { Icon } from "@/components/ui/Icon";
import { PageHero } from "@/components/ui/PageHero";
import { absUrl, url } from "@/lib/config";
import { buildPageMetadata, faqNode } from "@/lib/seo";

const faqs = [
  {
    q: "Is this a Wikipedia approval guarantee?",
    a: "No. Volunteer reviewers decide outcomes. This checker only screens whether independent coverage looks strong enough to justify a deeper assessment.",
  },
  {
    q: "What counts as independent coverage?",
    a: "Secondary sources with editorial independence from the subject — not press releases, paid posts, your own site, social bios, or directories that republish marketing copy.",
  },
  {
    q: "What happens after a promising score?",
    a: "Request a free human notability assessment. We map usable sources, flag gaps, and only recommend drafting when the dossier looks durable.",
  },
];

const pageMeta = {
  slug: "wikipedia-notability-checker",
  title: "Free Wikipedia Notability Checker",
  shortTitle: "Notability Checker",
  description:
    "Free preliminary Wikipedia notability checker. Answer a few source questions, get an honest screen, then request a human assessment before you pay to draft.",
  keywords:
    "wikipedia notability checker, am i notable enough for wikipedia, wikipedia notability test, free wikipedia assessment",
  modified: "2026-09-07",
  schema: [
    {
      "@type": "WebApplication",
      name: "Wikipedia Notability Checker",
      url: absUrl("wikipedia-notability-checker"),
      applicationCategory: "BusinessApplication",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      description:
        "Preliminary notability screen based on independent coverage depth and prior review outcomes.",
    },
    faqNode(faqs, "wikipedia-notability-checker"),
  ],
};

export const metadata: Metadata = buildPageMetadata(pageMeta);

const outcomes = [
  {
    key: "unlikely",
    title: "Unlikely Right Now",
    copy: "Independent, significant coverage looks thin or missing. Usually the honest answer is to wait for coverage, not to commission a draft.",
  },
  {
    key: "borderline",
    title: "Borderline",
    copy: "There may be a path, but it depends on outlet quality, independence, and depth. A source dossier decides it before you pay for writing.",
  },
  {
    key: "promising",
    title: "Promising",
    copy: "A workable source base may exist. Still not a guarantee — volunteer reviewers decide — so the next step is a free human assessment.",
  },
];

const counts = [
  "In-depth features in independent newspapers and magazines",
  "Books, journals, and scholarly reviews about the subject",
  "Major trade or national press with editorial oversight",
  "Paywalled archives — as long as they are independent",
];

const doesNotCount = [
  "Press releases and newswire distributions",
  "Sponsored, paid, or advertorial posts",
  "Your own website, blog, or social profiles",
  "Directory listings and passing mentions",
];

export default function NotabilityCheckerPage() {
  return (
    <>
      <BodyClass className="page-notability-checker" />
      <JsonLd page={pageMeta} />
      <PageHero
        eyebrow="Free Tool"
        h1="Free Wikipedia <span>Notability Checker</span>"
        lede="Answer a few source questions for a preliminary screen. It is not a guarantee — volunteer reviewers decide — but it stops you paying for a draft when the coverage is not there."
        current="Notability Checker"
        actions={[
          { label: "Skip to Human Assessment", href: url("contact") },
          {
            label: "Read Notability Guide",
            href: url("blog/am-i-notable-enough-for-wikipedia"),
            style: "button-outline",
          },
        ]}
      />

      {/* 1. The tool (white) */}
      <section className="section-pad tone-light nc-tool" aria-labelledby="nc-tool-title">
        <div className="shell nc-tool-grid">
          <div className="nc-intro reveal">
            <p className="micro-label">How It Works</p>
            <h2 id="nc-tool-title">
              Source-First, <span>Sales-Second</span>
            </h2>
            <p>
              Wikipedia notability is about significant coverage in reliable,
              independent sources — not follower counts, job titles, or how long a
              company has traded. This checker mirrors the questions our editors ask
              on intake.
            </p>
            <ul className="nc-intro-points">
              <li>
                <Icon name="i-check" /> Free, instant, and nothing is stored
              </li>
              <li>
                <Icon name="i-check" /> The same questions our editors ask first
              </li>
              <li>
                <Icon name="i-check" /> A preliminary screen — not a Wikipedia decision
              </li>
            </ul>
            <p>
              Prefer a human review?{" "}
              <Link href={url("contact")}>Request a free notability assessment</Link>{" "}
              or see{" "}
              <Link href={url("wikipedia-page-cost")}>published packages from $700</Link>.
            </p>
          </div>
          <NotabilityCheckerForm />
        </div>
      </section>

      {/* 2. What the three results mean (dark) */}
      <section className="section-pad tone-dark nc-outcomes" aria-labelledby="nc-outcomes-title">
        <div className="shell">
          <div className="section-heading center reveal">
            <p className="micro-label">Reading Your Result</p>
            <h2 id="nc-outcomes-title">
              What the Three <span>Verdicts Mean</span>
            </h2>
          </div>
          <ol className="nc-outcome-grid reveal">
            {outcomes.map((item) => (
              <li key={item.key} className={`nc-outcome nc-outcome--${item.key}`}>
                <span className="nc-outcome-dot" aria-hidden="true" />
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 3. What counts as coverage (gold band) */}
      <section className="nc-counts-band" aria-labelledby="nc-counts-title">
        <div className="shell reveal">
          <div className="nc-counts-head">
            <p className="nc-band-label">Before You Answer</p>
            <h2 id="nc-counts-title">
              What Counts as <span>Independent Coverage</span>
            </h2>
          </div>
          <div className="nc-counts-grid">
            <div className="nc-counts-card nc-counts-card--yes">
              <h3>
                <span aria-hidden="true">
                  <Icon name="i-check" />
                </span>
                Usually counts
              </h3>
              <ul>
                {counts.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="nc-counts-card nc-counts-card--no">
              <h3>
                <span aria-hidden="true">
                  <Icon name="i-close" />
                </span>
                Does not count
              </h3>
              <ul>
                {doesNotCount.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        heading="Want Editors to Map <span>Your Sources?</span>"
        copy="Free assessment first. We tell you if the coverage is not there."
        label="Request Free Assessment"
      />
    </>
  );
}
