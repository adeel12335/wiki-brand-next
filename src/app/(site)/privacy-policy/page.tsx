import type { Metadata } from "next";
import { BodyClass } from "@/components/layout/BodyClass";
import { JsonLd } from "@/components/seo/JsonLd";
import { CtaBand } from "@/components/ui/CtaBand";
import { PageHero } from "@/components/ui/PageHero";
import { SITE_EMAIL, SITE_NAME } from "@/lib/config";
import { buildPageMetadata } from "@/lib/seo";

const pageMeta = {
  slug: "privacy-policy",
  title: "Privacy Policy",
  shortTitle: "Privacy Policy",
  description:
    "Learn how The Wikipedia Studio collects, uses, stores, and protects contact-form data and other information submitted through this website.",
  keywords: "privacy policy, data protection, wikipedia studio privacy",
  ogImage: "/assets/og/globe.jpg",
  ogImageAlt: "Privacy Policy — The Wikipedia Studio",
  modified: "2026-09-03",
};

export const metadata: Metadata = buildPageMetadata(pageMeta);

export default function PrivacyPolicyPage() {
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
          <p className="legal-updated">Last updated: September 3, 2026</p>

          <h2>Who we are</h2>
          <p>
            {SITE_NAME} is an editorial agency providing Wikipedia page creation,
            editing, research, and management services. You can reach us at{" "}
            <a href={`mailto:${SITE_EMAIL}`}>{SITE_EMAIL}</a>.
          </p>

          <h2>Information we collect</h2>
          <p>We collect only what you send us:</p>
          <ul>
            <li>
              <strong>Enquiry details.</strong> Name, email, optional phone,
              service interest, and message from our contact form.
            </li>
            <li>
              <strong>Project material.</strong> Biographical information,
              documents, or source links you share during an engagement.
            </li>
            <li>
              <strong>Server logs.</strong> Standard hosting records such as IP
              address, browser user agent, and requested URL, kept for security
              and diagnostics.
            </li>
          </ul>

          <h2>How we use it</h2>
          <ul>
            <li>To answer your enquiry and assess whether we can help.</li>
            <li>To deliver and support the services you commission.</li>
            <li>
              To keep records required for accounting and for disclosure
              obligations that apply to paid Wikipedia contributions.
            </li>
          </ul>
          <p>
            We do not sell your information, and we do not use it for
            advertising.
          </p>

          <h2>Confidentiality</h2>
          <p>
            Client engagements are confidential. We do not publish client names
            or identify specific Wikipedia articles as our work. Where
            Wikipedia&apos;s terms of use require disclosure of a paid
            relationship, that disclosure is made on Wikipedia in the form the
            platform requires, and we discuss its scope with you first.
          </p>

          <h2>Cookies and analytics</h2>
          <p>
            This website sets no advertising or tracking cookies. Web fonts may
            be loaded from Google Fonts, which means your browser may request
            those servers and Google may log your IP address. Most browsers allow
            third-party requests to be blocked if you prefer.
          </p>

          <h2>Third parties</h2>
          <p>
            We use service providers for hosting and email delivery. They process
            data on our behalf and only for those purposes. We do not transfer
            your information to anyone else except where the law requires it.
          </p>

          <h2>How long we keep it</h2>
          <p>
            Enquiries that do not lead to an engagement are deleted once they are
            clearly no longer relevant. Records relating to completed engagements
            are kept as long as needed for our legal, accounting, and disclosure
            obligations.
          </p>

          <h2>Your choices</h2>
          <p>
            You can ask us to confirm what information we hold about you, correct
            it, or delete it. Write to{" "}
            <a href={`mailto:${SITE_EMAIL}`}>{SITE_EMAIL}</a> and we will respond
            within a reasonable period. Depending on where you live, you may also
            have the right to complain to a data protection authority.
          </p>

          <h2>Security</h2>
          <p>
            We take reasonable technical and organisational measures to protect
            the information we hold. No transmission over the internet can be
            guaranteed completely secure, so please avoid sending highly sensitive
            material by email unless we have agreed a secure route.
          </p>

          <h2>Changes to this policy</h2>
          <p>
            If this policy changes, the revised version will be published on this
            page with a new date at the top.
          </p>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
