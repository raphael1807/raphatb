# Playbook: Recreate the AI Geeks Website for raphatb

> Everything we did for aigeeks.pages.dev — step by step — so you can spin up raphatb.com in one session with Claude Code.

---

## The Stack (What We Used)

| Layer | Tool | Why |
|-------|------|-----|
| Code | Pure HTML/CSS/JS | No framework, no build step, instant deploy |
| Hosting | Cloudflare Pages | Free, fast, global CDN, custom domain |
| Deploy | GitHub Actions → Wrangler | Push to `main` = live in 30 seconds |
| Repo | GitHub (`raphael1807/aigeeks`) | Simple, free |
| Forms | Cloudflare Workers function → Luma API | Serverless email capture |
| Carousels | Custom HTML generator + Puppeteer screenshots | Brand-consistent Instagram/LinkedIn slides |
| Icons | Lucide (CDN) | Lightweight, clean |
| Fonts | Google Fonts (Space Grotesk, Inter, Caveat, JetBrains Mono) | Free, fast |
| AI Assistant | Claude Code with CLAUDE.md | Voice/brand/strategy baked into every session |
| Analytics | Google Search Console (MCP server, in progress) | SEO tracking |
| Instagram | Metricool integration | Scheduling + analytics |

---

## Step 0: Prep (5 min)

Before touching code, have these ready:

- [ ] **Domain** — buy raphatb.com (or whatever) on Cloudflare/Namecheap
- [ ] **GitHub repo** — create `raphael1807/raphatb` (public or private)
- [ ] **Cloudflare account** — same one as AI Geeks
- [ ] **Logo** — SVG preferred (white version + black version for light theme)
- [ ] **Hero photo or video** — compressed MP4 for background (or skip, use gradient)
- [ ] **Headshot** — for about section / OG image
- [ ] **Color palette** — AI Geeks uses black `#0c0c0e` + gold `#d4a843`. Pick yours.
- [ ] **Fonts** — AI Geeks uses Space Grotesk + Inter. Pick yours or reuse.

---

## Step 1: Scaffold the Repo (2 min)

```bash
mkdir -p ~/Desktop/raphatb/website
cd ~/Desktop/raphatb/website
git init
git remote add origin https://github.com/raphael1807/raphatb.git
```

Create the folder structure:

```
website/
├── index.html          # Main site (French or English)
├── en/
│   └── index.html      # English version (optional)
├── assets/
│   ├── logo/
│   │   ├── logo-white.svg
│   │   └── logo-black.svg
│   ├── logos/           # Partner/client logos
│   ├── photos/
│   │   └── full/        # High-res originals
│   └── bg-video.mp4     # Hero background (optional)
├── functions/
│   └── api/
│       └── subscribe.js # Email capture endpoint
├── carousels/           # Generated carousel PNGs (gitignored)
├── carousel.html        # Carousel generator
├── generate-carousels.js
├── package.json
├── wrangler.toml
├── .env
├── .gitignore
└── CLAUDE.md            # YOUR brand bible for Claude
```

---

## Step 2: The .gitignore (1 min)

```gitignore
node_modules/
carousels/
.env
.wrangler/
.DS_Store
*.bak
```

---

## Step 3: The HTML Structure (What We Built)

The AI Geeks `index.html` is a single-file site (~89KB) with these sections. Copy the pattern:

### 3.1 — Head & Meta

```html
<!DOCTYPE html>
<html lang="fr" data-theme="dark">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Rapha TB — [your tagline]</title>

  <!-- OG Tags (critical for link previews) -->
  <meta property="og:title" content="Rapha TB" />
  <meta property="og:description" content="[one-liner]" />
  <meta property="og:image" content="https://raphatb.com/og-image.jpg" />
  <meta property="og:url" content="https://raphatb.com/" />
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary_large_image" />

  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500&display=swap" rel="stylesheet" />

  <!-- Lucide Icons -->
  <script src="https://unpkg.com/lucide@0.460.0/dist/umd/lucide.min.js"></script>
</head>
```

### 3.2 — CSS Theme System

This is the lever that gives you instant dark/light mode:

```css
:root {
  --bg: #0c0c0e;
  --fg: #ffffff;
  --accent: #d4a843;       /* YOUR accent color */
  --muted: #888;
  --faint: #333;
  --border: #1a1a1a;
  --card-bg: #111113;
  --radius: 12px;
}
[data-theme="light"] {
  --bg: #f5f4f0;
  --fg: #0c0c0e;
  --accent: #b8892e;
  --muted: #666;
  --faint: #ccc;
  --border: #ddd;
  --card-bg: #ffffff;
}
```

### 3.3 — Navigation (Sticky + Mobile Hamburger)

Key features we built:
- Logo swaps between white/black based on theme
- Hamburger menu on mobile (< 768px)
- Theme toggle button (sun/moon icon)
- CTA button in nav

### 3.4 — Hero Section

```html
<section class="hero" id="hero">
  <video class="hero-video" autoplay muted loop playsinline preload="none" id="hero-vid"></video>
  <h1>[Big tagline]</h1>
  <p class="hero-sub">[Subtitle]</p>
  <div class="hero-ctas">
    <a href="[luma-link]" class="btn-primary">CTA 1</a>
    <a href="#section" class="btn-secondary">CTA 2</a>
  </div>
</section>
```

**Important:** Video only loads on desktop (saves mobile bandwidth):
```js
if (window.innerWidth > 768) {
  const v = document.getElementById('hero-vid');
  if (v) { v.src = 'assets/bg-video.mp4'; v.load(); }
}
```

### 3.5 — Sections We Built (Pick What Applies)

| Section | Purpose | Keep for raphatb? |
|---------|---------|-------------------|
| **Stats bar** | 3 key metrics (editions, speakers, attendees) | Adapt (projects shipped, clients, etc.) |
| **About / Features** | 3-column grid explaining what you do | Yes |
| **Video embed** | YouTube/Vimeo section | Optional |
| **Testimonials** | Quotes from community/clients with photos | Yes — social proof |
| **Past work / Editions** | Detailed project recaps with speakers | Adapt to portfolio/projects |
| **Photo gallery** | Lightbox with WebP thumbnails + full-res | If you have event/project photos |
| **Partners strip** | Scrolling logo bar ("Ils nous ont fait confiance") | Yes — client logos |
| **Partners section** | Full grid of partner logos | Yes |
| **Email capture** | Newsletter signup → Luma/Mailchimp/etc. | Yes |
| **Footer** | Logo + social links | Yes |
| **Sticky mobile CTA** | Bottom bar appears after scroll | Yes — drives conversions |

### 3.6 — Photo Gallery (Lightbox)

We built a custom lightbox — click thumbnail → full-res overlay with arrows. Uses both `.jpg` and `.webp` for performance:

```html
<img src="assets/photos/photo-1.webp"           <!-- thumbnail (tiny) -->
     onclick="openLightbox('assets/photos/full/photo-1.jpg')"  <!-- full-res -->
/>
```

### 3.7 — Partners / Clients Section

Two versions we use:
1. **Strip** (horizontal scroll near hero) — "Ils nous ont fait confiance"
2. **Grid** (full section at bottom) — "Nos partenaires"

Adding a new partner is one line:
```html
<a href="https://company.com/" target="_blank" rel="noopener">
  <img src="assets/logos/company.png" alt="Company" />
</a>
```

Logo tips:
- SVG preferred (scales perfectly)
- PNG with transparent background works too
- Use CSS classes for theme adaptation:
  - Default: `filter: brightness(0) invert(1)` (makes any logo white in dark mode)
  - `.logo-white` — already white, just reduce opacity
  - `.logo-color` — keep original colors but desaturate
  - `.logo-invert` — invert colors

---

## Step 4: Deployment Pipeline (10 min)

### 4.1 — wrangler.toml

```toml
name = "raphatb"
compatibility_date = "2026-03-25"

[env.production]
name = "raphatb"
```

### 4.2 — GitHub Actions (`.github/workflows/deploy.yml`)

```yaml
name: Deploy
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          command: pages deploy . --project-name=raphatb
```

### 4.3 — Cloudflare Setup

1. Go to Cloudflare Dashboard → Pages → Create Project
2. Connect to GitHub repo OR use direct upload
3. Project name: `raphatb`
4. Add secrets to GitHub: `CLOUDFLARE_API_TOKEN` + `CLOUDFLARE_ACCOUNT_ID`
5. Custom domain: Add `raphatb.com` in Pages → Custom Domains

**That's it.** Every `git push` to `main` = live site in ~30 seconds.

---

## Step 5: Email Capture (Serverless Function)

### `functions/api/subscribe.js`

```js
export async function onRequestPost(context) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  const { email } = await context.request.json();

  if (!email || !email.includes('@')) {
    return new Response(JSON.stringify({ error: 'Invalid email' }), {
      status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }

  // Replace with YOUR integration (Luma, Mailchimp, Resend, etc.)
  const res = await fetch('https://api.lu.ma/public/v1/calendar/import-people', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-luma-api-key': context.env.LUMA_API_KEY,
    },
    body: JSON.stringify({
      calendar_api_id: 'YOUR_CALENDAR_ID',
      people: [{ email, role: 'guest' }],
    }),
  });

  if (!res.ok) {
    return new Response(JSON.stringify({ error: 'API error' }), {
      status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }

  return new Response(JSON.stringify({ ok: true }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
  });
}
```

---

## Step 6: Carousel Generator (The Secret Weapon)

This is the system that generates branded Instagram/LinkedIn slides from HTML.

### 6.1 — Install Puppeteer

```json
{
  "dependencies": {
    "puppeteer": "^24.40.0"
  }
}
```

### 6.2 — `generate-carousels.js`

Uses Puppeteer to:
1. Open `carousel.html` in headless Chrome
2. Screenshot each slide at exact dimensions
3. Save as PNG to `carousels/instagram/` and `carousels/linkedin/`

Formats:
- Instagram: 1080×1080px
- LinkedIn: 1080×1350px

### 6.3 — `carousel.html`

A full HTML slide editor. Each slide is a `<div>` with:
- Brand colors (black + gold)
- Consistent typography (Space Grotesk)
- Logo watermark
- Footer bar with metadata

**Slide types we built:**
- Hook (attention-grabbing opener)
- Project spotlight (logo + title + bullets)
- Quote (speaker photo + quote text)
- Insight (key takeaway + visual)
- CTA (call-to-action closer)

To generate:
```bash
npm install
node generate-carousels.js
```

---

## Step 7: CLAUDE.md (The Brain)

This is the most important file. It tells Claude who you are, how you talk, and what to build. Here's the structure — **adapt every section for raphatb:**

```markdown
# CLAUDE.md

## Role
You are Rapha's personal website and content assistant for raphatb.com.

## About Rapha
- Name, handle, companies, location
- Background story
- What makes you different

## Voice & Tone
- Core traits (casual? professional? franglais?)
- Catchphrases
- Emoji usage rules
- Never-do list

## Website
- Live URL
- Sections and their purpose
- Design system (colors, fonts, spacing)

## Content Strategy
- Content pillars
- Posting cadence
- What's worked before

## Working Preferences
- Git workflow (push from website/ directory)
- Photo policies
- API keys in .env
```

**This is the lever.** Every future Claude Code session reads this file and stays on-brand automatically. No re-explaining. No drift.

---

## Step 8: Performance Optimizations We Applied

| Optimization | How |
|---|---|
| **WebP images** | Convert all photos to .webp (80%+ smaller than JPEG) |
| **Lazy video** | Hero video only loads on desktop (>768px) |
| **Preconnect fonts** | `<link rel="preconnect" href="https://fonts.googleapis.com" />` |
| **SVG logos** | Vector = tiny file size + infinite scale |
| **No framework** | Zero JS bundle overhead. Vanilla everything. |
| **Cloudflare CDN** | Global edge caching, free SSL, HTTP/3 |

---

## Step 9: Bilingual Support (Optional)

We built `/en/index.html` as a full English mirror. Same structure, translated copy, relative asset paths (`../assets/...`). If you want this:

1. Copy `index.html` to `en/index.html`
2. Translate all text
3. Update OG tags to point to `/en/` URL
4. Add language switcher link in nav

---

## Step 10: Google Search Console (In Progress)

MCP server for direct Claude Code access to GSC data:

```bash
claude mcp add google-search-console \
  -e GSC_OAUTH_CLIENT_FILE=/path/to/oauth-client.json \
  -- npx -y mcp-server-google-search-console
```

Gives you: search analytics, indexing status, sitemap management, URL inspection — all queryable from Claude Code.

---

## The Workflow (How We Actually Work)

This is the daily loop that makes it fast:

```
1. Open Claude Code in ~/Desktop/raphatb/website/
2. Tell Claude what you want ("add a testimonial from X", "new partner logo", "update the hero")
3. Claude reads the code, makes the edit
4. You say "git push" → Claude commits + pushes
5. Live in 30 seconds on Cloudflare
```

**That's it.** No Figma. No staging. No PR reviews. Just talk → code → push → live.

---

## Quick Reference: Commands We Use Constantly

```bash
# Push changes live
git add [files] && git commit -m "message" && git push

# Generate carousel PNGs
node generate-carousels.js

# Add a new MCP server
claude mcp add [name] -- npx -y [package]

# Compress a video for hero background
ffmpeg -i input.mp4 -vf scale=1920:-2 -c:v libx264 -crf 28 -preset slow -an assets/bg-video.mp4

# Convert images to WebP
for f in *.jpg; do cwebp -q 80 "$f" -o "${f%.jpg}.webp"; done

# Download a partner logo
curl -sL -o assets/logos/company.png "https://company.com/logo.png"
```

---

## Estimated Time to Recreate

| Phase | Time |
|-------|------|
| Repo + Cloudflare setup | 10 min |
| index.html (scaffold + all sections) | 30-45 min with Claude |
| CLAUDE.md (brand bible) | 15 min |
| Logo + assets gathering | 15 min |
| Deploy pipeline | 5 min |
| Email capture function | 5 min |
| Carousel generator | 10 min (copy + adapt) |
| **Total** | **~90 min** |

---

## TL;DR — The Levers That Made This Fast

1. **Single HTML file** — no framework, no build, no complexity
2. **CSS variables** — instant dark/light theming
3. **Cloudflare Pages + GitHub Actions** — `git push` = live
4. **CLAUDE.md** — Claude knows your brand, voice, and rules permanently
5. **Partner logos as one-liners** — adding a company is copy-paste
6. **Carousel HTML generator** — branded slides without Canva
7. **Serverless email capture** — Cloudflare Workers, zero infrastructure
8. **WebP + lazy loading** — fast without trying

---

*Generated from the AI Geeks website build process. Ready to fork for raphatb.com.*


Videos: 
Linkedin: 
https://www.linkedin.com/in/raphatb/

Notion presentations - Waterloo:
https://www.youtube.com/watch?v=CGxoRasRJrs

Cloudflare: 
https://www.cloudflare.com/zh-tw/innovator-spotlights/

Notion Marketplace:
https://www.notion.com/@leverageos