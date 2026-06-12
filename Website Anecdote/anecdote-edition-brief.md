# ANECDOTE — "THE EDITION" · Website Build Brief

> An editorial, type-led, motion-rich single-page site for **PT. Anecdote Marketing Indonesia**.
> The agency presented as a design *publication* — numbered chapters, oversized expressive typography, a warm neutral palette, and a digital 3D centerpiece.

---

## 0. CONCEPT — "The Anecdote Edition"

Anecdote means *a short story*. The site is built like an issue of a design magazine: a masthead, a volume line, numbered chapters (01–08), running labels, generous negative space, and typography doing the heavy lifting. Motion is cinematic but restrained; the one 3D element reads as *digital*, not decorative.

**Mood words:** editorial, type-led, neutral, considered, tactile, quietly futuristic.

---

## 1. TECH STACK (Mandatory — reliability first)

No WordPress, Wix, Squarespace, or any page-builder / CMS-generated markup. Hand-authored, code-first.

| Layer | Tool | Purpose |
|---|---|---|
| Markup | Semantic HTML5 | Structure, accessibility, SEO |
| Styling | Custom CSS (variables, layers, container queries) | Full control, no Tailwind/Bootstrap |
| 3D centerpiece + particles | **Three.js** (r160, CDN/ESM) | Data-sphere point cloud, wireframe shell, drifting motes, custom shaders |
| Scroll | **Lenis** smooth scroll | Buttery, weighted inertia scrolling |
| Motion choreography | **GSAP 3 + ScrollTrigger** | Reveals, pinning, scrubbed scroll, counters |
| Text effects | **SplitType** | Word/line splitting for kinetic type |
| Fonts | Google Fonts (Fraunces, Archivo) | Typography only |

**Delivery:** a single self-contained `index.html` (CSS + JS embedded, logo embedded as a base64 data URI) that runs from a folder with no build step. All 3D is lazy and non-blocking.

**Fallbacks (must-have):**
- No-WebGL → 3D skipped, a static CSS gradient stands in; page fully functional.
- `prefers-reduced-motion` → Lenis off, 3D frozen, scrubbed/looping animations replaced with simple opacity; all content visible and reachable.
- A ~4s watchdog reveals all content and hides the preloader if a CDN module fails to load, so the page is never stuck on a blank/preloader screen.

> **Build note from experience:** all enhancement JS lives in one ES module. A single error (e.g. a duplicate `const`) takes the whole module down, so animations vanish silently — keep variable scopes clean and syntax-check before shipping.

---

## 2. ART DIRECTION — Neutral / Editorial

**Palette (warm, muted, light — not dark, not neon)**

```
--paper:   #EAE5DC   /* warm bone base */
--paper-2: #E1DACE   /* hover/panel wash */
--card:    #E6E0D5   /* work cards */
--ink:     #191713   /* near-black warm ink (type) */
--ink-2:   #46423A   /* secondary text */
--stone:   #8C857A   /* muted grey-taupe labels */
--clay:    #B26B3F   /* the single warm accent — terracotta */
--line:    rgba(25,23,19,.16)
```

Background is a soft paper gradient. Texture: a whisper of film grain (~7%, multiply blend) for a printed feel.

**Typography**
- Display: **Fraunces** (high-contrast variable serif) — huge, tight leading, italic for emphasis words (set in terracotta).
- UI / labels / meta / body: **Archivo** — uppercase, generous letter-spacing on small labels.
- Type *is* the layout: oversized headlines that break across lines, chapter numerals, small-caps labels, hairline rules.

---

## 3. SITE STRUCTURE & COPY (as built)

### Masthead / Nav (sticky)
- Left: **ANECDOTE wordmark** (the real brand logo, with the lightbulb glyph — embedded, ink-tinted for the light background).
- Center: INDEX · STUDIO · WORK · PROCESS · CONTACT (Archivo, uppercase).
- Right: **Start a Project** (terracotta pill, fills on hover, magnetic).
- Transparent → frosted paper on scroll. Animated hamburger + full-screen menu on mobile.

### Preloader
"Anecdote" rises in letters with a terracotta load meter; caption *"An anecdote, in progress."* Irises away to the hero.

### Hero
- Volume line: `VOL. 01 — FULL-SERVICE DIGITAL MARKETING` · `JAKARTA · INDONESIA`.
- Headline (sized to fit one screen, three clean lines):
  > **We make brands**
  > ***impossible*** *(italic, terracotta)*
  > **to ignore.**
- Deck (Archivo): *Personalized, full-service digital marketing — engineered in Jakarta, felt everywhere. We turn attention into measurable growth.*
- CTAs: `See the Work →` (terracotta) · `What We Do` (outline). Foot row: `Est. 2019 / Studio`, `150+ / Campaigns`, `50+ / Brands`, animated **Scroll** cue.
- The **data-sphere** sits to the right; type renders above it.

### Marquee
Infinite ticker in Fraunces (italic words in terracotta): Meta Ads · Social · Branding · SEO · Content · E-commerce · Web · Influencer. Pauses on hover.

### 01 · Manifesto
Pinned, scrubbed word-by-word reveal:
> **Attention is the rarest thing on earth. We *capture* it, refine it, and hand it back to you as growth.**

### 02 · Capabilities — "What we do"
Editorial list-rows (not cards). Each row indents and italicizes (terracotta) on hover; service list expands.
- **01 — Digital Advertising** · *Performance, engineered.* — Meta Ads · SEM · SEO · E-commerce Advertising · Email
- **02 — Brand Communication** · *Stories that compound.* — Social Media · Photography · Video · Branding · Live Shopping
- **03 — Consulting & PR** · *Reputation as an asset.* — Influencer · ORM · Marketing Strategy

### 03 · Selected Work — "Proof, not promises."
Pinned **horizontal** scroll gallery (the card stage alone is pinned, so each card's metric stays on screen). Cards:
- *Health & Beauty —* **+312%** *ROAS, first 90 days*
- *Food & Beverage —* **4.2M** *organic reach, single campaign*
- *Property —* **−47%** *cost-per-lead, volume up*
- *Retail —* **72h** *launch to sold-out*

### 04 · By the Numbers
Count-up on entry (each stamps into place): **150+** Campaigns · **50+** Clients · **5+** Years · **3** Service Pillars.

### 05 · Process — "From raw to refined."
Two-column editorial steps; active step highlights as you scroll: **Extract → Define → Build → Refine.**

### 06 · Trusted By — "Brands that trust us."
Two opposing infinite marquees of monograms (grayscale → ink + terracotta border on hover): CDR Bayer · Redoxon · Polytron · UOB Bank + curated placeholders.

### 07 · In Their Words
One large Fraunces-italic pull-quote (terracotta emphasis), slow fade + scale.
*Currently a clearly-marked placeholder — swap for a real attributed client quote.*

### 08 · Contact — "Ready to grow?"
Editorial big-link rows that indent + italicize on hover:
- **hello@anecdote.id** — *Email*
- **Chat with us** — *WhatsApp* (`wa.me`)
- Instagram: **@anecdote.id**

### Footer / Colophon
Logo + *"Crafted, not templated."*, an Index column, a Studio column (address, email, Instagram), © year, `Vol. 01 — Jakarta`.

---

## 4. 3D SPECIFICATION — the "Data Sphere"

A digital, futuristic centerpiece (replaces earlier rock/knot/chrome concepts).

- **Point cloud:** ~9,500 points (≈3,800 on mobile) distributed on a Fibonacci sphere, displaced by layered simplex noise so it breathes; points tinted **ink → terracotta**; soft round alpha; size attenuates with depth.
- **Wireframe shell:** a faint dark wireframe icosahedron just outside the points — reads as a network/structure.
- **Behavior:** continuous slow tumble, cursor-reactive lean, and it rotates + drifts upward as you scroll past the hero. Positioned right of the headline on desktop, centered on mobile.
- **Ambient motes:** a sparse field of faint stone-grey particles drifting upward with light cursor repulsion (normal blend so they read on the light background).

**Performance:** pixel ratio capped ~1.5; counts reduced on mobile; render paused when the tab is hidden.

---

## 5. MOTION & INTERACTION

- **Smooth scroll:** Lenis with duration-based easing (~1.25s, ease-out quartic) for a weighted glide; ScrollTrigger synced to it.
- **Hero:** line-by-line clip reveal (translateY out of overflow).
- **Manifesto:** pinned, word opacity scrubbed to scroll.
- **Work:** pinned horizontal travel of the card track.
- **Stats:** count-up with a small scale-overshoot ("stamp").
- **Process:** active-step background highlight via ScrollTrigger toggles.
- **Cursor (desktop):** a terracotta dot inside a thin ink ring; on interactive elements the ring expands and turns terracotta while the dot shrinks — both ease with lag (no harsh blend).
- **Buttons/links:** magnetic pull; service rows indent; work/service cards 3D-tilt toward the pointer.
- **Atmosphere:** infinite marquees, film grain, top scroll-progress bar (terracotta).
- **Easing:** `expo.out` / `cubic-bezier(.16,1,.3,1)`; durations 0.8–1.2s for reveals, 0.3–0.4s for hovers. One big orchestrated moment per section; let it breathe.

---

## 6. RESPONSIVE · ACCESSIBILITY · PERFORMANCE

- Mobile-first; breakpoints 768px and 1000/1200px. Service rows and process steps restack; horizontal gallery still pins; custom cursor and heavy 3D reduced on small/touch screens.
- Semantic landmarks, real heading order, ARIA on nav/menu, visible focus, keyboard-navigable; warm-ink-on-paper passes AA contrast.
- Lazy 3D, deferred non-critical JS, preconnected/preloaded fonts; interactive hero target ~2s; 3D never blocks first paint.

---

## 7. OUTSTANDING BEFORE LAUNCH

- Replace the **WhatsApp number** placeholder (`6281234567890`) and the **email** if different.
- Swap the **testimonial** for a real, attributed client quote.
- Confirm the **case-study metrics** are real figures (currently illustrative).
- Optional: real client logo images in place of the text monograms; full lockup (with tagline) in the footer.

---

## 8. DELIVERABLE

A single, well-commented, production-ready `index.html` that runs from a folder (no build step), 3D lazy-loaded with full fallbacks, logo embedded. Credible as an Awwwards / FWA submission and ready to deploy.

> **Standard:** if the typography doesn't carry the page on its own — and the motion doesn't feel weighted and intentional — it isn't done.
