"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";

declare global {
  interface Window {
    Trustpilot?: {
      loadFromElement: (element: HTMLElement, forceReload?: boolean) => void;
    };
  }
}

export interface TrustBoxProps {
  businessUnitId: string;
  templateId: string;
  reviewUrl: string;
  height?: string;
  width?: string;
  theme?: "dark" | "light";
  stars?: string;
  className?: string;
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
}: TrustBoxProps) {
  const ref = useRef<HTMLDivElement | null>(null);

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
  }, [businessUnitId, templateId, theme, height, width, stars]);

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
        <a href={reviewUrl} target="_blank" rel="noopener noreferrer">
          Read reviews on Trustpilot
        </a>
      </div>
    </>
  );
}
