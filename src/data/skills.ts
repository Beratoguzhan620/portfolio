import type { Lang } from "../i18n/ui";

export const skills: { title: Record<Lang, string>; items: string[] }[] = [
  {
    title: { tr: "Backend", en: "Backend" },
    items: ["C#", ".NET 10", "ASP.NET Core MVC", "ASP.NET Core Web API", "Entity Framework Core", "SQL Server", "SQLite"],
  },
  {
    title: { tr: "Mobil ve arayüz", en: "Mobile and front end" },
    items: ["React Native", "Expo", "TypeScript", "Redux Toolkit", "Tailwind / NativeWind", "Bootstrap", "Astro"],
  },
  {
    title: { tr: "Veri ve servisler", en: "Data and services" },
    items: ["Firebase Auth", "Firestore", "REST API", "JSON"],
  },
  {
    title: { tr: "Test ve teslim", en: "Testing and delivery" },
    items: ["xUnit", "Vitest", "Playwright", "GitHub Actions", "Docker", "Git"],
  },
];
