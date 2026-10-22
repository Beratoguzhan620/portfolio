// Shared helpers for the end-to-end scripts.
import { mkdirSync } from "node:fs";
import { chromium } from "playwright";

export const SITE = (process.env.SITE_URL ?? "http://localhost:4321/portfolio/").replace(/\/?$/, "/");
export const OUT = new URL("./output/", import.meta.url).pathname;
mkdirSync(OUT, { recursive: true });

export const launch = () => chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});

export function runner() {
  const failures = [];
  const step = async (name, fn, page) => {
    try {
      await fn();
      console.log(`ok   ${name}`);
    } catch (error) {
      failures.push(name);
      console.log(`FAIL ${name}\n     ${String(error.message).split("\n")[0]}`);
      await page?.screenshot({ path: `${OUT}failed-${name.replace(/[^a-z0-9]+/gi, "-")}.png` }).catch(() => {});
    }
  };
  const finish = () => {
    if (failures.length > 0) {
      console.log(`\n${failures.length} step(s) failed`);
      process.exit(1);
    }
    console.log("\nall steps passed");
  };
  return { step, finish, failures };
}

export async function noHorizontalOverflow(page) {
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  if (overflow > 1) throw new Error(`page overflows horizontally by ${overflow}px`);
}
