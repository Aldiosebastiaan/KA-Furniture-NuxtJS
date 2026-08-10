<template>
  <div :class="['bg-gray-200 rounded', className]" class="animate-pulse" :style="{ width, height }"></div>
</template>

<script setup lang="ts">
const props = defineProps({
  width: { type: String, default: '100%' },
  height: { type: String, default: '1rem' },
  className: { type: String, default: '' }
})
</script>
