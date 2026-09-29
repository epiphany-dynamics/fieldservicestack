# Field Service Stack agent notes

- Read `/Users/epiphanydynamics/epiphany/AGENTS.md` and the workspace git protocol before work. The canonical project state is the current `origin/main` history and rendered site; dated vault notes are background.
- Use one isolated worktree per writing session. Keep the existing site brand, SEO fields, schema, author, network links, review data, and CTA. Existing articles must keep rendering.
- Article frontmatter is defined in `src/content.config.ts`; all four article routes pass metadata into `src/layouts/Post.astro`.
- Publishing and deployment require the applicable session authorization; a successful local build does not publish content.
- For the 2026-09-29 Gravity article format task, keep the queued drafts intact, apply the wider layout only from 2026-08-01, and bound the guide to the article body. Patrick asked for this work in-session without a Linear issue.

## Codex Resume

2026-09-29: The shared post layout on `codex/2026-09-29-gravity-article-format` applies wide article prose and a body-bounded reading guide to posts dated 2026-08-01 onward. Older posts keep their prior template. Build and desktop/mobile visual checks passed; exact-SHA review and release remain. The previous resume is archived verbatim in `CLAUDE.md`.
