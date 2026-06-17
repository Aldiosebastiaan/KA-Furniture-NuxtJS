<template>
  <nav class="w-full bg-secondary py-4 px-8 flex items-center justify-between">
    <!-- Logo -->
    <div class="text-primary font-bold text-2xl font-montserrat cursor-pointer">
      KA Furniture.
    </div>

    <!-- Navigation Menu -->
    <ul class="hidden md:flex items-center gap-x-8 text-primary font-medium text-sm">
      <li>
        <a href="#" class="hover:opacity-75 transition-opacity">Home</a>
      </li>
      <li>
        <a href="#" class="hover:opacity-75 transition-opacity">Collection</a>
      </li>
      <li>
        <a href="#" class="hover:opacity-75 transition-opacity">Showcase</a>
      </li>
      <li>
        <a href="#" class="hover:opacity-75 transition-opacity">Service</a>
      </li>
    </ul>

    <!-- Auth Section -->
    <div class="flex items-center gap-x-4">
      <template v-if="isLoggedIn">
        <!-- User Icon (Logged In) -->
        <button class="text-primary p-2 rounded-full hover:bg-primary/10 transition-colors" @click="isLoggedIn = false"
          title="Logout">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
          </svg>
        </button>
      </template>
      <template v-else>
        <!-- Auth Buttons -->
        <button
          class="bg-[#FFFAE6] text-primary border border-primary px-6 py-2 rounded-full font-medium text-sm hover:bg-primary/5 transition-colors"
          @click="isLoggedIn = true">
          Daftar
        </button>
        <button
          class="bg-primary text-white px-6 py-2 rounded-full font-medium text-sm hover:bg-primary/90 transition-colors"
          @click="isLoggedIn = true">
          Masuk
        </button>
      </template>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'

// State for toggling logged in / out for demonstration
const isLoggedIn = ref(false)
</script>
