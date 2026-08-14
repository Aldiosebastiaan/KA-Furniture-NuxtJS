<template>
  <Transition name="fade">
    <div v-if="isOpen && product" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-primary/40 backdrop-blur-sm" @click="$emit('close')"></div>

      <!-- Modal Content -->
      <div
        class="relative w-full max-w-5xl bg-secondary rounded-3xl p-6 md:p-8 shadow-2xl flex flex-col md:flex-row gap-6 items-center transform transition-all modal-content">
        <!-- Close Button -->
        <button @click="$emit('close')"
          class="absolute top-4 right-4 text-primary/50 hover:text-primary transition-colors bg-white/50 hover:bg-white rounded-full p-2 z-10">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <!-- Product Image -->
        <div
          class="w-full md:w-1/2 aspect-square bg-primary/5 rounded-2xl p-4 flex items-center justify-center relative">
          <img :src="product.image" :alt="product.name"
            class="w-full h-full object-contain drop-shadow-lg" />
        </div>

        <!-- Product Details -->
        <div class="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
          <h3 class="text-3xl md:text-4xl font-bold text-primary mb-3">{{ product.name }}</h3>
          <p class="text-primary/70 text-base md:text-lg mb-8 leading-relaxed">Experience the perfect blend of comfort and style
            with this premium piece.</p>

          <UiButton variant="accent" class="w-full flex justify-center" @click="$emit('view-shop', product.name)">
            View in Shop
          </UiButton>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  product: {
    type: Object,
    default: () => null
  }
})

defineEmits(['close', 'view-shop'])
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.modal-content {
  animation: popIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes popIn {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(10px);
  }

  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}
</style>
