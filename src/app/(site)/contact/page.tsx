import type { Metadata } from "next";
import Link from "next/link";
import { BodyClass } from "@/components/layout/BodyClass";
import { ContactForm } from "@/components/contact/ContactForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { Icon } from "@/components/ui/Icon";
import { PageHero } from "@/components/ui/PageHero";
import {
  SITE_EMAIL,
  SITE_NAME,
  SITE_PHONE,
  SITE_PHONE_RAW,
  absUrl,
  url,
} from "@/lib/config";
import { buildPageMetadata, seoId } from "@/lib/seo";

const pageMeta = {
  slug: "contact",
  title: "Contact Our Wikipedia Editors",
  shortTitle: "Contact",
  description:
    "Contact The Wikipedia Studio for a notability assessment or help with Wikipedia page creation, editing, research, and ongoing management.",
  keywords:
    "contact wikipedia studio, wikipedia consultation, wikipedia notability assessment, hire wikipedia editor, wikipedia page quote",
  ogImage: "/assets/og/globe.jpg",
  ogImageAlt: "Contact The Wikipedia Studio",
  schema: [
    {
      "@type": "ContactPage",
      "@id": `${absUrl("contact")}#contactpage`,
      url: absUrl("contact"),
      name: `Contact ${SITE_NAME}`,
      about: { "@id": seoId("organization") },
    },
  ],
};

export const metadata: Metadata = buildPageMetadata(pageMeta);

const nextSteps = [
  {
    index: "01",
    title: "New article",
    copy: (
      <>
        Start with a source audit. Bring independent coverage and we will tell you
        whether{" "}
        <Link href={url("services/wikipedia-page-creation")}>page creation</Link>{" "}
        is realistic.
      </>
    ),
  },
  {
    index: "02",
    title: "Existing article",
    copy: (
      <>
        Send the live URL. An{" "}
        <Link href={url("services/wikipedia-page-editing")}>editing audit</Link>{" "}
        maps tags, sourcing gaps, and what is actually fixable.
      </>
    ),
  },
  {
    index: "03",
    title: "Something changed",
    copy: (
      <>
        If an edit concerns you,{" "}
        <Link href={url("services/wikipedia-page-management")}>
          page monitoring
        </Link>{" "}
        covers assessment and a measured response.
      </>
    ),
  },
];

export default function ContactPage() {
  return (
    <>
      <BodyClass className="page-contact" />
      <JsonLd page={pageMeta} />
      <PageHero
        eyebrow="Correspondence"
        h1="Tell us the subject. <span>We will tell you the truth.</span>"
        lede="Send the coverage that already exists. An editor — not a sales queue — replies with a clear read on whether a Wikipedia article is realistic."
        current="Contact"
        image="/assets/about-knowledge-sphere.png"
        imageWidth={1536}
        imageHeight={1536}
        visualClass="page-hero-visual--knowledge"
      />

      <section className="contact-desk section-pad" aria-label="Enquiry desk">
        <div className="shell contact-desk-shell">
          <div className="contact-desk-rail" aria-hidden="true">
            <span>Enquiry</span>
            <i />
            <span>Desk</span>
          </div>

          <div className="contact-desk-layout">
            <ContactForm />

            <aside className="contact-spine reveal" data-delay="80">
              <div className="contact-spine-head">
                <p className="micro-label">Direct lines</p>
                <p className="contact-spine-lede">
                  Prefer to skip the form? Reach the editorial desk straight away.
                </p>
              </div>

              <ul className="contact-spine-list">
                <li>
                  <a className="contact-channel" href={`mailto:${SITE_EMAIL}`}>
                    <span className="contact-spine-icon" aria-hidden="true">
                      <Icon name="i-contact-mail" />
                    </span>
                    <span className="contact-channel-copy">
                      <strong>Email</strong>
                      <span>{SITE_EMAIL}</span>
                    </span>
                    <span className="contact-channel-arrow" aria-hidden="true">
                      <Icon name="i-arrow" />
                    </span>
                  </a>
                </li>
                <li>
                  <a className="contact-channel" href={`tel:${SITE_PHONE_RAW}`}>
                    <span className="contact-spine-icon" aria-hidden="true">
                      <Icon name="i-contact-phone" />
                    </span>
                    <span className="contact-channel-copy">
                      <strong>Phone</strong>
                      <span>{SITE_PHONE}</span>
                    </span>
                    <span className="contact-channel-arrow" aria-hidden="true">
                      <Icon name="i-arrow" />
                    </span>
                  </a>
                </li>
                <li>
                  <div className="contact-channel contact-channel--static">
                    <span className="contact-spine-icon" aria-hidden="true">
                      <Icon name="i-globe" />
                    </span>
                    <span className="contact-channel-copy">
                      <strong>Coverage</strong>
                      <span>Worldwide editorial work</span>
                    </span>
                    <span className="contact-channel-status" aria-hidden="true">
                      <i />
                    </span>
                  </div>
                </li>
              </ul>

              <div className="contact-spine-note">
                <p className="micro-label">Faster replies</p>
                <h3>Bring these if you have them</h3>
                <ul className="contact-spine-checks">
                  <li>
                    <Icon name="i-check" />
                    <span>Independent press coverage links</span>
                  </li>
                  <li>
                    <Icon name="i-check" />
                    <span>Key dates and verified milestones</span>
                  </li>
                  <li>
                    <Icon name="i-check" />
                    <span>Any existing Wikipedia or Wikidata entry</span>
                  </li>
                  <li>
                    <Icon name="i-check" />
                    <span>Creation, editing, or maintenance need</span>
                  </li>
                </ul>
              </div>

              <p className="contact-spine-turnaround">
                <span className="contact-turnaround-icon" aria-hidden="true">
                  <Icon name="i-clock" />
                </span>
                <span>
                  Typical reply window: <em>one business day</em>
                </span>
              </p>
            </aside>
          </div>
        </div>
      </section>

      <section className="contact-aftermath section-pad">
        <div className="shell">
          <div className="contact-aftermath-head reveal">
            <p className="micro-label">After you send it</p>
            <h2>What happens next</h2>
            <p>
              Every enquiry is read by an editor. If the coverage looks promising, we
              propose a{" "}
              <Link href={url("services/wikipedia-page-creation")}>
                notability assessment
              </Link>{" "}
              as the first paid step — not a promise of publication.
            </p>
          </div>

          <ol className="contact-path reveal">
            {nextSteps.map((step) => (
              <li key={step.index}>
                <span className="contact-path-index" aria-hidden="true">
                  {step.index}
                </span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.copy}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
