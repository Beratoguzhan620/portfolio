// End-to-end check of the built site (pnpm build && pnpm preview). Saves screenshots to tests/e2e/output.
import { launch, noHorizontalOverflow, OUT, runner, SITE } from "./helpers.mjs";

const browser = await launch();
const { step, finish, failures } = runner();
const origin = new URL(SITE).origin;

for (const [device, viewport, scheme] of [
  ["mobile", { width: 390, height: 844 }, "dark"],
  ["desktop", { width: 1280, height: 800 }, "light"],
]) {
  const context = await browser.newContext({ viewport, colorScheme: scheme });
  const page = await context.newPage();
  page.on("pageerror", (error) => failures.push(`${device} page error: ${error.message}`));
  page.on("console", (message) => message.type() === "error" && failures.push(`${device} console: ${message.text()}`));

  await step(`${device}: Turkish home page has every section`, async () => {
    await page.goto(SITE);
    if ((await page.getAttribute("html", "lang")) !== "tr") throw new Error("lang should be tr");
    await page.getByRole("heading", { level: 1, name: "Berat Oğuzhan Turğut" }).waitFor();
    for (const name of ["Projeler", "Beceriler", "Hakkımda", "İletişim"]) {
      await page.getByRole("heading", { level: 2, name }).waitFor();
    }
    await noHorizontalOverflow(page);
    await page.screenshot({ path: `${OUT}${device}-home.png` });
  }, page);

  await step(`${device}: project filter shows the right cards`, async () => {
    const cards = page.locator("[data-grid] article");
    const total = await cards.count();
    const visible = () => cards.evaluateAll((els) => els.filter((el) => !el.hidden).length);
    for (const [label, expected] of [["Web", 6], ["Mobil", 4], ["Araç", 1]]) {
      const button = page.getByRole("button", { name: new RegExp(`^${label}`) });
      await button.click();
      if ((await button.getAttribute("aria-pressed")) !== "true") throw new Error(`${label} should be pressed`);
      if ((await visible()) !== expected) throw new Error(`${label}: ${await visible()} cards, expected ${expected}`);
    }
    await page.getByRole("button", { name: /^Tümü/ }).click();
    if ((await visible()) !== total) throw new Error("all cards should be back");
  }, page);

  await step(`${device}: every project card links to its repository`, async () => {
    const links = await page.locator("[data-grid] article a").evaluateAll((els) => els.map((el) => el.href));
    const code = links.filter((link) => link.startsWith("https://github.com/Beratoguzhan620/"));
    const demos = links.filter((link) => link.startsWith("https://beratoguzhan620.github.io/"));
    if (code.length < 11 || code.length + demos.length !== links.length) {
      throw new Error(`unexpected links: ${links.join(", ")}`);
    }
    if (demos.length < 3) throw new Error(`expected the mobile apps to link their demos, got ${demos.length}`);
    await page.getByRole("link", { name: "Canlı demo: CafeMap" }).waitFor();
    const images = await page.locator("[data-grid] img").evaluateAll((els) => els.map((el) => el.getAttribute("alt")));
    if (images.some((alt) => !alt)) throw new Error("every screenshot needs alt text");
  }, page);

  await step(`${device}: the language switch keeps the page`, async () => {
    await page.getByRole("link", { name: "Dil: English" }).click();
    await page.waitForURL(`${SITE}en/`);
    if ((await page.getAttribute("html", "lang")) !== "en") throw new Error("lang should be en");
    for (const name of ["Projects", "Skills", "About", "Contact"]) {
      await page.getByRole("heading", { level: 2, name }).waitFor();
    }
    await page.getByRole("button", { name: /^Mobile/ }).waitFor();
    await noHorizontalOverflow(page);
    await page.screenshot({ path: `${OUT}${device}-home-en.png` });
    await page.getByRole("link", { name: "Language: Türkçe" }).click();
    await page.waitForURL(SITE);
  }, page);

  await step(`${device}: internal links and assets resolve`, async () => {
    for (const path of [SITE, `${SITE}en/`]) {
      await page.goto(path);
      const urls = await page.evaluate(() => [
        ...[...document.querySelectorAll("a[href]")].map((el) => el.href),
        ...[...document.querySelectorAll("img[src], link[rel=icon]")].map((el) => el.src ?? el.href),
      ]);
      const internal = [...new Set(urls.filter((url) => url.startsWith(origin)).map((url) => url.split("#")[0]))];
      for (const url of internal) {
        const response = await page.request.get(url);
        if (!response.ok()) throw new Error(`${url} returned ${response.status()}`);
      }
    }
  }, page);

  await context.close();
}

{
  const page = await browser.newPage();
  await step("unknown pages get the 404 page", async () => {
    const response = await page.goto(`${SITE}no-such-page/`);
    if (response?.status() !== 404) throw new Error(`status ${response?.status()}`);
    await page.getByRole("heading", { name: "Sayfa bulunamadı" }).waitFor();
  }, page);
}

await browser.close();
finish();
