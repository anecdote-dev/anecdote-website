#!/usr/bin/env node
// Validates ../content.json before it is published.
//   exit 0  -> structure OK (warnings are allowed)
//   exit 1  -> structural error: do NOT publish (the live site would fall back to default copy)
// Zero dependencies. Run: node "website/agent/validate-content.mjs"

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const file = join(here, '..', 'content.json');

const errors = [];
const warnings = [];
const req = (cond, msg) => { if (!cond) errors.push(msg); };
const warn = (cond, msg) => { if (cond) warnings.push(msg); };

let data;
try {
  data = JSON.parse(readFileSync(file, 'utf8'));
} catch (e) {
  console.error('✗ content.json is not valid JSON — the live site would fall back to default copy.');
  console.error('  ' + e.message);
  process.exit(1);
}

// ---- top-level keys ----
for (const k of ['hero', 'marquee', 'manifesto', 'services', 'work', 'stats', 'process', 'clients', 'testimonial', 'contact', 'footer']) {
  req(k in data, `missing top-level key: ${k}`);
}

// ---- hero ----
if (data.hero) {
  for (const k of ['line1', 'line2', 'line3', 'deck']) req(typeof data.hero[k] === 'string', `hero.${k} must be a string`);
  req(Array.isArray(data.hero.stats), 'hero.stats must be an array');
}

// ---- services ----
req(Array.isArray(data.services?.items), 'services.items must be an array');
(data.services?.items || []).forEach((s, i) => {
  req(typeof s.title === 'string', `services.items[${i}].title must be a string`);
  req(Array.isArray(s.list), `services.items[${i}].list must be an array`);
});

// ---- work (case studies) ----
req(Array.isArray(data.work?.items), 'work.items must be an array');
(data.work?.items || []).forEach((w, i) => {
  for (const k of ['sector', 'metric', 'note']) req(typeof w[k] === 'string', `work.items[${i}].${k} must be a string`);
});

// ---- stats (By the Numbers) ----
req(Array.isArray(data.stats), 'stats must be an array');
(data.stats || []).forEach((s, i) => {
  req(typeof s.count === 'number', `stats[${i}].count must be a number`);
  req(typeof s.label === 'string', `stats[${i}].label must be a string`);
});

// ---- process / clients / contact ----
req(Array.isArray(data.process?.items), 'process.items must be an array');
req(Array.isArray(data.clients), 'clients must be an array');
if (data.contact) {
  req(typeof data.contact.email === 'string', 'contact.email must be a string');
  req(typeof data.contact.whatsapp === 'string', 'contact.whatsapp must be a string');
  warn(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.contact.email || ''), 'contact.email does not look like a valid email');
}

// ---- maintenance warnings (not fatal, but the monthly pass should resolve these) ----
warn((data.contact?.whatsapp || '').replace(/\D/g, '') === '6281234567890', 'contact.whatsapp is still the placeholder number (6281234567890)');
warn(/placeholder/i.test(data.testimonial?.note || ''), 'testimonial is still marked as a placeholder — swap for a real attributed quote');

// ---- report ----
for (const w of warnings) console.log('⚠  ' + w);
if (errors.length) {
  for (const e of errors) console.error('✗  ' + e);
  console.error(`\n✗ content.json failed validation (${errors.length} error${errors.length > 1 ? 's' : ''}). Do not publish.`);
  process.exit(1);
}
console.log(`\n✓ content.json is structurally valid${warnings.length ? ` (${warnings.length} maintenance warning${warnings.length > 1 ? 's' : ''})` : ''}.`);
process.exit(0);
