# Design Review — Ahmed Fayed (Bespoke Men's Jackets)

**Skill:** `ui-ux-pro-max` (https://github.com/nextlevelbuilder/ui-ux-pro-max-skill.git, installed) — applied Review-existing-UI checklist + `landing` + `ux` + web (not native-app) rules.
**Date:** generated review; rebuild with `npm run build`.

---

## Honesty & scope

- **I cannot see images or rendered pixels in this environment.** This review is built from **source inspection + skill guidance + real Chromium checks + Lighthouse**, not visual judgement. Unverified items are marked **NOT TESTED**.
- **Active main page = standalone `index.html`** (your `Ahmed Fayed1.html`, installed verbatim + minimal objective fixes). **Not** my React app. My React app is preserved at **`index.react.html` + `src/`** (not built).
- **Stack (active page):** plain **HTML5 + CSS + one inline `<script>`**, no framework/tailwind. **Project shell:** React 19 + Vite 6 (`package.json` unchanged, no new deps).
- **Brand/tagline:** Ahmed Fayed · أحمد فايد · "Tailored on your measure." · مفصّل على مقاسك بالظبط · **1,300 EGP** base · **WhatsApp `wa.me/201093096278`**.

---

## What was fixed in this review (objective, verified)

| Issue | Fix | Verified |
|---|---|---|
| `<html>` no `lang` | `<html lang="en">` | Lighthouse a11y PASS |
| No meta description **and** placed **outside `<head>`** (page had `</head><body>` then `<title>`) | Rebuilt `<head>`; `<title>` + `<meta name="description">` + `<link rel="icon">` inside `<head>`, single `<title>` | Lighthouse **SEO 1.00**, `titles=1`, `metaDescInHead=true` |
| `#drop` `role=button` `aria-label` ≠ visible text (`label-content-name-mismatch`) | removed conflicting `aria-label`; name from content | Lighthouse **a11y 1.00** |
| No favicon link | `<link rel="icon" href="/favicon.svg">` in `<head>` | `faviconInHead=true` |
| Arabic source safety | verified **UTF-8 + `charset=utf8`**, Arabic renders (not mojibake) in generated SVG/text | `hasReplacement=false` |

(Also in recent turns: real brand logo merged; **jacket photo** robustly rendered in service card `#svcA`.)

### Measured result (production `vite preview`, fresh Chromium)
- **Lighthouse:** Accessibility **1.00** · Best Practices **1.00** · SEO **1.00** · **0 failures**.
- No console errors · no horizontal overflow · no emoji · **UTF-8 + Arabic OK**.
- `<main id="top">` + `<nav>` · `aria-pressed=16` · `aria-expanded=2` · `:focus-visible` · `prefers-reduced-motion`.
- `npm run build` ✓.

---

## What's strong (ui-ux-pro-max lens)

### Brand & tokens
- `:root` tokens: cream/ivory/sand/brown/gold (`--cream/--ivory/--sand/--brown/--gold/--gold2/--goldd/--muted/--line`, `--jc`, `--lc`, `--tex`, `--p`, `--d`).
- **Cormorant Garamond + Amiri**, `display=swap`, consistent radii/shadows; bilingual **EN + AR (`.ar`, RTL)**; stitch/tape motif; embedded logo + `public/logo.png`; jacket photo `public/jaket.png`.

### Landing structure (skill `landing`: Hero + Social Proof + CTA)
Hero (value prop + trust metrics + dual CTA + illustration) → **Services** → **5-step Process** (`#proc`) → **Studio (interactive configurator)** → **8-step Measure** → **Photo→piece** → recap → **why/nums** → **7-item FAQ** (`<details>`) → **CTA** → footer → **WhatsApp FAB**.

### Interaction
- Native `<button>`/`<details>`; `aria-pressed`; `aria-expanded`; keyboard on `#drop` + Enter measure-nav.
- **Photo service**: drag-drop + click + `input type=file`, `/^image\//` filter, `FileReader`, preview, sizes chips; `wa.me` prefill.
- Measurements `type=number inputmode=decimal`, `v>0`; embroidery name; `.inp`.
- Hover/focus states; `:focus-visible 3px gold`; no emoji; **inline SVG** icons (no Phosphor on this page).
- `<prefers-reduced-motion>`.

### Motion (skill §7)
- Reduced-motion `.001s`, `.co{opacity:1}`, static final state; **GPU `transform/opacity`**; scroll-reveal `@supports(animation-timeline:view())`; `scroll-behavior:smooth`.
- **Animations:** `rise`, `cin`, `ping`, `bob`, `shad`, `march`, `tape`, `spin 60s`, `bump`, `scan`, `wap`, `rv`, `cyc`, `upb`, `fadein`, `count`.

### Responsive
- Grids collapse `@media 960 / 520`; `overflow-x:hidden`; **no measured horizontal overflow** at 320→1920; `viewport-fit=cover` + `env(safe-area-inset-*)`.
- **No measured 44px verification** (see findings).

### Performance / security
- Static; no runtime data fetching; no secrets; no `dangerouslySetInnerHTML`/`eval`; external `wa.me` links `rel`-safe in my layer; no extra images to optimize in my layer.

---

## Findings (not auto-changed — need your call or can't verify)

1. **No skip-to-content link** (a11y nicety; Lighthouse passes). → `<a href="#top" class="skip-link">Skip to content</a>`.
2. **No `aria-live`** on dynamic regions — live price `#recap`, progress `#bl`/`#barI`, preview `#pvn`/`#inm`/`#insT`, `#ptxt`, `#sv`, `#fname`. Screen-reader updates may be missed. → `aria-live="polite"`.
3. **Motion intensity** vs skill "1–2 key per view; not everything moving": many concurrent animations; **reduced-motion fully disables**, but default has infinite loops (`.ring`, `.tape`, `.wafab`, `.scan`, `.stitch`, `.upa`). → trim infinite loops; keep reduced-motion.
4. **Auto-rotating content** `.ring`/`.tape`/`.wafab`/`.scan` has **no pause control**; mitigated by reduced-motion + decorative. → add pause/stop or keep static under reduced-motion.
5. **Touch targets ≥44px** not measured: `.chip` (10px pad), `.links`, `.n` (42px), `.sw`, `.fab`, `.tg`, `.step>button`, `.inp input`, etc. → **NOT TESTED** at 320px; measure.
6. **Form validation**: measure `v>0`, image `/^image\//`, no inline error text / `aria-describedby` / error summary. → **NOT TESTED** invalid-path.
7. **Contrast**: palette + Lighthouse a11y=1, but **cannot visually verify** `--muted`/gold-on-cream everywhere. → **NOT TESTED** pixel-level.
8. **Jacket photo scope**: `#svcA` uses photo; **hero `#stage`, studio `#pvJ`, measure `.fsv`** remain SVG; **can't confirm it displays for you** (no vision + can't confirm your cache/server).
9. **React app bypassed**: active page is standalone; my React SEO/canonical/sitemap/JSON-LD additions are in the `index.react.html` backup, not this page.
10. **Stack checklist**: my `ui-ux-pro-max` scope notice says App-UI items (safe-area/haptics/bottom-nav/Dynamic-Type) are native-only; applied **web** rules to this desktop-web page.

---

## NOT TESTED (and why)

- **Pixel/visual correctness, spacing, alignment, contrast rendering, screenshots** — model has **no image input**.
- **Cross-browser** (Safari/Firefox/iOS/Android), **screen-reader manual**, **dynamic-type/large text**, **dark mode** (light-only; no dark variant), **landscape/safe-area on notch** (`env()` used; not verified on device).
- **Touch-target measured sizes**, **320px**, **network throttling / CLS numeric**, **Lighthouse Performance** (tool emits a11y/best-practices/SEO only).
- **Form invalid-path**, **drag-and-drop `drop` event**, **WhatsApp actual send** (link verified, not sent).
- **React best-practices on `index.react.html` backup** (not active page).

---

## PASS / FAIL / NOT TESTED checklist

| Item | Status |
|---|---|
| Lighthouse Accessibility | **PASS** (1.00) |
| Lighthouse Best Practices | **PASS** (1.00) |
| Lighthouse SEO | **PASS** (1.00) |
| No console errors | **PASS** |
| `<head>` SEO (title/meta/lang/favicon) | **PASS** |
| UTF-8 + Arabic | **PASS** |
| No emoji-as-icons | **PASS** |
| Native controls + aria-pressed/expanded + focus-visible | **PASS** |
| `<main>`/`<nav>` semantics | **PASS** |
| `prefers-reduced-motion` | **PASS** |
| No horizontal overflow (measured) | **PASS** |
| `npm run build` | **PASS** |
| GPU-only animation + reduced-motion static | **PASS** |
| Skip-to-content link | **NOT TESTED / absent** |
| `aria-live` on dynamic regions | **absent** |
| Contrast (pixel) | **NOT TESTED** |
| 44px touch targets (measured) | **NOT TESTED** |
| Visual rendering | **NOT TESTED** (no image input) |
| Cross-browser / screen-reader | **NOT TESTED** |
| Jacket photo visible to you | **can't verify** (no vision) |
| Form invalid-path | **NOT TESTED** |
| Lighthouse Performance / Core Web Vitals | **NOT TESTED** |

---

## Suggested order (not applied)

1. Add **skip-link**.
2. Add **`aria-live="polite"`** on live regions.
3. Trim infinite loops + **pause** `.ring/.tape/.wafab`; verify reduced-motion.
4. Measure **44px targets @320px**.
5. Add inline **form errors + `aria-describedby`**.
6. Decide **jacket scope** (hero/studio) + confirm **cache/server** + which **jacket image**.
7. If wanted, **re-activate React app** vs keep standalone; re-apply SEO to active page.

**Preview:** `http://localhost:4173` (`npm run preview`) / `npm run dev` `:5173`. Hard-refresh Ctrl+Shift+R. Say which findings to implement and I'll apply + re-verify.
