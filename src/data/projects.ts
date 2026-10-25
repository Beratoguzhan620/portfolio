import type { ImageMetadata } from "astro";

import bugunNeYapalim from "../assets/projects/bugun-ne-yapalim.png";
import cafeMap from "../assets/projects/cafe-map.png";
import cinelist from "../assets/projects/cinelist.png";
import edutrack from "../assets/projects/edutrack.png";
import eventTracker from "../assets/projects/event-tracker.png";
import inkwell from "../assets/projects/inkwell.png";
import kawaiiFriend from "../assets/projects/kawaii-friend.png";
import marketly from "../assets/projects/marketly.png";
import rollcall from "../assets/projects/rollcall.png";
import stockly from "../assets/projects/stockly.png";
import studentCli from "../assets/projects/student-cli.png";
import type { Lang } from "../i18n/ui";

export type Category = "web" | "mobile" | "tool";

export type Project = {
  slug: string;
  name: string;
  category: Category;
  summary: Record<Lang, string>;
  stack: string[];
  image: ImageMetadata;
  /** Phone screenshots are shown whole; desktop ones fill the frame. */
  frame: "screen" | "phone";
  repo: string;
  /** Live web demo, when the project has one. */
  demo?: string;
  /** Recorded walkthrough (the demo GIF in the repository), shown when there is no live demo. */
  walkthrough?: string;
};

const GITHUB = "https://github.com/Beratoguzhan620";

// Web demos published from each repository to GitHub Pages.

export const projects: Project[] = [
  {
    slug: "marketly",
    name: "Marketly",
    category: "web",
    summary: {
      tr: "Yerel üreticiler için çok satıcılı pazar yeri: sepet, indirim kodu ve sipariş takibi olan mağaza, satıcı alanı, yönetim paneli ve görseller için küçük bir File API.",
      en: "A multi-seller marketplace for local producers: a storefront with cart, coupons and order tracking, a seller area, an admin panel and a small File API for images.",
    },
    stack: ["ASP.NET Core MVC", "Web API", "EF Core", "SQL Server", "Docker"],
    image: marketly,
    frame: "screen",
    repo: `${GITHUB}/marketly`,
    walkthrough: `${GITHUB}/marketly/blob/main/docs/screenshots/demo.gif`,
  },
  {
    slug: "stockly",
    name: "Stockly",
    category: "web",
    summary: {
      tr: "Küçük bir dükkân için stok yönetimi: barkodlu ürünler, giriş-çıkış, sayım, kritik seviye uyarıları, tedarikçiler ve Excel/CSV dışa aktarma.",
      en: "Stock management for a small shop: products with barcodes, goods in and out, stock counts, critical-level alerts, suppliers and Excel/CSV exports.",
    },
    stack: ["ASP.NET Core MVC", "EF Core", "SQL Server", "xUnit", "Docker"],
    image: stockly,
    frame: "screen",
    repo: `${GITHUB}/stockly`,
    walkthrough: `${GITHUB}/stockly/blob/main/docs/screenshots/demo.gif`,
  },
  {
    slug: "edutrack",
    name: "EduTrack",
    category: "web",
    summary: {
      tr: "Öğretmen ve öğrenciler için sınıf uygulaması: kodla katılınan dersler, ders akışı, materyaller, notlandırmalı ödevler ve geride kalanları gösteren sınıf listesi.",
      en: "A classroom app for teachers and students: courses joined with a code, a course stream, materials, graded assignments and a roster that shows who is behind.",
    },
    stack: ["ASP.NET Core MVC", "EF Core", "FluentValidation", "SQL Server", "xUnit"],
    image: edutrack,
    frame: "screen",
    repo: `${GITHUB}/EduTrack`,
    walkthrough: `${GITHUB}/EduTrack/blob/main/docs/screenshots/demo.gif`,
  },
  {
    slug: "inkwell",
    name: "Inkwell",
    category: "web",
    summary: {
      tr: "Çok yazarlı blog: Markdown ile yaz, taslak tut, okunaklı bir adresle yayınla ve her şeyi ayrı bir yönetim panelinden denetle.",
      en: "A multi-author blog: write in Markdown, keep drafts, publish with a readable URL and moderate everything from a separate admin panel.",
    },
    stack: ["ASP.NET Core MVC", "EF Core", "Markdig", "SQL Server"],
    image: inkwell,
    frame: "screen",
    repo: `${GITHUB}/inkwell`,
    walkthrough: `${GITHUB}/inkwell/blob/main/docs/screenshots/demo.gif`,
  },
  {
    slug: "event-tracker",
    name: "EventTracker",
    category: "web",
    summary: {
      tr: "Etkinlik planlayıcı: liste ya da takvim görünümü, bekleme listeli kayıt ve katılımcıların etkinliği kendi takvimine eklemesi.",
      en: "An event planner: list and calendar views, registrations with a waiting list, and events people can add to their own calendar.",
    },
    stack: ["ASP.NET Core MVC", "EF Core", "SQLite", "Docker"],
    image: eventTracker,
    frame: "screen",
    repo: `${GITHUB}/event-tracker`,
    walkthrough: `${GITHUB}/event-tracker/blob/main/docs/screenshots/demo.gif`,
  },
  {
    slug: "rollcall",
    name: "Rollcall",
    category: "web",
    summary: {
      tr: "Sınıf, öğrenci, günlük yoklama ve not takibi yapan; verileri Excel ya da CSV olarak dışa aktaran okul yönetim paneli.",
      en: "A school panel for classes, students, daily attendance and grades, with exports to Excel or CSV.",
    },
    stack: ["ASP.NET Core MVC", "EF Core", "SQL Server", "Docker"],
    image: rollcall,
    frame: "screen",
    repo: `${GITHUB}/rollcall`,
    walkthrough: `${GITHUB}/rollcall/blob/main/docs/screenshots/demo.gif`,
  },
  {
    slug: "kawaii-friend",
    name: "Kawaii Friend",
    category: "mobile",
    summary: {
      tr: "Bakımı sana kalmış sanal arkadaş: Firebase ile giriş, Firestore'da zamanla değişen ihtiyaçlar, seviye sistemi ve acıkınca gelen bildirimler.",
      en: "A virtual friend to look after: Firebase sign-in, needs in Firestore that change over time, levels, and reminders when it gets hungry.",
    },
    stack: ["Expo", "TypeScript", "Firebase", "Firestore rules", "NativeWind"],
    image: kawaiiFriend,
    frame: "phone",
    repo: `${GITHUB}/kawaii-friend`,
    demo: "https://beratoguzhan620.github.io/kawaii-friend/",
  },
  {
    slug: "cafe-map",
    name: "CafeMap",
    category: "mobile",
    summary: {
      tr: "İstanbul'daki kafeleri harita üzerinde keşfet: pin'e dokununca alt panel, haritayla senkron kartlar ve Türkçe karakter dostu arama.",
      en: "Find cafes in Istanbul on a map: a bottom sheet for each pin, cards synced with the map and search that handles Turkish letters.",
    },
    stack: ["Expo", "expo-maps", "Bottom Sheet", "Leaflet", "TypeScript"],
    image: cafeMap,
    frame: "phone",
    repo: `${GITHUB}/cafe-map`,
    demo: "https://beratoguzhan620.github.io/cafe-map/",
  },
  {
    slug: "cinelist",
    name: "CineList",
    category: "mobile",
    summary: {
      tr: "Telefon ve web için kişisel film arşivi: ekle, düzenle, sil; afiş ya da liste olarak gez, ara, türe göre süz ve sırala.",
      en: "A personal film archive for phones and the web: add, edit and remove films, browse as posters or a list, search, filter and sort.",
    },
    stack: ["Expo", "Redux Toolkit", "RTK Query", "TypeScript"],
    image: cinelist,
    frame: "screen",
    repo: `${GITHUB}/cinelist`,
    demo: "https://beratoguzhan620.github.io/cinelist/",
  },
  {
    slug: "bugun-ne-yapalim",
    name: "Bugün Ne Yapalım?",
    category: "mobile",
    summary: {
      tr: "Tek dokunuşla bugün için bir etkinlik önerisi; tekrar etmeyen seçim, kategori filtresi ve güne sabitleme.",
      en: "One tap for an idea of what to do today, with no repeats, a category filter and pinning an idea to the day.",
    },
    stack: ["Expo", "TypeScript", "NativeWind", "Reanimated"],
    image: bugunNeYapalim,
    frame: "phone",
    repo: `${GITHUB}/bugun-ne-yapalim`,
    demo: "https://beratoguzhan620.github.io/bugun-ne-yapalim/",
  },
  {
    slug: "student-cli",
    name: "Student CLI",
    category: "tool",
    summary: {
      tr: "Öğrenci listesini yöneten bağımlılıksız bir konsol uygulaması: ekle, listele, ara, güncelle, sil; veriler bir JSON dosyasında.",
      en: "A small, dependency-free console app for a student list: add, list, search, update and delete, with the data saved to a JSON file.",
    },
    stack: [".NET 10", "C#", "System.Text.Json", "xUnit"],
    image: studentCli,
    frame: "screen",
    repo: `${GITHUB}/student-cli`,
    walkthrough: `${GITHUB}/student-cli/blob/main/docs/screenshots/demo.gif`,
  },
];

export const categories: Category[] = ["web", "mobile", "tool"];
