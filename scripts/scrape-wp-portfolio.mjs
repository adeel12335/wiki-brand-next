/**
 * Scrape portfolio items from thewikistudio.com WordPress site.
 * Usage: node scripts/scrape-wp-portfolio.mjs
 */
import { scrapeWpPortfolio } from "./lib/scrape-wp-portfolio.mjs";

const items = await scrapeWpPortfolio();
const output = items.map((item, index) => ({
  ...item,
  featuredOnHome: index < 6,
  sortOrder: index,
  status: "published",
}));

console.log(JSON.stringify(output, null, 2));
console.error(`Scraped ${output.length} items`);
