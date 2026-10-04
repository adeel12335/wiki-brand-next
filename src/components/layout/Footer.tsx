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
import { TrustpilotMicroBadge } from "@/components/trustpilot/TrustpilotReviewsSection";

export function Footer() {
  const year = new Date().getFullYear();
  const companyNumber = process.env.NEXT_PUBLIC_COMPANY_NUMBER?.trim();
  const companyAddress = process.env.NEXT_PUBLIC_COMPANY_ADDRESS?.trim();

  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div className="footer-brand">
          <Link className="brand" href={url()}>
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
          <TrustpilotMicroBadge />
        </div>

        <div className="footer-column footer-links">
          <h3>Quick Links</h3>
          {NAV_ITEMS.map((item) => (
            <Link key={item.slug || "footer-home"} href={url(item.slug)}>
              {item.label}
            </Link>
          ))}
          <Link href={url("hire-wikipedia-writer")}>
            Hire a Wikipedia writer
          </Link>
          <Link href={url("wikipedia-notability-checker")}>
            Notability checker
          </Link>
          <Link href={url("how-to-choose-wikipedia-agency")}>
            How to choose an agency
          </Link>
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
          <a className="footer-contact-line" href={`mailto:${SITE_EMAIL}`}>
            <span className="footer-contact-text">
              <small>Email us</small>
              {SITE_EMAIL}
            </span>
          </a>
          <a className="footer-contact-line" href={`tel:${SITE_PHONE_RAW}`}>
            <span className="footer-contact-text">
              <small>Call us</small>
              {SITE_PHONE}
            </span>
          </a>
          <span>Remote-first · Worldwide services</span>
          {companyNumber ? <span>Company no. {companyNumber}</span> : null}
          {companyAddress ? <span>{companyAddress}</span> : null}
        </div>
      </div>

      <div className="shell footer-bottom">
        <p>
          © {year} {SITE_NAME}. All Rights Reserved.
        </p>
        <div>
          <Link href={url("privacy-policy")}>Privacy Policy</Link>
          <Link href={url("terms-conditions")}>Terms &amp; Conditions</Link>
        </div>
      </div>
    </footer>
  );
}
