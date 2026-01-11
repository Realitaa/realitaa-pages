<script setup lang="ts">
const certificates = useCertificate()
</script>

<template>
  <SectionWrapper class="bg-base-200/50" title="Certificates" containerClass="max-w-6xl">
    <template #description>
      Here are some of the certificates that I have earned.
    </template>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="(cert, index) in certificates" :key="index">
          <Card
            :title="cert.title"
            :description="cert.description"
            :image="cert.image"
            :cta="cert.cta"
            :link="cert.link"
          />
        </div>
      </div>
  </SectionWrapper>
</template>
