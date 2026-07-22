#!/usr/bin/env node
/**
 * Regenerates public/llms.txt from live content collections so it never goes stale.
 * Wired into `prebuild` — runs automatically before every `astro build`.
 *
 * Header (site description, ownership, core pages) is curated here.
 * Article lists are generated from src/content/{reviews,comparisons,guides,gear}.
 */
import { readdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const contentRoot = join(root, 'src/content');
const outPath = join(root, 'public/llms.txt');
const SITE = 'https://fieldservicestack.com';

/** @type {{ dir: string, section: string, urlPath: string }[]} */
const COLLECTIONS = [
  { dir: 'reviews', section: 'Reviews', urlPath: 'reviews' },
  { dir: 'comparisons', section: 'Comparisons', urlPath: 'compare' },
  { dir: 'guides', section: 'Guides', urlPath: 'guides' },
  { dir: 'gear', section: 'Gear', urlPath: 'gear' },
];

/**
 * Minimal frontmatter parser (no gray-matter dependency).
 * Handles scalar title/description/date/draft fields used by this site.
 * @param {string} raw
 */
function parseFrontmatter(raw) {
  if (!raw.startsWith('---')) return { data: {}, body: raw };
  const end = raw.indexOf('\n---', 3);
  if (end === -1) return { data: {}, body: raw };
  const fm = raw.slice(3, end).trim();
  const body = raw.slice(end + 4);
  /** @type {Record<string, string | boolean>} */
  const data = {};
  for (const line of fm.split('\n')) {
    const m = line.match(/^([A-Za-z][A-Za-z0-9_]*)\s*:\s*(.*)$/);
    if (!m) continue;
    const key = m[1];
    let val = m[2].trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    if (val === 'true') data[key] = true;
    else if (val === 'false') data[key] = false;
    else data[key] = val;
  }
  return { data, body };
}

const truncate = (s, n) => (s.length > n ? `${s.slice(0, n - 1).trimEnd()}...` : s);

/**
 * @param {string} dirName
 * @param {string} urlPath
 */
function loadPosts(dirName, urlPath) {
  const dir = join(contentRoot, dirName);
  if (!existsSync(dir)) return [];
  const posts = [];
  for (const file of readdirSync(dir).filter((f) => f.endsWith('.md'))) {
    const raw = readFileSync(join(dir, file), 'utf8');
    const { data } = parseFrontmatter(raw);
    if (data.draft === true || data.published === false) continue;
    const slug = file.replace(/\.md$/, '');
    // Skip obvious scaffolding leftovers
    if (slug === 'test-post' || slug === 'test-article') continue;
    const title = String(data.title || slug).trim();
    const description = String(data.description || data.excerpt || '')
      .replace(/\s+/g, ' ')
      .trim();
    const dateRaw = data.date || data.pubDate || data.updated;
    const date = dateRaw ? new Date(String(dateRaw)) : new Date(0);
    posts.push({
      title,
      description,
      date: Number.isNaN(date.getTime()) ? new Date(0) : date,
      url: `${SITE}/${urlPath}/${slug}/`,
    });
  }
  posts.sort((a, b) => b.date - a.date);
  return posts;
}

const bySection = COLLECTIONS.map((c) => ({
  ...c,
  posts: loadPosts(c.dir, c.urlPath),
}));
const totalPosts = bySection.reduce((n, s) => n + s.posts.length, 0);

const header = `# Field Service Stack

> Independent software reviews, head-to-head comparisons, buyer's guides, and gear recommendations for field service professionals. Written from the perspective of someone who has worked in the field. No pay-to-play rankings.

Field Service Stack helps HVAC contractors, plumbers, electricians, landscapers, pest control operators, and other home-service businesses choose the right field service management software and job-site gear. Every piece is independent of affiliate bias steering the conclusion.

## Ownership

- Owned by: Epiphany Dynamics (Wikidata: Q139569923, https://epiphanydynamics.ai)
- Author: Patrick Gibbs (Wikidata: Q139572015)

## Core Pages

- [Home](${SITE}/): Latest reviews, comparisons, and guides
- [Reviews](${SITE}/reviews/): Full-length, scored reviews of field service management software
- [Comparisons](${SITE}/compare/): Side-by-side breakdowns of competing tools
- [Guides](${SITE}/guides/): Buyer's guides organized by trade and company size
- [Gear](${SITE}/gear/): Reviews of physical tools and job-site equipment
- [About](${SITE}/about/): Who writes Field Service Stack and how reviews work
- [Search feed](${SITE}/rss.xml): RSS for new posts
`;

let body = '';
for (const section of bySection) {
  body += `\n## ${section.section} (${section.posts.length})\n\n`;
  if (section.posts.length === 0) {
    body += `_No published ${section.section.toLowerCase()} yet._\n`;
    continue;
  }
  body += section.posts
    .map((p) => {
      const desc = p.description ? `: ${truncate(p.description, 160)}` : '';
      return `- [${p.title}](${p.url})${desc}`;
    })
    .join('\n');
  body += '\n';
}

const footer = `
## Audience

HVAC contractors, plumbers, electricians, landscapers, pest control operators, general service businesses, and any trade or home-services company evaluating software or equipment.

## Contact

- Website: ${SITE}
- Publisher: https://epiphanydynamics.ai
- Owner Wikidata: https://www.wikidata.org/wiki/Q139569923
- Author Wikidata: https://www.wikidata.org/wiki/Q139572015
`;

writeFileSync(outPath, `${header}${body}${footer}`);
console.log(
  `[gen-llms-txt] Wrote ${outPath} — ${totalPosts} published posts across ${bySection.length} collections.`,
);
