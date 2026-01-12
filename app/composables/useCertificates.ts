export interface CertificateItem {
  id: number
  rank?: number
  image: string | { en: string; id: string }
  title: { en: string; id: string }
  link: string
  description: { en: string; id: string }
}

export interface Certificate {
  id: number
  name: string
  links?: string
  certificate_list: CertificateItem[]
}

export const useCertificates = () => {
  const { data, status, error, refresh } = useFetch<{ 
    certificates: Certificate[];
    featured: CertificateItem[]
  }>(
    '/api/certificates'
  )

  return {
    certificates: computed(() => data.value?.certificates ?? []),
    featuredCertificates: computed(() => data.value?.featured ?? []),
    status,
    error,
    refresh
  }
}
