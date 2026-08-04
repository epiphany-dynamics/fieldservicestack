// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Build a map of URL pathname -> real content date, read straight off each post's
// frontmatter, so the sitemap can emit a genuine lastmod per post instead of build
// time. Collection dir name -> the URL segment its pages render under.
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const collectionUrlSegments = {
  reviews: 'reviews',
  comparisons: 'compare',
  guides: 'guides',
  gear: 'gear',
};

function parseFrontmatterDate(raw, key) {
  const match = raw.match(new RegExp(`^${key}:\\s*"?([0-9]{4}-[0-9]{2}-[0-9]{2})"?\\s*$`, 'm'));
  return match ? match[1] : null;
}

function buildLastmodMap() {
  /** @type {Map<string, string>} */
  const map = new Map();
  for (const [collectionDir, urlSegment] of Object.entries(collectionUrlSegments)) {
    const dir = path.join(__dirname, 'src', 'content', collectionDir);
    if (!fs.existsSync(dir)) continue;
    for (const file of fs.readdirSync(dir)) {
      if (!file.endsWith('.md')) continue;
      const slug = file.replace(/\.md$/, '');
      const raw = fs.readFileSync(path.join(dir, file), 'utf-8');
      const frontmatterMatch = raw.match(/^---\n([\s\S]*?)\n---/);
      if (!frontmatterMatch) continue;
      const frontmatter = frontmatterMatch[1];
      const updated = parseFrontmatterDate(frontmatter, 'updated');
      const date = parseFrontmatterDate(frontmatter, 'date');
      const lastmod = updated || date;
      if (lastmod) {
        map.set(`/${urlSegment}/${slug}/`, lastmod);
      }
    }
  }
  return map;
}

const lastmodByPath = buildLastmodMap();

// Permanent (301) redirects for dead WordPress-era URLs still reported by Google
// Search Console.
//
// Sources are written WITHOUT a trailing slash: Astro normalizes a trailing slash off
// the redirect key, so both forms would collapse to the same exact-match Vercel route
// (`^/tag/crm$`). The trailing-slash variant of every one of these routes is added
// after the build by scripts/add-trailing-slash-redirects.mjs, which runs as `postbuild`.
// Canonical live URLs on this site carry a trailing slash, so every target does too.
const legacyWordpressRedirects = {
    // Tool / gear content -> the exact live article where one exists, else the gear hub.
    '/tag/milwaukee-m18-vs-dewalt-20v-max': '/compare/dewalt-vs-milwaukee-impact-driver-comparison-2026/',
    '/milwaukee-m18-vs-dewalt-20v-max-impact-driver': '/compare/dewalt-vs-milwaukee-impact-driver-comparison-2026/',
    '/milwaukee-m18-impact-driver-review-2026': '/gear/milwaukee-m18-impact-driver-review/',
    '/milwaukee-m18-impact-driver-review': '/gear/milwaukee-m18-impact-driver-review/',
    '/tag/milwaukee-tools-review': '/gear/',
    '/tag/milwaukee-tools-review/feed': '/gear/',
    '/tag/best-impact-driver': '/gear/',
    '/tag/field-service-gear': '/gear/',
    '/category/gear': '/gear/',

    // Software comparisons -> the live comparison.
    '/jobber-vs-housecall-pro-2026': '/compare/jobber-vs-housecall-pro/',
    '/jobber-vs-housecall-pro': '/compare/jobber-vs-housecall-pro/',

    // Reviews -> the current live Jobber review.
    '/jobber-review-2025': '/reviews/jobber-review-2026/',

    // Buyer-intent guides -> the live buyer's guide, else the guides hub.
    '/best-field-service-software-2026': '/guides/field-service-management-buyers-guide/',
    '/category/uncategorized': '/guides/',
    '/tag/work-orders': '/guides/',
    '/tag/crm': '/guides/',

    // Stale about / contact variants. This site has no contact page, so contact
    // URLs land on /about/.
    '/about-field-service-stack': '/about/',
    '/contact': '/about/',
    '/contact-field-service-stack': '/about/',
};

export default defineConfig({
  site: 'https://fieldservicestack.com',
  redirects: {
    '/sitemap.xml': '/sitemap-index.xml',
    ...legacyWordpressRedirects,
  },
  vite: {
    plugins: [tailwindcss()]
  },
  adapter: vercel(),
  integrations: [
    sitemap({
      serialize(item) {
        const pathname = new URL(item.url).pathname;
        const lastmod = lastmodByPath.get(pathname);
        if (lastmod) {
          return { ...item, lastmod };
        }
        return item;
      },
    }),
  ],
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
    },
  },
});
