<script setup lang="ts">
const { featuredCertificates } = useCertificates()
const { assetsBaseUrl } = useRuntimeConfig().public

const imageUrl = (img: string) =>
  `${assetsBaseUrl}/certificates/${img}`

const { locale } = useI18n()
</script>

<template>
  <SectionWrapper class="bg-base-200/50" :title="$t('featured_certificates.title')" containerClass="max-w-6xl">
    <template #description>
      {{ $t('featured_certificates.subtitle') }}
    </template>
    
    <div
      v-if="featuredCertificates"
      class="grid gap-8 grid-cols-[repeat(auto-fit,minmax(280px,1fr))]"
    >
      <div
        v-for="(cert, index) in featuredCertificates"
        :key="index"
        :class="[
          // tablet (md): item ke-3 ke tengah
          index === 2 ? 'md:col-span-2 md:flex md:justify-center lg:col-span-1 lg:block' : ''
        ]"
      >
        <Card
          :title="cert.title[locale]"
          :description="cert.description[locale]"
          :image="imageUrl(cert.image)"
          :cta="$t('featured_certificates.cta')"
          :link="cert.link"
          :truncate="true"
          class="md:max-w-md"
          :floatingEffect="true"
          :glow="true"
        />
      </div>
    </div>

    <div class="flex justify-center mt-4">
      <NuxtLink
        to="/certificates"
        class="group p-2 btn btn-primary inline-flex items-center gap-2"
      >
        {{ $t('featured_certificates.section_cta') }}
        <span
          class="inline-block transition-transform duration-200 group-hover:translate-x-1"
        >
          →
        </span>
      </NuxtLink>
    </div>

  </SectionWrapper>
</template>
