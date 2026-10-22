# Portfolio — Yol Haritası

Berat'ın kişisel portföy sitesi: projeler, beceriler, iletişim + içinde canlı CV oluşturucu aracı.

- **Önerilen repo adı:** `portfolio`
- **Teknoloji:** HTML/CSS/JS (gerekirse Astro), GitHub Pages / Netlify
- **Kurallar:** `CONTRIBUTING.md` · **Tasarım:** `docs/DESIGN.md`

Her aşama ayrı bir branch ve PR olarak yapılır (`stage/<no>-<kisa-ad>`). Bir aşama ancak tüm maddeleri bitince, build/testler geçince ve ekran görüntüleri eklenince tamamlanmış sayılır. Biten maddeler `[x]` yapılır.

> Kapsam: Kişisel portföy sitesi + mevcut CV oluşturucu aracı sitenin bir sayfası olarak.
> Bu proje **en son** yapılır; diğer projelerin canlı linkleri ve ekran görüntüleri hazır olmalı.

## Aşama 1 — Portföy sitesi
- [x] Statik site (HTML/CSS/JS veya Astro) — `docs/DESIGN.md` token'ları
- [x] Bölümler: Hero (ad, unvan, kısa tanıtım), Projeler (kart: görsel, teknoloji etiketleri, GitHub + canlı demo linki), Beceriler, Hakkımda, İletişim
- [x] TR / EN dil seçici
- [x] GitHub Pages'e yayın iş akışı (`deploy.yml`); birim testleri, uçtan uca test ve CI
- [ ] Yayını açmak (elle): repo public olmalı ve Settings → Pages → Source: GitHub Actions seçilmeli

## Aşama 2 — CV oluşturucu sayfası
- [ ] Mevcut CV aracı `/cv-builder` sayfası olarak taşınır, yeni tasarıma uyarlanır
- [ ] PDF olarak indir, verileri tarayıcıda sakla, 2 hazır şablon
- [ ] Lighthouse 95+ (performans, erişilebilirlik); README (TR + EN)
