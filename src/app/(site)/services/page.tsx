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
  title: "Wikipedia Services | Page Creation, Editing & Management",
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

export default function ServicesPage() {
  return (
    <>
      <BodyClass className="page-services" />
      <JsonLd page={pageMeta} />
      <PageHero
        eyebrow="Our Services"
        h1="Comprehensive Wikipedia solutions, delivered to <span>guideline standard.</span>"
        lede="Five services covering the full lifecycle of an article — from the first notability assessment through to long-term monitoring."
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

      <section className="section-pad service-index-section">
        <div className="shell">
          <ServiceIndex />
        </div>
      </section>

      <section className="section-pad">
        <div className="shell service-detail-list">
          <SectionHeading eyebrow="Service Detail" heading="What each engagement involves" />
          {Object.entries(services).map(([slug, service]) => (
            <article key={slug} className="detail-row reveal">
              <div className="detail-row-head">
                <Icon name={service.icon} />
                <div>
                  <h3>
                    <Link href={url(`services/${slug}`)}>{service.name}</Link>
                  </h3>
                  <p>{service.lede}</p>
                </div>
              </div>
              <ul className="check-list compact">
                {service.includes.slice(0, 4).map((item) => (
                  <li key={item}>
                    <Icon name="i-check" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link className="text-link" href={url(`services/${slug}`)}>
                Full {service.name} details <Icon name="i-arrow" />
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="resources section-pad">
        <div className="shell resource-panel reveal">
          <div className="principles">
            <p className="micro-label">What We Will Not Do</p>
            <h2>
              Honest limits, stated <span>up front.</span>
            </h2>
            <p>
              Some things are simply not available from an ethical Wikipedia editor,
              and any agency promising them is misleading you.
            </p>
            <div className="principle-grid">
              <article>
                <Icon name="i-shield" />
                <div>
                  <strong>No guaranteed approval</strong>
                  <span>Volunteer reviewers decide, and no agency controls them.</span>
                </div>
              </article>
              <article>
                <Icon name="i-users" />
                <div>
                  <strong>No undisclosed paid editing</strong>
                  <span>Wikipedia&apos;s terms of use require disclosure, and we comply.</span>
                </div>
              </article>
              <article>
                <Icon name="i-check" />
                <div>
                  <strong>No unsourced claims</strong>
                  <span>If independent coverage does not support it, it does not go in.</span>
                </div>
              </article>
            </div>
          </div>
          <div className="faq">
            <p className="micro-label">Service Questions</p>
            <FaqList items={faqs.slice(0, 4)} />
            <Link className="text-link" href={url("faq")}>
              See all questions <Icon name="i-arrow" />
            </Link>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
