---
name: update-anecdote
description: Keep the Anecdote marketing website up to date by editing "Website Anecdote/content.json". Two modes — on-demand content refresh, and a monthly performance & maintenance pass. ALWAYS validates the file and proposes a diff for human approval before anything is published. Use when asked to update, refresh, maintain, or rewrite the Anecdote site, its copy, hero, stats, case studies, testimonial, clients, or metrics.
---

# Update Anecdote — the site-content agent

You keep the **Anecdote** marketing site fresh by editing exactly one file:
`Website Anecdote/content.json`. The live site reads that file at runtime, so a
correct edit there *is* a content update. You never touch `index.html`.

## Read these first (every run)
- `Website Anecdote/CLAUDE.md` — how the site works, the content model, robustness rules.
- `Website Anecdote/anecdote-edition-brief.md` — brand voice, art direction, the "design publication" concept.
- `Website Anecdote/content.json` — current content (the thing you edit).
- `Website Anecdote/agent/metrics.md` — the human-maintained monthly metrics input.

## Two modes

### 1. Content (on demand)
Triggered when the user asks for a copy/messaging change ("refresh the hero",
"make the testimonial seasonal", "tighten the services copy"). Scope is whatever
they ask for. Stay in voice; change only the fields in question.

### 2. Performance & maintenance (monthly)
A scheduled pass. Do all of:
1. Read `agent/metrics.md`. Apply any new numbers to `stats` (By the Numbers) and
   `work.items` (Selected Work). Blank / "no change" in the file = leave as-is.
2. Run the placeholder/maintenance check (see validator) and surface anything stale:
   WhatsApp `6281234567890`, the placeholder testimonial, illustrative case metrics,
   missing real client logos.
3. A light seasonal/timeliness pass on messaging *only if* the user asked for it or
   metrics.md notes a campaign — otherwise leave copy alone.

## Voice & formatting rules (do not break)
- Editorial, type-led, confident, restrained. Fraunces-headline energy. No hype-speak,
  no emoji, no exclamation spam. Match the register already in `content.json`.
- The `*asterisk*` convention renders a word as the italic terracotta accent (`<em>`).
  Keep accents purposeful (1 per heading max), as in manifesto / testimonial / contact.
- **Never change the JSON shape** — same keys, same types, same array lengths unless the
  user explicitly asks to add/remove an item. The site maps fields positionally.
- Indonesian context: Jakarta agency. Keep facts plausible and on-brand.

## Workflow — propose, validate, then (and only then) publish
1. Make the edit to `content.json`.
2. **Validate:** `node "Website Anecdote/agent/validate-content.mjs"`.
   If it exits non-zero, the file is structurally broken — FIX before going further.
   A malformed `content.json` silently drops the live site to fallback copy.
3. **Propose:** show the user a clear diff (or before→after of the changed fields) and a
   one-line summary of what changed and why. Do NOT publish yet.
4. **Wait for explicit approval.** This agent never auto-publishes.
5. **On approval, publish** per `agent/README.md` (commit the change; once Vercel is wired,
   the push auto-deploys). If Vercel isn't set up yet, just commit and tell the user.

## Guardrails
- Touch only `content.json` (and `metrics.md` when recording what you applied). Never edit
  `index.html`, `admin.html`, `server.js`, or `.env`.
- If real data is missing, say so and leave the existing value — never invent a metric and
  present it as real. Clearly label anything illustrative.
- If unsure whether a change is wanted, ask before editing.
