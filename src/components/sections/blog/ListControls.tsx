import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

interface FilterChipProps {
  label: string;
  count?: number;
  active?: boolean;
  href?: string;
  onClick?: () => void;
  className?: string;
}

/** Figma: BL / Filter Chip - Default (white, mist count) / Active (ink, gold count). Hover changes colour only. */
export function FilterChip({ label, count, active = false, href, onClick, className }: FilterChipProps) {
  const classes = cn(
    "inline-flex h-10.5 shrink-0 items-center gap-2 rounded-full border pr-3.5 pl-4.5 text-sm font-semibold whitespace-nowrap transition-colors",
    active ? "border-ink bg-ink text-white" : "border-heading/12 bg-white text-heading hover:border-gold hover:text-gold-dark",
    className,
  );
  const inner = (
    <>
      {label}
      {count !== undefined ? (
        <span className={cn("rounded-full px-2 py-0.5 text-xs leading-4 font-bold", active ? "bg-gold text-on-gold" : "bg-mist text-body")}>{count}</span>
      ) : null}
    </>
  );
  if (href) {
    return (
      <Link href={href} scroll={false} aria-current={active ? "true" : undefined} className={classes}>
        {inner}
      </Link>
    );
  }
  return (
    <button type="button" onClick={onClick} aria-pressed={active} className={classes}>
      {inner}
    </button>
  );
}

function pageList(page: number, total: number): Array<number | "gap"> {
  const pages = new Set([1, total, page - 1, page, page + 1].filter((n) => n >= 1 && n <= total));
  const sorted = [...pages].sort((a, b) => a - b);
  const out: Array<number | "gap"> = [];
  sorted.forEach((n, i) => {
    if (i > 0 && n - sorted[i - 1] > 1) out.push("gap");
    out.push(n);
  });
  return out;
}

interface PaginationProps {
  page: number;
  totalPages: number;
  /** Link mode (server pages). */
  hrefFor?: (page: number) => string;
  /** Button mode (client-side lists). */
  onSelect?: (page: number) => void;
  labels?: { previous: string; next: string };
  className?: string;
}

/** Figma: Pagination - Previous · BL / Page Button (active = ink + gold label) · Next page. */
export function Pagination({ page, totalPages, hrefFor, onSelect, labels = { previous: "Previous", next: "Next page" }, className }: PaginationProps) {
  if (totalPages <= 1) return null;

  const control = (target: number, children: React.ReactNode, cls: string, aria?: Record<string, string>) => {
    const disabled = target < 1 || target > totalPages;
    if (disabled) {
      return (
        <span className={cn(cls, "pointer-events-none opacity-40")} aria-disabled="true">
          {children}
        </span>
      );
    }
    if (hrefFor) {
      return (
        <Link href={hrefFor(target)} className={cls} {...aria}>
          {children}
        </Link>
      );
    }
    return (
      <button type="button" onClick={() => onSelect?.(target)} className={cls} aria-label={aria?.["aria-label"]}>
        {children}
      </button>
    );
  };

  const navLink = "inline-flex items-center gap-2 text-[15px] font-semibold text-heading transition-colors hover:text-gold-dark";

  return (
    <nav aria-label="Pagination" className={cn("flex items-center justify-between gap-3 pt-4", className)}>
      {control(
        page - 1,
        <>
          <Icon name="chevron-left" size={16} />
          <span className="hidden sm:inline">{labels.previous}</span>
        </>,
        navLink,
        { rel: "prev" },
      )}
      <ol className="flex items-center gap-2">
        {pageList(page, totalPages).map((n, i) =>
          n === "gap" ? (
            <li key={`gap-${i}`} className="grid size-11 place-items-center rounded-xl border border-heading/12 bg-white text-[15px] font-semibold text-heading">
              …
            </li>
          ) : (
            <li key={n}>
              {n === page ? (
                <span aria-current="page" className="grid size-11 place-items-center rounded-xl bg-ink text-[15px] font-semibold text-gold-light">
                  {n}
                </span>
              ) : (
                control(
                  n,
                  n,
                  "grid size-11 place-items-center rounded-xl border border-heading/12 bg-white text-[15px] font-semibold text-heading transition-colors hover:border-gold hover:text-gold-dark",
                  { "aria-label": `Page ${n}` },
                )
              )}
            </li>
          ),
        )}
      </ol>
      {control(
        page + 1,
        <>
          <span className="hidden sm:inline">{labels.next}</span>
          <Icon name="chevron-right" size={16} />
        </>,
        navLink,
        { rel: "next" },
      )}
    </nav>
  );
}
