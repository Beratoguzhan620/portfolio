// Takes the README screenshots from the built site (pnpm build && pnpm preview first).
import { launch, OUT, SITE } from "./helpers.mjs";

const browser = await launch();
const shot = (page, name, options = {}) => page.screenshot({ path: `${OUT}readme-${name}.png`, ...options });

{
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 }, deviceScaleFactor: 2 });
  await page.goto(SITE);
  await page.waitForLoadState("networkidle");
  await shot(page, "home");
  await page.locator("#projects").scrollIntoViewIfNeeded();
  await page.evaluate(() => document.querySelector("#projects").scrollIntoView());
  await page.waitForTimeout(800);
  await shot(page, "projects");

  await page.goto(`${SITE}cv-builder/`);
  await page.getByRole("button", { name: "Örnekle doldur" }).click();
  await page.waitForTimeout(400);
  await shot(page, "cv-builder");
  await page.getByRole("radio", { name: "Kenar çubuklu" }).check();
  await page.getByRole("radio", { name: "#2B5C8A" }).check();
  await page.emulateMedia({ media: "print" });
  await page.locator("[data-sheet]").screenshot({ path: `${OUT}readme-cv-sidebar.png` });
  await page.close();
}

{
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, colorScheme: "dark" });
  await page.goto(`${SITE}en/`);
  await page.waitForLoadState("networkidle");
  await shot(page, "home-mobile-dark");
  await page.goto(`${SITE}en/cv-builder/`);
  await page.getByRole("button", { name: "Fill with an example" }).click();
  await page.getByRole("tab", { name: "Preview" }).click();
  await page.waitForTimeout(400);
  await shot(page, "cv-mobile");
  await page.close();
}

await browser.close();
console.log("README screenshots written to tests/e2e/output/");
