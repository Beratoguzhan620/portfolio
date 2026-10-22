/// <reference types="node" />
import { existsSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

// Read the data file as text: it imports images, which only Astro can load.
const source = readFileSync(new URL("../src/data/projects.ts", import.meta.url), "utf8");
const slugs = [...source.matchAll(/slug: "([^"]+)"/g)].map((match) => match[1]);
const imports = [...source.matchAll(/from "\.\.\/assets\/projects\/([^"]+)"/g)].map((match) => match[1]);

describe("projects", () => {
  it("lists each project once", () => {
    expect(slugs.length).toBeGreaterThanOrEqual(10);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("has a screenshot on disk for every project", () => {
    for (const slug of slugs) {
      expect(imports, slug).toContain(`${slug}.png`);
      expect(existsSync(new URL(`../src/assets/projects/${slug}.png`, import.meta.url)), slug).toBe(true);
    }
  });

  it("describes every project in both languages", () => {
    const summaries = [...source.matchAll(/summary: \{\s*tr: "([^"]+)",\s*en: "([^"]+)",/g)];
    expect(summaries).toHaveLength(slugs.length);
  });

  it("links every project to its repository", () => {
    const repos = [...source.matchAll(/repo: `\$\{GITHUB\}\/([^`]+)`/g)].map((match) => match[1]);
    expect(repos).toHaveLength(slugs.length);
  });
});
