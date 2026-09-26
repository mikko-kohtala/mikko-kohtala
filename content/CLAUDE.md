# Blog content

Blog posts are markdown files with YAML frontmatter:

- `blog/` - Published posts (naming: `YYYY-MM-DD-slug.md`)
- `drafts/` - Draft posts. Listed only when `APP_ENV` isn't `production` (it defaults to `local`); `/blog/<slug>` still renders a draft in production.

Frontmatter format:

```yaml
---
title: Post Title
date: "2025-01-03" # quoted: gray-matter turns an unquoted date into a Date and formatDate throws
description: Short description
author: Mikko Kohtala
tags: [tag1, tag2]
coverImage: /path/to/image.jpg # optional, path under public/
---
```

## Conventions

- Tags are automatically converted to kebab-case; characters outside `a-z0-9-` are dropped
- Cover images generate thumbnails via `bun scripts/generate-thumbnails.ts` (run from the repo root). Thumbnails are keyed by slug (`public/images/blog/thumbnails/<slug>-*.webp`) and a cover shows only when they exist, so re-run the script after adding a cover or renaming a post
