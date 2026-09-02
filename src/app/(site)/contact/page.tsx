import type { Metadata } from "next";
import Link from "next/link";
import { BodyClass } from "@/components/layout/BodyClass";
import { ContactForm } from "@/components/contact/ContactForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { Icon } from "@/components/ui/Icon";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
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
  title: "Contact Us | Request A Wikipedia Notability Assessment",
  shortTitle: "Contact",
  description:
    "Contact The Wikipedia Studio for a Wikipedia notability assessment, page creation, editing, or ongoing management. Worldwide service, Monday to Friday.",
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

export default function ContactPage() {
  return (
    <>
      <BodyClass className="page-contact" />
      <JsonLd page={pageMeta} />
      <PageHero
        eyebrow="Contact Us"
        h1="Ready to build your <span>Wikipedia presence?</span>"
        lede="Tell us about the subject and the coverage that already exists. We will come back with an honest read on whether a Wikipedia article is realistic."
        current="Contact"
        image="/assets/about-knowledge-sphere.png"
        imageWidth={1536}
        imageHeight={1536}
        visualClass="page-hero-visual--knowledge page-hero-visual--contact"
      />

      <section className="section-pad">
        <div className="shell contact-grid">
          <ContactForm />
          <aside className="contact-aside reveal" data-delay="100">
            <p className="micro-label">Direct Contact</p>
            <ul className="contact-list">
              <li>
                <Icon name="i-mail" />
                <div>
                  <strong>Email</strong>
                  <a href={`mailto:${SITE_EMAIL}`}>{SITE_EMAIL}</a>
                </div>
              </li>
              <li>
                <Icon name="i-phone" />
                <div>
                  <strong>Phone</strong>
                  <a href={`tel:${SITE_PHONE_RAW}`}>{SITE_PHONE}</a>
                </div>
              </li>
              <li>
                <Icon name="i-globe" />
                <div>
                  <strong>Coverage</strong>
                  <span>Worldwide services</span>
                </div>
              </li>
              <li>
                <Icon name="i-clock" />
                <div>
                  <strong>Hours</strong>
                  <span>Mon–Fri, 9:00 AM–6:00 PM</span>
                </div>
              </li>
            </ul>
            <div className="aside-note">
              <h3>What helps us answer fast</h3>
              <ul className="check-list compact">
                <li>
                  <Icon name="i-check" />
                  Links to independent press coverage
                </li>
                <li>
                  <Icon name="i-check" />
                  Key dates and verified milestones
                </li>
                <li>
                  <Icon name="i-check" />
                  Any existing Wikipedia or Wikidata entry
                </li>
                <li>
                  <Icon name="i-check" />
                  Whether you need creation, editing, or maintenance
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <section className="section-pad">
        <div className="shell">
          <SectionHeading eyebrow="After You Send It" heading="What happens next" />
          <div className="answer-block reveal">
            <p>
              Every enquiry is read by an editor rather than a sales team, and we
              reply within one business day.
            </p>
            <p>
              If the coverage looks promising, we propose a{" "}
              <Link href={url("services/wikipedia-page-creation")}>
                notability assessment
              </Link>{" "}
              as the first paid step.
            </p>
          </div>
          <div className="card-grid contact-next-grid reveal">
            {[
              {
                icon: "i-page",
                title: "New article",
                copy: (
                  <>
                    Start with the assessment. Bring press coverage links and we
                    will tell you whether{" "}
                    <Link href={url("services/wikipedia-page-creation")}>
                      page creation
                    </Link>{" "}
                    is realistic.
                  </>
                ),
              },
              {
                icon: "i-edit",
                title: "Existing article",
                copy: (
                  <>
                    Send the URL. An{" "}
                    <Link href={url("services/wikipedia-page-editing")}>
                      editing audit
                    </Link>{" "}
                    tells you what is wrong and what is fixable.
                  </>
                ),
              },
              {
                icon: "i-manage",
                title: "Something changed",
                copy: (
                  <>
                    If an edit has appeared that concerns you,{" "}
                    <Link href={url("services/wikipedia-page-management")}>
                      page monitoring
                    </Link>{" "}
                    covers assessment and response.
                  </>
                ),
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
    </>
  );
}
