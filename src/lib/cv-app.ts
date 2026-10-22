// Wires the CV builder form to the data, the preview and browser storage.
import type { CvText } from "../i18n/cv";
import {
  type Cv,
  emptyCv,
  emptyEducation,
  emptyExperience,
  emptyLanguage,
  fileName,
  hasContent,
  LIMITS,
  normalizeCv,
  parseSkills,
  sampleCv,
  STORAGE_KEY,
} from "./cv";
import { renderCv } from "./cv-render";

type ListName = "experience" | "education" | "languages";
const EMPTY = { experience: emptyExperience, education: emptyEducation, languages: emptyLanguage };
const PAGE_WIDTH = 794; // A4 at 96 dpi
const PHOTO_SIZE = 360;

export function startBuilder(root: HTMLElement): void {
  const lang = root.dataset.lang === "en" ? "en" : "tr";
  const text = JSON.parse(root.querySelector("[data-text]")?.textContent ?? "{}") as CvText;
  const form = root.querySelector<HTMLFormElement>("[data-form]")!;
  const sheet = root.querySelector<HTMLElement>("[data-sheet]")!;
  const frame = root.querySelector<HTMLElement>("[data-frame]")!;
  const status = root.querySelector<HTMLElement>("[data-status]")!;
  const skillsInput = root.querySelector<HTMLTextAreaElement>("[data-skills]")!;
  const customAccent = root.querySelector<HTMLInputElement>("[data-custom-accent]")!;
  const removePhoto = root.querySelector<HTMLButtonElement>('[data-action="remove-photo"]')!;
  const dialog = root.querySelector<HTMLDialogElement>("[data-confirm]")!;

  let cv = load();
  let saveTimer: ReturnType<typeof setTimeout> | undefined;

  function load(): Cv {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? normalizeCv(JSON.parse(raw)) : emptyCv();
    } catch {
      return emptyCv();
    }
  }

  function say(message: string) {
    status.textContent = message;
  }

  function save() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cv));
        say(text.saved);
      } catch {
        say(text.saveFailed);
      }
    }, 300);
  }

  function update(change: Partial<Cv>, options: { refill?: boolean } = {}) {
    cv = { ...cv, ...change };
    if (options.refill) fill();
    renderCv(sheet, cv, text);
    fit();
    save();
  }

  // ---- form <-> data -------------------------------------------------------

  function fill() {
    for (const input of form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>("[data-field]")) {
      const key = input.dataset.field as keyof Cv;
      const value = String(cv[key] ?? "");
      if (input instanceof HTMLInputElement && input.type === "radio") input.checked = input.value === value;
      else input.value = value;
    }
    customAccent.value = cv.accent.toLowerCase();
    skillsInput.value = cv.skills.join(", ");
    removePhoto.hidden = !cv.photo;
    for (const list of ["experience", "education", "languages"] as const) fillList(list);
  }

  function fillList(list: ListName) {
    const container = form.querySelector<HTMLOListElement>(`[data-list="${list}"]`)!;
    const template = root.querySelector<HTMLTemplateElement>(`[data-template="${list}"]`)!;
    const items = cv[list] as Record<string, string>[];
    container.replaceChildren(
      ...items.map((item, index) => {
        const node = template.content.firstElementChild!.cloneNode(true) as HTMLElement;
        node.dataset.index = String(index);
        node.querySelector("[data-item-title]")!.textContent = `${text.item[list]} ${index + 1}`;
        for (const input of node.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>("[data-key]")) {
          input.value = item[input.dataset.key!] ?? "";
          const id = `${list}-${index}-${input.dataset.key}`;
          input.id = id;
          input.closest("label")?.setAttribute("for", id);
        }
        node.querySelector("[data-remove]")!.setAttribute("aria-label", `${text.remove}: ${text.item[list]} ${index + 1}`);
        return node;
      }),
    );
    const add = form.querySelector<HTMLButtonElement>(`[data-add="${list}"]`)!;
    add.disabled = items.length >= LIMITS[list];
  }

  form.addEventListener("input", (event) => {
    const target = event.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
    if (target.dataset.field) {
      if (target instanceof HTMLInputElement && target.type === "radio" && !target.checked) return;
      update({ [target.dataset.field]: target.value } as Partial<Cv>);
      if (target.dataset.field === "accent") customAccent.value = target.value.toLowerCase();
      return;
    }
    if (target.dataset.key) {
      const item = target.closest<HTMLElement>("[data-index]")!;
      const list = item.closest<HTMLElement>("[data-list]")!.dataset.list as ListName;
      const index = Number(item.dataset.index);
      const next = (cv[list] as Record<string, string>[]).map((entry, i) => (i === index ? { ...entry, [target.dataset.key!]: target.value } : entry));
      update({ [list]: next } as Partial<Cv>);
      return;
    }
    if (target === skillsInput) update({ skills: parseSkills(skillsInput.value) });
    if (target === customAccent) {
      for (const radio of form.querySelectorAll<HTMLInputElement>('input[name="accent"]')) radio.checked = false;
      update({ accent: customAccent.value.toUpperCase() });
    }
  });

  form.addEventListener("click", (event) => {
    const button = (event.target as HTMLElement).closest("button");
    if (!button) return;
    const add = button.dataset.add as ListName | undefined;
    if (add) {
      update({ [add]: [...cv[add], EMPTY[add]()] } as Partial<Cv>, { refill: true });
      const items = form.querySelectorAll(`[data-list="${add}"] [data-index]`);
      items[items.length - 1]?.querySelector<HTMLInputElement>("[data-key]")?.focus();
      return;
    }
    if (button.hasAttribute("data-remove")) {
      const item = button.closest<HTMLElement>("[data-index]")!;
      const list = item.closest<HTMLElement>("[data-list]")!.dataset.list as ListName;
      const index = Number(item.dataset.index);
      update({ [list]: cv[list].filter((_, i) => i !== index) } as Partial<Cv>, { refill: true });
      form.querySelector<HTMLButtonElement>(`[data-add="${list}"]`)?.focus();
    }
  });

  form.addEventListener("submit", (event) => event.preventDefault());

  // ---- photo -----------------------------------------------------------------

  root.querySelector<HTMLInputElement>("[data-photo-input]")!.addEventListener("change", async (event) => {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    input.value = "";
    if (!file) return;
    try {
      update({ photo: await shrink(file) }, { refill: true });
    } catch {
      say(text.photoTooBig);
    }
  });

  removePhoto.addEventListener("click", () => update({ photo: null }, { refill: true }));

  /** Crops the photo to a square and scales it down, so it stays small in storage. */
  async function shrink(file: File): Promise<string> {
    if (!/^image\/(png|jpeg|webp)$/.test(file.type)) throw new Error("type");
    const bitmap = await createImageBitmap(file);
    const side = Math.min(bitmap.width, bitmap.height);
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = PHOTO_SIZE;
    canvas.getContext("2d")!.drawImage(bitmap, (bitmap.width - side) / 2, (bitmap.height - side) / 2, side, side, 0, 0, PHOTO_SIZE, PHOTO_SIZE);
    bitmap.close();
    return canvas.toDataURL("image/jpeg", 0.85);
  }

  // ---- actions ---------------------------------------------------------------

  function confirmFirst(title: string, body: string): Promise<boolean> {
    dialog.querySelector("[data-confirm-title]")!.textContent = title;
    dialog.querySelector("[data-confirm-body]")!.textContent = body;
    dialog.showModal();
    return new Promise((resolve) => {
      const done = (answer: boolean) => {
        dialog.close();
        resolve(answer);
      };
      dialog.querySelector<HTMLButtonElement>("[data-confirm-yes]")!.onclick = () => done(true);
      dialog.querySelector<HTMLButtonElement>("[data-confirm-no]")!.onclick = () => done(false);
      dialog.oncancel = () => resolve(false);
    });
  }

  root.querySelector('[data-action="print"]')!.addEventListener("click", () => {
    const previous = document.title;
    document.title = fileName(cv, "pdf").replace(/\.pdf$/, "");
    window.print();
    document.title = previous;
  });

  root.querySelector('[data-action="sample"]')!.addEventListener("click", async () => {
    if (hasContent(cv) && !(await confirmFirst(text.confirmSampleTitle, text.confirmSampleBody))) return;
    cv = { ...sampleCv(lang), template: cv.template, accent: cv.accent, font: cv.font, photoShape: cv.photoShape };
    update({}, { refill: true });
  });

  root.querySelector('[data-action="clear"]')!.addEventListener("click", async () => {
    if (!(await confirmFirst(text.confirmClearTitle, text.confirmClearBody))) return;
    cv = emptyCv();
    update({}, { refill: true });
  });

  root.querySelector('[data-action="export"]')!.addEventListener("click", () => {
    const url = URL.createObjectURL(new Blob([JSON.stringify(cv, null, 2)], { type: "application/json" }));
    const link = Object.assign(document.createElement("a"), { href: url, download: fileName(cv, "json") });
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  });

  root.querySelector<HTMLInputElement>("[data-import]")!.addEventListener("change", async (event) => {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    input.value = "";
    if (!file) return;
    try {
      const data = JSON.parse(await file.text());
      if (!data || typeof data !== "object" || data.version !== 1) throw new Error("format");
      cv = normalizeCv(data);
      update({}, { refill: true });
      say(text.importDone);
    } catch {
      say(text.importFailed);
    }
  });

  // ---- edit / preview tabs on small screens ---------------------------------

  for (const tab of root.querySelectorAll<HTMLButtonElement>("[data-tab]")) {
    tab.addEventListener("click", () => {
      root.dataset.view = tab.dataset.tab;
      for (const other of root.querySelectorAll("[data-tab]")) other.setAttribute("aria-selected", String(other === tab));
      fit();
    });
  }

  // ---- scale the A4 page to the column -------------------------------------

  function fit() {
    const scale = Math.min(1, frame.clientWidth / PAGE_WIDTH);
    frame.style.setProperty("--scale", String(scale || 1));
    frame.style.height = `${sheet.offsetHeight * (scale || 1)}px`;
  }

  new ResizeObserver(fit).observe(frame);

  fill();
  renderCv(sheet, cv, text);
  fit();
}
