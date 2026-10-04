import Link from "next/link";
import { Brand } from "@/components/layout/Header";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { TrustpilotFooterBadge } from "@/components/trustpilot/TrustpilotRating";
import {
  NAV_ITEMS,
  SITE_EMAIL,
  SITE_NAME,
  SITE_PHONE,
  SITE_PHONE_RAW,
  url,
} from "@/lib/config";
import { services } from "@/lib/data";

const RESOURCE_LINKS = [
  { slug: "hire-wikipedia-writer", label: "Hire a Wikipedia writer" },
  { slug: "wikipedia-notability-checker", label: "Notability checker" },
  { slug: "how-to-choose-wikipedia-agency", label: "How to choose an agency" },
  { slug: "case-studies", label: "Case studies" },
  { slug: "resources", label: "Resources" },
];

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-sm font-semibold tracking-[0.12em] text-white uppercase">{title}</h2>
      <ul className="mt-5 space-y-3">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="text-[0.9375rem] text-white/70 transition-colors hover:text-white">
        {children}
      </Link>
    </li>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  const companyNumber = process.env.NEXT_PUBLIC_COMPANY_NUMBER?.trim();
  const companyAddress = process.env.NEXT_PUBLIC_COMPANY_ADDRESS?.trim();

  return (
    <footer className="bg-ink text-white">
      <Container className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-12 lg:gap-8 lg:py-20">
        <div className="lg:col-span-4">
          <Brand inverted />
          <p className="mt-6 max-w-sm text-[0.9375rem] leading-relaxed text-white/70">
            The Wikipedia Studio (Wiki Studio) is a Wikipedia service provider crafting credible,
            well-sourced pages that strengthen your presence and reputation worldwide.
          </p>
          <TrustpilotFooterBadge />
        </div>

        <div className="lg:col-span-2">
          <FooterColumn title="Company">
            {NAV_ITEMS.filter((item) => item.slug).map((item) => (
              <FooterLink key={item.slug} href={url(item.slug)}>
                {item.label}
              </FooterLink>
            ))}
          </FooterColumn>
        </div>

        <div className="lg:col-span-3">
          <FooterColumn title="Services">
            {Object.entries(services).map(([slug, service]) => (
              <FooterLink key={slug} href={url(`services/${slug}`)}>
                {service.name}
              </FooterLink>
            ))}
          </FooterColumn>
        </div>

        <div className="lg:col-span-3">
          <FooterColumn title="Resources">
            {RESOURCE_LINKS.map((item) => (
              <FooterLink key={item.slug} href={url(item.slug)}>
                {item.label}
              </FooterLink>
            ))}
          </FooterColumn>

          <address className="mt-8 space-y-3 not-italic">
            <a
              href={`mailto:${SITE_EMAIL}`}
              className="flex items-center gap-3 text-[0.9375rem] text-white/80 hover:text-white"
            >
              <Icon name="i-contact-mail" className="size-5 text-accent" />
              {SITE_EMAIL}
            </a>
            <a
              href={`tel:${SITE_PHONE_RAW}`}
              className="flex items-center gap-3 text-[0.9375rem] text-white/80 hover:text-white"
            >
              <Icon name="i-contact-phone" className="size-5 text-accent" />
              {SITE_PHONE}
            </a>
            {companyNumber ? <p className="type-small text-white/60">Company no. {companyNumber}</p> : null}
            {companyAddress ? <p className="type-small text-white/60">{companyAddress}</p> : null}
          </address>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-4 py-6 text-white/60 md:flex-row md:items-center md:justify-between">
          <p className="type-small">
            © {year} {SITE_NAME}. All rights reserved.
          </p>
          <ul className="type-small flex flex-wrap gap-x-6 gap-y-2">
            <li>
              <Link href={url("privacy-policy")} className="hover:text-white">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href={url("terms-conditions")} className="hover:text-white">
                Terms &amp; Conditions
              </Link>
            </li>
            <li>
              <Link href={url("sitemap")} className="hover:text-white">
                Sitemap
              </Link>
            </li>
          </ul>
        </Container>
      </div>
    </footer>
  );
}
