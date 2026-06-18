# CLAUDE.md — Anecdote Website

Context for Claude Code. Read this before making changes.

## What this is
A single-page marketing website for **PT. Anecdote Marketing Indonesia** (anecdote.id), a full-service digital marketing agency in Jakarta. Design direction: **editorial / type-led, neutral-muted palette, lots of motion + one 3D object.** Concept = "the agency as a design publication" (numbered chapters, masthead, oversized Fraunces type).

## Files
- `index.html` — the entire website (self-contained: CSS + JS inline, logo embedded as base64). Reads text content from `content.json` at runtime, with a built-in fallback copy so it never breaks.
- `content.json` — all editable text/content for the site (hero, services, work, stats, process, clients, testimonial, contact, footer).
- `admin.html` — a standalone, no-dependency content editor. Edits the content and exports an updated `content.json`. Has no auth.
- `anecdote-edition-brief.md` — the full design/build brief (source of truth for intent).
- `anecdote-logo-ink.png` — the processed logo (already embedded in index.html as a data URI).

## Tech stack (keep it this way)
- Hand-authored **HTML5 + custom CSS + vanilla JS (ES module)**. No frameworks, no build step. **No WordPress / page builders.**
- 3D + motion: **three.js r160**, **GSAP 3 + ScrollTrigger**, **Lenis** (smooth scroll), **SplitType** — **vendored locally in `lib/`** (UMD builds loaded via `<script defer>` and referenced as globals; do NOT switch back to CDN ESM imports — that gated the preloader on a ~6s external fetch).
- Fonts via Google Fonts: **Fraunces** (display serif) + **Archivo** (UI/labels).
- Runs as a static site; deploy target is **Vercel** (static, no config needed).

## Design tokens (CSS variables in index.html :root)
- `--paper #EAE5DC`, `--paper-2 #E1DACE`, `--card #E6E0D5`
- `--ink #191713`, `--ink-2 #46423A`, `--stone #8C857A`
- `--clay #B26B3F` (the single accent — muted terracotta)
- Easing: `--ease cubic-bezier(.16,1,.3,1)`; prefer `expo.out`, slow-in settle, no bouncy easing.

## How content works
- `index.html` `fetch()`es `content.json` on load and injects text into the existing DOM (`applyContent`), falling back to an embedded `DEFAULT` object if the fetch fails (e.g. local `file://`).
- In text fields, wrap a word in `*asterisks*` to render it as the italic terracotta accent (`<em>`), used in manifesto / testimonial / contact heading.
- Edit content via `admin.html` → Download `content.json` → commit/redeploy. Don't hand-edit copy in `index.html`; edit `content.json` instead.

## The 3D object
A "data sphere": ~9,500 GPU points on a Fibonacci sphere with simplex-noise breathing, plus a faint wireframe icosahedron shell. Custom GLSL in `index.html`. Tinted ink→terracotta. Cursor-reactive, drifts up on scroll.

## Robustness rules (don't regress these)
- Everything must degrade gracefully: **no-WebGL** path (static fallback), **prefers-reduced-motion** path (animations off, content visible), and a **4-second watchdog** that reveals content + hides the preloader if a CDN module fails to load.
- All editable sections render from `content.json` *before* animations initialize. Keep that order (`loadContent().then(applyContent → boot)`).
- A duplicate `const` or any uncaught error in the module kills ALL animations (the whole script fails to parse). After edits, sanity-check the JS.

## Run / preview locally
- Don't just double-click `index.html` — `file://` blocks `content.json` (you'll see fallback text). Serve it:
  - `npx serve` (or `python3 -m http.server`) in this folder, then open the localhost URL.
- Admin: open `admin.html` the same way; "Import" to load an existing `content.json`.

## Deploy (Vercel)
- Static site, root = this folder. `index.html`, `content.json`, `admin.html` deploy together.
- Push to the connected GitHub repo → Vercel auto-redeploys. (`admin.html` would be public at `/admin.html` — consider keeping it local or adding a password gate.)

## Current placeholders to replace before launch
- WhatsApp number `6281234567890` (in `content.json` → `contact.whatsapp`)
- Testimonial quote + author (`content.json` → `testimonial`)
- Case-study figures (`content.json` → `work.items`) are illustrative.

## Possible next steps (where we left off)
- Add a password gate to `admin.html` (currently unauthenticated).
- Swap in real client logos (currently text monogram badges).
- Fill in real contact details, testimonial, and case metrics.
- Optional: add Bahasa Indonesia copy / language toggle.
