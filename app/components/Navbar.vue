<template>
  <nav class="w-full bg-secondary py-4 px-6 md:px-8 flex items-center justify-between sticky top-0 z-50 shadow-sm">
    <!-- Logo -->
    <a href="#home" class="text-primary font-bold text-2xl font-montserrat cursor-pointer">
      KA Furniture.
    </a>

    <!-- Desktop Navigation Menu -->
    <ul class="hidden md:flex items-center gap-x-8 text-primary font-medium text-sm">
      <li><a href="#home" class="hover:opacity-75 transition-opacity">Home</a></li>
      <li><a href="#collection" class="hover:opacity-75 transition-opacity">Collection</a></li>
      <li><a href="#showcase" class="hover:opacity-75 transition-opacity">Showcase</a></li>
      <li><a href="#services" class="hover:opacity-75 transition-opacity">Service</a></li>
      <li><a href="/shop" class="hover:opacity-75 transition-opacity">Shop Now</a></li>
    </ul>

    <!-- Desktop Auth Section -->
    <div class="hidden md:flex items-center gap-x-4">
      <template v-if="isLoggedIn">
        <div class="flex items-center gap-3">
          <span class="text-primary font-medium text-sm hidden lg:block">Hi, {{ user?.name }}</span>
          <button class="text-primary p-2 rounded-full hover:bg-primary/10 transition-colors" @click="logout()"
            title="Logout">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
            </svg>
          </button>
        </div>
      </template>
      <template v-else>
        <NuxtLink to="/auth/register/index"
          class="bg-[#FFFAE6] text-primary border border-primary px-6 py-2 rounded-full font-medium text-sm hover:bg-primary/5 transition-colors inline-block">
          Daftar
        </NuxtLink>
        <NuxtLink to="/auth/login/index"
          class="bg-primary text-white px-6 py-2 rounded-full font-medium text-sm hover:bg-primary/90 transition-colors inline-block">
          Masuk
        </NuxtLink>
      </template>
    </div>

    <!-- Mobile Hamburger Button -->
    <button class="md:hidden text-primary p-2 focus:outline-none" @click="isMenuOpen = !isMenuOpen">
      <svg v-if="!isMenuOpen" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
        stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
      </svg>
      <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
        stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>

    <!-- Mobile Menu Drawer -->
    <div v-if="isMenuOpen"
      class="absolute top-full left-0 w-full bg-secondary border-t border-primary/10 shadow-md flex flex-col p-6 gap-6 md:hidden">
      <ul class="flex flex-col items-center gap-y-6 text-primary font-medium text-lg">
        <li><a href="#home" class="hover:opacity-75 transition-opacity" @click="isMenuOpen = false">Home</a></li>
        <li><a href="#collection" class="hover:opacity-75 transition-opacity" @click="isMenuOpen = false">Collection</a>
        </li>
        <li><a href="#showcase" class="hover:opacity-75 transition-opacity" @click="isMenuOpen = false">Showcase</a>
        </li>
        <li><a href="#services" class="hover:opacity-75 transition-opacity" @click="isMenuOpen = false">Service</a></li>
        <li><a href="/shop" class="hover:opacity-75 transition-opacity" @click="isMenuOpen = false">Shop Now</a></li>
      </ul>
      <div class="flex flex-col gap-4 mt-2">
        <template v-if="isLoggedIn">
          <div class="text-primary font-medium text-sm text-center py-2">
            Hi, {{ user?.name }}
          </div>
          <button class="w-full text-primary border border-primary px-6 py-3 rounded-full font-medium text-sm"
            @click="logout(); isMenuOpen = false">
            Logout
          </button>
        </template>
        <template v-else>
          <NuxtLink to="/auth/register/index"
            class="w-full text-center bg-[#FFFAE6] text-primary border border-primary px-6 py-3 rounded-full font-medium text-sm inline-block"
            @click="isMenuOpen = false">
            Daftar
          </NuxtLink>
          <NuxtLink to="/auth/login/index"
            class="w-full text-center bg-primary text-white px-6 py-3 rounded-full font-medium text-sm inline-block"
            @click="isMenuOpen = false">
            Masuk
          </NuxtLink>
        </template>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { useAuth } from '~/composables/useAuth'

const { isLoggedIn, user, logout } = useAuth()
const isMenuOpen = ref(false)
</script>
