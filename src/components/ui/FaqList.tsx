"use client";

import { useState } from "react";

export function FaqList({
  items,
  wide = false,
}: {
  items: Array<{ q: string; a: string }>;
  wide?: boolean;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className={wide ? "faq-wide" : undefined}>
      {items.map((item, index) => {
        const open = openIndex === index;
        return (
          <div key={item.q} className="faq-item">
            <button
              className="faq-question"
              type="button"
              aria-expanded={open}
              onClick={() => setOpenIndex(open ? null : index)}
            >
              {item.q}
              <span>{open ? "−" : "+"}</span>
            </button>
            <p className="faq-answer" hidden={!open}>
              {item.a}
            </p>
          </div>
        );
      })}
    </div>
  );
}
