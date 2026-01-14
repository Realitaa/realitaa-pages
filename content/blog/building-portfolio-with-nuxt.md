---
title: Building a Portfolio Website with Nuxt
description: A comprehensive guide on building a modern portfolio website using Nuxt, covering project structure, components, and deployment.
date: 2026-01-10
tags:
  - nuxt
  - portfolio
  - tutorial
draft: false
---

# Building a Portfolio Website with Nuxt

In this post, I'll walk you through building a modern portfolio website using Nuxt.

## Project Setup

First, let's set up a new Nuxt project:

```bash
npx nuxi init my-portfolio
cd my-portfolio
npm install
```

## Directory Structure

A well-organized directory structure is crucial for maintainability:

```
app/
├── components/
├── composables/
├── pages/
└── assets/
```

## Key Components

### Navigation

Every portfolio needs a clean navigation system. Here's how to create one:

- Responsive hamburger menu for mobile
- Smooth scroll for anchor links
- Active state highlighting

### Hero Section

The hero section is the first thing visitors see. Make it count!

## Deployment

Deploy your portfolio to Netlify or Vercel for free hosting with automatic deployments.

## Conclusion

Building a portfolio with Nuxt gives you the flexibility of Vue.js with the performance benefits of SSG/SSR.
