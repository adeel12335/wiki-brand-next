"use client";

import { useId, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

export interface FaqEntry {
  question: string;
  answer: React.ReactNode;
}

/**
 * Figma: P2 / FAQ Item - editorial divider accordion.
 * Closed: hairline. Hover: question, plus and line turn gold (text never moves). Open: bold question + gold ×.
 */
export function FaqList({ items, defaultOpen = 0, className }: { items: FaqEntry[]; defaultOpen?: number | null; className?: string }) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const baseId = useId();

  return (
    <div className={cn("w-full", className)}>
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `${baseId}-panel-${i}`;
        return (
          <div key={item.question} className={cn("group border-b transition-colors", isOpen ? "border-gold" : "border-heading/16 hover:border-gold")}>
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-1 py-6 text-left md:py-7"
              >
                <span
                  className={cn(
                    "text-[17px] leading-snug transition-colors md:text-[19px]",
                    isOpen ? "font-bold text-heading" : "font-semibold text-heading group-hover:text-gold-dark",
                  )}
                >
                  {item.question}
                </span>
                <Icon
                  name="plus"
                  size={22}
                  className={cn(
                    "shrink-0 transition-all duration-300",
                    isOpen ? "rotate-45 text-gold" : "text-heading/50 group-hover:text-gold",
                  )}
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              className={cn("grid transition-[grid-template-rows] duration-300", isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}
            >
              <div className="overflow-hidden">
                <div className="px-1 pb-7 text-[15px] leading-relaxed text-body md:text-base">{item.answer}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
