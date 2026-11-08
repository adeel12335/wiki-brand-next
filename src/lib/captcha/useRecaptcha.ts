"use client";

import { useCallback, useEffect } from "react";
import { getRecaptchaSiteKey } from "@/lib/captcha/recaptcha";

declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

const SCRIPT_ID = "recaptcha-v3-script";

/** Inject the reCAPTCHA v3 script once per page (shared by every form). */
function loadScript(siteKey: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.grecaptcha?.execute) return resolve();
    let el = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
    if (!el) {
      el = document.createElement("script");
      el.id = SCRIPT_ID;
      el.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(siteKey)}`;
      el.async = true;
      document.head.appendChild(el);
    }
    el.addEventListener("load", () => resolve(), { once: true });
    el.addEventListener("error", () => reject(new Error("recaptcha-load-failed")), { once: true });
    // Script may already have loaded before the listener was attached.
    if (window.grecaptcha?.execute) resolve();
  });
}

/**
 * Invisible reCAPTCHA v3 for the public forms. `getToken()` mints a fresh token on submit;
 * it returns "" when no site key is configured (the API then skips verification).
 */
export function useRecaptcha(action = "contact") {
  const siteKey = getRecaptchaSiteKey();

  useEffect(() => {
    if (siteKey) loadScript(siteKey).catch(() => {});
  }, [siteKey]);

  const getToken = useCallback(async (): Promise<string> => {
    if (!siteKey) return "";
    await loadScript(siteKey);
    const g = window.grecaptcha;
    if (!g) throw new Error("recaptcha-unavailable");
    await new Promise<void>((resolve) => g.ready(resolve));
    return g.execute(siteKey, { action });
  }, [siteKey, action]);

  return { enabled: Boolean(siteKey), getToken };
}
