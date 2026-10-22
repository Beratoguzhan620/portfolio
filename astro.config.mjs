// @ts-check
import { defineConfig } from "astro/config";

// GitHub Pages serves the site from /portfolio/. Set SITE_BASE=/ for a custom domain or Netlify.
const base = process.env.SITE_BASE ?? "/portfolio";

export default defineConfig({
  site: process.env.SITE_URL ?? "https://beratoguzhan620.github.io",
  base,
  trailingSlash: "always",
  i18n: {
    defaultLocale: "tr",
    locales: ["tr", "en"],
    routing: { prefixDefaultLocale: false },
  },
});
