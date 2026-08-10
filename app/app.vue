<template>
  <div class="min-h-screen bg-secondary font-sans flex flex-col">
    <Navbar />
    <div class="flex-grow">
      <NuxtPage />
    </div>
    <FooterSection />
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
