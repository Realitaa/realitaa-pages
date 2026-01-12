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

export const useProjects = (local = false) => {
  const url = local
    ? '/projects.json'
    : 'https://assets.realitaa.dev/projects/projects.json'

  const { data, status, error, refresh } = useFetch<ProjectItem[]>(url, {
    lazy: true
  })

  const featured = computed(() => {
    if (!data.value) return []

    return data.value
      .filter((project): project is ProjectItem & { rank: number } => typeof project.rank === 'number')
      .sort((a, b) => a.rank - b.rank)
      .slice(0, 3)
      .map(project => ({
        title: project.title,
        description: project.description,
        image: project.images[0],
        link: project.cta[0]?.link,
        cta: project.cta[0]?.label
      }))
  })

  return {
    projects: data,
    featuredProjects: featured,
    status,
    error,
    refresh
  }
}

