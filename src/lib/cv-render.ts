// Builds the CV page from the data. Uses DOM nodes and textContent only, so nothing the
// user types is ever interpreted as HTML.
import type { CvText } from "../i18n/cv";
import { type Cv, period } from "./cv";

type Child = Node | string | null | false | undefined;

function el(tag: string, className?: string, ...children: Child[]): HTMLElement {
  const node = document.createElement(tag);
  if (className) node.className = className;
  for (const child of children) {
    if (child === null || child === false || child === undefined) continue;
    node.append(typeof child === "string" ? document.createTextNode(child) : child);
  }
  return node;
}

const section = (title: string, ...children: Child[]) =>
  el("section", "cv-section", el("h3", "cv-heading", title), ...children);

function contactList(cv: Cv): HTMLElement | null {
  const items = [cv.email, cv.phone, cv.location, cv.website].filter((value) => value.trim());
  if (items.length === 0) return null;
  return el("ul", "cv-contact", ...items.map((value) => el("li", undefined, value)));
}

function photo(cv: Cv): HTMLElement | null {
  if (!cv.photo) return null;
  const img = document.createElement("img");
  img.src = cv.photo;
  img.alt = "";
  img.className = `cv-photo cv-photo--${cv.photoShape}`;
  return img;
}

function experience(cv: Cv, text: CvText): HTMLElement | null {
  const items = cv.experience.filter((item) => item.role || item.company || item.description);
  if (items.length === 0) return null;
  return section(
    text.cv.experience,
    ...items.map((item) =>
      el(
        "div",
        "cv-entry",
        el(
          "div",
          "cv-entry-head",
          el("strong", undefined, [item.role, item.company].filter(Boolean).join(" · ")),
          period(item.start, item.end) && el("span", "cv-period", period(item.start, item.end)),
        ),
        item.description && el("p", undefined, item.description),
      ),
    ),
  );
}

function education(cv: Cv, text: CvText): HTMLElement | null {
  const items = cv.education.filter((item) => item.school || item.degree);
  if (items.length === 0) return null;
  return section(
    text.cv.education,
    ...items.map((item) =>
      el(
        "div",
        "cv-entry",
        el(
          "div",
          "cv-entry-head",
          el("strong", undefined, item.school),
          period(item.start, item.end) && el("span", "cv-period", period(item.start, item.end)),
        ),
        item.degree && el("p", undefined, item.degree),
      ),
    ),
  );
}

const skills = (cv: Cv, text: CvText) =>
  cv.skills.length > 0 ? section(text.cv.skills, el("ul", "cv-skills", ...cv.skills.map((skill) => el("li", undefined, skill)))) : null;

function languages(cv: Cv, text: CvText): HTMLElement | null {
  const items = cv.languages.filter((item) => item.name);
  if (items.length === 0) return null;
  return section(
    text.cv.languages,
    el("ul", "cv-languages", ...items.map((item) => el("li", undefined, el("span", undefined, item.name), item.level && el("span", "cv-level", item.level)))),
  );
}

const summary = (cv: Cv, text: CvText) => (cv.summary.trim() ? section(text.cv.profile, el("p", undefined, cv.summary)) : null);

function identity(cv: Cv, text: CvText): HTMLElement {
  return el(
    "div",
    "cv-identity",
    el("h2", "cv-name", cv.name || text.placeholder.name),
    el("p", "cv-title", cv.title || text.placeholder.title),
  );
}

/** Replaces the sheet's content with the CV in the chosen template. */
export function renderCv(sheet: HTMLElement, cv: Cv, text: CvText): void {
  sheet.className = `sheet cv cv--${cv.template} cv--${cv.font}`;
  sheet.style.setProperty("--cv-accent", cv.accent);

  if (cv.template === "sidebar") {
    sheet.replaceChildren(
      el(
        "aside",
        "cv-side",
        photo(cv),
        identity(cv, text),
        contactList(cv) && section(text.cv.contact, contactList(cv)),
        skills(cv, text),
        languages(cv, text),
      ),
      el("div", "cv-main", summary(cv, text), experience(cv, text), education(cv, text)),
    );
    return;
  }

  sheet.replaceChildren(
    el("header", "cv-header", photo(cv), el("div", undefined, identity(cv, text), contactList(cv))),
    el("div", "cv-body", summary(cv, text), experience(cv, text), education(cv, text), el("div", "cv-columns", skills(cv, text), languages(cv, text))),
  );
}
