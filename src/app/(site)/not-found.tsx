import Link from "next/link";
import { BodyClass } from "@/components/layout/BodyClass";
import { JsonLd } from "@/components/seo/JsonLd";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { SITE_NAME, url } from "@/lib/config";
import { services } from "@/lib/data";
import { buildPageMetadata } from "@/lib/seo";

const pageMeta = {
  slug: "404",
  title: `Page Not Found | ${SITE_NAME}`,
  shortTitle: "Page not found",
  description:
    "The page you were looking for could not be found. Browse our Wikipedia services, process, and resources instead.",
  robots: "noindex, follow",
};

export const metadata = buildPageMetadata(pageMeta);

export default function NotFound() {
  return (
    <>
      <BodyClass className="page-404" />
      <JsonLd page={pageMeta} />
      <section className="page-hero error-hero" aria-labelledby="page-title">
        <div className="page-hero-glow" aria-hidden="true" />
        <div className="shell">
          <div className="page-hero-copy">
            <p className="micro-label">Error 404</p>
            <h1 id="page-title">
              That page could not be <span>found.</span>
            </h1>
            <p className="page-hero-lede">
              The link may be outdated, or the address may have been mistyped.
            </p>
            <div className="hero-actions">
              <Link className="button button-gold magnetic" href={url()}>
                Back To Home <Icon name="i-arrow" />
              </Link>
              <Link className="button button-outline magnetic" href={url("services")}>
                Browse Services <Icon name="i-arrow" />
              </Link>
              <Link className="button button-outline magnetic" href={url("wikipedia-page-cost")}>
                Pricing <Icon name="i-arrow" />
              </Link>
              <Link className="button button-outline magnetic" href={url("faq")}>
                FAQ <Icon name="i-arrow" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="shell">
          <SectionHeading eyebrow="Site Directory" heading="Where would you like to go?" />
          <div className="card-grid reveal">
            {Object.entries(services).map(([slug, service]) => (
              <ServiceCard key={slug} slug={slug} service={service} />
            ))}
          </div>
          <div className="section-actions reveal">
            <Link className="button button-outline button-small" href={url("contact")}>
              Contact Us <Icon name="i-arrow" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
