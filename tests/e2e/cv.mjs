// End-to-end check of the CV builder on the built site.
import { readFileSync } from "node:fs";

import { launch, noHorizontalOverflow, OUT, runner, SITE } from "./helpers.mjs";

const browser = await launch();
const { step, finish, failures } = runner();
const URL_TR = `${SITE}cv-builder/`;
const URL_EN = `${SITE}en/cv-builder/`;

// A small red PNG, enough to test the photo upload.
const PNG = Buffer.from("iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAIAAAADnC86AAAAL0lEQVR4nO3NAQ0AAAQAMNTSVlIxbPYXeE53XKiTVSwWi8VisVgsFovFYrFY/DRetHgBaHPLi64AAAAASUVORK5CYII=", "base64");

const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, acceptDownloads: true });
const page = await context.newPage();
page.on("pageerror", (error) => failures.push(`page error: ${error.message}`));
const sheet = page.locator("[data-sheet]");
const field = (label) => page.getByLabel(label, { exact: true });

await step("starts empty with placeholders in the preview", async () => {
  await page.goto(URL_TR);
  await page.getByRole("heading", { level: 1, name: "CV oluşturucu" }).waitFor();
  await sheet.getByText("Adın Soyadın").waitFor();
  await noHorizontalOverflow(page);
}, page);

await step("typing updates the preview straight away", async () => {
  await field("Ad soyad").fill("Ada Lovelace");
  await field("Unvan").fill("Programcı");
  await field("Kısa özet").fill("İlk algoritmayı yazdım.");
  await sheet.getByRole("heading", { name: "Ada Lovelace" }).waitFor();
  await sheet.getByText("Programcı").waitFor();
  await sheet.getByText("İlk algoritmayı yazdım.").waitFor();
}, page);

await step("experience entries can be added and removed", async () => {
  await page.locator('[data-list="experience"] input[data-key="role"]').first().fill("Analist");
  await page.locator('[data-list="experience"] input[data-key="company"]').first().fill("Analitik Makine");
  await page.getByRole("button", { name: "+ Deneyim ekle" }).click();
  await page.locator('[data-list="experience"] input[data-key="role"]').nth(1).fill("Yazar");
  await sheet.getByText("Analist · Analitik Makine").waitFor();
  await sheet.getByText("Yazar").waitFor();
  await page.getByRole("button", { name: "Kaldır: Deneyim 2" }).click();
  await sheet.getByText("Yazar", { exact: true }).waitFor({ state: "detached" });
}, page);

await step("skills are split on commas without duplicates", async () => {
  await page.locator("[data-skills]").fill("C#, .NET, , c#, SQL");
  const chips = await sheet.locator(".cv-skills li").allTextContents();
  if (chips.join("|") !== "C#|.NET|SQL") throw new Error(`skills: ${chips}`);
}, page);

await step("text is never treated as HTML", async () => {
  await field("Unvan").fill('<img src=x onerror="window.hacked=1">');
  await sheet.getByText('<img src=x onerror="window.hacked=1">').waitFor();
  if ((await sheet.locator("img").count()) !== 0) throw new Error("an image was injected");
  if (await page.evaluate(() => window.hacked)) throw new Error("script ran");
  await field("Unvan").fill("Programcı");
}, page);

await step("template, colour and photo change the page", async () => {
  await page.getByRole("radio", { name: "Kenar çubuklu" }).check();
  if (!(await sheet.getAttribute("class"))?.includes("cv--sidebar")) throw new Error("sidebar template expected");
  await page.getByRole("radio", { name: "#3F6B5C" }).check();
  const accent = await sheet.evaluate((el) => el.style.getPropertyValue("--cv-accent"));
  if (accent !== "#3F6B5C") throw new Error(`accent ${accent}`);
  await page.locator("[data-photo-input]").setInputFiles({ name: "me.png", mimeType: "image/png", buffer: PNG });
  await sheet.locator("img.cv-photo").waitFor();
  await page.screenshot({ path: `${OUT}cv-desktop.png` });
  await page.getByRole("button", { name: "Fotoğrafı kaldır" }).click();
  await sheet.locator("img.cv-photo").waitFor({ state: "detached" });
}, page);

await step("everything is kept in the browser across reloads", async () => {
  await page.waitForTimeout(400);
  await page.reload();
  await sheet.getByRole("heading", { name: "Ada Lovelace" }).waitFor();
  if ((await field("Ad soyad").inputValue()) !== "Ada Lovelace") throw new Error("form not restored");
  if (!(await page.getByRole("radio", { name: "Kenar çubuklu" }).isChecked())) throw new Error("template not restored");
}, page);

await step("data can be downloaded and loaded back as JSON", async () => {
  const [download] = await Promise.all([page.waitForEvent("download"), page.getByRole("button", { name: "Verileri indir (JSON)" }).click()]);
  if (download.suggestedFilename() !== "ada-lovelace.json") throw new Error(download.suggestedFilename());
  const saved = JSON.parse(readFileSync(await download.path(), "utf8"));
  if (saved.name !== "Ada Lovelace" || saved.version !== 1) throw new Error("unexpected JSON");
  const changed = Buffer.from(JSON.stringify({ ...saved, name: "Grace Hopper" }));
  await page.locator("[data-import]").setInputFiles({ name: "cv.json", mimeType: "application/json", buffer: changed });
  await sheet.getByRole("heading", { name: "Grace Hopper" }).waitFor();
  await page.getByText("Veriler yüklendi.").waitFor();
  await page.locator("[data-import]").setInputFiles({ name: "bad.json", mimeType: "application/json", buffer: Buffer.from("not json") });
  await page.getByText("Bu dosya okunamadı.", { exact: false }).waitFor();
  await sheet.getByRole("heading", { name: "Grace Hopper" }).waitFor();
}, page);

await step("the example and clearing both ask first", async () => {
  await page.getByRole("button", { name: "Örnekle doldur" }).click();
  await page.getByRole("dialog").getByRole("button", { name: "Vazgeç" }).click();
  await sheet.getByRole("heading", { name: "Grace Hopper" }).waitFor();
  await page.getByRole("button", { name: "Örnekle doldur" }).click();
  await page.getByRole("dialog").getByRole("button", { name: "Evet, devam et" }).click();
  await sheet.getByRole("heading", { name: "Deniz Yılmaz" }).waitFor();
  if (!(await page.getByRole("radio", { name: "Kenar çubuklu" }).isChecked())) throw new Error("the template should stay");
  await page.getByRole("radio", { name: "Klasik" }).check();
  await page.screenshot({ path: `${OUT}cv-sample.png` });
  await page.getByRole("button", { name: "Temizle" }).click();
  await page.getByRole("dialog").getByRole("button", { name: "Evet, devam et" }).click();
  await sheet.getByText("Adın Soyadın").waitFor();
  await page.getByRole("button", { name: "Örnekle doldur" }).click();
  await sheet.getByRole("heading", { name: "Deniz Yılmaz" }).waitFor();
}, page);

await step("printing shows only the A4 page", async () => {
  await page.emulateMedia({ media: "print" });
  const hidden = await page.evaluate(() =>
    [".site-header", ".site-footer", "[data-form]", ".toolbar"].map((selector) => getComputedStyle(document.querySelector(selector)).display),
  );
  if (hidden.some((value) => value !== "none")) throw new Error(`still visible in print: ${hidden}`);
  const pdf = await page.pdf({ format: "A4", printBackground: true });
  const pages = (pdf.toString("latin1").match(/\/Type\s*\/Page[^s]/g) ?? []).length;
  if (pages !== 1) throw new Error(`the example should fit on one page, got ${pages}`);
  await page.emulateMedia({ media: "screen" });
}, page);

await context.close();

{
  const mobile = await browser.newContext({ viewport: { width: 390, height: 844 }, colorScheme: "dark" });
  const page2 = await mobile.newPage();
  page2.on("pageerror", (error) => failures.push(`mobile page error: ${error.message}`));

  await step("mobile: edit and preview are separate tabs", async () => {
    await page2.goto(URL_EN);
    await page2.getByRole("heading", { level: 1, name: "CV builder" }).waitFor();
    if (await page2.locator("[data-sheet]").isVisible()) throw new Error("preview should start hidden");
    await page2.getByLabel("Full name", { exact: true }).fill("Alan Turing");
    await page2.getByRole("tab", { name: "Preview" }).click();
    await page2.locator("[data-sheet]").getByRole("heading", { name: "Alan Turing" }).waitFor();
    if (await page2.getByLabel("Full name", { exact: true }).isVisible()) throw new Error("form should be hidden");
    const box = await page2.locator("[data-frame]").boundingBox();
    if (!box || box.width > 390) throw new Error("the page should be scaled to the screen");
    await noHorizontalOverflow(page2);
    await page2.screenshot({ path: `${OUT}cv-mobile.png` });
    await page2.getByRole("tab", { name: "Edit" }).click();
    await page2.getByRole("button", { name: "Fill with an example" }).click();
    await page2.getByRole("dialog").getByRole("button", { name: "Yes, continue" }).click();
    await page2.getByRole("tab", { name: "Preview" }).click();
    await page2.locator("[data-sheet]").getByText("Experience", { exact: true }).waitFor();
  }, page2);

  await mobile.close();
}

await browser.close();
finish();
