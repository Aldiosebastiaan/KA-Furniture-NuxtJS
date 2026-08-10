<template>
  <div v-if="show" class="fixed inset-0 z-[70] flex items-center justify-center bg-black/30 backdrop-blur-sm">
    <div class="flex flex-col items-center">
      <svg class="animate-spin h-12 w-12 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
      </svg>
      <p class="mt-3 text-primary text-sm font-medium" v-if="message">{{ message }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  show: { type: Boolean, default: false },
  message: { type: String, default: '' }
})
</script>
