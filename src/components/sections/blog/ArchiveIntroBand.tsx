import Link from "next/link";
import { Icon } from "@/components/ui/Icon";

interface ArchiveIntroBandProps {
  label: string;
  href: string;
  copy: string;
  link: { label: string; href: string };
}

/**
 * Figma: Archive Band (Device=Desktop/Mobile) as used on Blog + Portfolio pages - 
 * spaced label | gold hairline | intro copy, with a text link + circled arrow on the right.
 * Local because the shared `ArchiveBand` module is a breadcrumb variant without copy/link slots.
 */
export function ArchiveIntroBand({ label, href, copy, link }: ArchiveIntroBandProps) {
  return (
    <div className="bg-ink">
      <div className="shell flex flex-col gap-5 py-9 md:flex-row md:items-center md:justify-between md:gap-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-7">
          <Link
            href={href}
            className="text-[30px] leading-none font-bold tracking-[0.14em] text-white uppercase transition-colors hover:text-gold-light"
          >
            {label}
          </Link>
          <span aria-hidden className="h-px w-12 bg-gold md:h-11 md:w-px" />
          <p className="max-w-[460px] text-sm leading-relaxed text-on-dark-muted">{copy}</p>
        </div>
        <Link href={link.href} className="group inline-flex shrink-0 items-center gap-2.5 text-[15px] font-semibold text-gold-light transition-colors hover:text-white">
          {link.label}
          <span className="grid size-8 place-items-center rounded-full border border-gold-light transition-colors group-hover:border-white">
            <Icon name="arrow" size={14} />
          </span>
        </Link>
      </div>
    </div>
  );
}
