import type { Metadata } from "next";
import Link from "next/link";
import { BodyClass } from "@/components/layout/BodyClass";
import { JsonLd } from "@/components/seo/JsonLd";
import { ServiceIndex } from "@/components/sections/ServiceIndex";
import { CtaBand } from "@/components/ui/CtaBand";
import { FaqList } from "@/components/ui/FaqList";
import { Icon } from "@/components/ui/Icon";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { url, absUrl } from "@/lib/config";
import { faqs, services } from "@/lib/data";
import { buildPageMetadata, itemListNode } from "@/lib/seo";

const pageMeta = {
  slug: "services",
  title: "Wikipedia Editorial Services",
  shortTitle: "Services",
  description:
    "Wikipedia services for people and organisations: page creation, editing, content research, ongoing management, and entity building.",
  keywords:
    "wikipedia services, wikipedia page creation, wikipedia editing services, wikipedia content writing, wikipedia page management, wikipedia entity building, wikipedia agency services",
  ogImage: "/assets/og/hero-orbital-globe.jpg",
  ogImageAlt: "Wikipedia editorial services from The Wikipedia Studio",
  schema: [
    itemListNode(
      "services",
      "Wikipedia editorial services",
      Object.entries(services).map(([slug, service]) => ({
        name: service.name,
        url: absUrl(`services/${slug}`),
        description: service.card,
      })),
    ),
  ],
};

export const metadata: Metadata = buildPageMetadata(pageMeta);

const starters = [
  {
    icon: "i-page",
    situation: "There is no Wikipedia page yet",
    advice: "Start with a notability assessment, then move to page creation if the sources support it.",
    slug: "wikipedia-page-creation",
    label: "Page Creation",
  },
  {
    icon: "i-edit",
    situation: "A page exists but is wrong, thin, or tagged",
    advice: "Editing fixes what is verifiably wrong and expands what independent sources support.",
    slug: "wikipedia-page-editing",
    label: "Page Editing",
  },
  {
    icon: "i-manage",
    situation: "The page is live and needs protecting",
    advice: "Management and monitoring keep it accurate, stable, and inside policy over time.",
    slug: "wikipedia-page-management",
    label: "Page Management",
  },
];

const limits = [
  {
    icon: "i-shield",
    title: "No Guaranteed Approval",
    copy: "Volunteer reviewers decide, and no agency controls them.",
  },
  {
    icon: "i-users",
    title: "No Undisclosed Paid Editing",
    copy: "Wikipedia's terms of use require disclosure, and we comply.",
  },
  {
    icon: "i-check",
    title: "No Unsourced Claims",
    copy: "If independent coverage does not support it, it does not go in.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <BodyClass className="page-services" />
      <JsonLd page={pageMeta} />
      <PageHero
        eyebrow="Our Services"
        h1="Comprehensive Wikipedia Solutions, Delivered to <span>Guideline Standard.</span>"
        lede="Services covering the full lifecycle of an article — from notability assessment and knowledge-panel entity work through creation, editing, monitoring, and long-term stewardship."
        current="Services"
        actions={[
          { label: "Request an Assessment", href: url("contact") },
          { label: "How We Work", href: url("our-process"), style: "button-outline" },
        ]}
        image="/assets/services-hero-knowledge-archive.webp"
        imageWidth={2048}
        imageHeight={1024}
        visualClass="page-hero-visual--archive"
      />

      <section className="section-pad tone-light service-index-section sv-index">
        <div className="shell">
          <SectionHeading
            eyebrow="All Services"
            heading="Eight Services, <span>One Editorial Standard</span>"
            copy="Every service is research-led, neutrally written, and disclosed on-wiki — pick the one that matches where your article is today."
          />
          <ServiceIndex />

          <div className="sv-starter reveal">
            <div className="sv-starter-head">
              <p className="micro-label">Not Sure Where to Start?</p>
              <h3>Choose by Where Your Article Is Today</h3>
            </div>
            <div className="sv-starter-grid">
              {starters.map((item) => (
                <Link
                  key={item.slug}
                  className="sv-starter-card"
                  href={url(`services/${item.slug}`)}
                >
                  <span className="sv-icon" aria-hidden="true">
                    <Icon name={item.icon} />
                  </span>
                  <strong>{item.situation}</strong>
                  <span className="sv-starter-advice">{item.advice}</span>
                  <span className="sv-starter-link">
                    {item.label} <Icon name="i-arrow" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad tone-dark sv-detail" aria-labelledby="sv-detail-title">
        <div className="shell">
          <div className="section-heading center reveal">
            <p className="micro-label">Service Detail</p>
            <h2 id="sv-detail-title">
              What Each Engagement <span>Involves</span>
            </h2>
            <p className="section-heading-copy">
              The core work inside every service — the full scope, process, and
              deliverables are on each service page.
            </p>
          </div>
          <div className="sv-detail-grid">
            {Object.entries(services).map(([slug, service], index) => (
              <article key={slug} className="sv-detail-card reveal">
                <header className="sv-detail-head">
                  <span className="sv-icon" aria-hidden="true">
                    <Icon name={service.icon} />
                  </span>
                  <span className="sv-detail-num" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </header>
                <h3>
                  <Link href={url(`services/${slug}`)}>{service.name}</Link>
                </h3>
                <p className="sv-detail-lede">{service.lede}</p>
                <ul className="sv-detail-list">
                  {service.includes.slice(0, 4).map((item) => (
                    <li key={item}>
                      <Icon name="i-check" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link className="sv-detail-link" href={url(`services/${slug}`)}>
                  Full {service.name} details <Icon name="i-arrow" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad tone-light sv-limits" aria-labelledby="sv-limits-title">
        <div className="shell sv-limits-grid">
          <div className="sv-limits-copy reveal">
            <p className="micro-label">What We Will Not Do</p>
            <h2 id="sv-limits-title">
              Honest Limits, Stated <span>Up Front.</span>
            </h2>
            <p>
              Some things are simply not available from an ethical Wikipedia editor,
              and any agency promising them is misleading you.
            </p>
            <ul className="sv-limit-list">
              {limits.map((item) => (
                <li key={item.title} className="sv-limit">
                  <span className="sv-icon" aria-hidden="true">
                    <Icon name={item.icon} />
                  </span>
                  <span>
                    <strong>{item.title}</strong>
                    <span>{item.copy}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="sv-faq reveal" data-delay="100">
            <p className="micro-label">Service Questions</p>
            <h3>Answers Before You Enquire</h3>
            <FaqList items={faqs.slice(0, 4)} />
            <Link className="button button-gold button-small" href={url("faq")}>
              See All Questions <Icon name="i-arrow" />
            </Link>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
