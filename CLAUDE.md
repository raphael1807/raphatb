# raphatb.com

Bilingual personal authority site for Raphael Tremblay-Bouchard (raphatb) — Builder, Operator, AI-First Systems Architect. Quebec, Canada.

## Stack

Static HTML. No build step, no framework, no package.json. Edit files directly and deploy.

## Files that matter

- `index.html` — French homepage (canonical, served at `/`)
- `en.html` — English homepage (served at `/en.html`)
- `assets/photos/` — referenced photos, kebab-case names (e.g. `william-burgess.jpg`)
- `assets/logos/` — brand/partner logos, mostly SVG
- `robots.txt`, `sitemap.xml`, `llms.txt` — crawler + AI discovery files
- `og-image.png`, `favicon.*` — kept at repo root (referenced from HTML)

## Hard rules

- **`index.html` and `en.html` must stay in sync.** Any structural / section / schema change to one must be mirrored in the other with translated copy. They share section IDs, classes, and the same JSON-LD shape.
- **Don't add files at repo root.** All new images go in `assets/photos/` (kebab-case). Underscore-named root-level images were a legacy mistake and have been removed.
- **Premium authority voice, no generic templates.** This is a personal authority site, not a SaaS landing page. No "boost your productivity" / "10x your X" / generic SEO fluff. Specific track record, named ventures, real numbers (e.g. "800+ properties, 2.5x revenue" at Monsieur Chalets).
- **Hero image is the LCP element.** `assets/photos/hero.jpg` is preloaded with `fetchpriority="high"` in both files. Don't lazy-load it. Don't remove the `<link rel="preload">` for it in `<head>`.
- **Both HTML files inline all CSS in a single `<style>` block.** No external stylesheet. Keep it that way unless the file gets unmanageable.

## Conventions

- Image references: relative paths (`assets/photos/foo.jpg`), not absolute.
- Below-fold `<img>` tags use `loading="lazy" decoding="async"`.
- Above-fold images get explicit `width` / `height` to prevent CLS.
- Section anchors are shared between FR and EN (`#story`, `#credentials`, `#testimonials`, etc.).
- The Person JSON-LD blocks at the bottom of each file are localized (FR/EN job title and description) but share `name`, `url`, `sameAs`, `worksFor`, `address`.

## Deploy / host

Custom domain `raphatb.com`. Host config (Cloudflare Pages / Netlify / Vercel / etc.) is **not** committed to the repo — set caching headers (`Cache-Control: public, max-age=31536000, immutable` for `/assets/*`) on the host side.

## Heavy folders to ignore

`transcripts/`, `whatsapp/`, `testimonials/`, `moi/` — local working assets, gitignored or unused by the deployed site. Skip them when exploring.
