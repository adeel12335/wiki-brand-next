import type { Metadata } from "next";
import Link from "next/link";
import { BodyClass } from "@/components/layout/BodyClass";
import { JsonLd } from "@/components/seo/JsonLd";
import { CtaBand } from "@/components/ui/CtaBand";
import { FaqList } from "@/components/ui/FaqList";
import { Icon } from "@/components/ui/Icon";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { url } from "@/lib/config";
import { faqs } from "@/lib/data";
import { buildPageMetadata, faqNode } from "@/lib/seo";

const pageMeta = {
  slug: "faq",
  title: "Wikipedia FAQ | Notability, Timelines & Paid Editing",
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

export default function FaqPage() {
  return (
    <>
      <BodyClass className="page-faq" />
      <JsonLd page={pageMeta} />
      <PageHero
        eyebrow="Resources & FAQ"
        h1="Wikipedia questions, answered without the <span>sales pitch.</span>"
        lede="The Wikipedia questions clients ask most, answered the way we would answer them on a call — including the parts that make a commission less likely."
        current="Resources & FAQ"
        actions={[{ label: "Ask Us Something Else", href: url("contact") }]}
        image="/assets/services-hero-knowledge-archive.webp"
        imageWidth={1536}
        imageHeight={1024}
        visualClass="page-hero-visual--archive page-hero-visual--faq"
      />

      <section className="section-pad faq-library-section">
        <div className="shell faq-library">
          <div className="faq-library-intro reveal">
            <p className="micro-label">Knowledge Library</p>
            <h2>
              Clear answers, organised around <span>what actually matters.</span>
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
            <Link className="text-link" href={url("contact")}>
              Ask an editor directly <Icon name="i-arrow" />
            </Link>
          </div>
          <div className="faq-wide">
            <FaqList items={faqs} wide />
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="shell">
          <SectionHeading
            eyebrow="Key Concepts"
            heading="Three rules that decide most outcomes"
          />
          <div className="card-grid concept-grid reveal">
            {[
              {
                icon: "i-search",
                title: "Notability",
                copy: "A subject qualifies when multiple reliable, independent sources have covered it significantly.",
              },
              {
                icon: "i-check",
                title: "Verifiability",
                copy: "Readers must be able to check every claim against a published source.",
              },
              {
                icon: "i-shield",
                title: "Neutral point of view",
                copy: "Articles describe subjects fairly and without promotion.",
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

      <section className="resources section-pad">
        <div className="shell resource-panel reveal">
          <div className="principles">
            <p className="micro-label">Why Clients Trust Us</p>
            <h2>Built on Trust. Driven by Excellence.</h2>
            <p>
              We follow strict editorial standards and maintain complete transparency
              in everything we do.
            </p>
            <div className="principle-grid">
              <article>
                <Icon name="i-users" />
                <div>
                  <strong>100% Confidential</strong>
                  <span>Your information is always secure with us.</span>
                </div>
              </article>
              <article>
                <Icon name="i-shield" />
                <div>
                  <strong>Ethical &amp; Compliant</strong>
                  <span>We follow Wikipedia&apos;s policies and guidelines.</span>
                </div>
              </article>
              <article>
                <Icon name="i-check" />
                <div>
                  <strong>Transparent Process</strong>
                  <span>Clear communication at every step.</span>
                </div>
              </article>
            </div>
          </div>
          <div className="faq">
            <p className="micro-label">Useful Reading</p>
            <div className="prose">
              <p>
                Wikipedia publishes the policies we work to: notability, verifiability,
                neutral point of view, and paid-contribution disclosure.
              </p>
              <p>If an agency&apos;s promises conflict with those documents, the documents win.</p>
            </div>
            <Link className="text-link" href={url("our-process")}>
              See how we apply them <Icon name="i-arrow" />
            </Link>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
