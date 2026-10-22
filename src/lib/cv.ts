// The CV builder's data: shape, defaults, sample content and safe loading from storage or a file.

export type Template = "classic" | "sidebar";
export type FontChoice = "sans" | "serif";
export type PhotoShape = "circle" | "rounded" | "square";

export type Experience = { role: string; company: string; start: string; end: string; description: string };
export type Education = { school: string; degree: string; start: string; end: string };
export type Language = { name: string; level: string };

export type Cv = {
  version: 1;
  template: Template;
  accent: string;
  font: FontChoice;
  photoShape: PhotoShape;
  photo: string | null;
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: string[];
  languages: Language[];
};

export const ACCENTS = ["#1F2A37", "#2B5C8A", "#3F6B5C", "#7A5230", "#A23B3B", "#5B5B5B"] as const;
export const LIMITS = { experience: 6, education: 4, languages: 6, skills: 20, photoBytes: 1_500_000 } as const;
export const STORAGE_KEY = "portfolio.cv-builder";

export const emptyExperience = (): Experience => ({ role: "", company: "", start: "", end: "", description: "" });
export const emptyEducation = (): Education => ({ school: "", degree: "", start: "", end: "" });
export const emptyLanguage = (): Language => ({ name: "", level: "" });

export function emptyCv(): Cv {
  return {
    version: 1,
    template: "classic",
    accent: ACCENTS[0],
    font: "sans",
    photoShape: "circle",
    photo: null,
    name: "",
    title: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    summary: "",
    experience: [emptyExperience()],
    education: [emptyEducation()],
    skills: [],
    languages: [],
  };
}

export function sampleCv(lang: "tr" | "en"): Cv {
  const tr = lang === "tr";
  return {
    ...emptyCv(),
    name: "Deniz Yılmaz",
    title: tr ? "Backend Geliştirici" : "Backend Developer",
    email: "deniz@example.com",
    phone: "+90 555 000 00 00",
    location: tr ? "İstanbul" : "Istanbul, Türkiye",
    website: "github.com/deniz",
    summary: tr
      ? "C# ve .NET ile web uygulamaları geliştiriyorum. Temiz, test edilmiş ve belgelenmiş kod yazmayı; karmaşık süreçleri kullanıcı için sadeleştirmeyi seviyorum."
      : "I build web applications with C# and .NET. I like clean, tested and documented code, and making complicated processes simple for the people who use them.",
    experience: [
      {
        role: tr ? "Yazılım Geliştirici" : "Software Developer",
        company: "Örnek Yazılım",
        start: "2024",
        end: tr ? "Devam ediyor" : "Present",
        description: tr
          ? "Stok ve sipariş yönetimi için ASP.NET Core uygulamaları geliştirdim; testleri ve CI sürecini kurdum."
          : "Built ASP.NET Core apps for stock and order management, and set up their tests and CI.",
      },
      {
        role: tr ? "Stajyer Geliştirici" : "Developer Intern",
        company: "Kod Atölyesi",
        start: "2023",
        end: "2024",
        description: tr
          ? "Expo ile bir mobil uygulamanın arayüzünü yazdım, REST API entegrasyonunu yaptım."
          : "Wrote the interface of a mobile app with Expo and connected it to a REST API.",
      },
    ],
    education: [
      { school: tr ? "Örnek Üniversitesi" : "Example University", degree: tr ? "Bilgisayar Programcılığı" : "Computer Programming", start: "2021", end: "2023" },
    ],
    skills: ["C#", ".NET", "ASP.NET Core", "EF Core", "SQL Server", "TypeScript", "React Native", "Git"],
    languages: [
      { name: tr ? "Türkçe" : "Turkish", level: tr ? "Ana dil" : "Native" },
      { name: tr ? "İngilizce" : "English", level: "B2" },
    ],
  };
}

const text = (value: unknown, max = 2000): string => (typeof value === "string" ? value.slice(0, max) : "");
const oneOf = <T extends string>(value: unknown, options: readonly T[], fallback: T): T =>
  options.includes(value as T) ? (value as T) : fallback;
const list = <T>(value: unknown, limit: number, map: (item: Record<string, unknown>) => T): T[] =>
  Array.isArray(value) ? value.filter((item) => item && typeof item === "object").slice(0, limit).map(map) : [];

/** Turns anything (old storage, a hand-edited file) into a valid CV; unknown or broken parts fall back to defaults. */
export function normalizeCv(input: unknown): Cv {
  const empty = emptyCv();
  if (!input || typeof input !== "object") return empty;
  const data = input as Record<string, unknown>;
  const accent = typeof data.accent === "string" && /^#[0-9a-f]{6}$/i.test(data.accent) ? data.accent.toUpperCase() : empty.accent;
  const photo =
    typeof data.photo === "string" && /^data:image\/(png|jpe?g|webp);base64,/.test(data.photo) && data.photo.length <= LIMITS.photoBytes * 1.4
      ? data.photo
      : null;
  return {
    version: 1,
    template: oneOf(data.template, ["classic", "sidebar"] as const, empty.template),
    accent,
    font: oneOf(data.font, ["sans", "serif"] as const, empty.font),
    photoShape: oneOf(data.photoShape, ["circle", "rounded", "square"] as const, empty.photoShape),
    photo,
    name: text(data.name, 80),
    title: text(data.title, 80),
    email: text(data.email, 120),
    phone: text(data.phone, 40),
    location: text(data.location, 80),
    website: text(data.website, 120),
    summary: text(data.summary, 1200),
    experience: list(data.experience, LIMITS.experience, (item) => ({
      role: text(item.role, 80),
      company: text(item.company, 80),
      start: text(item.start, 20),
      end: text(item.end, 20),
      description: text(item.description, 800),
    })),
    education: list(data.education, LIMITS.education, (item) => ({
      school: text(item.school, 100),
      degree: text(item.degree, 100),
      start: text(item.start, 20),
      end: text(item.end, 20),
    })),
    skills: Array.isArray(data.skills)
      ? data.skills.map((skill) => text(skill, 40).trim()).filter(Boolean).slice(0, LIMITS.skills)
      : [],
    languages: list(data.languages, LIMITS.languages, (item) => ({ name: text(item.name, 40), level: text(item.level, 40) })),
  };
}

/** "C#, .NET ,  , SQL" → ["C#", ".NET", "SQL"], without duplicates. */
export function parseSkills(input: string): string[] {
  const seen = new Set<string>();
  const skills: string[] = [];
  for (const raw of input.split(/[,\n]/)) {
    const skill = raw.trim().slice(0, 40);
    const key = skill.toLocaleLowerCase("tr-TR");
    if (!skill || seen.has(key)) continue;
    seen.add(key);
    skills.push(skill);
  }
  return skills.slice(0, LIMITS.skills);
}

/** "2023" – "2024", or just one side when the other is empty. */
export function period(start: string, end: string): string {
  const from = start.trim();
  const to = end.trim();
  if (from && to) return `${from} – ${to}`;
  return from || to;
}

export const hasContent = (cv: Cv) =>
  Boolean(cv.name || cv.title || cv.summary || cv.experience.some((item) => item.role || item.company) || cv.skills.length);

/** A file name for the downloaded JSON, from the person's name. */
export function fileName(cv: Cv, extension: string): string {
  const slug = cv.name
    .toLocaleLowerCase("tr-TR")
    .replace(/ı/g, "i")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return `${slug || "cv"}.${extension}`;
}
