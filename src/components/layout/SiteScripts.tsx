import Script from "next/script";

const CRISP_WEBSITE_ID = "3308590b-4088-4e68-a702-141d048a7e6c";

/** Client-side interactions ported from legacy-php/script.js, plus the Crisp chat widget. */
export function SiteScripts() {
  return (
    <>
      <Script src="/script.js?v=20261002" strategy="lazyOnload" />
      <Script id="crisp-chat" strategy="lazyOnload">
        {`window.$crisp=[];window.CRISP_WEBSITE_ID="${CRISP_WEBSITE_ID}";(function(){var d=document,s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();`}
      </Script>
    </>
  );
}
