# The Anecdote update agent

Keeps the marketing site current by editing **one file** — `../content.json` — which the
live site reads at runtime. Nothing here touches `index.html`.

## Pieces

| File | Role |
|---|---|
| `../../.claude/skills/update-anecdote/SKILL.md` | The agent's instructions (modes, voice rules, guardrails, propose-then-publish flow). |
| `validate-content.mjs` | Zero-dep structural check of `content.json`. Run before every publish. |
| `metrics.md` | The human-maintained monthly metrics input (the "file in repo" data source). |

## How updates happen

- **Content (on demand):** ask the agent — e.g. *"refresh the hero deck"* or run the
  `/update-anecdote` skill. It edits `content.json`, validates, and shows you a diff.
- **Performance & maintenance (monthly):** a scheduled run reads `metrics.md`, applies new
  numbers, flags stale placeholders, and shows you a diff.
- **Approval, always:** the agent never auto-publishes. You review the diff first.

## Validate (manual)

```bash
node "Website Anecdote/agent/validate-content.mjs"
```

Exit 0 = safe to publish (warnings OK). Exit 1 = structural error — do **not** publish; a
malformed `content.json` silently drops the live site to its built-in fallback copy.

## Publish (after you approve)

1. `node "Website Anecdote/agent/validate-content.mjs"`  → must pass.
2. Commit the change to `content.json`.
3. Once Vercel is connected to this repo, the push auto-deploys. *(Vercel setup pending.)*

## Live data source — phase 2

`metrics.md` is the source of truth today. Later we can wire a live source (Meta Ads, GA4,
or a Google Sheet) so the monthly numbers pull automatically. See the bottom of `metrics.md`.
