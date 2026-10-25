export const languages = { tr: "Türkçe", en: "English" } as const;
export type Lang = keyof typeof languages;

export const ui = {
  tr: {
    "meta.title": "Berat Oğuzhan Turğut · Yazılım Geliştirici",
    "meta.description": "C# ve .NET ile web uygulamaları, Expo ile mobil uygulamalar geliştiren Berat Oğuzhan Turğut'un projeleri.",
    "nav.projects": "Projeler",
    "nav.skills": "Beceriler",
    "nav.about": "Hakkımda",
    "nav.contact": "İletişim",
    "nav.cv": "CV oluşturucu",
    "nav.skip": "İçeriğe geç",
    "nav.language": "Dil",
    "hero.role": "Yazılım Geliştirici",
    "hero.intro":
      "C# ve .NET ile web uygulamaları, Expo ve React Native ile mobil uygulamalar geliştiriyorum. Bir projeyi çalışır hale getirmekle yetinmiyorum: testini yazıyorum, CI'a bağlıyorum ve başkası açtığında ne yapacağını bilsin diye belgeliyorum.",
    "hero.projects": "Projelere bak",
    "hero.cv": "CV oluşturucuyu dene",
    "projects.title": "Projeler",
    "projects.lead": "Her biri testleri, CI'ı ve iki dilde README'siyle birlikte. Ekran görüntüleri uygulamaların kendisinden.",
    "projects.filter": "Projeleri süz",
    "projects.all": "Tümü",
    "projects.web": "Web",
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
      "Buradaki projelerin çoğu bir bootcamp ödevi olarak başladı. Sonra her birini baştan yazdım: ödevin istediğinin üstüne gerçek bir kullanıcının ihtiyaç duyacağı ayrıntıları, testleri ve sade, tutarlı bir tasarımı ekledim.",
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
    "meta.description": "Projects by Berat Oğuzhan Turğut: web apps in C# and .NET, mobile apps with Expo.",
    "nav.projects": "Projects",
    "nav.skills": "Skills",
    "nav.about": "About",
    "nav.contact": "Contact",
    "nav.cv": "CV builder",
    "nav.skip": "Skip to content",
    "nav.language": "Language",
    "hero.role": "Software Developer",
    "hero.intro":
      "I build web apps with C# and .NET and mobile apps with Expo and React Native. Getting a project to run is only part of it: I write the tests, wire it into CI and document it so the next person knows what to do.",
    "hero.projects": "See the projects",
    "hero.cv": "Try the CV builder",
    "projects.title": "Projects",
    "projects.lead": "Each one comes with tests, CI and a README in two languages. The screenshots come from the apps themselves.",
    "projects.filter": "Filter projects",
    "projects.all": "All",
    "projects.web": "Web",
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
      "Most of the projects here started as bootcamp assignments. I then rewrote each one from the ground up, adding what a real user would need on top of the brief, along with tests and a simple, consistent design.",
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
