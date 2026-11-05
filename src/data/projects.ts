import type { ImageMetadata } from "astro";

import backgroundJobs from "../assets/projects/background-jobs.png";
import bugunNeYapalim from "../assets/projects/bugun-ne-yapalim.png";
import cafeMap from "../assets/projects/cafe-map.png";
import cinelist from "../assets/projects/cinelist.png";
import edutrack from "../assets/projects/edutrack.png";
import eventTracker from "../assets/projects/event-tracker.png";
import gise from "../assets/projects/gise.png";
import inkwell from "../assets/projects/inkwell.png";
import kawaiiFriend from "../assets/projects/kawaii-friend.png";
import knowledgeBase from "../assets/projects/knowledge-base-api.png";
import logAnalytics from "../assets/projects/log-analytics.png";
import marketly from "../assets/projects/marketly.png";
import microservicesShop from "../assets/projects/microservices-shop.png";
import miniBankingApi from "../assets/projects/mini-banking-api.png";
import multiTenantSaas from "../assets/projects/multi-tenant-saas.png";
import notificationService from "../assets/projects/notification-service.png";
import realtimeChat from "../assets/projects/realtime-chat.png";
import rollcall from "../assets/projects/rollcall.png";
import sahada from "../assets/projects/sahada.png";
import stockly from "../assets/projects/stockly.png";
import studentCli from "../assets/projects/student-cli.png";
import type { Lang } from "../i18n/ui";

export type Category = "web" | "backend" | "mobile" | "tool";

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
    slug: "mini-banking-api",
    name: "Mini Banking API",
    category: "backend",
    summary: {
      tr: "Çift taraflı defterle çalışan bir bankacılık API'si: idempotent istekler, aynı anda gelen transferlerde bile tutarlı bakiyeler, yalnızca ekleme kabul eden denetim kaydı ve mutabakat raporu.",
      en: "A banking API on a double-entry ledger: idempotent requests, balances that stay correct under concurrent transfers, an append-only audit trail and a reconciliation report.",
    },
    stack: ["ASP.NET Core", "EF Core", "PostgreSQL", "Testcontainers", "Docker"],
    image: miniBankingApi,
    frame: "screen",
    repo: `${GITHUB}/mini-banking-api`,
    walkthrough: `${GITHUB}/mini-banking-api/blob/main/docs/screenshots/demo.gif`,
  },
  {
    slug: "background-jobs",
    name: "Background Jobs",
    category: "backend",
    summary: {
      tr: "Hangfire ve PostgreSQL ile arka plan işleri: büyük sipariş dosyalarını parça parça içe aktarma, zamanlanmış raporlar, yeniden deneme ve iptal; iki worker'a dağılan ama hiçbir zaman iki kez çalışmayan işler ve yöneticilere özel pano.",
      en: "Background jobs on Hangfire and PostgreSQL: chunked imports of large order files, scheduled reports, retries and cancellation; work spread over two workers that never runs twice, and a dashboard for admins.",
    },
    stack: ["ASP.NET Core", "Hangfire", "PostgreSQL", "Testcontainers", "Playwright"],
    image: backgroundJobs,
    frame: "screen",
    repo: `${GITHUB}/background-jobs`,
    walkthrough: `${GITHUB}/background-jobs/blob/main/docs/screenshots/demo.gif`,
  },
  {
    slug: "notification-service",
    name: "Notification Service",
    category: "backend",
    summary: {
      tr: "RabbitMQ ile e-posta ve uygulama içi bildirim servisi: Türkçe ve İngilizce sürümlü şablonlar, idempotent istekler, transactional outbox, artan aralıklarla yeniden deneme, yeniden oynatılabilen dead letter'lar ve istekten posta kutusuna OpenTelemetry izleri.",
      en: "An email and in-app notification service on RabbitMQ: versioned Turkish and English templates, idempotent requests, a transactional outbox, retries with growing delays, dead letters that can be replayed and OpenTelemetry traces from the request to the mailbox.",
    },
    stack: ["ASP.NET Core", "RabbitMQ", "PostgreSQL", "OpenTelemetry", "Testcontainers"],
    image: notificationService,
    frame: "screen",
    repo: `${GITHUB}/notification-service`,
    walkthrough: `${GITHUB}/notification-service/blob/main/docs/screenshots/demo.gif`,
  },
  {
    slug: "log-analytics",
    name: "Log Analytics",
    category: "backend",
    summary: {
      tr: "PostgreSQL üzerinde log servisi ve paneli: Serilog/Seq uyumlu alım, sınırlı kuyruk ve COPY ile saniyede 20.000'den fazla olay, günlük bölümler, tam metin ve özellik araması, servisler arası izler ve eşik uyarıları.",
      en: "A log service and dashboard on PostgreSQL: Serilog/Seq-compatible ingestion, more than 20,000 events per second through a bounded queue and COPY, daily partitions, full-text and property search, traces across services and threshold alerts.",
    },
    stack: ["ASP.NET Core", "PostgreSQL", "Serilog", "Playwright", "Testcontainers"],
    image: logAnalytics,
    frame: "screen",
    repo: `${GITHUB}/log-analytics-api`,
    walkthrough: `${GITHUB}/log-analytics-api/blob/main/docs/screenshots/demo.gif`,
  },
  {
    slug: "realtime-chat",
    name: "Realtime Chat",
    category: "backend",
    summary: {
      tr: "SignalR ile birebir ve grup sohbeti: boşluksuz mesaj numaraları ve kopmadan sonra eksiksiz telafi, mükerrer gönderim koruması, okundu bilgisi, yazıyor ve çevrimiçi durumu; Redis backplane ile nginx arkasında iki API örneği ve React + TypeScript istemcisi.",
      en: "Direct and group chat over SignalR: gapless message numbers and complete catch-up after a reconnect, duplicate-safe sends, read receipts, typing and presence; two API instances behind nginx on a Redis backplane, with a React and TypeScript client.",
    },
    stack: ["ASP.NET Core", "SignalR", "Redis", "PostgreSQL", "React"],
    image: realtimeChat,
    frame: "screen",
    repo: `${GITHUB}/realtime-chat`,
    walkthrough: `${GITHUB}/realtime-chat/blob/main/docs/screenshots/demo.gif`,
  },
  {
    slug: "multi-tenant-saas",
    name: "Multi-Tenant SaaS",
    category: "backend",
    summary: {
      tr: "Birçok şirketin paylaştığı destek talebi sistemi: EF Core filtreleri ve PostgreSQL satır düzeyi güvenliğiyle iki katmanlı kiracı yalıtımı, eşzamanlılıkta tutan plan sınırları, davetler ve roller, denetim kaydı, herkese açık destek formu ve React yönetim paneli.",
      en: "A support ticket system shared by many companies: tenant isolation in two layers with EF Core filters and PostgreSQL row-level security, plan limits that hold under concurrency, invitations and roles, an audit log, a public support form and a React admin panel.",
    },
    stack: ["ASP.NET Core", "PostgreSQL RLS", "EF Core", "React"],
    image: multiTenantSaas,
    frame: "screen",
    repo: `${GITHUB}/multi-tenant-saas`,
    walkthrough: `${GITHUB}/multi-tenant-saas/blob/main/docs/screenshots/demo.gif`,
  },
  {
    slug: "microservices-shop",
    name: "Microservices Shop",
    category: "backend",
    summary: {
      tr: "YARP ağ geçidinin arkasında altı .NET servisine bölünmüş, ortak veritabanı olmayan bir kahve mağazası: RabbitMQ ve MassTransit ile orkestrasyonlu sipariş sagası, transactional outbox, idempotent tüketiciler, aynı anda gelen siparişlerde fazla satış yok, OpenTelemetry izleri ve React mağaza ile yönetim paneli.",
      en: "A coffee shop split into six .NET services behind a YARP gateway, with no shared database: an orchestrated order saga with RabbitMQ and MassTransit, a transactional outbox, idempotent consumers, no overselling under concurrent checkouts, OpenTelemetry traces and a React storefront with an admin.",
    },
    stack: ["ASP.NET Core", "RabbitMQ", "MassTransit", "YARP", "React"],
    image: microservicesShop,
    frame: "screen",
    repo: `${GITHUB}/microservices-shop`,
    walkthrough: `${GITHUB}/microservices-shop/blob/main/docs/screenshots/demo.gif`,
  },
  {
    slug: "knowledge-base-api",
    name: "Knowledge Base",
    category: "backend",
    summary: {
      tr: "Ekibin kendi belgelerinden kaynak göstererek cevap veren bilgi bankası: pgvector ve PostgreSQL tam metin aramasıyla hibrit arama, arka planda indeksleme, akışla gelen numaralı atıflı cevaplar, ölçülerek ayarlanmış “belgelerde yok” eşiği, Ollama ya da OpenAI uyumlu modeller ve React arayüzü.",
      en: "A knowledge base that answers from a team's own documents with citations: hybrid search with pgvector and PostgreSQL full-text search, background indexing, streamed answers with numbered citations, a measured “not in the documents” threshold, Ollama or any OpenAI-compatible model, and a React app.",
    },
    stack: ["ASP.NET Core", "pgvector", "Ollama", "SSE", "React"],
    image: knowledgeBase,
    frame: "screen",
    repo: `${GITHUB}/knowledge-base-api`,
    walkthrough: `${GITHUB}/knowledge-base-api/blob/main/docs/screenshots/demo.gif`,
  },
  {
    slug: "gise",
    name: "Gişe",
    category: "web",
    summary: {
      tr: "Satışın açıldığı an için yapılmış biletleme: oturma planından koltuk seçimi, asla fazla satmayan ayırma, adil bekleme odası, imzalı webhook ile kesinleşen ödeme ve iade, çevrimdışı da doğrulanan imzalı QR biletler ve kapı uygulaması.",
      en: "Ticketing built for the moment a sale opens: seats picked on a floor plan, holds that never oversell, a fair waiting room, payments and refunds settled by signed webhooks, and signed QR tickets that a gate app checks even offline.",
    },
    stack: ["ASP.NET Core", "PostgreSQL", "ECDSA", "React", "Docker"],
    image: gise,
    frame: "screen",
    repo: `${GITHUB}/gise`,
    walkthrough: `${GITHUB}/gise/blob/main/docs/screenshots/demo.gif`,
  },
  {
    slug: "sahada",
    name: "Sahada",
    category: "web",
    summary: {
      tr: "Saha servis yönetimi: önceliğe göre son tarihli iş emirleri, yetenek, boş zaman ve mesafeye göre teknisyen öneren gün panosu ve harita, sinyal yokken de çalışıp işlem günlüğüyle eşitlenen teknisyen PWA'sı, fotoğraflar, imza ve PDF servis raporu.",
      en: "Field service management: work orders with deadlines set by priority, a day board and map that suggest a technician by skill, free time and distance, a technician PWA that works without signal and syncs an operation log, photos, signatures and a PDF service report.",
    },
    stack: ["ASP.NET Core", "PostgreSQL", "MinIO", "React", "Docker"],
    image: sahada,
    frame: "screen",
    repo: `${GITHUB}/sahada`,
    walkthrough: `${GITHUB}/sahada/blob/main/docs/screenshots/walkthrough.gif`,
  },
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

export const categories: Category[] = ["web", "backend", "mobile", "tool"];
