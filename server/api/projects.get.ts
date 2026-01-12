export default defineEventHandler(async () => {
  const { assetsBaseUrl } = useRuntimeConfig().public

  const projects = await $fetch(
    `${assetsBaseUrl}/projects/projects.json`
  )

  const featured = projects
    .filter((p: any) => typeof p.rank === 'number')
    .sort((a: any, b: any) => a.rank - b.rank)
    .slice(0, 3)
    .map((project: any) => ({
      title: project.title,
      description: project.description,
      image: project.images?.[0] ?? null,
      link: project.cta?.[0]?.link ?? null,
      cta: project.cta?.[0]?.label ?? null
    }))

  return {
    projects,
    featured
  }
})
