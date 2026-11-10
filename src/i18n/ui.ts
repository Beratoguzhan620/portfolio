export const languages = { tr: "Türkçe", en: "English" } as const;
export type Lang = keyof typeof languages;

export const ui = {
  tr: {
    "meta.title": "Berat Oğuzhan Turğut · Yazılım Geliştirici",
    "meta.description": "C# ve .NET ile backend geliştiren Berat Oğuzhan Turğut'un projeleri: yük altında ölçülmüş, testli ve tek komutla çalışan 13 sistem.",
    "nav.projects": "Projeler",
    "nav.skills": "Beceriler",
    "nav.about": "Hakkımda",
    "nav.contact": "İletişim",
    "nav.cv": "CV oluşturucu",
    "nav.skip": "İçeriğe geç",
    "nav.language": "Dil",
    "hero.role": "Backend Geliştirici · C# ve .NET",
    "hero.intro":
      "ASP.NET Core ve PostgreSQL ile backend, React ve TypeScript ile önündeki web uygulamalarını geliştiriyorum. Son 13 projemin her biri gerçek sistemlerin sık yanlış yaptığı bir problemi yük altında da doğru kalacak şekilde çözüyor: aynı koltuğun iki kez satılması, paranın iki kez taşınması, kuyruğa giderken kaybolan mesaj, çevrimdışı yapılan işin senkronu.",
    "hero.open": "Junior .NET / backend pozisyonu arıyorum.",
    "hero.stats": ["13 yeni proje", "1.470 otomatik test", "her pull request'te CI", "tek komutla Docker Compose"],
    "hero.projects": "Projelere bak",
    "hero.cv": "CV oluşturucuyu dene",
    "projects.title": "Projeler",
    "projects.lead": "Her biri testleri, CI'ı ve iki dilde README'siyle birlikte. Ekran görüntüleri uygulamaların kendisinden.",
    "projects.filter": "Projeleri süz",
    "projects.all": "Tümü",
    "projects.featured": "Öne çıkanlar",
    "projects.measured": "Kanıt",
    "projects.web": "Web",
    "projects.backend": "Backend",
    "projects.mobile": "Mobil",
    "projects.tool": "Araç",
    "projects.code": "Kodu gör",
    "projects.demo": "Canlı demo",
    "projects.walkthrough": "Tanıtımı izle",
    "projects.count": "proje",
    "skills.title": "Beceriler",
    "about.title": "Hakkımda",
    "about.body": [
      "Merhaba, ben Berat. Yazılım geliştiriyorum ve öğrenmeye devam ediyorum; şu sıralar .NET ile backend tarafında derinleşirken gerçek dünyaya dönük uygulamalar yapıyorum.",
      "İlk projelerim bir bootcamp ödevi olarak başladı; sonra her birini baştan yazıp testlerini ve tutarlı bir tasarımı ekledim. Son 13 projede backend'in zor kısımlarına odaklandım: eşzamanlı isteklerde doğru kalmak, mesajları kaybetmeden kuyruklara taşımak, çevrimdışı çalışan uygulamaları senkronlamak ve bunların her birini yük altında ölçmek.",
      "Sevdiğim iş, karmaşık bir akışı kullanan için basit hale getirmek. Okunaklı kod, küçük ve anlamlı commit'ler, açık bir README benim için işin parçası.",
    ],
    "contact.title": "İletişim",
    "contact.lead": "Bir iş fırsatı, bir proje ya da sadece merhaba demek için yazabilirsin.",
    "contact.email": "E-posta gönder",
    "footer.built": "Astro ile yapıldı; her sayfa statik.",
    "notfound.title": "Sayfa bulunamadı",
    "notfound.body": "Aradığın sayfa taşınmış ya da hiç olmamış olabilir.",
    "notfound.home": "Ana sayfaya dön",
  },
  en: {
    "meta.title": "Berat Oğuzhan Turğut · Software Developer",
    "meta.description": "Projects by Berat Oğuzhan Turğut, a backend developer in C# and .NET: 13 systems, tested, measured under load and started with one command.",
    "nav.projects": "Projects",
    "nav.skills": "Skills",
    "nav.about": "About",
    "nav.contact": "Contact",
    "nav.cv": "CV builder",
    "nav.skip": "Skip to content",
    "nav.language": "Language",
    "hero.role": "Backend Developer · C# and .NET",
    "hero.intro":
      "I build backends with ASP.NET Core and PostgreSQL, and the web apps in front of them with React and TypeScript. Each of my 13 recent projects takes one problem real systems get wrong and solves it so it holds under load: selling the same seat twice, money moving twice, a message lost on its way to the queue, work done offline on a phone.",
    "hero.open": "Looking for a junior .NET / backend role.",
    "hero.stats": ["13 recent projects", "1,470 automated tests", "CI on every pull request", "one-command Docker Compose"],
    "hero.projects": "See the projects",
    "hero.cv": "Try the CV builder",
    "projects.title": "Projects",
    "projects.lead": "Each one comes with tests, CI and a README in two languages. The screenshots come from the apps themselves.",
    "projects.filter": "Filter projects",
    "projects.all": "All",
    "projects.featured": "Featured",
    "projects.measured": "Proof",
    "projects.web": "Web",
    "projects.backend": "Backend",
    "projects.mobile": "Mobile",
    "projects.tool": "Tool",
    "projects.code": "View code",
    "projects.demo": "Live demo",
    "projects.walkthrough": "Watch the walkthrough",
    "projects.count": "projects",
    "skills.title": "Skills",
    "about.title": "About",
    "about.body": [
      "Hi, I'm Berat. I'm a software developer who keeps learning; right now I'm going deeper into backend work with .NET while building apps meant for real use.",
      "My first projects started as bootcamp assignments; I then rewrote each one with tests and a consistent design. In the 13 recent ones I focused on the hard parts of the backend: staying correct under concurrent requests, moving messages through queues without losing them, syncing apps that work offline, and measuring each of them under load.",
      "What I enjoy most is making a complicated flow simple for the person using it. Readable code, small and meaningful commits and a clear README are part of the job for me.",
    ],
    "contact.title": "Contact",
    "contact.lead": "Write to me about a job, a project or just to say hello.",
    "contact.email": "Send an email",
    "footer.built": "Built with Astro; every page is static.",
    "notfound.title": "Page not found",
    "notfound.body": "The page you are looking for may have moved or never existed.",
    "notfound.home": "Back to the home page",
  },
} as const;

export type UiKey = keyof (typeof ui)["tr"];

export function t<K extends UiKey>(lang: Lang, key: K): (typeof ui)["tr"][K] {
  return ui[lang][key] as (typeof ui)["tr"][K];
}

/** A path inside the site, with the base (e.g. /portfolio/) and the language prefix. */
export function href(lang: Lang, path = ""): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  const prefix = lang === "tr" ? "" : `/${lang}`;
  const clean = path.replace(/^\/+/, "");
  return `${base}${prefix}/${clean}`;
}

export const otherLang = (lang: Lang): Lang => (lang === "tr" ? "en" : "tr");
