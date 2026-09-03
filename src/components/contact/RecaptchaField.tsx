"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";

declare global {
  interface Window {
    grecaptcha?: {
      render: (
        container: HTMLElement,
        parameters: {
          sitekey: string;
          theme?: "light" | "dark";
          size?: "normal" | "compact";
          callback?: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: () => void;
        },
      ) => number;
      reset: (widgetId?: number) => void;
      getResponse: (widgetId?: number) => string;
    };
    __onRecaptchaLoad?: () => void;
  }
}

interface RecaptchaFieldProps {
  siteKey: string;
  onToken: (token: string) => void;
  onExpire?: () => void;
  onError?: () => void;
  resetSignal?: number;
}

export function RecaptchaField({
  siteKey,
  onToken,
  onExpire,
  onError,
  resetSignal = 0,
}: RecaptchaFieldProps) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<number | null>(null);
  const [scriptReady, setScriptReady] = useState(false);
  const callbacksRef = useRef({ onToken, onExpire, onError });
  callbacksRef.current = { onToken, onExpire, onError };

  useEffect(() => {
    if (typeof window !== "undefined" && window.grecaptcha?.render) {
      setScriptReady(true);
    }
  }, []);

  useEffect(() => {
    if (!scriptReady || !siteKey || !hostRef.current || !window.grecaptcha) {
      return;
    }

    if (widgetIdRef.current !== null) {
      try {
        window.grecaptcha.reset(widgetIdRef.current);
      } catch {
        // Widget may already be gone; re-render below.
      }
      hostRef.current.innerHTML = "";
      widgetIdRef.current = null;
    }

    widgetIdRef.current = window.grecaptcha.render(hostRef.current, {
      sitekey: siteKey,
      theme: "dark",
      callback: (token) => callbacksRef.current.onToken(token),
      "expired-callback": () => callbacksRef.current.onExpire?.(),
      "error-callback": () => callbacksRef.current.onError?.(),
    });
  }, [scriptReady, siteKey]);

  useEffect(() => {
    if (widgetIdRef.current === null || !window.grecaptcha || resetSignal === 0) {
      return;
    }
    window.grecaptcha.reset(widgetIdRef.current);
  }, [resetSignal]);

  return (
    <>
      <Script
        src="https://www.google.com/recaptcha/api.js?render=explicit"
        strategy="afterInteractive"
        onLoad={() => setScriptReady(true)}
      />
      <div ref={hostRef} className="recaptcha-host" />
    </>
  );
}
