# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
bun dev      # Start dev server with Turbopack
bun build    # Production build
bun check    # Run oxfmt + oxlint (autofix) + TypeScript type check
bun lint     # Run oxlint with autofix
bun format   # Format with oxfmt
```

## Tech Stack

- **Framework**: Next.js 16 with App Router, React 19, TypeScript
- **Styling**: Tailwind CSS 4 with `next-themes` for dark mode
- **UI Components**: shadcn/ui (new-york style)
- **Linting**: oxlint (oxc) — config in `.oxlintrc.json`
- **Formatting**: oxfmt (oxc, print width 120) — config in `.oxfmtrc.json`
- **Package Manager**: Bun

## Architecture

### App Router Structure (`app/`)

- `page.tsx` - Terminal-style home page
- `blog/` - Blog index, `[slug]/page.tsx` for posts, `tag/[tag]/page.tsx` for filtering
- `apps/page.tsx` - Projects showcase
- `cv/page.tsx` - Resume page
- `components/` - App-specific components (theme provider/toggle)

### Content System (`content/`)

Blog posts are markdown files with YAML frontmatter:

- `content/blog/` - Published posts (naming: `YYYY-MM-DD-slug.md`)
- `content/drafts/` - Draft posts (hidden in production, shown when `includeDrafts=true`)

Frontmatter format:

```yaml
---
title: Post Title
date: 2025-01-03
description: Short description
author: Mikko Kohtala
tags: [tag1, tag2]
coverImage: /path/to/image.jpg # optional
---
```

### Key Libraries (`lib/`)

- `markdown.ts` - Blog post processing: frontmatter parsing, HTML generation, reading time, tag filtering
- `images.ts` - Cover image path utilities
- `utils.ts` - General utilities (cn for class merging)

## Conventions

- Tags are automatically converted to kebab-case
- Cover images generate thumbnails via `scripts/generate-thumbnails.ts`
- Environment variables use `@t3-oss/env-nextjs` for type safety (see `env.ts`)
- Tailwind classes are sorted automatically by oxfmt (`sortTailwindcss`, aware of the `cn` helper)
