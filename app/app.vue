<template>
  <div class="min-h-screen bg-secondary font-sans flex flex-col">
    <SectionNavbar />
    <div class="flex-grow">
      <NuxtPage />
    </div>
    <SectionFooterSection />
    <CartModal />
    <CartAnimation />
    <!-- Global loading overlay -->
    <LoadingOverlay :show="isGlobalLoading" />
  </div>
</template>

<script setup>
import { isGlobalLoading } from '~/composables/useLoading'
import LoadingOverlay from '~/components/LoadingOverlay.vue'
</script>
