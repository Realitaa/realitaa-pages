export default defineEventHandler(async () => {
  const { assetsBaseUrl } = useRuntimeConfig().public

  const certificates = await $fetch(
    `${assetsBaseUrl}/certificates/certificates.json`
  )

  const featured = certificates
    .flatMap((c: any) => c.certificate_list)
    .filter((c: any) => typeof c.rank === 'number')
    .sort((a: any, b: any) => a.rank - b.rank)
    .slice(0, 3)

  return {
    certificates,
    featured
  }
})
