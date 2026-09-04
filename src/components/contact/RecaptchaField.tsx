"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";

declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void;
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
  const [loadError, setLoadError] = useState(false);
  const callbacksRef = useRef({ onToken, onExpire, onError });
  callbacksRef.current = { onToken, onExpire, onError };

  useEffect(() => {
    window.__onRecaptchaLoad = () => setScriptReady(true);
    if (window.grecaptcha?.render) {
      setScriptReady(true);
    }
    return () => {
      delete window.__onRecaptchaLoad;
    };
  }, []);

  useEffect(() => {
    if (!scriptReady || !siteKey || !hostRef.current || !window.grecaptcha) {
      return;
    }

    const grecaptcha = window.grecaptcha;
    let cancelled = false;

    grecaptcha.ready(() => {
      if (cancelled || !hostRef.current) return;

      if (widgetIdRef.current !== null) {
        try {
          grecaptcha.reset(widgetIdRef.current);
        } catch {
          // Widget may already be gone; re-render below.
        }
        hostRef.current.innerHTML = "";
        widgetIdRef.current = null;
      }

      try {
        widgetIdRef.current = grecaptcha.render(hostRef.current, {
          sitekey: siteKey,
          theme: "dark",
          callback: (token) => callbacksRef.current.onToken(token),
          "expired-callback": () => callbacksRef.current.onExpire?.(),
          "error-callback": () => {
            setLoadError(true);
            callbacksRef.current.onError?.();
          },
        });
        setLoadError(false);
      } catch {
        setLoadError(true);
        callbacksRef.current.onError?.();
      }
    });

    return () => {
      cancelled = true;
    };
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
        src="https://www.google.com/recaptcha/api.js?render=explicit&onload=__onRecaptchaLoad"
        strategy="afterInteractive"
        onLoad={() => setScriptReady(true)}
        onError={() => {
          setLoadError(true);
          callbacksRef.current.onError?.();
        }}
      />
      <div ref={hostRef} className="recaptcha-host" />
      {loadError ? (
        <small className="field-error" role="alert">
          Security check could not load (site key / domain mismatch). Refresh, or
          email us directly if it keeps failing.
        </small>
      ) : null}
    </>
  );
}
