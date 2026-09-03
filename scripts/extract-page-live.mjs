import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const b = JSON.parse(
  await import("node:fs").then((fs) =>
    fs.readFileSync(
      "C:/Users/mehre/Downloads/wNz3ixPe - wikipedia-with-neha.json",
      "utf8",
    ),
  ),
);

const listId = "69bb20c03f6e6623a1e78f55";
const cards = (b.cards || [])
  .filter((c) => c.idList === listId && !c.closed)
  .sort((a, x) => (a.pos || 0) - (x.pos || 0));
const actions = b.actions || [];

function wikiUrlsFromText(t) {
  if (!t) return [];
  const m = t.match(/https?:\/\/en\.wikipedia\.org\/wiki\/[^\s)"'<>\]]+/gi) || [];
  return m.map((u) => u.replace(/[.,;]+$/, ""));
}

const out = [];
for (const c of cards) {
  const urls = new Set();
  wikiUrlsFromText(c.desc).forEach((u) => urls.add(u));
  for (const a of c.attachments || []) {
    if (a.url && /wikipedia\.org\/wiki\//i.test(a.url)) urls.add(a.url);
  }
  for (const a of actions) {
    if (a.type === "commentCard" && a.data?.card?.id === c.id) {
      wikiUrlsFromText(a.data?.text).forEach((u) => urls.add(u));
    }
  }
  out.push({
    name: c.name,
    id: c.id,
    shortUrl: c.shortUrl,
    wiki: [...urls],
    attCount: (c.attachments || []).length,
    comments: c.badges?.comments || 0,
    dateLastActivity: c.dateLastActivity,
    descPreview: (c.desc || "").slice(0, 280),
  });
}

const outPath = join(__dirname, "../tmp-page-live.json");
writeFileSync(outPath, JSON.stringify(out, null, 2));
console.log("Wrote", outPath, "count", out.length);
out.forEach((r, i) => {
  console.log(`${i + 1}. ${r.name} | wiki: ${r.wiki.join(", ") || "NONE"}`);
});
