<template>
  <nav class="w-full bg-secondary py-4 px-6 md:px-8 flex items-center justify-between sticky top-0 z-50 shadow-sm">
    <!-- Logo -->
    <NuxtLink to="/" class="text-primary font-bold text-2xl font-montserrat cursor-pointer">
      KA Furniture.
    </NuxtLink>

    <!-- Desktop Navigation Menu -->
    <ul class="hidden md:flex items-center gap-x-8 text-primary font-medium text-sm">
      <li>
        <NuxtLink to="/" class="hover:opacity-75 transition-opacity">Home</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/#collection" class="hover:opacity-75 transition-opacity">Collection</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/#showcase" class="hover:opacity-75 transition-opacity">Showcase</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/#services" class="hover:opacity-75 transition-opacity">Service</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/shop" class="hover:opacity-75 transition-opacity">Shop Now</NuxtLink>
      </li>
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
          <div class="relative group">
            <NuxtLink to="/cart"
              class="relative flex text-primary p-2 rounded-full hover:bg-primary/10 transition-colors" title="Cart">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>
              <span v-if="cartTotalItems > 0"
                class="absolute top-0 right-0 -mt-1 -mr-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-primary border-2 border-secondary">
                {{ cartTotalItems }}
              </span>
            </NuxtLink>

            <!-- Dropdown Preview Cart -->
            <div
              class="absolute right-0 top-full mt-4 w-[340px] bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 overflow-hidden">
              <div class="flex items-center justify-between p-4 border-b border-gray-100 bg-white">
                <span class="font-semibold text-primary">Keranjang ({{ cartTotalItems }})</span>
                <NuxtLink to="/cart" class="text-accent font-semibold text-sm hover:brightness-95">Lihat</NuxtLink>
              </div>
              <div v-if="cartItems.length === 0" class="p-8 text-center text-primary/50 text-sm bg-white">
                Keranjang Anda kosong
              </div>
              <div v-else class="max-h-80 overflow-y-auto p-2 bg-white">
                <div v-for="item in cartItems" :key="item.name"
                  class="flex gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
                  @click="$router.push('/cart')">
                  <div class="w-14 h-14 bg-primary/5 rounded-lg flex items-center justify-center p-1.5 flex-shrink-0">
                    <img :src="item.image" :alt="item.name" class="w-full h-full object-contain" />
                  </div>
                  <div class="flex-grow min-w-0 flex flex-col justify-center">
                    <h4 class="text-sm font-semibold text-primary truncate">{{ item.name }}</h4>
                    <p class="text-xs text-primary/70 mt-1">{{ item.quantity }} Barang</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template v-else>
        <NuxtLink to="/auth/register"
          class="bg-[#FFFAE6] text-primary border border-primary px-6 py-2 rounded-full font-medium text-sm hover:bg-primary/5 transition-colors inline-block">
          Daftar
        </NuxtLink>
        <NuxtLink to="/auth/login"
          class="bg-primary text-white px-6 py-2 rounded-full font-medium text-sm hover:bg-primary/90 transition-colors inline-block">
          Masuk
          </button>
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
        <li>
          <NuxtLink to="/" class="hover:opacity-75 transition-opacity" @click="isMenuOpen = false">Home</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/#collection" class="hover:opacity-75 transition-opacity" @click="isMenuOpen = false">Collection
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/#showcase" class="hover:opacity-75 transition-opacity" @click="isMenuOpen = false">Showcase
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/#services" class="hover:opacity-75 transition-opacity" @click="isMenuOpen = false">Service
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/shop" class="hover:opacity-75 transition-opacity" @click="isMenuOpen = false">Shop Now
          </NuxtLink>
        </li>
      </ul>
      <div class="flex flex-col gap-4 mt-2">
        <template v-if="isLoggedIn">
          <<<<<<< Updated upstream=======<div class="text-primary font-medium text-sm text-center py-2">
            Hi, {{ user?.name }}
      </div>
      <NuxtLink to="/cart"
        class="w-full text-center bg-[#FFFAE6] text-primary border border-primary px-6 py-3 rounded-full font-medium text-sm flex items-center justify-center gap-2"
        @click="isMenuOpen = false">
        Cart
        <span v-if="cartTotalItems > 0" class="bg-primary text-white rounded-full px-2 py-0.5 text-xs">
          {{ cartTotalItems }}
        </span>
      </NuxtLink>
      >>>>>>> Stashed changes
      <button class="w-full text-primary border border-primary px-6 py-3 rounded-full font-medium text-sm"
        @click="isLoggedIn = false; isMenuOpen = false">
        Logout
      </button>
</template>
<template v-else>
  <NuxtLink to="/auth/register"
    class="w-full text-center bg-[#FFFAE6] text-primary border border-primary px-6 py-3 rounded-full font-medium text-sm inline-block"
    @click="isMenuOpen = false">
    Daftar
  </NuxtLink>
  <NuxtLink to="/auth/login"
    class="w-full text-center bg-primary text-white px-6 py-3 rounded-full font-medium text-sm inline-block"
    @click="isMenuOpen = false">
    Masuk
    </button>
</template>
</div>
</div>
</nav>
</template>

<script setup>
import { ref } from 'vue'
import { useAuth } from '~/composables/useAuth'
import { useCart } from '~/composables/useCart'

const { isLoggedIn, user, logout } = useAuth()
const { cartItems, cartTotalItems } = useCart()
const isMenuOpen = ref(false)
</script>
