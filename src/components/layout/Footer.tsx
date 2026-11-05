import Image from "next/image";
import Link from "next/link";
import {
  NAV_ITEMS,
  SITE_EMAIL,
  SITE_NAME,
  SITE_PHONE,
  SITE_PHONE_RAW,
  url,
} from "@/lib/config";
import { services } from "@/lib/data";
import {
  AUDIENCE_LINKS,
  CASE_STUDIES_LINK,
} from "@/lib/data/audience-links";
import { Icon } from "@/components/ui/Icon";
import { TrustpilotMicroBadge } from "@/components/trustpilot/TrustpilotReviewsSection";

/** Home and Contact already have their own spots in the footer. */
const COMPANY_LINKS = NAV_ITEMS.filter(
  (item) => item.slug !== "" && item.slug !== "contact",
);

const RESOURCE_LINKS = [
  { slug: "wikipedia-notability-checker", label: "Notability checker" },
  { slug: "hire-wikipedia-writer", label: "Hire a Wikipedia writer" },
  { slug: "how-to-choose-wikipedia-agency", label: "How to choose an agency" },
  { slug: CASE_STUDIES_LINK.slug, label: CASE_STUDIES_LINK.label },
];

export function Footer() {
  const year = new Date().getFullYear();
  const companyNumber = process.env.NEXT_PUBLIC_COMPANY_NUMBER?.trim();
  const companyAddress = process.env.NEXT_PUBLIC_COMPANY_ADDRESS?.trim();

  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="ftr-top">
          <div className="ftr-intro">
            <Link className="brand" href={url()} aria-label={`${SITE_NAME} home`}>
              <Image
                src="/assets/globe-small.png"
                alt=""
                width={66}
                height={55}
                sizes="66px"
                quality={75}
              />
              <span className="brand-copy">
                <b>The Wikipedia</b>
                <span>
                  <i />
                  Studio
                  <i />
                </span>
              </span>
            </Link>
            <p>
              The Wikipedia Studio (Wiki Studio) is a Wikipedia service provider
              crafting credible, authoritative pages that elevate your presence or
              brand reputation worldwide.
            </p>
          </div>

          <div className="ftr-contact">
            <a className="ftr-contact-card" href={`mailto:${SITE_EMAIL}`}>
              <span className="ftr-contact-icon">
                <Icon name="i-contact-mail" />
              </span>
              <span className="ftr-contact-text">
                <small>Email us</small>
                {SITE_EMAIL}
              </span>
            </a>
            <a className="ftr-contact-card" href={`tel:${SITE_PHONE_RAW}`}>
              <span className="ftr-contact-icon">
                <Icon name="i-contact-phone" />
              </span>
              <span className="ftr-contact-text">
                <small>Call us</small>
                {SITE_PHONE}
              </span>
            </a>
          </div>
        </div>

        <div className="ftr-grid">
          <div className="ftr-col">
            <h3>Company</h3>
            <ul>
              {COMPANY_LINKS.map((item) => (
                <li key={item.slug}>
                  <Link href={url(item.slug)}>{item.label}</Link>
                </li>
              ))}
              <li>
                <Link href={url("contact")}>Contact</Link>
              </li>
            </ul>
          </div>

          <div className="ftr-col">
            <h3>Services</h3>
            <ul>
              {Object.entries(services).map(([slug, service]) => (
                <li key={slug}>
                  <Link href={url(`services/${slug}`)}>{service.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="ftr-col">
            <h3>Who we help</h3>
            <ul>
              {AUDIENCE_LINKS.map((item) => (
                <li key={item.slug}>
                  <Link href={url(item.slug)}>{item.anchor}</Link>
                </li>
              ))}
            </ul>
            <h3 className="ftr-col-sub">Resources</h3>
            <ul>
              {RESOURCE_LINKS.map((item) => (
                <li key={item.slug}>
                  <Link href={url(item.slug)}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="ftr-col ftr-col--trust">
            <h3>Reviews</h3>
            <TrustpilotMicroBadge />
            <ul className="ftr-meta">
              <li>Remote-first · Worldwide services</li>
              {companyNumber ? <li>Company no. {companyNumber}</li> : null}
              {companyAddress ? <li>{companyAddress}</li> : null}
            </ul>
          </div>
        </div>

        <p className="ftr-disclaimer">
          {SITE_NAME} is an independent editorial service and is not affiliated
          with Wikipedia or the Wikimedia Foundation.
        </p>

        <div className="ftr-bottom">
          <p>
            © {year} {SITE_NAME}. All Rights Reserved.
          </p>
          <nav className="ftr-legal" aria-label="Legal">
            <Link href={url("privacy-policy")}>Privacy Policy</Link>
            <Link href={url("terms-conditions")}>Terms &amp; Conditions</Link>
          </nav>
          <a className="ftr-top-link" href="#top">
            Back to top
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 19V5M6 11l6-6 6 6" />
            </svg>
          </a>
        </div>
      </div>

      <div className="ftr-wordmark" aria-hidden="true">
        Wikipedia Studio
      </div>
    </footer>
  );
}
