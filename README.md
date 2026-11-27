# Ahmed Fayed — Bespoke Men's Jackets

Single-page marketing + ordering site for **Ahmed Fayed / أحمد فايد**, a master tailor offering **made-to-measure men's jackets**.

> **Tagline:** *Tailored on your measure.* · **مفصّل على مقاسك بالظبط**
> **Base price:** **1,300 EGP** · **Order on WhatsApp:** `+20 109 309 6278` → `https://wa.me/201093096278`
> Bilingual **EN / AR** with **RTL**. Brand: navy `#16233B`, gold `#C2A15D`, cream `#F7F4ED`, ink `#14161C`; Cormorant + Montserrat + **Amiri + Tajawal**.

---

## Active main page vs. preserved React app

**Active main page** = **standalone `index.html`** (the provided *Ahmed Fayed1.html*, installed verbatim + minimal objective fixes). Plain **HTML5 + CSS + one inline `<script>`**, no framework. The project shell remains **React 19 + Vite 6**, and the build serves this static `index.html`.

**My React version is preserved, not active:** `index.react.html` + `src/` (components, `App`, `i18n`, `lang`, `data`, styles, `Logo`, `Monogram`, `JacketPreview`, `MeasureGuide`, `MeasureFigure`, `OrderReview`, `Configurator`, …). Restore it by renaming `index.react.html` back to `index.html` (or `git` restore) if you prefer the React app.

---

## Features (active page)
- **Hero** with value prop, trust metrics, dual CTA, animated jacket + measurement callouts.
- **Services**: *Tailored on your measure* + *Send us a photo* ("make any piece in your size; price quoted after the photo"). Jacket **photo** in the service card.
- **5-step process** (`#proc`), **interactive Studio/configurator** (`#pvJ`: fabric, colour, silk lining, embroidered name, extra pocket; live base price **1,300 EGP**, extras priced by the tailor), live preview + recap + WhatsApp.
- **8-step animated measuring guide** (`#measure`): Height, Weight, Neck, Shoulder, Chest, Waist, Sleeve length, Jacket length; animated tape markers; EN/AR; `type=number inputmode=decimal`; progress; reduced-motion.
- **Photo service** (`#photo`): drag-drop / click file, `/^image\//`, `FileReader` preview, garment chips, sizes choice, `wa.me` prefill.
- **Why / FAQ** (7 `<details>`), **CTA**, **footer**, **WhatsApp FAB**; `aria-pressed`/`aria-expanded`, keyboard, `:focus-visible`, no emoji, inline SVG; `prefers-reduced-motion`.
- Ordering via **WhatsApp `wa.me/201093096278`** prefilled text.

---

## Stack
- **React 19.1 + react-dom**, **Vite 6** (`@vitejs/plugin-react`), ESM. Active page adds no framework. **No router / no backend / no database / no auth / no API.**
- Fonts (Google): **Cormorant + Cormorant Garamond, Montserrat, Amiri, Tajawal**, `display=swap`. **No emoji icons.**
- `@phosphor-icons/react` is a dependency (used by the preserved React app; the active standalone page uses inline SVG/CSS).

## Project structure
```
index.html            # ACTIVE main page (standalone HTML+CSS+JS)
index.react.html      # backup: my React index (not built)
public/
  favicon.svg  logo.jpg  logo.png  jaket.jpg  jaket.png  images/
src/                  # my React app (not active while standalone index.html is served)
  main.jsx App.jsx lang.jsx data.js i18n.js
  components/*.jsx    # Header Hero Journey Configurator JacketPreview MeasureGuide
                      # MeasureFigure OrderReview Rules Footer Monogram Logo ScrollProgress
  styles/tokens.css global.css components.css guide.css
dist/                 # build output (vite build)
DESIGN_REVIEW.md      # full ui-ux-pro-max review
package.json vite.config.js vercel.json .gitignore
# robots.txt + sitemap.xml are generated at build by vite.config.js
```

---

## Run / build
```bash
npm install
npm run dev        # Vite dev server (http://localhost:5173)
npm run build      # production build -> dist/   (works for standalone page; no JS bundling needed)
npm run preview    # serve dist/ (http://localhost:4173)
```

---

## Deploy to Vercel

1. Push this folder to GitHub / GitLab / Bitbucket, then **Import Project** in Vercel (or run `npx vercel` here).
2. Vercel uses **`vercel.json`**: framework `vite`, build `npm run build`, output `dist`. No other settings needed.
3. **Optional but recommended:** in *Project Settings → Environment Variables*, add
   `VITE_SITE_URL = https://your-domain.com` (Production and Preview as needed).
   If omitted, the build automatically uses Vercel's `VERCEL_PROJECT_PRODUCTION_URL` / `VERCEL_URL`.
   This value drives `<link rel="canonical">`, `og:url`, `og:image`, Twitter cards, JSON-LD, `robots.txt` and `sitemap.xml` — **no placeholder domain is ever shipped**.
4. Deploy and verify: `/` (200), `/robots.txt` (with `Sitemap:`), `/sitemap.xml` (200 when an origin is known), and `/jaket.jpg` (200).

No secrets, API keys, backend, or database are required.
- Hard-refresh **Ctrl+Shift+R**; stop stray dev/preview servers to avoid stale `dist` + port conflicts.
- **No `.env` needed**; **no secrets/keys** in repo. `.gitignore`: `node_modules`, `dist`, `.DS_Store`, `*.local`.
- **Python** (3.14.7) only needed for the `ui-ux-pro-max` skill CLI, not to run the site.

## Assets
- **Logo:** inline AF monogram SVG in the header; `public/logo.jpg`/`public/logo.png` are kept as brand assets.
- **Jacket photo:** `public/jaket.jpg` (896×1200) is referenced as `/jaket.jpg` in the hero, service card and studio preview. The two duplicate base64 copies were removed from `index.html`, cutting it from **250 KB → 86 KB** (gzip ~26 KB) and making the image cacheable. `public/jaket.png` is an alternate asset, unused by the active page.
- **`public/favicon.svg`.** `og:image`/`twitter:image` point to the real `/jaket.jpg` once a production origin is known — no fabricated image.

---

## Business rules (from brief)
- Base **1,300 EGP**; extras (fabric upgrade, silk lining, embroidered name, extra pocket) **priced by the master tailor**.
- **Deposit 30–50%** confirms; remainder on delivery. **~14 days**. **One free adjustment.** Weekly capacity / waiting list. **First order: quick video/WhatsApp size check.** Tailor confirms sizes before cutting.
- 8 measurements (cm; weight kg) with EN/AR "where to measure" instructions.

## SEO & accessibility
- `<html lang>`, `<title>`, `<meta name="description">`, `robots` meta, `<link rel="icon">`, `<main>`+`<nav>`, semantic headings, alt text.
- **Build-time SEO** in `vite.config.js`: `<link rel="canonical">`, `og:url`, `og:image`, Twitter card, minimal `Organization` JSON-LD, plus generated `robots.txt` + `sitemap.xml`. The origin comes from `VITE_SITE_URL` → `VERCEL_PROJECT_PRODUCTION_URL` → `VERCEL_URL`; local builds emit no canonical/sitemap and no placeholder domain.
- `focus-visible`, reduced-motion, skip-link, `aria-live`, 44px targets, inline form errors. **Lighthouse a11y / best-practices / SEO = 1.00, 0 failures** (verified on the production build).
- `DESIGN_REVIEW.md` is the earlier review; most of its open findings were applied afterwards. Remaining unverified: pixel-level contrast and cross-browser / screen-reader passes.

## Known limits / not tested
- Visual layout was checked in Chromium (screenshot + DOM/network/console), but **pixel-level contrast, cross-browser and screen-reader passes are not verified**; Lighthouse Performance / Core Web Vitals were not measured.
- No backend/order processing; ordering is **WhatsApp deep-link** (not actually sent in tests). No fabricated prices beyond stated extras; no fabricated address/OG image.
- Hero `#stage`, studio `#pvJ`, measure `.fsv` remain **SVG**; only service card uses the jacket photo. Confirm your server/cache shows `/jaket.png` (HTTP 200).

## Notes
- Originally scaffolded React+Vite with the **`ui-ux-pro-max`** skill; **no new dependencies** added for these changes; image-generation tool was unavailable, so art is **inline SVG / provided assets**.
