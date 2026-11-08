import Link from "next/link";
import { Icon } from "@/components/ui/Icon";

interface ArchiveBandProps {
  /** Section label, e.g. "Insights" or "Portfolio". */
  label: string;
  href: string;
  /** Optional current page title shown after the arrow (single pages). */
  current?: string;
}

/** Figma: Archive Band - slim ink band above Blog / Portfolio listing and single pages. */
export function ArchiveBand({ label, href, current }: ArchiveBandProps) {
  return (
    <div className="bg-ink">
      <nav aria-label="Breadcrumb" className="shell flex min-h-[72px] items-center gap-3 py-5 text-sm md:min-h-[117px]">
        <Link href="/" className="text-on-dark-muted hover:text-gold-eyebrow">
          Home
        </Link>
        <Icon name="chevron-right" size={14} className="text-gold" />
        <Link href={href} className="text-2xl font-bold text-white hover:text-gold-eyebrow md:text-[32px]">
          {label}
        </Link>
        {current ? (
          <>
            <Icon name="chevron-right" size={14} className="text-gold" />
            <span className="line-clamp-1 text-on-dark-muted">{current}</span>
          </>
        ) : null}
      </nav>
    </div>
  );
}
