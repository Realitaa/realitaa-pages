<script setup lang="ts">
const local = false
const { featuredCertificates } = useCertificate(local)

</script>

<template>
  <SectionWrapper class="bg-base-200/50" title="Certificates" containerClass="max-w-6xl">
    <template #description>
      Here are some of the certificates that I have earned.
    </template>
    
    <div v-if="featuredCertificates" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div v-for="(cert, index) in featuredCertificates" :key="index">
        <Card
          :title="cert.title.en"
          :description="cert.description.en"
          :image="local ? cert.image : 'https://assets.realitaa.dev/certificates/' + cert.image"
          cta="View Certificate" 
          :link="cert.link"
          :truncate="true"
        />
      </div>
    </div>

    <div class="flex justify-center mt-4">
      <NuxtLink
        to="/certificates"
        class="group p-2 btn btn-primary inline-flex items-center gap-2"
      >
        See All Certificates
        <span
          class="inline-block transition-transform duration-200 group-hover:translate-x-1"
        >
          →
        </span>
      </NuxtLink>
    </div>

  </SectionWrapper>
</template>
