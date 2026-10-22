import { describe, expect, it } from "vitest";

import { emptyCv, fileName, hasContent, LIMITS, normalizeCv, parseSkills, period, sampleCv } from "../src/lib/cv";

describe("normalizeCv", () => {
  it("keeps a valid CV as it is", () => {
    const cv = sampleCv("en");
    expect(normalizeCv(JSON.parse(JSON.stringify(cv)))).toEqual(cv);
  });

  it("falls back to an empty CV for anything that is not an object", () => {
    expect(normalizeCv(null)).toEqual(emptyCv());
    expect(normalizeCv("cv")).toEqual(emptyCv());
  });

  it("repairs broken fields", () => {
    const cv = normalizeCv({
      template: "fancy",
      accent: "purple",
      font: 3,
      name: 42,
      photo: "javascript:alert(1)",
      experience: [{ role: "Dev", company: 5 }, "nope"],
      skills: ["C#", 7, "  ", "SQL"],
    });
    expect(cv.template).toBe("classic");
    expect(cv.accent).toBe("#1F2A37");
    expect(cv.font).toBe("sans");
    expect(cv.name).toBe("");
    expect(cv.photo).toBeNull();
    expect(cv.experience).toEqual([{ role: "Dev", company: "", start: "", end: "", description: "" }]);
    expect(cv.skills).toEqual(["C#", "SQL"]);
  });

  it("accepts image photos and custom accents", () => {
    const cv = normalizeCv({ photo: "data:image/png;base64,AAAA", accent: "#abcdef" });
    expect(cv.photo).toBe("data:image/png;base64,AAAA");
    expect(cv.accent).toBe("#ABCDEF");
  });

  it("caps lists and long text", () => {
    const cv = normalizeCv({
      name: "x".repeat(500),
      experience: Array.from({ length: 20 }, () => ({ role: "Dev" })),
      skills: Array.from({ length: 50 }, (_, i) => `S${i}`),
    });
    expect(cv.name).toHaveLength(80);
    expect(cv.experience).toHaveLength(LIMITS.experience);
    expect(cv.skills).toHaveLength(LIMITS.skills);
  });
});

describe("parseSkills", () => {
  it("splits on commas and new lines, trims and drops duplicates", () => {
    expect(parseSkills("C#, .NET ,  ,SQL\nc#\nGit")).toEqual(["C#", ".NET", "SQL", "Git"]);
  });
});

describe("helpers", () => {
  it("formats periods", () => {
    expect(period("2023", "2024")).toBe("2023 – 2024");
    expect(period("2023", " ")).toBe("2023");
    expect(period("", "Present")).toBe("Present");
    expect(period("", "")).toBe("");
  });

  it("knows when a CV is still empty", () => {
    expect(hasContent(emptyCv())).toBe(false);
    expect(hasContent({ ...emptyCv(), name: "Ada" })).toBe(true);
  });

  it("builds a file name from the name", () => {
    expect(fileName({ ...emptyCv(), name: "Deniz Yılmaz" }, "json")).toBe("deniz-yilmaz.json");
    expect(fileName({ ...emptyCv(), name: "Çağrı Öztürk" }, "pdf")).toBe("cagri-ozturk.pdf");
    expect(fileName(emptyCv(), "json")).toBe("cv.json");
  });
});
