"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import Script from "next/script";

declare global {
  interface Window {
    Trustpilot?: {
      loadFromElement: (element: HTMLElement, forceReload?: boolean) => void;
    };
  }
}

const subscribeNoop = () => () => {};

export interface TrustBoxProps {
  businessUnitId: string;
  templateId: string;
  reviewUrl: string;
  height?: string;
  width?: string;
  theme?: "dark" | "light";
  stars?: string;
  className?: string;
  /** Link text shown until (or if) the TrustBox script loads. */
  fallbackLabel?: string;
}

/**
 * Trustpilot TrustBox — SPA-safe for Next.js App Router.
 * @see https://help.trustpilot.com/s/article/Add-a-TrustBox-widget-to-a-single-page-application
 */
export function TrustBox({
  businessUnitId,
  templateId,
  reviewUrl,
  height = "240px",
  width = "100%",
  theme = "dark",
  stars = "1,2,3,4,5",
  className = "",
  fallbackLabel = "Read reviews on Trustpilot",
}: TrustBoxProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  // The Trustpilot script rewrites every `.trustpilot-widget` it finds. If it
  // runs before this part of the page hydrates, React sees a different DOM and
  // throws away the whole tree, so the widget div only exists after mount.
  // false while server-rendering and hydrating, true once mounted on the client.
  const mounted = useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false,
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    function load() {
      if (el && window.Trustpilot) {
        window.Trustpilot.loadFromElement(el, true);
      }
    }

    if (window.Trustpilot) {
      load();
      return;
    }

    const timer = window.setInterval(() => {
      if (window.Trustpilot) {
        window.clearInterval(timer);
        load();
      }
    }, 200);

    return () => window.clearInterval(timer);
  }, [mounted, businessUnitId, templateId, theme, height, width, stars]);

  const fallback = (
    <a href={reviewUrl} target="_blank" rel="noopener noreferrer">
      {fallbackLabel}
    </a>
  );

  if (!mounted) {
    return <div className={className}>{fallback}</div>;
  }

  return (
    <>
      <Script
        src="https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js"
        strategy="afterInteractive"
      />
      <div
        ref={ref}
        className={`trustpilot-widget ${className}`.trim()}
        data-locale="en-US"
        data-template-id={templateId}
        data-businessunit-id={businessUnitId}
        data-style-height={height}
        data-style-width={width}
        data-theme={theme}
        data-stars={stars}
        data-review-languages="en"
      >
        {fallback}
      </div>
    </>
  );
}
