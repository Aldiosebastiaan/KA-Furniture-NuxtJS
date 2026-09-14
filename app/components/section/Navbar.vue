<template>
  <nav class="w-full bg-secondary/95 backdrop-blur-md py-3.5 px-6 md:px-8 flex items-center justify-between sticky top-0 z-50 shadow-sm border-b border-primary/10 transition-all duration-300">
    <!-- Logo -->
    <NuxtLink to="/" class="group flex items-center gap-2 cursor-pointer select-none">
      <span class="text-primary font-bold text-2xl font-montserrat tracking-tight group-hover:text-emerald-900 transition-colors">
        KA Furniture<span class="text-accent group-hover:scale-125 inline-block transition-transform duration-300">.</span>
      </span>
    </NuxtLink>

    <!-- Desktop Navigation Menu -->
    <ul class="hidden md:flex items-center gap-x-2 lg:gap-x-3 text-primary font-medium text-sm bg-primary/5 p-1.5 rounded-full border border-primary/10 shadow-inner">
      <li v-for="link in navLinks" :key="link.path">
        <NuxtLink 
          :to="link.path" 
          class="relative px-4 py-2 rounded-full transition-all duration-300 flex items-center gap-1.5 text-xs lg:text-sm font-semibold group cursor-pointer"
          :class="isActive(link.path)
            ? 'bg-primary text-secondary shadow-md font-bold'
            : 'text-primary/75 hover:text-primary hover:bg-white/80 active:scale-95'"
        >
          <!-- Active / Hover Dot Indicator -->
          <span 
            v-if="isActive(link.path)" 
            class="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"
          ></span>
          
          <span>{{ link.name }}</span>

          <!-- Subtle Hover underline bar for inactive items -->
          <span 
            v-if="!isActive(link.path)" 
            class="absolute bottom-1 left-4 right-4 h-0.5 bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center rounded-full"
          ></span>
        </NuxtLink>
      </li>
    </ul>

    <!-- Desktop Auth & Cart Section -->
    <div class="hidden md:flex items-center gap-x-4">
      <template v-if="isLoggedIn">
        <div class="flex items-center gap-3">
          <span class="text-primary font-medium text-sm hidden lg:block">Hi, {{ user?.name }}</span>
          
          <button 
            class="text-primary p-2 rounded-full hover:bg-primary/10 active:scale-95 transition-all" 
            @click="logout()"
            title="Logout"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
            </svg>
          </button>

          <!-- Cart Icon with Dropdown -->
          <div class="relative group">
            <NuxtLink 
              to="/cart" 
              id="cart-icon"
              :class="[
                'relative flex text-primary p-2 rounded-full transition-all duration-300',
                isActive('/cart') ? 'bg-primary text-secondary' : 'hover:bg-primary/10',
                { 'scale-125 text-accent': isCartBumping }
              ]"
              title="Cart"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>
              <span v-if="cartTotalItems > 0"
                class="absolute top-0 right-0 -mt-1 -mr-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-primary border-2 border-secondary animate-bounce">
                {{ cartTotalItems }}
              </span>
            </NuxtLink>

            <!-- Dropdown Preview Cart -->
            <div
              class="absolute right-0 top-full mt-3 w-[340px] bg-white rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.12)] border border-primary/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 overflow-hidden">
              <div class="flex items-center justify-between p-4 border-b border-primary/10 bg-secondary/50">
                <span class="font-semibold text-primary text-sm">Keranjang ({{ cartTotalItems }})</span>
                <NuxtLink to="/cart" class="text-primary font-bold text-xs hover:text-emerald-900 flex items-center gap-1">
                  <span>Lihat Detail</span>
                  <span>→</span>
                </NuxtLink>
              </div>
              <div v-if="cartItems.length === 0" class="p-8 text-center text-primary/50 text-sm bg-white">
                Keranjang Anda masih kosong
              </div>
              <div v-else class="max-h-80 overflow-y-auto p-2 bg-white divide-y divide-primary/5">
                <div v-for="item in cartItems" :key="item.name"
                  class="flex gap-3 p-2.5 hover:bg-secondary/40 rounded-xl transition-colors cursor-pointer"
                  @click="$router.push('/cart')">
                  <div class="w-14 h-14 bg-primary/5 rounded-lg flex items-center justify-center p-1.5 flex-shrink-0 border border-primary/5">
                    <img :src="item.image" :alt="item.name" class="w-full h-full object-contain" />
                  </div>
                  <div class="flex-grow min-w-0 flex flex-col justify-center">
                    <h4 class="text-xs font-semibold text-primary truncate">{{ item.name }}</h4>
                    <p class="text-[11px] text-primary/70 mt-1 font-mono">{{ item.quantity }} x {{ formatPrice(item.price) }}</p>
                  </div>
                </div>
              </div>
              <div v-if="cartItems.length > 0" class="p-3 bg-secondary/30 border-t border-primary/10">
                <NuxtLink 
                  to="/cart"
                  class="w-full py-2 bg-accent hover:brightness-95 active:scale-95 text-primary text-xs font-bold rounded-xl flex items-center justify-center transition-all shadow-sm"
                >
                  Buka Keranjang Belanja
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template v-else>
        <NuxtLink 
          to="/auth/register"
          class="bg-[#FFFAE6] text-primary border border-primary/40 px-5 py-2 rounded-full font-semibold text-xs hover:bg-primary/10 active:scale-95 transition-all inline-block shadow-sm"
          :class="{ 'bg-primary/10 border-primary': isActive('/auth/register') }"
        >
          Daftar
        </NuxtLink>
        <NuxtLink 
          to="/auth/login"
          class="bg-primary text-white px-5 py-2 rounded-full font-semibold text-xs hover:bg-emerald-900 active:scale-95 transition-all inline-block shadow-sm"
          :class="{ 'ring-2 ring-accent': isActive('/auth/login') }"
        >
          Masuk
        </NuxtLink>
      </template>
    </div>

    <!-- Mobile Hamburger Button -->
    <button 
      class="md:hidden text-primary p-2 focus:outline-none rounded-xl hover:bg-primary/10 active:scale-95 transition-all" 
      @click="isMenuOpen = !isMenuOpen"
      aria-label="Toggle navigation menu"
    >
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
    <Transition name="drawer">
      <div 
        v-if="isMenuOpen"
        class="absolute top-full left-0 w-full bg-secondary/98 backdrop-blur-xl border-t border-primary/10 shadow-2xl flex flex-col p-6 gap-6 md:hidden z-50 animate-fadeIn"
      >
        <ul class="flex flex-col gap-y-3 text-primary font-medium">
          <li v-for="link in navLinks" :key="link.path">
            <NuxtLink 
              :to="link.path" 
              class="flex items-center justify-between px-5 py-3 rounded-2xl transition-all duration-200 text-base"
              :class="isActive(link.path) 
                ? 'bg-primary text-secondary font-bold shadow-md' 
                : 'hover:bg-primary/10 text-primary/80'"
              @click="isMenuOpen = false"
            >
              <span>{{ link.name }}</span>
              <span v-if="isActive(link.path)" class="w-2 h-2 rounded-full bg-accent"></span>
            </NuxtLink>
          </li>
        </ul>

        <div class="flex flex-col gap-3 pt-4 border-t border-primary/10">
          <template v-if="isLoggedIn">
            <div class="text-primary font-bold text-sm text-center py-1">
              Hi, {{ user?.name }}
            </div>
            <NuxtLink 
              to="/cart"
              class="w-full text-center bg-white text-primary border border-primary/20 px-6 py-3 rounded-full font-semibold text-sm flex items-center justify-center gap-2 shadow-sm hover:bg-primary/5 transition-colors"
              :class="{ 'ring-2 ring-primary': isActive('/cart') }"
              @click="isMenuOpen = false"
            >
              <span>Keranjang Belanja</span>
              <span v-if="cartTotalItems > 0" class="bg-primary text-secondary rounded-full px-2 py-0.5 text-xs font-bold">
                {{ cartTotalItems }}
              </span>
            </NuxtLink>
            <button 
              class="w-full text-primary border border-primary/30 px-6 py-3 rounded-full font-medium text-sm hover:bg-primary/5 active:scale-95 transition-all"
              @click="logout(); isMenuOpen = false"
            >
              Logout
            </button>
          </template>
          <template v-else>
            <NuxtLink 
              to="/auth/register"
              class="w-full text-center bg-white text-primary border border-primary/30 px-6 py-3 rounded-full font-semibold text-sm inline-block hover:bg-primary/5 transition-colors"
              @click="isMenuOpen = false"
            >
              Daftar
            </NuxtLink>
            <NuxtLink 
              to="/auth/login"
              class="w-full text-center bg-primary text-secondary px-6 py-3 rounded-full font-semibold text-sm inline-block hover:bg-emerald-900 transition-colors shadow-md"
              @click="isMenuOpen = false"
            >
              Masuk
            </NuxtLink>
          </template>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useAuth } from '~/composables/useAuth'
import { useCart } from '~/composables/useCart'

const route = useRoute()
const { isLoggedIn, user, logout } = useAuth()
const { cartItems, cartTotalItems, isCartBumping } = useCart()

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Collection', path: '/main/collections' },
  { name: 'Showcase', path: '/main/showcase' },
  { name: 'Shop Now', path: '/main/shop' }
]

// Determine if a navigation link matches current active route
const isActive = (path) => {
  if (path === '/') {
    return route.path === '/'
  }
  return route.path.startsWith(path)
}

const formatPrice = (price) => {
  if (!price) return '0'
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price)
}

const isMenuOpen = ref(false)
</script>

<style scoped>
.drawer-enter-active,
.drawer-leave-active {
  transition: all 0.25s ease-out;
}

.drawer-enter-from,
.drawer-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
