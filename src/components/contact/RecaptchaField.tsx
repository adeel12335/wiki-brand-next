"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void;
      execute: (
        siteKey: string,
        options: { action: string },
      ) => Promise<string>;
    };
  }
}

interface RecaptchaFieldProps {
  siteKey: string;
  /** Kept for API compatibility with the contact form; v3 has no checkbox. */
  onToken?: (token: string) => void;
  onExpire?: () => void;
  onError?: () => void;
  resetSignal?: number;
}

/** reCAPTCHA v3 — invisible score-based; token is minted on submit via executeRecaptchaV3. */
export function RecaptchaField({ siteKey, onError }: RecaptchaFieldProps) {
  const [ready, setReady] = useState(false);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    if (!siteKey) return;
    if (window.grecaptcha?.ready) {
      window.grecaptcha.ready(() => setReady(true));
    }
  }, [siteKey]);

  if (!siteKey) return null;

  return (
    <>
      <Script
        src={`https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(siteKey)}`}
        strategy="afterInteractive"
        onLoad={() => {
          window.grecaptcha?.ready(() => setReady(true));
        }}
        onError={() => {
          setLoadError(true);
          onError?.();
        }}
      />
      <p className="recaptcha-v3-note" data-ready={ready ? "true" : "false"}>
        Protected by reCAPTCHA. Google{" "}
        <a
          href="https://policies.google.com/privacy"
          target="_blank"
          rel="noopener noreferrer"
        >
          Privacy Policy
        </a>{" "}
        and{" "}
        <a
          href="https://policies.google.com/terms"
          target="_blank"
          rel="noopener noreferrer"
        >
          Terms
        </a>{" "}
        apply.
      </p>
      {loadError ? (
        <small className="field-error" role="alert">
          Security check could not load. Refresh, or email us directly if it keeps
          failing.
        </small>
      ) : null}
    </>
  );
}

export async function executeRecaptchaV3(
  siteKey: string,
  action = "contact",
): Promise<string> {
  if (!siteKey) return "";
  if (typeof window === "undefined" || !window.grecaptcha) {
    throw new Error("reCAPTCHA is not ready yet. Please wait a moment and try again.");
  }

  await new Promise<void>((resolve) => {
    window.grecaptcha!.ready(() => resolve());
  });

  return window.grecaptcha.execute(siteKey, { action });
}
