/**
 * Analyze Trello "Page Live" cards, resolve live Wikipedia pages,
 * and upsert them into MongoDB + local portfolio JSON.
 *
 * Usage: node --env-file=.env.local scripts/import-page-live.mjs
 */
import "./configure-mongodb-dns.mjs";
import { mkdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import mongoose from "mongoose";

const __dirname = dirname(fileURLToPath(import.meta.url));
const MONGODB_URI = process.env.MONGODB_URI;
const TRELLO_PATH =
  "C:/Users/mehre/Downloads/wNz3ixPe - wikipedia-with-neha.json";
const LIST_ID = "69bb20c03f6e6623a1e78f55";
const ASSETS_DIR = join(__dirname, "../public/assets/portfolio");
const REPORT_PATH = join(__dirname, "../tmp-page-live-report.json");
const FALLBACK_PATH = join(__dirname, "../src/lib/data/portfolio-fallback.json");
const IMPORTED_PATH = join(__dirname, "../src/lib/data/portfolio-imported.json");

if (!MONGODB_URI) {
  console.error("MONGODB_URI is not set");
  process.exit(1);
}

const MANUAL_URLS = {
  "John Nyman": "https://en.wikipedia.org/wiki/John_A._Nyman",
  "Pirouz P.": "https://en.wikipedia.org/wiki/Pirouz_Pirouz",
  "Richard T. W. Arthur": "https://en.wikipedia.org/wiki/Richard_T._W._Arthur",
  "Richard Benjamin Darlington":
    "https://en.wikipedia.org/wiki/Richard_Benjamin_Darlington",
  "Zuckerman, Michael": "https://en.wikipedia.org/wiki/Michael_Zuckerman",
  "Jane Jaquette": "https://en.wikipedia.org/wiki/Jane_S._Jaquette",
  "Bernard Amadei - Priority": "https://en.wikipedia.org/wiki/Bernard_Amadei",
  "Maradel Gale": "https://en.wikipedia.org/wiki/Maradel_Krummel_Gale",
  "Wickizer, Thomas": "https://en.wikipedia.org/wiki/Thomas_Wickizer",
  "Hood, Clifton": "https://en.wikipedia.org/wiki/Clifton_Hood_(American_historian)",
  "Dressler, Joshua": "https://en.wikipedia.org/wiki/Joshua_Dressler",
  "Novy, Marianne": "https://en.wikipedia.org/wiki/Marianne_L._Novy",
  "C. Stephen Layman": "https://en.wikipedia.org/wiki/C._Stephen_Layman",
  "Sarah C Maza": "https://en.wikipedia.org/wiki/Sarah_Maza",
};

const MANUAL_TITLES = {
  "John Nyman": "John A. Nyman",
  "Pirouz P.": "Pirouz Pirouz",
  "Richard T. W. Arthur": "Richard T. W. Arthur",
  "Richard Benjamin Darlington": "Richard Benjamin Darlington",
  "Zuckerman, Michael": "Michael Zuckerman",
  "Jane Jaquette": "Jane S. Jaquette",
  "Bernard Amadei - Priority": "Bernard Amadei",
  "Maradel Gale": "Maradel Krummel Gale",
  "Wickizer, Thomas": "Thomas Wickizer",
  "Hood, Clifton": "Clifton Hood (American historian)",
  "Dressler, Joshua": "Joshua Dressler",
  "Novy, Marianne": "Marianne L. Novy",
  "C. Stephen Layman": "C. Stephen Layman",
  "Sarah C Maza": "Sarah Maza",
};

function slugify(title) {
  return title
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function cleanWikiUrl(url) {
  if (!url) return null;
  let u = url
    .replace(/\\_/g, "_")
    .replace(/[.,;)\]]+$/, "")
    .trim();
  // Fix truncated titles that lost closing paren
  if (/wikipedia\.org\/wiki\/.+[^)]$/.test(u) && u.includes("(") && !u.includes(")")) {
    return null;
  }
  try {
    const parsed = new URL(u);
    if (!/en\.wikipedia\.org$/i.test(parsed.hostname)) return null;
    if (!parsed.pathname.startsWith("/wiki/")) return null;
    const title = decodeURIComponent(parsed.pathname.replace(/^\/wiki\//, ""));
    if (!title || title === "Lynn_Hunt") return null; // false positive on Sarah card
    return `https://en.wikipedia.org/wiki/${encodeURIComponent(title).replace(/%20/g, "_")}`;
  } catch {
    return null;
  }
}

function wikiUrlsFromText(t) {
  if (!t) return [];
  const m = t.match(/https?:\/\/en\.wikipedia\.org\/wiki\/[^\s)"'<>\]]+/gi) || [];
  return m.map(cleanWikiUrl).filter(Boolean);
}

function extractCards(board) {
  const cards = (board.cards || [])
    .filter((c) => c.idList === LIST_ID && !c.closed)
    .sort((a, b) => (a.pos || 0) - (b.pos || 0));
  const actions = board.actions || [];

  return cards.map((c) => {
    const urls = new Set();
    wikiUrlsFromText(c.desc).forEach((u) => urls.add(u));
    for (const a of c.attachments || []) {
      const cleaned = cleanWikiUrl(a.url);
      if (cleaned) urls.add(cleaned);
    }
    for (const a of actions) {
      if (a.type === "commentCard" && a.data?.card?.id === c.id) {
        wikiUrlsFromText(a.data?.text).forEach((u) => urls.add(u));
      }
    }
    return {
      name: c.name,
      id: c.id,
      shortUrl: c.shortUrl,
      searchTitle: MANUAL_TITLES[c.name] || c.name.replace(/\s*-\s*Priority$/i, ""),
      candidateUrls: [
        ...(MANUAL_URLS[c.name] ? [MANUAL_URLS[c.name]] : []),
        ...urls,
      ].filter((v, i, arr) => arr.indexOf(v) === i),
      attachments: (c.attachments || []).length,
      comments: c.badges?.comments || 0,
      lastActivity: c.dateLastActivity,
    };
  });
}

async function wikiSearch(title) {
  const endpoint =
    "https://en.wikipedia.org/w/api.php?" +
    new URLSearchParams({
      action: "query",
      list: "search",
      srsearch: `"${title}"`,
      srlimit: "8",
      format: "json",
      origin: "*",
    });
  const res = await fetchWithRetry(endpoint);
  const data = await res.json();
  return (data.query?.search || []).map((hit) => ({
    title: hit.title,
    pageid: hit.pageid,
    snippet: hit.snippet?.replace(/<[^>]+>/g, "") || "",
  }));
}

async function fetchWithRetry(url, attempts = 6) {
  let lastError;
  for (let i = 0; i < attempts; i++) {
    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "WikiStudioImporter/1.0 (portfolio sync; contact info@thewikipediastudio.com)",
      },
    });
    if (res.status === 404) return res;
    if (res.ok) return res;
    lastError = new Error(`HTTP ${res.status} for ${url}`);
    if (res.status !== 429 && res.status < 500) throw lastError;
    const wait = 1500 * (i + 1) + Math.floor(Math.random() * 500);
    console.warn(`  retry ${i + 1}/${attempts} after ${wait}ms (${res.status})`);
    await new Promise((r) => setTimeout(r, wait));
  }
  throw lastError;
}

async function wikiSummary(titleOrUrl) {
  let title = titleOrUrl;
  if (titleOrUrl.includes("wikipedia.org/wiki/")) {
    title = decodeURIComponent(
      titleOrUrl.split("/wiki/")[1].split("#")[0].replace(/_/g, " "),
    );
  }
  const apiTitle = encodeURIComponent(title.replace(/ /g, "_"));
  const res = await fetchWithRetry(
    `https://en.wikipedia.org/api/rest_v1/page/summary/${apiTitle}`,
  );
  if (res.status === 404) return null;
  const data = await res.json();
  if (data.type === "disambiguation") {
    return { ...data, isDisambiguation: true };
  }
  return data;
}

function nameScore(candidateTitle, target) {
  const cTokens = normalizeName(candidateTitle).split(" ").filter(Boolean);
  const tTokens = normalizeName(target).split(" ").filter(Boolean);
  if (!cTokens.length || !tTokens.length) return 0;
  const overlap = tTokens.filter((t) => cTokens.includes(t)).length;
  const extraPenalty = Math.max(0, cTokens.length - tTokens.length) * 0.15;
  return overlap / tTokens.length - extraPenalty;
}

function pickBestCandidate(card, searchHits, summaries) {
  const scored = [];

  for (const url of card.candidateUrls) {
    const key = decodeURIComponent(url.split("/wiki/")[1] || "").replace(/_/g, " ");
    const summary = summaries[key] || summaries[url];
    if (summary && !summary.isDisambiguation && summary.title) {
      scored.push({
        url,
        summary,
        via: "trello-link",
        score: nameScore(summary.title, card.searchTitle) + 0.35,
      });
    }
  }

  for (const hit of searchHits) {
    const summary = summaries[hit.title];
    if (!summary || summary.isDisambiguation) continue;
    scored.push({
      url: `https://en.wikipedia.org/wiki/${encodeURIComponent(hit.title).replace(/%20/g, "_")}`,
      summary,
      via: "wikipedia-search",
      score: nameScore(hit.title, card.searchTitle),
    });
  }

  scored.sort((a, b) => b.score - a.score);
  const best = scored[0];
  if (!best || best.score < 0.5) return null;
  return best;
}

function normalizeName(s) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .split(/\s+/)
    .sort()
    .join(" ");
}

function categoryFromSummary(summary) {
  const desc = `${summary.description || ""} ${summary.extract || ""}`.toLowerCase();
  if (/historian|history/.test(desc)) return "Historian";
  if (/economist|economics/.test(desc)) return "Economist";
  if (/philosopher|philosophy/.test(desc)) return "Philosopher";
  if (/professor|academic|scholar|scientist|biologist|physicist|chemist/.test(desc))
    return "Academic";
  if (/lawyer|law professor|jurist|legal/.test(desc)) return "Legal scholar";
  if (/engineer|engineering/.test(desc)) return "Engineer";
  if (/author|writer|novelist/.test(desc)) return "Author";
  return "Public figure";
}

async function downloadImage(remoteUrl, slug) {
  if (!remoteUrl) return null;
  mkdirSync(ASSETS_DIR, { recursive: true });
  try {
    const res = await fetch(remoteUrl, {
      headers: { "User-Agent": "WikiStudioImporter/1.0 (portfolio sync)" },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const ctype = res.headers.get("content-type") || "";
    let ext = ".jpg";
    if (ctype.includes("png")) ext = ".png";
    else if (ctype.includes("webp")) ext = ".webp";
    else if (ctype.includes("gif")) ext = ".gif";
    const filename = `${slug}${ext}`;
    const filePath = join(ASSETS_DIR, filename);
    writeFileSync(filePath, Buffer.from(await res.arrayBuffer()));
    return `assets/portfolio/${filename}`;
  } catch (error) {
    console.warn(`  image fail ${slug}: ${error.message}`);
    return remoteUrl;
  }
}

const portfolioItemSchema = new mongoose.Schema(
  {
    slug: { type: String, unique: true },
    title: String,
    category: String,
    summary: String,
    body: String,
    externalUrl: { type: String, default: null },
    featuredOnHome: { type: Boolean, default: false },
    image: {
      cloudinaryId: String,
      url: String,
      alt: String,
      width: Number,
      height: Number,
    },
    seo: {
      metaTitle: String,
      metaDescription: String,
      keywords: String,
    },
    status: { type: String, enum: ["draft", "published"], default: "published" },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const PortfolioItem =
  mongoose.models.PortfolioItem ||
  mongoose.model("PortfolioItem", portfolioItemSchema);

const board = JSON.parse(readFileSync(TRELLO_PATH, "utf8"));
const cards = extractCards(board);
console.log(`Page Live cards: ${cards.length}`);

const report = [];

for (const card of cards) {
  console.log(`\n→ ${card.name}`);
  await new Promise((r) => setTimeout(r, 800));

  let searchHits = [];
  try {
    searchHits = await wikiSearch(card.searchTitle);
  } catch (e) {
    console.warn(`  search skipped: ${e.message}`);
  }

  const summaries = {};

  for (const url of card.candidateUrls) {
    try {
      await new Promise((r) => setTimeout(r, 350));
      const title = decodeURIComponent(url.split("/wiki/")[1] || "").replace(/_/g, " ");
      const s = await wikiSummary(title);
      if (s) {
        summaries[title] = s;
        summaries[url] = s;
      }
    } catch (e) {
      console.warn(`  candidate fail: ${e.message}`);
    }
  }
  for (const hit of searchHits.slice(0, 4)) {
    if (summaries[hit.title]) continue;
    try {
      await new Promise((r) => setTimeout(r, 350));
      const s = await wikiSummary(hit.title);
      if (s) summaries[hit.title] = s;
    } catch (e) {
      console.warn(`  summary fail ${hit.title}: ${e.message}`);
    }
  }

  const picked = pickBestCandidate(card, searchHits, summaries);
  if (!picked) {
    report.push({
      trelloName: card.name,
      status: "unresolved",
      searchTitle: card.searchTitle,
      candidates: card.candidateUrls,
      searchHits: searchHits.map((h) => h.title),
    });
    console.log("  UNRESOLVED");
    continue;
  }

  const summary = picked.summary;
  const title = summary.title || card.searchTitle;
  const slug = slugify(title);
  const extract = (summary.extract || "").trim();
  const description = (summary.description || "").trim();
  const short = description || extract.split(/(?<=\.)\s/)[0] || title;
  const category = categoryFromSummary(summary);
  const imageRemote =
    summary.originalimage?.source || summary.thumbnail?.source || null;
  const imagePath = imageRemote
    ? await downloadImage(imageRemote, slug)
    : "assets/portfolio/default-avatar.png";

  const payload = {
    slug,
    title,
    category,
    summary: short.slice(0, 220),
    body: extract.slice(0, 4000) || short,
    externalUrl: picked.url.replace(/ /g, "_"),
    featuredOnHome: false,
    image: {
      cloudinaryId: "",
      url: imagePath.startsWith("http") ? imagePath : `/${imagePath}`,
      alt: title,
      width: summary.originalimage?.width || summary.thumbnail?.width || 400,
      height: summary.originalimage?.height || summary.thumbnail?.height || 400,
    },
    seo: {
      metaTitle: `${title} | Wikipedia Portfolio`,
      metaDescription: short.slice(0, 155),
      keywords: `${title}, wikipedia, ${category}`.toLowerCase(),
    },
    status: "published",
  };

  report.push({
    trelloName: card.name,
    status: "resolved",
    via: picked.via,
    title,
    slug,
    wikipediaUrl: payload.externalUrl,
    category,
    summary: payload.summary,
    pageId: summary.pageid || null,
    lastEdited: summary.timestamp || null,
    hasImage: Boolean(imageRemote),
    trello: {
      id: card.id,
      shortUrl: card.shortUrl,
      attachments: card.attachments,
      comments: card.comments,
    },
  });

  console.log(`  OK ${title} ← ${picked.via}`);
  console.log(`  ${payload.externalUrl}`);
}

writeFileSync(REPORT_PATH, JSON.stringify(report, null, 2));
console.log(`\nReport: ${REPORT_PATH}`);

const resolved = report.filter((r) => r.status === "resolved");
console.log(`Resolved ${resolved.length}/${report.length}`);

await mongoose.connect(MONGODB_URI);
console.log("Mongo connected");

const existingCount = await PortfolioItem.countDocuments();
let sortBase = existingCount;

for (const item of resolved) {
  const full = report.find((r) => r.slug === item.slug);
  const existing = await PortfolioItem.findOne({
    $or: [{ slug: item.slug }, { externalUrl: item.wikipediaUrl }],
  });

  const summaryDoc = {
    slug: item.slug,
    title: item.title,
    category: item.category,
    summary: item.summary,
    body: item.summary,
    externalUrl: item.wikipediaUrl,
    status: "published",
  };

  // Re-read image from disk path if we stored it during loop — reconstruct from report assets
  const imageFileGuessJpg = join(ASSETS_DIR, `${item.slug}.jpg`);
  const imageFileGuessPng = join(ASSETS_DIR, `${item.slug}.png`);
  const imageFileGuessWebp = join(ASSETS_DIR, `${item.slug}.webp`);
  let imageUrl = "/assets/portfolio/default-avatar.png";
  if (existsSync(imageFileGuessJpg)) imageUrl = `/assets/portfolio/${item.slug}.jpg`;
  else if (existsSync(imageFileGuessPng)) imageUrl = `/assets/portfolio/${item.slug}.png`;
  else if (existsSync(imageFileGuessWebp)) imageUrl = `/assets/portfolio/${item.slug}.webp`;

  if (existing) {
    existing.title = item.title;
    existing.category = item.category;
    existing.summary = item.summary;
    existing.body = item.summary;
    existing.externalUrl = item.wikipediaUrl;
    existing.status = "published";
    if (!existing.image?.url || existing.image.url.includes("default-avatar")) {
      existing.image = {
        cloudinaryId: "",
        url: imageUrl,
        alt: item.title,
        width: 400,
        height: 400,
      };
    }
    existing.seo = {
      metaTitle: `${item.title} | Wikipedia Portfolio`,
      metaDescription: item.summary.slice(0, 155),
      keywords: `${item.title}, wikipedia, ${item.category}`.toLowerCase(),
    };
    await existing.save();
    console.log(`Updated DB: ${item.title}`);
  } else {
    await PortfolioItem.create({
      ...summaryDoc,
      featuredOnHome: false,
      sortOrder: sortBase++,
      image: {
        cloudinaryId: "",
        url: imageUrl,
        alt: item.title,
        width: 400,
        height: 400,
      },
      seo: {
        metaTitle: `${item.title} | Wikipedia Portfolio`,
        metaDescription: item.summary.slice(0, 155),
        keywords: `${item.title}, wikipedia, ${item.category}`.toLowerCase(),
      },
    });
    console.log(`Created DB: ${item.title}`);
  }
}

// Merge into imported JSON for offline fallback
let imported = [];
if (existsSync(IMPORTED_PATH)) {
  imported = JSON.parse(readFileSync(IMPORTED_PATH, "utf8"));
}
for (const item of resolved) {
  const idx = imported.findIndex(
    (row) => row.slug === item.slug || row.externalUrl === item.wikipediaUrl,
  );
  const imageFileGuessJpg = join(ASSETS_DIR, `${item.slug}.jpg`);
  const imageFileGuessPng = join(ASSETS_DIR, `${item.slug}.png`);
  const imageFileGuessWebp = join(ASSETS_DIR, `${item.slug}.webp`);
  let imageUrl = "assets/portfolio/default-avatar.png";
  if (existsSync(imageFileGuessJpg)) imageUrl = `assets/portfolio/${item.slug}.jpg`;
  else if (existsSync(imageFileGuessPng)) imageUrl = `assets/portfolio/${item.slug}.png`;
  else if (existsSync(imageFileGuessWebp)) imageUrl = `assets/portfolio/${item.slug}.webp`;

  const row = {
    title: item.title,
    slug: item.slug,
    summary: item.summary,
    body: item.summary,
    externalUrl: item.wikipediaUrl,
    imageUrl: imageUrl.startsWith("http") ? imageUrl : `/${imageUrl}`,
    imageAlt: item.title,
    featuredOnHome: false,
    sortOrder: idx >= 0 ? imported[idx].sortOrder : imported.length,
    category: item.category,
  };
  if (idx >= 0) imported[idx] = { ...imported[idx], ...row };
  else imported.push(row);
}
writeFileSync(IMPORTED_PATH, JSON.stringify(imported, null, 2));

// Also refresh fallback entries used when DB is down
let fallbackItems = [];
if (existsSync(FALLBACK_PATH)) {
  fallbackItems = JSON.parse(readFileSync(FALLBACK_PATH, "utf8"));
  if (!Array.isArray(fallbackItems)) {
    fallbackItems = fallbackItems.items || [];
  }
}
for (const item of resolved) {
  const imageFileGuessJpg = join(ASSETS_DIR, `${item.slug}.jpg`);
  const imageFileGuessPng = join(ASSETS_DIR, `${item.slug}.png`);
  const imageFileGuessWebp = join(ASSETS_DIR, `${item.slug}.webp`);
  let image = "assets/portfolio/default-avatar.png";
  if (existsSync(imageFileGuessJpg)) image = `assets/portfolio/${item.slug}.jpg`;
  else if (existsSync(imageFileGuessPng)) image = `assets/portfolio/${item.slug}.png`;
  else if (existsSync(imageFileGuessWebp)) image = `assets/portfolio/${item.slug}.webp`;

  const row = {
    image,
    alt: item.title,
    title: item.title,
    copy: item.summary,
    detail: item.summary,
    externalUrl: item.wikipediaUrl,
    featuredOnHome: false,
  };
  const idx = fallbackItems.findIndex(
    (x) => x.title === item.title || x.externalUrl === item.wikipediaUrl,
  );
  if (idx >= 0) fallbackItems[idx] = { ...fallbackItems[idx], ...row };
  else fallbackItems.push(row);
}
writeFileSync(FALLBACK_PATH, JSON.stringify(fallbackItems, null, 2));

await mongoose.disconnect();
console.log("Done.");
console.log(
  JSON.stringify(
    {
      total: report.length,
      resolved: resolved.length,
      unresolved: report
        .filter((r) => r.status === "unresolved")
        .map((r) => r.trelloName),
    },
    null,
    2,
  ),
);
