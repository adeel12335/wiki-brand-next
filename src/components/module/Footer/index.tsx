import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { Logo } from "@/components/ui/Logo";
import { footerColumns, legalLinks, socialLinks } from "@/config/navigation";
import { SITE_EMAIL, SITE_NAME, SITE_PHONE, SITE_PHONE_RAW } from "@/lib/config";

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-[15px] text-on-dark-muted transition-colors hover:text-gold-eyebrow">
      {children}
    </Link>
  );
}

/** Figma: O2 / Footer (desktop) + M / Footer (mobile). */
export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-ink text-on-dark">
      <div className="shell flex flex-col gap-4 py-10 md:py-12">
        <Logo tone="dark" size="lg" />
        <p className="max-w-[640px] text-[15px] leading-relaxed text-on-dark-muted">
          The Wikipedia Studio provides professional Wikipedia page creation, editing, research, and monitoring services for individuals
          and organizations worldwide. We focus on independent sources, accurate content, and transparent editorial practices.
        </p>
      </div>

      <div className="shell">
        <div className="h-px bg-white/10" />
      </div>

      <div className="shell grid grid-cols-2 gap-x-6 gap-y-10 py-12 md:grid-cols-3 lg:grid-cols-5">
        {footerColumns.map((col) => (
          <div key={col.label} className="flex flex-col gap-3">
            <p className="mb-2 text-lg font-bold text-white">{col.label}</p>
            {col.links.map((link) => (
              <FooterLink key={link.href + link.label} href={link.href}>
                {link.label}
              </FooterLink>
            ))}
          </div>
        ))}
        <div className="col-span-2 flex flex-col gap-3 md:col-span-1">
          <p className="mb-2 text-lg font-bold text-white">Contact Us</p>
          <a href={`mailto:${SITE_EMAIL}`} className="flex items-center gap-2.5 text-[15px] text-on-dark-muted hover:text-gold-eyebrow">
            <Icon name="mail" size={18} className="text-gold" />
            {SITE_EMAIL}
          </a>
          <a href={`tel:${SITE_PHONE_RAW}`} className="flex items-center gap-2.5 text-[15px] text-on-dark-muted hover:text-gold-eyebrow">
            <Icon name="phone" size={18} className="text-gold" />
            {SITE_PHONE}
          </a>
          <form action="/search/" method="get" role="search" className="mt-3 flex items-center rounded-btn border border-white/15 bg-white/5 focus-within:border-gold">
            <label htmlFor="footer-search" className="sr-only">
              Search
            </label>
            <input id="footer-search" name="q" type="search" placeholder="Search…" className="min-w-0 flex-1 bg-transparent px-3.5 py-2.5 text-[15px] text-white placeholder:text-on-dark-muted placeholder:italic focus:outline-none" />
            <button type="submit" aria-label="Search" className="px-3 text-gold">
              <Icon name="search" size={18} />
            </button>
          </form>
        </div>
      </div>

      <div className="shell">
        <div className="h-px bg-white/10" />
      </div>

      <div className="shell flex flex-col gap-6 py-8 text-[15px] text-on-dark-muted md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col gap-3">
          <p>{SITE_NAME} is an independent editorial service and is not affiliated with Wikipedia or the Wikimedia Foundation.</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {legalLinks.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-gold-eyebrow">
                {link.label}
              </Link>
            ))}
          </div>
          <p>
            © {year} {SITE_NAME}. All rights reserved.
          </p>
        </div>
        <div className="flex gap-3">
          {socialLinks
            .filter((s) => s.href)
            .map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="grid size-10 place-items-center rounded-full border border-gold/35 text-gold transition-all hover:bg-gold hover:text-on-gold"
              >
                <Icon name={s.icon!} size={18} />
              </a>
            ))}
        </div>
      </div>
    </footer>
  );
}
