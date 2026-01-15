import type { CollectionQueryBuilder } from '@nuxt/content'

export interface BlogListItem {
  path: string
  title: string
  description: string
  date: string
  tags: string[]
  image?: string
  draft?: boolean
  author: string
}

export interface BlogArticle extends BlogListItem {
  body: unknown
  toc: TocItem[]
  seo: unknown
}

export interface TocItem {
  id: string
  text: string
  depth: number
  children?: TocItem[]
}

export interface RelatedArticle {
  path: string
  title: string
  date: string
  tags: string[]
}

export const useBlog = () => {
  const isDev = import.meta.dev

  /**
   * Fetch all blog articles for listing page.
   * Excludes draft articles in production.
   * Does NOT load the markdown body.
   */
  const getAllArticles = async (): Promise<BlogListItem[]> => {
    let query = queryCollection('blog')
      .select('path', 'title', 'description', 'date', 'tags', 'image', 'draft')
      .order('date', 'DESC')

    // In production, exclude drafts
    if (!isDev) {
      query = query.where('draft', '<>', true)
    }

    const articles = await query.all()
    return articles as BlogListItem[]
  }

  /**
   * Fetch a single blog article by its path.
   * Returns null if not found or if draft in production.
   */
  const getArticle = async (slug: string): Promise<BlogArticle | null> => {
    const path = `/blog/${slug}`
    const article = await queryCollection('blog').path(path).first()

    if (!article) return null

    // In production, return null for drafts (will trigger 404)
    if (!isDev && article.draft === true) {
      return null
    }

    return article as unknown as BlogArticle
  }

  /**
   * Fetch related articles based on tag overlap.
   * Returns up to 3 articles, falling back to latest if needed.
   */
  const getRelatedArticles = async (
    tags: string[],
    currentPath: string
  ): Promise<RelatedArticle[]> => {
    // Fetch all published articles except the current one
    const allArticles = await queryCollection('blog')
      .select('path', 'title', 'date', 'tags', 'draft')
      .where('path', '<>', currentPath)
      .where('draft', '<>', true)
      .order('date', 'DESC')
      .all()

    // Filter articles with overlapping tags
    const withOverlap = allArticles.filter((article) => {
      const articleTags = article.tags || []
      return articleTags.some((tag: string) => tags.includes(tag))
    })

    // Take up to 3 related articles
    const related = withOverlap.slice(0, 3) as RelatedArticle[]

    // If we have fewer than 3, fill with latest articles
    if (related.length < 3) {
      const relatedPaths = related.map((a) => a.path)
      const fallback = allArticles
        .filter((a) => !relatedPaths.includes(a.path))
        .slice(0, 3 - related.length)
      return [...related, ...(fallback as RelatedArticle[])]
    }

    return related
  }

  /**
   * Format a date string for display.
   */
  const formatDate = (dateString: string): string => {
    if (!dateString) return ''
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  /**
   * Client-side search filter for articles.
   */
  const filterArticles = (
    articles: BlogListItem[],
    searchQuery: string,
    selectedTags: string[]
  ): BlogListItem[] => {
    let filtered = articles

    // Filter by search query (title + description)
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (article) =>
          article.title.toLowerCase().includes(query) ||
          article.description.toLowerCase().includes(query)
      )
    }

    // Filter by selected tags
    if (selectedTags.length > 0) {
      filtered = filtered.filter((article) =>
        selectedTags.some((tag) => article.tags?.includes(tag))
      )
    }

    return filtered
  }

  /**
   * Extract unique tags from a list of articles.
   */
  const extractTags = (articles: BlogListItem[]): string[] => {
    const tagSet = new Set<string>()
    articles.forEach((article) => {
      article.tags?.forEach((tag) => tagSet.add(tag))
    })
    return Array.from(tagSet).sort()
  }

  /**
   * Fetch the latest N blog articles for homepage display.
   * Returns articles mapped to Card component format.
   */
  const getLatestArticles = async (limit: number = 3) => {
    let query = queryCollection('blog')
      .select('path', 'title', 'description', 'date', 'tags', 'image', 'draft')
      .order('date', 'DESC')
      .limit(limit)

    // In production, exclude drafts
    if (!isDev) {
      query = query.where('draft', '<>', true)
    }

    const articles = await query.all()
    
    // Map to Card component format
    return articles.map((article) => ({
      title: article.title,
      description: article.description,
      image: article.image || '/images/blog-placeholder.webp',
      cta: 'Read More',
      link: article.path,
    }))
  }

  return {
    getAllArticles,
    getArticle,
    getRelatedArticles,
    getLatestArticles,
    formatDate,
    filterArticles,
    extractTags,
  }
}
