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
    document.documentElement.classList.add("reveal-enabled");

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const registered = new WeakSet<HTMLElement>();
    const pending = new Set<HTMLElement>();
    let registrationFrame = 0;
    const observer =
      reducedMotion || !("IntersectionObserver" in window)
        ? null
        : new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add("in-view");
                observer?.unobserve(entry.target);
              });
            },
            { threshold: 0.08, rootMargin: "0px 0px -20px" },
          );

    function flushRegistrations() {
      registrationFrame = 0;
      const elements = [...pending].filter((element) => element.isConnected);
      pending.clear();

      const visibility = elements.map((element) => {
        const rect = element.getBoundingClientRect();
        return {
          element,
          visible: rect.top < window.innerHeight * 0.94 && rect.bottom > 0,
        };
      });

      visibility.forEach(({ element, visible }) => {
        if (visible) element.classList.add("in-view");
        else observer?.observe(element);
      });
    }

    function register(element: HTMLElement) {
      if (registered.has(element) || element.classList.contains("in-view")) return;
      registered.add(element);
      element.style.setProperty("--delay", `${element.dataset.delay || 0}ms`);

      if (!observer) {
        element.classList.add("in-view");
        return;
      }

      pending.add(element);
      if (!registrationFrame) {
        registrationFrame = requestAnimationFrame(flushRegistrations);
      }
    }

    function registerWithin(root: ParentNode) {
      if (root instanceof HTMLElement && root.matches(".reveal")) {
        register(root);
      }
      root
        .querySelectorAll<HTMLElement>(".reveal:not(.in-view)")
        .forEach(register);
    }

    registerWithin(document);

    // loading.tsx can commit before the streamed page. Watch for the real route
    // content so reveal elements added later never remain permanently hidden.
    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement) registerWithin(node);
        });
      });
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      if (registrationFrame) cancelAnimationFrame(registrationFrame);
      observer?.disconnect();
      mutationObserver.disconnect();
    };
  }, [pathname]);

  return null;
}
