# Field Service Stack

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

An independent review site covering field service management software and job site gear, with head to head comparisons and buyer guides for contractors.

Live at [fieldservicestack.com](https://fieldservicestack.com).

## Why this exists

Software reviews in the trades are often funded by the vendors being reviewed, which makes the ranking hard to trust. This site publishes comparisons and guides written to stay independent of affiliate bias, and its robots policy allows AI search and citation crawlers while blocking training crawlers.

## Quickstart

Requires Node 22.12 or newer, as declared in `package.json`.

```bash
npm install
npm run dev
```

Open <http://localhost:4321>. The homepage lists the newest guides, reviews, and comparisons, and any single post renders under its collection path, for example `/guides/<slug>/`. Reaching a finished page takes under a minute because every post is static markdown.

Other commands:

| Command | Action |
| --- | --- |
| `npm run build` | Production build. `prebuild` regenerates `public/llms.txt`, `postbuild` writes trailing slash redirects. |
| `npm run preview` | Serve the build locally. |
| `npm run gen:llms` | Regenerate `public/llms.txt` on its own. |
| `npm run astro -- --help` | Astro CLI, including `astro check`. |

## How it works

The site is an Astro build over four content collections, with a single schema and generated routes per collection.

- Content lives under `src/content`: 107 guides, 20 comparisons, 9 reviews, and 3 gear posts.
- `src/content.config.ts` defines one zod schema for all four collections. It requires title, description, date, tags, `seoTitle`, and `focusKeyword`, and it rejects a rating that does not name the product being rated.
- Each collection has an index page plus a `[...slug]` page that renders the post through `src/layouts/Post.astro`, so adding a markdown file is enough to publish a page.
- `src/pages/search.json.ts` emits a search index that `src/components/SearchPalette.astro` reads in the browser, and `src/pages/rss.xml.ts` emits the feed.
- `astro.config.mjs` reads each post's frontmatter date so the sitemap carries a real `lastmod` rather than the build time, and `scripts/gen-llms-txt.mjs` builds `public/llms.txt` from the collections on every build.

`vercel.json` redirects the `www` host to the apex domain and sets `X-Content-Type-Options`, `Referrer-Policy`, and `Permissions-Policy` headers. `public/robots.txt` allows search and citation crawlers and disallows training crawlers.

## Tests

Tests: none yet. The repo has no test script and no test file. The current check is the build:

```bash
npm run build
```

The content schema is what catches malformed posts, since every markdown file is validated at build time.

## Roadmap and known limits

- No automated tests or continuous checks beyond the build itself.
- The schema requires `seoTitle` and `focusKeyword` on every post, so new content must supply both.
- Images are referenced by path from frontmatter and nothing verifies that a referenced file exists.

## License

MIT (see LICENSE).
