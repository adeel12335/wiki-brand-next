"use client";

import { useId, useState } from "react";

/**
 * Accordion FAQ — one answer open at a time, animated open/close.
 * Answers always stay in the HTML (AEO/SEO); collapsed panels are just 0px tall.
 */
export function FaqList({
  items,
  wide = false,
}: {
  items: Array<{ q: string; a: string }>;
  wide?: boolean;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const baseId = useId();

  return (
    <div className={wide ? "faq-wide" : undefined}>
      {items.map((item, index) => {
        const open = openIndex === index;
        const buttonId = `${baseId}-q${index}`;
        const panelId = `${baseId}-a${index}`;
        return (
          <div key={item.q} className={`faq-item${open ? " is-open" : ""}`}>
            <h3 className="faq-heading">
              <button
                type="button"
                className="faq-question"
                id={buttonId}
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenIndex(open ? null : index)}
              >
                {item.q}
                <span className="faq-toggle" aria-hidden="true" />
              </button>
            </h3>
            <div
              className="faq-panel"
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              inert={!open}
            >
              <div className="faq-panel-inner">
                <p className="faq-answer">{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
