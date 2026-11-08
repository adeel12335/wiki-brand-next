import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import type { CompareCell } from "@/content/pricing";

interface CompareTableProps {
  firstColumn: string;
  columns: string[];
  featuredColumn: number;
  rows: Array<{ label: string; values: CompareCell[] }>;
  swipeHint: string;
}

function Cell({ value }: { value: CompareCell }) {
  if (value === true) {
    return (
      <span className="grid size-[22px] place-items-center rounded-full bg-gold text-on-gold">
        <Icon name="tick" size={13} strokeWidth={2.4} title="Included" />
      </span>
    );
  }
  if (value === false) {
    return (
      <span className="text-base text-on-dark-muted">
 - <span className="sr-only">Not included</span>
      </span>
    );
  }
  return <span>{value}</span>;
}

/**
 * Figma: Pricing → Compare "Table". Real <table> (extractable by search/LLMs).
 * Mobile: horizontal scroll inside a 880px-wide table + "Swipe to compare" hint (Figma "Table scroller").
 */
export function CompareTable({ firstColumn, columns, featuredColumn, rows, swipeHint }: CompareTableProps) {
  return (
    <div className="flex flex-col gap-4" data-aos="fade-up">
      <div className="overflow-x-auto rounded-3xl border border-on-dark/12 bg-ink-raised [scrollbar-width:thin]">
        <table className="w-full min-w-[880px] border-collapse text-left">
          <thead>
            <tr className="bg-ink">
              <th scope="col" className="w-[25%] px-6 py-5.5 text-base font-semibold text-white">
                {firstColumn}
              </th>
              {columns.map((col, i) => (
                <th
                  key={col}
                  scope="col"
                  className={cn("px-6 py-5.5 text-base font-semibold", i === featuredColumn ? "bg-gold/18 text-gold-light" : "text-white")}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label} className="border-t border-on-dark/8">
                <th scope="row" className="px-6 py-4 text-sm font-semibold text-white">
                  {row.label}
                </th>
                {row.values.map((v, i) => (
                  <td key={i} className={cn("px-6 py-4 text-sm text-on-dark", i === featuredColumn && "bg-gold/7")}>
                    <Cell value={v} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="flex items-center gap-2 text-[13px] text-on-dark-muted md:hidden">
        {swipeHint}
        <Icon name="arrow" size={14} className="text-gold" />
      </p>
    </div>
  );
}
