// Runs Lighthouse (mobile settings) on the built site and fails if a page scores below the target.
// Usage: pnpm build && pnpm preview, then pnpm lighthouse
import { writeFileSync, mkdirSync } from "node:fs";

import * as chromeLauncher from "chrome-launcher";
import lighthouse from "lighthouse";
import { chromium } from "playwright";

const SITE = (process.env.SITE_URL ?? "http://localhost:4321/portfolio/").replace(/\/?$/, "/");
const PAGES = ["", "en/", "cv-builder/", "en/cv-builder/"];
const CATEGORIES = ["performance", "accessibility", "best-practices", "seo"];
const TARGET = { performance: 95, accessibility: 95 };
const OUT = new URL("../tests/e2e/output/", import.meta.url).pathname;
mkdirSync(OUT, { recursive: true });

const chrome = await chromeLauncher.launch({
  chromePath: process.env.CHROMIUM_PATH ?? chromium.executablePath(),
  chromeFlags: ["--headless=new", "--no-sandbox"],
});

const rows = [];
let failed = false;
try {
  for (const path of PAGES) {
    const result = await lighthouse(`${SITE}${path}`, { port: chrome.port, onlyCategories: CATEGORIES, output: "json", logLevel: "error" });
    const scores = Object.fromEntries(CATEGORIES.map((id) => [id, Math.round((result.lhr.categories[id].score ?? 0) * 100)]));
    rows.push({ page: `/${path}`, ...scores });
    for (const [category, minimum] of Object.entries(TARGET)) if (scores[category] < minimum) failed = true;
  }
} finally {
  chrome.kill();
}

console.table(rows);
writeFileSync(`${OUT}lighthouse.json`, JSON.stringify(rows, null, 2));
if (failed) {
  console.error(`A page scored below ${TARGET.performance} for performance or ${TARGET.accessibility} for accessibility.`);
  process.exit(1);
}
