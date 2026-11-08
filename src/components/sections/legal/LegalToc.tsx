"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

/** Figma: Legal "Contents" card - numbered links, active section gets the gold rail (scroll-spy). */
export function LegalToc({ title, items }: { title: string; items: Array<{ id: string; title: string }> }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter((el): el is HTMLElement => !!el);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -65% 0px" },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav aria-label={title} className="flex flex-col gap-1 rounded-[20px] border border-heading/10 bg-white px-4 py-6">
      <p className="px-3 pb-2 text-[11px] font-bold tracking-[0.14em] text-gold-dark uppercase">{title}</p>
      {items.map((item, i) => {
        const on = item.id === active;
        return (
          <a
            key={item.id}
            href={`#${item.id}`}
            aria-current={on ? "location" : undefined}
            className={cn("group flex items-center gap-3 rounded-[10px] px-3 py-[11px] transition-colors hover:bg-mist", on && "bg-white")}
          >
            <span className={cn("h-[18px] w-[3px] shrink-0 rounded-full", on ? "bg-gold" : "bg-heading/10 group-hover:bg-gold/50")} />
            <span className={cn("w-4 shrink-0 text-xs font-bold", on ? "text-gold-dark" : "text-body")}>{String(i + 1).padStart(2, "0")}</span>
            <span className={cn("text-sm", on ? "font-semibold text-heading" : "text-body group-hover:text-heading")}>{item.title}</span>
          </a>
        );
      })}
    </nav>
  );
}
