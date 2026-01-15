<script setup lang="ts">
useSeoMeta({
  title: 'Sertifikat | Reza Mulia Putra',
  description: 'Sertifikat yang diperoleh Reza Mulia Putra',

  ogTitle: 'Sertifikat | Reza Mulia Putra',
  ogDescription: 'Sertifikat yang diperoleh Reza Mulia Putra',
  ogType: 'website',
  ogImage: 'https://assets.realitaa.dev/img/cover.png',
  ogUrl: 'https://realitaa.dev/certificates',

  twitterTitle: 'Sertifikat | Reza Mulia Putra',
  twitterDescription: 'Sertifikat yang diperoleh Reza Mulia Putra',
  twitterImage: 'https://assets.realitaa.dev/img/cover.png',

  robots: 'index, follow'
})

const { certificates, status, error } = useCertificates()
const { locale } = useI18n()
</script>

<template>
  <SectionWrapper :title="$t('certificates.title')" containerClass="max-w-6xl">
    <template #description>
      {{ $t('certificates.subtitle') }}
    </template>

    <!-- Loading -->
    <div v-if=" status === 'pending'" class="py-16 text-center opacity-70">
      Loading certificates...
    </div>

    <!-- Error -->
    <div v-else-if="error" class="py-16 text-center text-red-500">
      Failed to load certificates.
    </div>

    <!-- Data -->
    <div v-else class="space-y-20">
      <div
        v-for="cert in [...certificates].sort((a, b) => a.id - b.id)"
        :key="cert.id"
      >
        <CertificatesGlide
          :title="cert.name"
          :links="cert.links"
          :certificates="cert.certificate_list"
        />
      </div>
    </div>
  </SectionWrapper>
</template>
