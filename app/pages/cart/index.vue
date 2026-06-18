<template>
    <div class="min-h-screen bg-[#FDFBF7]/80 py-12 px-6 md:px-16 lg:px-24 font-montserrat">
        <div class="max-w-6xl mx-auto">
            <h1 class="text-3xl font-bold text-primary mb-8">Shopping Cart</h1>

            <div class="flex flex-col lg:flex-row gap-8">
                <!-- Cart Items -->
                <div class="flex-grow">
                    <div v-if="cartItems.length === 0"
                        class="bg-white p-12 rounded-2xl shadow-sm border border-primary/5 flex flex-col items-center justify-center text-primary/50 text-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1"
                            stroke="currentColor" class="w-24 h-24 mb-6 opacity-50">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                        </svg>
                        <p class="text-xl font-medium mb-2">Your cart is still empty</p>
                        <p class="text-sm mb-6">Let's start shopping and find your dream furniture!</p>
                        <NuxtLink to="/shop"
                            class="bg-primary text-white px-8 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors">
                            Shop Now
                        </NuxtLink>
                    </div>

                    <div v-else class="flex flex-col gap-6">
                        <div v-for="item in cartItems" :key="item.name"
                            class="flex gap-6 items-center bg-white p-6 rounded-2xl shadow-sm border border-primary/5">
                            <!-- Checkbox (Placeholder) -->
                            <div class="flex-shrink-0">
                                <input type="checkbox"
                                    class="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary accent-primary cursor-pointer"
                                    checked />
                            </div>

                            <!-- Product Image -->
                            <div
                                class="w-24 h-24 bg-primary/5 rounded-xl flex items-center justify-center p-3 flex-shrink-0">
                                <img :src="item.image" :alt="item.name" class="w-full h-full object-contain" />
                            </div>

                            <!-- Product Details -->
                            <div class="flex-grow">
                                <h3 class="text-primary font-semibold text-lg leading-tight mb-2">{{ item.name }}</h3>
                                <!-- Price Placeholder if needed, currently not in state -->
                                <p class="text-primary/70 text-sm mb-4">High Quality Furniture from KA Furniture</p>
                            </div>

                            <!-- Quantity and Delete -->
                            <div class="flex flex-col items-end gap-4">
                                <div class="flex items-center gap-4">
                                    <button @click="removeFromCart(item.name)"
                                        class="text-red-400 hover:text-red-500 transition-colors p-2 flex items-center gap-1"
                                        title="Delete">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                            stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                        </svg>
                                    </button>

                                    <div class="flex items-center gap-3 border border-gray-200 rounded-full px-1 py-1">
                                        <button @click="updateQuantity(item.name, -1)"
                                            class="w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                stroke-width="2" stroke="currentColor" class="w-4 h-4">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15" />
                                            </svg>
                                        </button>
                                        <span class="text-primary font-medium text-sm w-6 text-center">{{ item.quantity
                                        }}</span>
                                        <button @click="updateQuantity(item.name, 1)"
                                            class="w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                stroke-width="2" stroke="currentColor" class="w-4 h-4">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                    d="M12 4.5v15m7.5-7.5h-15" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Summary (Ringkasan Belanja) -->
                <div v-if="cartItems.length > 0" class="w-full lg:w-96 flex-shrink-0">
                    <div class="bg-white p-6 rounded-2xl shadow-sm border border-primary/5 sticky top-28">
                        <h2 class="text-lg font-bold text-primary mb-6">Shopping Summary</h2>

                        <div class="flex items-center justify-between mb-4">
                            <span class="text-primary/80">Total Items</span>
                            <span class="font-medium text-primary">{{ cartTotalItems }}</span>
                        </div>

                        <div class="border-t border-gray-100 my-4"></div>

                        <div class="flex items-center justify-between mb-6">
                            <span class="font-bold text-primary text-lg">Total Estimasi</span>
                            <span class="font-bold text-primary text-lg">-</span>
                        </div>

                        <button
                            class="w-full bg-primary text-white py-4 rounded-full font-semibold text-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-2">
                            Buy Now ({{ cartTotalItems }})
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useCart } from '~/composables/useCart'

const { cartItems, removeFromCart, updateQuantity, cartTotalItems } = useCart()
</script>
