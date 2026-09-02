import { getSiteUrl, url } from "@/lib/config";

const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";
const INDEXNOW_KEY = "d1f7a91c3e4b4628b5c0f6e9a2d84731";

export async function notifyIndexNow(slugs: string[]): Promise<void> {
  const siteUrl = getSiteUrl();
  const parsed = new URL(siteUrl);

  if (process.env.NODE_ENV !== "production" || parsed.hostname === "localhost") {
    return;
  }

  const urlList = [...new Set(slugs.map((slug) => `${siteUrl}${url(slug)}`))];
  if (urlList.length === 0) return;

  try {
    const response = await fetch(INDEXNOW_ENDPOINT, {
      method: "POST",
      headers: { "content-type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host: parsed.host,
        key: INDEXNOW_KEY,
        keyLocation: `${siteUrl}/${INDEXNOW_KEY}.txt`,
        urlList,
      }),
      signal: AbortSignal.timeout(5000),
    });

    if (!response.ok && response.status !== 202) {
      console.error(`IndexNow submission failed with status ${response.status}.`);
    }
  } catch (error) {
    console.error("IndexNow submission failed.", error);
  }
}
