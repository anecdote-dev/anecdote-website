# Anecdote — Monthly Metrics Input

The **monthly performance & maintenance** pass of the update agent reads this file.
Update the numbers, save, then run the agent (or let the scheduled run pick it up).
Leave a "New value" blank or write `no change` to keep what's on the site.

_Last updated: 2026-06-22 by the update agent (monthly maintenance pass)_

---

## By the Numbers  → `content.json` `stats` (section 04)

| Metric          | Current on site | New value |
|-----------------|-----------------|-----------|
| Campaigns       | 150+            |           |
| Clients         | 50+             |           |
| Years           | 5+              |           |
| Service Pillars | 3               |           |

## Selected Work  → `content.json` `work.items` (section 03)

Real case-study figures. The four currently on the site are **illustrative** — replace
with real ones when you have them. Format: Sector — Metric — one-line note.

1. Health & Beauty — `+312%` — Return on ad spend, delivered in the first 90 days.
2. Food & Beverage — `4.2M` — Organic reach from a single, tightly art-directed campaign.
3. Property — `−47%` — Cost-per-lead, cut while volume climbed.
4. Retail — `72h` — From launch to sold-out — momentum, engineered.

> Edit the values above with real figures, or add a 5th line if you want another card.

## Maintenance checklist (the agent will flag these too)

- [x] **WhatsApp number** (`contact.whatsapp`) — set to the real number `6281717580096`. ✓ done
- [ ] **Testimonial** (`testimonial`) — still a placeholder; real attributed client quote?
- [ ] **New clients** to add to the logo wall (`clients[]`)?
- [ ] **Seasonal / campaign messaging** to reflect this month? (note it here if so)

## Live data source — phase 2

Once connected, some of the above can pull automatically instead of by hand. Candidates:
- Meta Ads / Google Analytics (GA4) for campaign + reach figures.
- A Google Sheet you maintain (simplest live source).

Until a live source is wired up, **this file is the source of truth** for the monthly pass.
