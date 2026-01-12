export interface ProjectStack {
  name: string
  icon: string
}

export interface ProjectCTA {
  label: string
  link: string
  icon: string
}

export interface ProjectItem {
  title: string
  description: string
  images: string[]
  cta: ProjectCTA[]
  stack: ProjectStack[]
  rank?: number
}

export interface FeaturedProject {
  title: string
  description: string
  image: string | null
  link: string | null
  cta: string | null
}

export const useProjects = () => {
  const { data, status, error, refresh } = useFetch<{
    projects: ProjectItem[]
    featured: FeaturedProject[]
  }>('/api/projects')

  return {
    projects: computed(() => data.value?.projects ?? []),
    featuredProjects: computed(() => data.value?.featured ?? []),
    status,
    error,
    refresh
  }
}
