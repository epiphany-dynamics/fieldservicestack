#!/usr/bin/env node
/**
 * Postbuild: make every 301 redirect route emitted by @astrojs/vercel match the
 * trailing-slash form of its source as well.
 *
 * Why this exists: Astro strips a trailing slash off a `redirects` key, so declaring
 * both '/tag/crm' and '/tag/crm/' in astro.config.mjs produces two identical exact-match
 * routes (`^/tag/crm$`) and the trailing-slash request still falls through to the 404
 * route. The dead WordPress URLs Google Search Console reports for this site are almost
 * all trailing-slash forms, so they have to be covered explicitly.
 *
 * This rewrites .vercel/output/static's sibling config.json in place, before Vercel
 * consumes the Build Output API directory. It is additive and idempotent.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const configPath = path.join(root, '.vercel', 'output', 'config.json');

const config = JSON.parse(readFileSync(configPath, 'utf8'));
const routes = Array.isArray(config.routes) ? config.routes : [];

const seen = new Set(routes.map((route) => route.src).filter(Boolean));
const expanded = [];
let added = 0;

for (const route of routes) {
  expanded.push(route);
  if (route.status !== 301 || typeof route.src !== 'string') continue;
  if (!route.src.endsWith('$') || route.src.endsWith('/$')) continue;

  const slashSrc = `${route.src.slice(0, -1)}/$`;
  if (seen.has(slashSrc)) continue;

  seen.add(slashSrc);
  expanded.push({ ...route, src: slashSrc });
  added += 1;
}

config.routes = expanded;
writeFileSync(configPath, `${JSON.stringify(config, null, 2)}\n`);
console.log(`[trailing-slash-redirects] added ${added} trailing-slash 301 route(s)`);
