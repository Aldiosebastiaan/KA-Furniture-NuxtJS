<template>
  <div>
    <!-- Backdrop overlay -->
    <div v-if="isCartOpen" 
         class="fixed inset-0 bg-black/50 z-[60] transition-opacity duration-300"
         @click="isCartOpen = false"></div>

    <!-- Slide-over panel -->
    <div :class="[
      'fixed top-0 right-0 h-full w-full max-w-md bg-secondary z-[70] shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col',
      isCartOpen ? 'translate-x-0' : 'translate-x-full'
    ]">
      <!-- Header -->
      <div class="px-6 py-6 border-b border-primary/10 flex items-center justify-between">
        <h2 class="text-2xl font-semibold text-primary">Your Cart</h2>
        <button @click="isCartOpen = false" class="text-primary hover:text-accent transition-colors p-2 -mr-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Cart Items -->
      <div class="flex-grow overflow-y-auto px-6 py-4">
        <div v-if="cartItems.length === 0" class="h-full flex flex-col items-center justify-center text-primary/50 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" class="w-20 h-20 mb-4 opacity-50">
             <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
          </svg>
          <p class="text-lg">Your cart is empty.</p>
        </div>
        
        <div v-else class="flex flex-col gap-6">
          <div v-for="item in cartItems" :key="item.name" class="flex gap-4 items-center bg-white p-3 rounded-2xl shadow-sm border border-primary/5">
            <div class="w-20 h-20 bg-primary/5 rounded-xl flex items-center justify-center p-2 flex-shrink-0">
              <img :src="item.image" :alt="item.name" class="w-full h-full object-contain" />
            </div>
            
            <div class="flex-grow">
              <h3 class="text-primary font-semibold text-sm leading-tight mb-1">{{ item.name }}</h3>
              <p class="text-primary/70 text-xs mb-3">{{ item.quantity }} x {{ formatPrice(item.price) }}</p>
              
              <div class="flex items-center gap-3">
                <button @click="updateQuantity(item.name, -1)" class="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-3 h-3">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15" />
                  </svg>
                </button>
                <span class="text-primary font-medium text-sm w-4 text-center">{{ item.quantity }}</span>
                <button @click="updateQuantity(item.name, 1)" class="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-3 h-3">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                </button>
              </div>
            </div>
            
            <button @click="removeFromCart(item.name)" class="text-red-400 hover:text-red-500 transition-colors p-2" title="Remove item">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div v-if="cartItems.length > 0" class="p-6 border-t border-primary/10 bg-secondary">
        <div class="flex items-center justify-between mb-6">
          <span class="text-primary font-medium">Total</span>
          <span class="text-primary font-semibold text-lg">{{ formatPrice(cartTotalPrice) }}</span>
        </div>
        <button class="w-full bg-primary text-white py-4 rounded-full font-semibold text-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-2">
          Checkout
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCart } from '~/composables/useCart'

const { cartItems, isCartOpen, removeFromCart, updateQuantity, cartTotalItems, cartTotalPrice } = useCart()

const formatPrice = (price) => {
  if (!price) return '0'
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price)
}
</script>
