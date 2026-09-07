import type { Metadata } from "next";
import Link from "next/link";
import { BodyClass } from "@/components/layout/BodyClass";
import { JsonLd } from "@/components/seo/JsonLd";
import { NotabilityCheckerForm } from "@/components/tools/NotabilityCheckerForm";
import { CtaBand } from "@/components/ui/CtaBand";
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

export default function NotabilityCheckerPage() {
  return (
    <>
      <BodyClass className="page-notability-checker" />
      <JsonLd page={pageMeta} />
      <PageHero
        eyebrow="Free tool"
        h1="Free Wikipedia <span>notability checker</span>"
        lede="Answer a few source questions for a preliminary screen. It is not a guarantee — volunteer reviewers decide — but it stops you paying for a draft when the coverage is not there."
        current="Notability Checker"
        actions={[
          { label: "Skip to human assessment", href: url("contact") },
          {
            label: "Read notability guide",
            href: url("blog/am-i-notable-enough-for-wikipedia"),
            style: "button-outline",
          },
        ]}
      />

      <section className="section-pad">
        <div className="shell definition-grid">
          <div>
            <p className="micro-label">How it works</p>
            <h2>Source-first, sales-second</h2>
            <p>
              Wikipedia notability is about significant coverage in reliable,
              independent sources — not follower counts, job titles, or how long
              a company has traded. This checker mirrors the questions our editors
              ask on intake.
            </p>
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

      <CtaBand
        heading="Want editors to map your sources?"
        copy="Free assessment first. We tell you if the coverage is not there."
        label="Request free assessment"
      />
    </>
  );
}
