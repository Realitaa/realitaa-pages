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

export const useCertificate = (local = false) => {
  const url = local
    ? '/certificates.json'
    : 'https://assets.realitaa.dev/certificates/certificates.json'

  const { data, status, error, refresh } = useFetch<Certificate[]>(url, {
    lazy: true
  })

  const featured = computed<CertificateItem[]>(() => {
    if (!data.value) return []

    return data.value
      .flatMap((cat) => cat.certificate_list)
      .filter((cert): cert is CertificateItem & { rank: number } => typeof cert.rank === 'number')
      .sort((a, b) => a.rank - b.rank)
      .slice(0, 3)
  })

  return {
    certificates: data,        // semua sertifikat
    featuredCertificates: featured, // top 3 berdasarkan rank
    status,
    error,
    refresh
  }
}
