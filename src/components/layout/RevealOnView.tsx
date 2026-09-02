"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Next.js client navigations do not re-run public/script.js.
 * Without this, `.reveal` sections stay opacity:0 on every page after Home.
 */
export function RevealOnView() {
  const pathname = usePathname();

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const elements = [
      ...document.querySelectorAll<HTMLElement>(".reveal:not(.in-view)"),
    ];

    if (elements.length === 0) return;

    elements.forEach((element) => {
      element.style.setProperty(
        "--delay",
        `${element.dataset.delay || 0}ms`,
      );
    });

    if (reducedMotion || !("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("in-view"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -35px" },
    );

    // Soft-nav pages often mount below the fold; also reveal anything already visible.
    requestAnimationFrame(() => {
      elements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const visible =
          rect.top < window.innerHeight * 0.9 && rect.bottom > 0;
        if (visible) {
          element.classList.add("in-view");
        } else {
          observer.observe(element);
        }
      });
    });

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
