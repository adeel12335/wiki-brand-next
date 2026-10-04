import { useId } from "react";

/**
 * FAQ accordion built on native <details>: works without JavaScript, keeps
 * every answer in the HTML for search engines, and the shared `name` makes
 * it exclusive (one answer open at a time) in supporting browsers.
 */
export function FaqList({
  items,
}: {
  items: Array<{ q: string; a: string }>;
  /** Kept for compatibility with existing pages; layout is always full width. */
  wide?: boolean;
}) {
  const group = useId();

  return (
    <div className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-white">
      {items.map((item, index) => (
        <details key={item.q} name={group} open={index === 0} className="group">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 px-5 py-5 transition-colors hover:bg-surface md:px-7 [&::-webkit-details-marker]:hidden">
            <h3 className="font-heading text-base font-bold text-ink md:text-lg lg:text-xl">{item.q}</h3>
            <span className="mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-accent-soft text-primary transition-transform duration-200 group-open:rotate-45">
              <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden="true">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </span>
          </summary>
          <div className="px-5 pb-6 md:px-7">
            <p className="max-w-3xl text-base leading-relaxed text-muted lg:text-lg">{item.a}</p>
          </div>
        </details>
      ))}
    </div>
  );
}
