import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { BodyClass } from "@/components/layout/BodyClass";
import { JsonLd } from "@/components/seo/JsonLd";
import { CtaBand } from "@/components/ui/CtaBand";
import { FaqList } from "@/components/ui/FaqList";
import { Icon } from "@/components/ui/Icon";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { url } from "@/lib/config";
import { getService, serviceSlugs, services } from "@/lib/data";
import { buildPageMetadata, serviceNode } from "@/lib/seo";
import { lastReviewed } from "@/lib/utils";

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
    schema: [serviceNode(slug, service)],
  });
}

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
    schema: [serviceNode(slug, service)],
  };

  return (
    <>
      <BodyClass className={`page-services-${slug}`} />
      <JsonLd page={pageMeta} />
      <PageHero
        eyebrow={service.eyebrow}
        h1={service.h1}
        lede={service.lede}
        breadcrumbs={[{ label: "Services", slug: "services" }]}
        current={service.name}
        actions={[
          { label: "Request an Assessment", href: url("contact") },
          { label: "All Services", href: url("services"), style: "button-outline" },
        ]}
      />

      <section className="section-pad">
        <div className="shell definition-grid">
          <div className="reveal">
            <p className="micro-label">The Short Version</p>
            <h2>{service.what_is_heading}</h2>
            <p className="definition-copy">{service.what_is}</p>
            <p className="reviewed-note">
              Reviewed {lastReviewed()} · Written by the editorial team at The
              Wikipedia Studio
            </p>
          </div>
          <aside className="who-panel reveal" data-delay="100">
            <h3>{service.who_needs_heading}</h3>
            <ul className="check-list compact">
              {service.who_needs.map((item) => (
                <li key={item}>
                  <Icon name="i-check" />
                  {item}
                </li>
              ))}
            </ul>
            <Link className="text-link" href={url("contact")}>
              Ask whether your subject qualifies <Icon name="i-arrow" />
            </Link>
          </aside>
        </div>
      </section>

      <section className="section-pad">
        <div className="shell split-grid">
          <div className="section-copy reveal">
            <p className="micro-label">What This Service Covers</p>
            <h2>
              Everything included as <span>standard.</span>
            </h2>
            <p>
              Scope is agreed in writing before work starts. Nothing on this list is
              an upsell — it is what a compliant, durable article needs.
            </p>
            <ul className="check-list">
              {service.includes.map((item) => (
                <li key={item}>
                  <Icon name="i-check" />
                  {item}
                </li>
              ))}
            </ul>
            <Link className="button button-gold button-small" href={url("contact")}>
              Discuss Your Project <Icon name="i-arrow" />
            </Link>
          </div>
          <div className="deliverable-stack reveal" data-delay="100">
            <p className="micro-label">What You Receive</p>
            {service.deliverables.map((deliverable) => (
              <article key={deliverable.title} className="deliverable-card">
                <h3>{deliverable.title}</h3>
                <p>{deliverable.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="shell split-grid">
          <div className="reveal">
            <p className="micro-label">How It Works</p>
            <h2>{service.process_heading}</h2>
            <ol className="numbered-steps">
              {service.process_steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
            <Link className="text-link" href={url("our-process")}>
              Read our full five-stage editorial process <Icon name="i-arrow" />
            </Link>
          </div>
          <div className="reveal" data-delay="100">
            <p className="micro-label">Fees</p>
            <h2>{service.pricing_heading}</h2>
            <p className="definition-copy">{service.pricing}</p>
            <Link className="text-link" href={url("faq")}>
              See what else clients ask about cost and timelines{" "}
              <Icon name="i-arrow" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="shell">
          <SectionHeading eyebrow="Results" heading={service.outcomes_heading} />
          <div className="card-grid reveal">
            {service.outcomes.map((outcome) => (
              <article key={outcome.title} className="service-card">
                <Icon name="i-check" />
                <h3>{outcome.title}</h3>
                <p>{outcome.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="resources section-pad">
        <div className="shell resource-panel reveal">
          <div className="principles">
            <p className="micro-label">Why Work With Us</p>
            <h2>
              Guidelines first, <span>always.</span>
            </h2>
            <p>
              Every engagement is run by editors who work to Wikipedia&apos;s own
              standards. You can read more about{" "}
              <Link href={url("about-us")}>the team and how we work</Link>.
            </p>
            <div className="principle-grid">
              <article>
                <Icon name="i-search" />
                <div>
                  <strong>Assessment before invoice</strong>
                  <span>We tell you if the coverage is not there before you commit.</span>
                </div>
              </article>
              <article>
                <Icon name="i-users" />
                <div>
                  <strong>Disclosed paid editing</strong>
                  <span>Declared on Wikipedia, as its terms of use require.</span>
                </div>
              </article>
              <article>
                <Icon name="i-review" />
                <div>
                  <strong>Two editors per draft</strong>
                  <span>A second editor checks every claim against its source.</span>
                </div>
              </article>
              <article>
                <Icon name="i-shield" />
                <div>
                  <strong>No guarantees invented</strong>
                  <span>Volunteer reviewers decide, and we never pretend otherwise.</span>
                </div>
              </article>
            </div>
          </div>
          <div className="faq">
            <p className="micro-label">{service.name} Questions</p>
            <FaqList items={service.faqs} />
            <Link className="text-link" href={url("faq")}>
              Read the full Wikipedia FAQ <Icon name="i-arrow" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="shell">
          <SectionHeading eyebrow="Related Services" heading="Other ways we can help" />
          <div className="card-grid reveal">
            {otherServices.map(([otherSlug, other]) => (
              <ServiceCard key={otherSlug} slug={otherSlug} service={other} />
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        heading="Not sure if a page is <span>realistic?</span>"
        copy="Ask for an honest notability assessment first. If the independent coverage is not there yet, we will tell you before any work is commissioned."
        label="Request An Assessment"
      />
    </>
  );
}
