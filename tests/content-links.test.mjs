import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';

const root = new URL('../src/content/', import.meta.url);
const collections = ['comparisons', 'guides', 'reviews', 'gear'];

test('article comparison links resolve to the published /compare/ collection', () => {
  const failures = [];
  let checked = 0;
  for (const collection of collections) {
    const directory = new URL(`${collection}/`, root);
    for (const file of fs.readdirSync(directory).filter((name) => name.endsWith('.md'))) {
      const content = fs.readFileSync(new URL(file, directory), 'utf8');
      // Current articles mix raw HTML anchors and Markdown links. Do not scan
      // arbitrary prose or JavaScript strings as if they were rendered links.
      const targets = [
        ...content.matchAll(/\bhref\s*=\s*["']([^"']+)["']/g),
        ...content.matchAll(/\[[^\]]*\]\(([^\s)]+)(?:\s+[^)]*)?\)/g),
      ];
      for (const match of targets) {
        const url = new URL(match[1], 'https://fieldservicestack.com');
        if (url.origin !== 'https://fieldservicestack.com') continue;
        if (url.pathname.startsWith('/comparisons/')) {
          failures.push(`${collection}/${file}: unpublished route ${url.pathname}`);
        } else if (url.pathname.startsWith('/compare/')) {
          checked++;
          const slug = url.pathname.replace(/^\/compare\//, '').replace(/\/$/, '');
          if (!slug) continue; // Collection index.
          const target = new URL(`comparisons/${slug}.md`, root);
          if (!fs.existsSync(target) || /^draft:\s*true\s*$/m.test(fs.readFileSync(target, 'utf8'))) {
            failures.push(`${collection}/${file}: missing published comparison ${url.pathname}`);
          }
        }
      }
    }
  }
  assert.ok(checked > 0, 'expected to check comparison article links');
  assert.deepEqual(failures, [], failures.join('\n'));
});
