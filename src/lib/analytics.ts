/** Push a GA4-compatible event when gtag / dataLayer is present. */
export function trackEvent(
  event: string,
  params?: Record<string, string | number | boolean | undefined>,
): void {
  if (typeof window === "undefined") return;

  const payload = { event, ...params };

  const w = window as Window & {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  };

  if (typeof w.gtag === "function") {
    w.gtag("event", event, params ?? {});
    return;
  }

  w.dataLayer = w.dataLayer ?? [];
  w.dataLayer.push(payload);
}
