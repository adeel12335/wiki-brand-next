"use client";

import { useEffect, useRef } from "react";
import { slugify } from "@/lib/utils";

/**
 * Sticky sidebar for long legal pages: an "On this page" list built from the
 * h2 headings inside `target`, plus a contact card. Headings get stable ids so
 * sections can be deep-linked; the list is written to the DOM directly once
 * on mount (the headings are static server-rendered copy).
 */
export function LegalAside({
  target,
  email,
  topic,
}: {
  target: string;
  email: string;
  topic: string;
}) {
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const list = listRef.current;
    const doc = document.querySelector(target);
    if (!list || !doc) return;

    list.replaceChildren();
    doc.querySelectorAll("h2").forEach((heading) => {
      const text = heading.textContent?.trim() ?? "";
      if (!text) return;
      if (!heading.id) heading.id = slugify(text);
      const item = document.createElement("li");
      const link = document.createElement("a");
      link.href = `#${heading.id}`;
      link.textContent = text;
      item.appendChild(link);
      list.appendChild(item);
    });
  }, [target]);

  return (
    <aside className="lg-aside" aria-label="On this page">
      <div className="lg-toc">
        <p className="lg-aside-label">On this page</p>
        <ol ref={listRef} />
      </div>
      <div className="lg-help">
        <p className="lg-aside-label">Questions about {topic}?</p>
        <p>Email the editorial desk and a person will reply.</p>
        <a href={`mailto:${email}`}>{email}</a>
      </div>
    </aside>
  );
}
