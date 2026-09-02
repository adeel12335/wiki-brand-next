import type { Metadata } from "next";
import { BodyClass } from "@/components/layout/BodyClass";
import { JsonLd } from "@/components/seo/JsonLd";
import { CtaBand } from "@/components/ui/CtaBand";
import { PageHero } from "@/components/ui/PageHero";
import { SITE_EMAIL, SITE_NAME } from "@/lib/config";
import { buildPageMetadata } from "@/lib/seo";

const pageMeta = {
  slug: "privacy-policy",
  title: `Privacy Policy | ${SITE_NAME}`,
  shortTitle: "Privacy Policy",
  description:
    "How The Wikipedia Studio collects, uses, and protects the information you send through this website.",
  keywords: "privacy policy, data protection, wikipedia studio privacy",
  ogImage: "/assets/og/globe.jpg",
};

export const metadata: Metadata = buildPageMetadata(pageMeta);

export default function PrivacyPolicyPage() {
  const updated = new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(new Date());

  return (
    <>
      <BodyClass className="page-privacy-policy" />
      <JsonLd page={pageMeta} />
      <PageHero
        eyebrow="Legal"
        h1="Privacy <span>Policy</span>"
        lede="This policy explains what information this website collects, why, and how long it is kept."
        current="Privacy Policy"
      />
      <section className="section-pad">
        <div className="shell legal-body reveal">
          <p className="legal-updated">Last updated: {updated}</p>
          <h2>Who we are</h2>
          <p>
            {SITE_NAME} is an editorial agency providing Wikipedia page creation,
            editing, research, and management services. You can reach us at{" "}
            <a href={`mailto:${SITE_EMAIL}`}>{SITE_EMAIL}</a>.
          </p>
          <h2>Information we collect</h2>
          <ul>
            <li>
              <strong>Enquiry details.</strong> Name, email, phone, service
              interest, and message from our contact form.
            </li>
            <li>
              <strong>Project material.</strong> Documents and source links you
              share during an engagement.
            </li>
            <li>
              <strong>Server logs.</strong> Standard hosting records such as IP
              address and browser user agent.
            </li>
          </ul>
          <h2>How we use it</h2>
          <p>
            To answer enquiries, deliver services, and keep records required for
            accounting and disclosure obligations. We do not sell your information.
          </p>
          <h2>Cookies and analytics</h2>
          <p>
            This website sets no advertising or tracking cookies. Web fonts may be
            loaded from Google Fonts.
          </p>
          <h2>Your choices</h2>
          <p>
            Write to <a href={`mailto:${SITE_EMAIL}`}>{SITE_EMAIL}</a> to request
            access, correction, or deletion of your information.
          </p>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
