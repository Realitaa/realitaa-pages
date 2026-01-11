<script setup lang="ts">
interface Certificate {
  id: number
  name: string
  certificate_list: any[]
}

const {
  data: certificates,
  pending,
  error
} = await useFetch<Certificate[]>('https://assets.realitaa.dev/certificates/dicoding/certificates.json', {
  lazy: true
})
</script>

<template>
  <SectionWrapper title="Certificates" containerClass="max-w-6xl">
    <template #description>
      A collection of certificates I have earned.
    </template>

    <!-- Loading -->
    <div v-if="pending" class="py-16 text-center opacity-70">
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
          :certificates="cert.certificate_list"
        />
      </div>
    </div>
  </SectionWrapper>
</template>
