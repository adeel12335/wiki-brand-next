import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { BodyClass } from "@/components/layout/BodyClass";
import { JsonLd } from "@/components/seo/JsonLd";
import { CtaBand } from "@/components/ui/CtaBand";
import { FaqList } from "@/components/ui/FaqList";
import { Icon } from "@/components/ui/Icon";
import { PageHero } from "@/components/ui/PageHero";
import { url } from "@/lib/config";
import { getService, serviceSlugs, services } from "@/lib/data";
import { buildPageMetadata, faqNode, serviceNode } from "@/lib/seo";
import { titleCase } from "@/lib/utils";

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};

  return buildPageMetadata({
    slug: `services/${slug}`,
    title: service.meta_title,
    shortTitle: service.name,
    breadcrumbName: service.name,
    description: service.meta_desc,
    keywords: service.keywords,
    ogImage: `/${service.og_image.replace(/^\//, "")}`,
    ogImageAlt: `${service.name} — The Wikipedia Studio`,
    breadcrumbs: [{ label: "Services", slug: "services" }],
    schema: [serviceNode(slug, service), faqNode(service.faqs, `services/${slug}`)],
  });
}

const OUTCOME_ICONS = ["i-globe", "i-network", "i-shield"];

const whyUs = [
  {
    icon: "i-search",
    title: "Assessment Before Invoice",
    copy: "We tell you if the coverage is not there before you commit.",
  },
  {
    icon: "i-users",
    title: "Disclosed Paid Editing",
    copy: "Declared on Wikipedia, as its terms of use require.",
  },
  {
    icon: "i-review",
    title: "Two Editors per Draft",
    copy: "A second editor checks every claim against its source.",
  },
  {
    icon: "i-shield",
    title: "No Guarantees Invented",
    copy: "Volunteer reviewers decide, and we never pretend otherwise.",
  },
];

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const otherServices = Object.entries(services).filter(([key]) => key !== slug);
  const pageMeta = {
    slug: `services/${slug}`,
    title: service.meta_title,
    shortTitle: service.name,
    breadcrumbName: service.name,
    description: service.meta_desc,
    keywords: service.keywords,
    ogImage: `/${service.og_image.replace(/^\//, "")}`,
    breadcrumbs: [{ label: "Services", slug: "services" }],
    schema: [serviceNode(slug, service), faqNode(service.faqs, `services/${slug}`)],
  };

  return (
    <>
      <BodyClass className="page-service-detail" />
      <JsonLd page={pageMeta} />
      <PageHero
        eyebrow={service.eyebrow}
        h1={titleCase(service.h1)}
        lede={service.lede}
        breadcrumbs={[{ label: "Services", slug: "services" }]}
        current={service.name}
        actions={[
          { label: "Request an Assessment", href: url("contact") },
          { label: "All Services", href: url("services"), style: "button-outline" },
        ]}
      />

      {/* 1. Overview — definition + who it is for (white) */}
      <section className="section-pad tone-light sd-overview" aria-labelledby="sd-overview-title">
        <div className="shell sd-overview-grid">
          <div className="sd-overview-copy reveal">
            <p className="micro-label">The Short Version</p>
            <h2 id="sd-overview-title">{titleCase(service.what_is_heading)}</h2>
            <p className="sd-lead">{service.what_is}</p>
            <p className="sd-refs">
              <Icon name="i-review" />
              <span>
                Editorial guidance from The Wikipedia Studio team. Primary references:{" "}
                <a
                  href="https://en.wikipedia.org/wiki/Wikipedia:Notability"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  notability
                </a>
                ,{" "}
                <a
                  href="https://en.wikipedia.org/wiki/Wikipedia:Verifiability"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  verifiability
                </a>
                ,{" "}
                <a
                  href="https://en.wikipedia.org/wiki/Wikipedia:Neutral_point_of_view"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  neutral point of view
                </a>
                , and{" "}
                <a
                  href="https://foundation.wikimedia.org/wiki/Policy:Terms_of_Use#4._Refraining_from_Certain_Activities"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  paid-contribution disclosure
                </a>
                .
              </span>
            </p>
          </div>

          <aside className="sd-who reveal" data-delay="100">
            <span className="sd-icon" aria-hidden="true">
              <Icon name="i-users" />
            </span>
            <h3>{titleCase(service.who_needs_heading)}</h3>
            <ul className="sd-checks">
              {service.who_needs.map((item) => (
                <li key={item}>
                  <Icon name="i-check" />
                  {item}
                </li>
              ))}
            </ul>
            <Link className="sd-arrow-link" href={url("contact")}>
              Ask whether your subject qualifies <Icon name="i-arrow" />
            </Link>
          </aside>
        </div>
      </section>

      {/* 2. Scope — included as standard + deliverables (dark) */}
      <section className="section-pad tone-dark sd-scope" aria-labelledby="sd-scope-title">
        <div className="shell">
          <div className="section-heading center reveal">
            <p className="micro-label">What This Service Covers</p>
            <h2 id="sd-scope-title">
              Everything Included as <span>Standard</span>
            </h2>
            <p className="section-heading-copy">
              Scope is agreed in writing before work starts. Nothing on this list is an
              upsell — it is what a compliant, durable article needs.
            </p>
          </div>

          <div className="sd-scope-grid">
            <ul className="sd-includes reveal">
              {service.includes.map((item) => (
                <li key={item}>
                  <span className="sd-tick" aria-hidden="true">
                    <Icon name="i-check" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <div className="sd-deliverables reveal" data-delay="100">
              <p className="micro-label">What You Receive</p>
              <ol>
                {service.deliverables.map((deliverable, index) => (
                  <li key={deliverable.title}>
                    <span className="sd-deliverable-num" aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3>{deliverable.title}</h3>
                      <p>{deliverable.copy}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <Link className="button button-gold button-small" href={url("contact")}>
                Discuss Your Project <Icon name="i-arrow" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Process timeline + fees card (white) */}
      <section className="section-pad tone-light sd-process" aria-labelledby="sd-process-title">
        <div className="shell sd-process-grid">
          <div className="reveal">
            <p className="micro-label">How It Works</p>
            <h2 id="sd-process-title">{titleCase(service.process_heading)}</h2>
            <ol className="sd-steps">
              {service.process_steps.map((step, index) => (
                <li key={step}>
                  <span className="sd-step-num" aria-hidden="true">
                    {index + 1}
                  </span>
                  <p>{step}</p>
                </li>
              ))}
            </ol>
            <Link className="sd-arrow-link" href={url("our-process")}>
              Read our full five-stage editorial process <Icon name="i-arrow" />
            </Link>
          </div>

          <aside className="sd-fees reveal" data-delay="100">
            <span className="sd-icon" aria-hidden="true">
              <Icon name="i-plan" />
            </span>
            <p className="micro-label">Fees</p>
            <h3>{titleCase(service.pricing_heading)}</h3>
            <p>{service.pricing}</p>
            <Link className="button button-gold button-small" href={url("wikipedia-page-cost")}>
              See Packages &amp; Prices <Icon name="i-arrow" />
            </Link>
            <Link className="sd-arrow-link" href={url("contact")}>
              Or request a free assessment <Icon name="i-arrow" />
            </Link>
          </aside>
        </div>
      </section>

      {/* 4. Results (dark) */}
      <section className="section-pad tone-dark sd-results" aria-labelledby="sd-results-title">
        <div className="shell">
          <div className="section-heading center reveal">
            <p className="micro-label">Results</p>
            <h2 id="sd-results-title">{titleCase(service.outcomes_heading)}</h2>
          </div>
          <div className="sd-results-grid reveal">
            {service.outcomes.map((outcome, index) => (
              <article key={outcome.title} className="sd-result">
                <span className="sd-icon" aria-hidden="true">
                  <Icon name={OUTCOME_ICONS[index % OUTCOME_ICONS.length]} />
                </span>
                <h3>{titleCase(outcome.title)}</h3>
                <p>{outcome.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FAQ — same two-column library layout as Home / Pricing (white) */}
      <section className="section-pad tone-light sd-faq" aria-labelledby="sd-faq-title">
        <div className="shell faq-library">
          <div className="faq-library-intro reveal">
            <p className="micro-label">{service.name} Questions</p>
            <h2 id="sd-faq-title">
              Straight Answers, <span>Before You Commit.</span>
            </h2>
            <p>
              The questions clients ask most about {service.name.toLowerCase()} — on
              timing, scope, and what a disclosed editor can and cannot do.
            </p>
            <Link className="button button-gold button-small" href={url("faq")}>
              Read The Full FAQ <Icon name="i-arrow" />
            </Link>
          </div>
          <div className="faq-wide reveal">
            <FaqList items={service.faqs} wide />
          </div>
        </div>
      </section>

      {/* 6. Why work with us — full-width gold band */}
      <section className="sd-why-band" aria-labelledby="sd-why-title">
        <div className="shell reveal">
          <div className="sd-why-head">
            <p className="sd-band-label">Why Work With Us</p>
            <h2 id="sd-why-title">
              Guidelines First, <span>Always.</span>
            </h2>
            <p>
              Every engagement is run by editors who work to Wikipedia&apos;s published
              standards. <Link href={url("about-us")}>Meet the team and how we work</Link>.
            </p>
          </div>
          <ul className="sd-why-grid">
            {whyUs.map((item) => (
              <li key={item.title}>
                <span className="sd-why-icon" aria-hidden="true">
                  <Icon name={item.icon} />
                </span>
                <strong>{item.title}</strong>
                <span>{item.copy}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 7. Related services (white) */}
      <section className="section-pad tone-light sd-related" aria-labelledby="sd-related-title">
        <div className="shell">
          <div className="section-heading center reveal">
            <p className="micro-label">Related Services</p>
            <h2 id="sd-related-title">
              Other Ways We Can <span>Help</span>
            </h2>
          </div>
          <div className="sd-related-grid reveal">
            {otherServices.map(([otherSlug, other]) => (
              <Link
                key={otherSlug}
                className="sd-related-card"
                href={url(`services/${otherSlug}`)}
              >
                <span className="sd-icon" aria-hidden="true">
                  <Icon name={other.icon} />
                </span>
                <strong>{other.name}</strong>
                <span className="sd-related-copy">{other.card}</span>
                <span className="sd-related-link">
                  Learn more <Icon name="i-arrow" />
                </span>
              </Link>
            ))}
            <Link className="sd-related-card sd-related-card--all" href={url("services")}>
              <strong>See All Services</strong>
              <span className="sd-related-copy">
                Compare every service side by side and find the right starting point.
              </span>
              <span className="sd-related-link">
                All services <Icon name="i-arrow" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      <CtaBand
        heading="Not Sure If a Page Is <span>Realistic?</span>"
        copy="Ask for an honest notability assessment first. If the independent coverage is not there yet, we will tell you before any work is commissioned."
        label="Request An Assessment"
      />
    </>
  );
}
