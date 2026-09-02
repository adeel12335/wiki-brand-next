import type { Metadata } from "next";
import { BodyClass } from "@/components/layout/BodyClass";
import { JsonLd } from "@/components/seo/JsonLd";
import { CtaBand } from "@/components/ui/CtaBand";
import { PageHero } from "@/components/ui/PageHero";
import { SITE_EMAIL, SITE_NAME } from "@/lib/config";
import { buildPageMetadata } from "@/lib/seo";

const pageMeta = {
  slug: "terms-conditions",
  title: `Terms & Conditions | ${SITE_NAME}`,
  shortTitle: "Terms & Conditions",
  description:
    "The terms that apply to using this website and commissioning Wikipedia editorial services from The Wikipedia Studio.",
  keywords: "terms and conditions, service terms, wikipedia studio terms",
  ogImage: "/assets/og/globe.jpg",
};

export const metadata: Metadata = buildPageMetadata(pageMeta);

export default function TermsPage() {
  const updated = new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(new Date());

  return (
    <>
      <BodyClass className="page-terms-conditions" />
      <JsonLd page={pageMeta} />
      <PageHero
        eyebrow="Legal"
        h1="Terms &amp; <span>Conditions</span>"
        lede="These terms cover use of this website and the basis on which we accept editorial work."
        current="Terms & Conditions"
      />
      <section className="section-pad">
        <div className="shell legal-body reveal">
          <p className="legal-updated">Last updated: {updated}</p>
          <h2>1. About these terms</h2>
          <p>
            By using this website or commissioning services from {SITE_NAME}, you
            agree to these terms.
          </p>
          <h2>2. What we do not promise</h2>
          <ul>
            <li>No guaranteed publication or approval.</li>
            <li>No guaranteed permanence of any article.</li>
            <li>No ownership of Wikipedia articles.</li>
            <li>No control over search results or knowledge panels.</li>
          </ul>
          <h2>3. Compliance and disclosure</h2>
          <p>
            We work within Wikipedia&apos;s policies, including disclosure of paid
            contributions as required.
          </p>
          <h2>4. Fees and payment</h2>
          <p>
            Fees are for professional editorial work, not for a guaranteed outcome.
          </p>
          <h2>5. Contact</h2>
          <p>
            Questions about these terms:{" "}
            <a href={`mailto:${SITE_EMAIL}`}>{SITE_EMAIL}</a>.
          </p>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
