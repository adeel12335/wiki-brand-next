"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { blogContent } from "@/content/blog";

/**
 * Figma: Blog Listing → Newsletter band (inside the guides grid).
 * TODO(backend): no newsletter endpoint exists yet (same as the footer form) - wire it up, then remove the local "done" state.
 */
export function NewsletterBand() {
  const c = blogContent.newsletter;
  const [done, setDone] = useState(false);
  return (
    <div id="newsletter" className="col-span-full flex scroll-mt-28 flex-col gap-6 rounded-3xl bg-ink p-6 md:p-9 lg:flex-row lg:items-center lg:gap-10 lg:px-11">
      <span className="grid size-14 shrink-0 place-items-center rounded-2xl border border-gold/35 bg-gold/14 text-gold">
        <Icon name="mail" size={24} />
      </span>
      <div className="flex flex-1 flex-col gap-1.5">
        <p className="text-xl font-bold text-white md:text-[22px]">{c.title}</p>
        <p className="text-[15px] leading-relaxed text-on-dark-muted">{c.copy}</p>
      </div>
      <form
        className="flex w-full flex-col gap-2.5 sm:h-14 sm:flex-row sm:items-center sm:rounded-full sm:bg-white sm:pr-1.5 sm:pl-5 lg:w-[420px]"
        onSubmit={(e) => {
          e.preventDefault();
          setDone(true);
        }}
      >
        <label htmlFor="newsletter-email" className="sr-only">
          {c.placeholder}
        </label>
        <input
          id="newsletter-email"
          type="email"
          required
          disabled={done}
          placeholder={done ? c.done : c.placeholder}
          className="h-14 min-w-0 flex-1 rounded-full bg-white px-5 text-[15px] text-heading placeholder:text-body/70 focus:outline-none sm:h-auto sm:rounded-none sm:bg-transparent sm:px-0"
        />
        <button
          type="submit"
          disabled={done}
          className="h-12 shrink-0 rounded-full bg-gold px-5.5 text-sm font-bold text-on-gold transition-colors hover:bg-gold-light disabled:opacity-70 sm:h-[43px]"
        >
          {c.button}
        </button>
      </form>
    </div>
  );
}
