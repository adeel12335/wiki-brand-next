"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import type { TocItem } from "./articleBody";

/** Figma: Blog Single → "On this page" (mist card; active item = gold bar + semibold). Highlights the section in view. */
export function TocNav({ title, items }: { title: string; items: TocItem[] }) {
  const [active, setActive] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const headings = items.map((item) => document.getElementById(item.id)).filter((el): el is HTMLElement => Boolean(el));
    if (!headings.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-110px 0px -65% 0px" },
    );
    headings.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  if (!items.length) return null;

  return (
    <nav aria-label={title} className="flex flex-col gap-1 rounded-2xl bg-mist p-7">
      <p className="mb-1 text-[11px] font-bold tracking-[0.16em] text-gold-dark uppercase">{title}</p>
      <ol className="flex flex-col">
        {items.map((item) => {
          const isActive = item.id === active;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={isActive ? "location" : undefined}
                className={cn(
                  "flex items-start gap-3 py-2.5 text-sm leading-snug transition-colors",
                  isActive ? "font-semibold text-heading" : "text-body hover:text-gold-dark",
                )}
              >
                <span className={cn("mt-px h-5 w-[3px] shrink-0 rounded-sm transition-colors", isActive ? "bg-gold" : "bg-heading/10")} />
                {item.label}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
