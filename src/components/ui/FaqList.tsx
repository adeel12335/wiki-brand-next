"use client";

export function FaqList({
  items,
  wide = false,
}: {
  items: Array<{ q: string; a: string }>;
  wide?: boolean;
}) {
  return (
    <div className={wide ? "faq-wide" : undefined}>
      {items.map((item, index) => (
        <details key={item.q} className="faq-item" open={index === 0}>
          <summary className="faq-question">
            {item.q}
            <span className="faq-toggle" aria-hidden="true" />
          </summary>
          <p className="faq-answer">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
