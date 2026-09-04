import Image from "next/image";
import Link from "next/link";
import { TrustpilotMicroBadge } from "@/components/trustpilot/TrustpilotReviewsSection";
import {
  NAV_ITEMS,
  SITE_EMAIL,
  SITE_NAME,
  SITE_PHONE,
  SITE_PHONE_RAW,
  url,
} from "@/lib/config";
import { services } from "@/lib/data";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div className="footer-brand">
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
            We craft credible, authoritative, and impactful Wikipedia pages that
            elevate your presence or brand reputation worldwide.
          </p>
          <div className="footer-principles" aria-label="Working principles">
            <span>Guideline-led</span>
            <span>Source-first</span>
            <span>Worldwide</span>
          </div>
          <TrustpilotMicroBadge />
        </div>

        <div className="footer-column footer-links">
          <h3>Quick Links</h3>
          {NAV_ITEMS.map((item) => (
            <Link key={item.slug || "footer-home"} href={url(item.slug)}>
              {item.label}
            </Link>
          ))}
        </div>

        <div className="footer-column footer-services">
          <h3>Services</h3>
          {Object.entries(services).map(([slug, service]) => (
            <Link key={slug} href={url(`services/${slug}`)}>
              {service.name}
            </Link>
          ))}
        </div>

        <div className="footer-column footer-contact">
          <h3>Contact Us</h3>
          <a href={`mailto:${SITE_EMAIL}`}>{SITE_EMAIL}</a>
          <a href={`tel:${SITE_PHONE_RAW}`}>{SITE_PHONE}</a>
          <span>Worldwide Services</span>
        </div>
      </div>

      <div className="shell footer-disclaimer">
        <p>
          {SITE_NAME} is an independent editorial service and is not affiliated
          with{" "}
          <a href="https://www.wikipedia.org/" target="_blank" rel="noopener noreferrer">
            Wikipedia
          </a>{" "}
          or the{" "}
          <a
            href="https://wikimediafoundation.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Wikimedia Foundation
          </a>
          .
        </p>
      </div>

      <div className="shell footer-bottom">
        <p>
          © {year} {SITE_NAME}. All Rights Reserved.
        </p>
        <div>
          <Link href={url("privacy-policy")}>Privacy Policy</Link>
          <Link href={url("terms-conditions")}>Terms &amp; Conditions</Link>
          <Link href={url("resources")}>Resources</Link>
          <Link href={url("sitemap")}>Sitemap</Link>
        </div>
      </div>
    </footer>
  );
}
