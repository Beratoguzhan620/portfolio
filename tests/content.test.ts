import { describe, expect, it } from "vitest";


import { ui } from "../src/i18n/ui";
import { skills } from "../src/data/skills";

describe("translations", () => {
  it("has every key in both languages", () => {
    expect(Object.keys(ui.en).sort()).toEqual(Object.keys(ui.tr).sort());
  });

  it("has no empty strings", () => {
    for (const lang of ["tr", "en"] as const) {
      for (const [key, value] of Object.entries(ui[lang])) {
        const parts = Array.isArray(value) ? value : [value];
        for (const part of parts) expect(part.trim(), `${lang}.${key}`).not.toBe("");
      }
    }
  });
});

describe("skills", () => {
  it("names every group in both languages", () => {
    for (const group of skills) {
      expect(group.title.tr && group.title.en).toBeTruthy();
      expect(group.items.length).toBeGreaterThan(0);
    }
  });
});
