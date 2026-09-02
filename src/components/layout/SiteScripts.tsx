import Script from "next/script";

/** Client-side interactions ported from legacy-php/script.js */
export function SiteScripts() {
  return <Script src="/script.js" strategy="lazyOnload" />;
}
