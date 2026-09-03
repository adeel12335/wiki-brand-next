import type { Metadata } from "next";
import Link from "next/link";
import { BodyClass } from "@/components/layout/BodyClass";
import { Icon } from "@/components/ui/Icon";
import { PageHero } from "@/components/ui/PageHero";
import { SITE_EMAIL, SITE_NAME, SITE_PHONE, SITE_PHONE_RAW, url } from "@/lib/config";
import { buildPageMetadata } from "@/lib/seo";

const pageMeta = {
  slug: "thank-you",
  title: "Thank You",
  shortTitle: "Thank You",
  description:
    "Your enquiry was received. An editor will review your coverage and reply shortly.",
  robots: "noindex, follow",
  ogImage: "/assets/og/globe.jpg",
};

export const metadata: Metadata = buildPageMetadata(pageMeta);

export default function ThankYouPage() {
  return (
    <>
      <BodyClass className="page-thank-you" />
      <PageHero
        eyebrow="Enquiry received"
        h1="Thank you — <span>we have your note.</span>"
        lede="An editor will review the coverage you shared and reply, usually within one business day. Prefer not to wait? Reach us directly."
        current="Thank You"
        actions={[
          { label: "Back to home", href: url() },
          {
            label: "View pricing",
            href: url("wikipedia-page-cost"),
            style: "button-outline",
          },
        ]}
        image="/assets/about-knowledge-sphere.png"
        imageWidth={1536}
        imageHeight={1536}
        visualClass="page-hero-visual--knowledge"
      />

      <section className="section-pad">
        <div className="shell card-grid">
          <article className="service-card">
            <Icon name="i-search" />
            <h3>What happens next</h3>
            <p>
              We look for independent coverage first. If the sources are not there yet,
              we say so plainly — before any work is commissioned.
            </p>
          </article>
          <article className="service-card">
            <Icon name="i-page" />
            <h3>While you wait</h3>
            <p>
              Gather the strongest press links you have, with dates. That dossier is
              what makes the assessment useful.
            </p>
            <Link className="text-link" href={url("our-process")}>
              How our process works <Icon name="i-arrow" />
            </Link>
          </article>
          <article className="service-card">
            <Icon name="i-users" />
            <h3>Direct lines</h3>
            <p>
              <a href={`mailto:${SITE_EMAIL}`}>{SITE_EMAIL}</a>
              <br />
              <a href={`tel:${SITE_PHONE_RAW}`}>{SITE_PHONE}</a>
            </p>
            <p className="reviewed-note">{SITE_NAME} editorial desk</p>
          </article>
        </div>
      </section>
    </>
  );
}
