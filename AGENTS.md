# Field Service Stack agent notes

- Read `/Users/epiphanydynamics/epiphany/AGENTS.md` and the workspace git protocol before work. The canonical project state is the current `origin/main` history and rendered site; dated vault notes are background.
- Use one isolated worktree per writing session. Keep the existing site brand, SEO fields, schema, author, network links, review data, and CTA. Existing articles must keep rendering.
- Article frontmatter is defined in `src/content.config.ts`; all four article routes pass metadata into `src/layouts/Post.astro`.
- Publishing and deployment require the applicable session authorization; a successful local build does not publish content.

## Codex Resume

2026-09-25: `codex/2026-09-25-wide-editorial` widens all four article routes through the shared Post layout. The header, image, tables, and media use a 72rem canvas; paragraphs use a 75ch measure. The description appears before optional summary modules, and contents sit beside takeaways on desktop. Exact-SHA review and release are pending; no post was published. The previous resume is preserved in `CLAUDE.md`.
