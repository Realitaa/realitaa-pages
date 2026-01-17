type ImageVariant = 'original' | 'preview' | 'thumb' | 'external'

export const imageUrl = (
  path: string,
  variant: ImageVariant = 'external'
) => {
  if (variant === 'external') return path

  const config = useRuntimeConfig()

  const base = config.public.assetsBaseUrl

  return `${base}${variant}/${path}`
}
