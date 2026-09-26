# mikko-kohtala

Personal site: terminal-style home page, blog, projects and CV. Next.js App Router.

## Commands

```bash
bun run build  # Production build
bun check      # Read-only: oxlint + oxfmt --check + TypeScript type check
bun run fix    # Apply oxlint autofixes + oxfmt formatting
```

## Validation

Validate all work with `bun check` before calling it done.

## Conventions

- Environment variables use `@t3-oss/env-nextjs` for type safety (see `env.ts`)
- Blog content rules (post naming, frontmatter, drafts, tags, cover images) are in `content/CLAUDE.md`
