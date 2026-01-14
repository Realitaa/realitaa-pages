# Blog Feature – Technical Specification (Nuxt + Nuxt Content)

## Purpose

This document defines the **architecture, data contracts, folder structure, and query design** for implementing a **personal developer blog** using **Nuxt** and **Nuxt Content**.

The implementation **MUST**:

* follow the latest official Nuxt Content documentation
* use Static Site Generation (SSG)
* NOT use any database
* NOT use external CMS
* keep content and code in the same repository

---

## Tech Stack

* Nuxt (latest stable)
* Nuxt Content (latest)
* Markdown + Frontmatter
* Static Site Generation (SSG)

---

## High-Level Architecture

```
Markdown Content (content/blog/*.md)
→ Nuxt Content Index (build-time)
→ Query via Nuxt Content API
→ Static HTML pages
```

Characteristics:

* read-only content
* build-time indexing
* no runtime API calls
* no database

---

## Routing Structure

### Blog Listing Page

```
/blog
```

Implemented via:

```
pages/blog/index.vue
```

This page is **logic-driven**, not content-driven.

---

### Blog Article Page

```
/blog/[slug]
```

Implemented via:

```
pages/blog/[slug].vue
```

Each article is backed by a single Markdown file.

---

## Repository Structure (Final)

```
.
├─ content/
│  └─ blog/
│     ├─ article-1.md
│     ├─ article-2.md
│     └─ devlog-project-x.md
│
├─ pages/
│  └─ blog/
│     ├─ index.vue
│     └─ [slug].vue
│
├─ components/
│  ├─ content/          # Vue components usable inside Markdown
│  │  ├─ Callout.vue
│  │  ├─ CodeGroup.vue
│  │  └─ ImageFigure.vue
│  │
│  ├─ blog/             # Blog-specific UI components
│  │  ├─ ArticleHeader.vue
│  │  ├─ ArticleContent.vue
│  │  ├─ ArticleSidebar.vue
│  │  └─ RelatedArticles.vue
│  │
│  └─ ui/
│     └─ Divider.vue
│
├─ composables/
│  └─ useBlog.ts
│
└─ nuxt.config.ts
```

---

## Markdown Content Contract

All blog articles **MUST** be placed under:

```
content/blog/*.md
```

### Required Frontmatter Fields

```yaml
---
title: string
description: string
date: ISO-8601 string
tags: string[]
draft: boolean
---
```

Notes:

* `slug` is derived from the filename
* `draft: true` content MUST NOT appear in production listing
* drafts may still be accessible in development

---

## Blog Listing Page (`/blog`)

### Responsibilities

* list all published articles
* sort by date (descending)
* allow client-side tag filtering
* allow simple search (title + description)
* exclude drafts

---

### Data Shape (Listing Only)

```ts
BlogListItem {
  title: string
  description: string
  date: string
  tags: string[]
  slug: string
}
```

---

### Query Rules

* query all content under `content/blog`
* select only fields needed for listing
* DO NOT load markdown body
* filtering and search happen client-side

---

## Blog Article Page (`/blog/[slug]`)

### Responsibilities

* fetch one article by slug
* render markdown content
* generate and render Table of Contents (ToC)
* render related articles
* set SEO metadata

---

### Article Data Shape

```ts
Article {
  title: string
  description: string
  date: string
  tags: string[]
  slug: string
  body: MarkdownAST
  toc: TocTree
}
```

---

## Table of Contents (ToC)

* MUST use Nuxt Content built-in ToC generation
* derived automatically from markdown headings (`##`, `###`, etc.)
* rendered in a sidebar on desktop
* optional / collapsible on mobile
* hidden if heading count is below a reasonable threshold

---

## Related Articles

### Purpose

* internal linking
* improve content discovery
* SEO depth

---

### Algorithm

1. Query all other published blog articles
2. Exclude current article (by slug)
3. Select articles with overlapping tags
4. Sort by date (descending)
5. Limit to 3 items

Fallback:

* if fewer than 3 results, show latest articles instead

---

### Data Shape

```ts
RelatedArticle {
  title: string
  date: string
  slug: string
  tags: string[]
}
```

---

## SEO Requirements

Each article page **MUST**:

* set `<title>` from frontmatter `title`
* set meta description from `description`
* set Open Graph meta (`og:title`, `og:description`, `og:type=article`)
* include published date metadata

SEO metadata MUST be derived from frontmatter only.

---

## Draft Handling Rules

* `draft: true` articles:

  * visible in development
  * excluded from listing in production
  * return 404 in production when accessed directly

---

## Non-Goals (Explicitly Excluded)

The implementation **MUST NOT** include:

* database
* authentication
* comments
* likes or view counters
* CMS or admin panel
* runtime API fetching

---

## Design Principles

* content is immutable at runtime
* Git is the source of truth
* minimal moving parts
* SEO-first
* developer-focused UX

---

## Implementation Order Recommendation

1. Create `useBlog.ts` composable
2. Implement `/blog/index.vue`
3. Implement `/blog/[slug].vue`
4. Implement blog UI components
5. Implement markdown content components

---

## Final Note

This blog is intended as a **personal developer blog**.
Avoid over-engineering.
Prefer clarity, maintainability, and build-time computation.
