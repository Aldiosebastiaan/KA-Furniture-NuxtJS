<template>
  <div class="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
    <div v-for="anim in animations" :key="anim.id" class="flying-item" :style="{
      '--start-x': anim.startX + 'px',
      '--start-y': anim.startY + 'px',
      '--end-x': anim.endX + 'px',
      '--end-y': anim.endY + 'px'
    }">
      <div class="flying-dot bg-accent w-5 h-5 rounded-full shadow-lg border-2 border-white"></div>
    </div>
  </div>
</template>

<script setup>
import { useCart } from '~/composables/useCart'
const { animations } = useCart()
</script>

<style scoped>
.flying-item {
  position: absolute;
  left: 0;
  top: 0;
  /* Animate X linearly */
  animation: flyX 0.8s cubic-bezier(0.5, 0, 0.5, 1) forwards;
}

.flying-dot {
  /* Animate Y as an arc */
  animation: flyY 0.8s cubic-bezier(0.2, -0.5, 0.8, 1) forwards;
}

@keyframes flyX {
  0% {
    transform: translateX(var(--start-x));
  }

  100% {
    transform: translateX(var(--end-x));
  }
}

@keyframes flyY {
  0% {
    transform: translateY(var(--start-y)) scale(1);
    opacity: 1;
  }

  50% {
    transform: translateY(calc(var(--start-y) - 80px)) scale(1.5);
    opacity: 1;
  }

  100% {
    transform: translateY(var(--end-y)) scale(0.2);
    opacity: 0.5;
  }
}
</style>
