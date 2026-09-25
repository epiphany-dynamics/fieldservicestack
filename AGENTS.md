# Field Service Stack agent notes

- Read `/Users/epiphanydynamics/epiphany/AGENTS.md` and the workspace git protocol before work. The canonical project state is the current `origin/main` history and rendered site; dated vault notes are background.
- Use one isolated worktree per writing session. Keep the existing site brand, SEO fields, schema, author, network links, review data, and CTA. Existing articles must keep rendering.
- Article frontmatter is defined in `src/content.config.ts`; all four article routes pass metadata into `src/layouts/Post.astro`.
- Publishing and deployment require the applicable session authorization; a successful local build does not publish content.

## Codex Resume

2026-09-25: `codex/2026-09-25-gravity-editorial` adds optional editorial frontmatter and branded cards, anchor navigation, citations and methodology across four article routes. The fixture build and rendered HTML checks passed; existing content rendered. `astro check` still reports 16 pre-existing type errors in `astro.config.mjs` and the legacy lightbox script. Independent exact-SHA review is pending before a protected-branch merge.
