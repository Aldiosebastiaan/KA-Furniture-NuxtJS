<template>
    <div class="min-h-screen bg-[#FDFBF7]/80 py-12 px-6 md:px-16 lg:px-24 font-montserrat relative">
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

                    <div v-else class="flex flex-col gap-4 sm:gap-6">
                        <!-- Toolbar: Pilih Semua, Search, Category Filter -->
                        <UiToolbar v-model:isAllSelected="isAllFilteredSelected" v-model:searchQuery="searchQuery"
                            v-model:selectedCategory="selectedCategory" :selectedCount="filteredCheckedCartItemsCount"
                            :categories="categories" />

                        <div v-if="filteredCartItems.length === 0"
                            class="py-12 text-center text-primary/50 border border-dashed border-primary/20 rounded-2xl">
                            <p>Tidak ada item yang sesuai dengan pencarian/filter.</p>
                        </div>
                        <div v-else v-for="item in filteredCartItems" :key="item.name"
                            class="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-primary/5">

                            <div class="flex items-center gap-3 sm:gap-6 w-full sm:w-auto flex-grow">
                                <div class="flex-shrink-0">
                                    <input type="checkbox"
                                        class="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary accent-primary cursor-pointer"
                                        :checked="item.selected !== false" @change="toggleItemSelection(item.name)" />
                                </div>

                                <div
                                    class="w-20 h-20 sm:w-24 sm:h-24 bg-primary/5 rounded-xl flex items-center justify-center p-2 sm:p-3 flex-shrink-0">
                                    <img :src="item.image" :alt="item.name" class="w-full h-full object-contain" />
                                </div>

                                <div class="flex-grow">
                                    <h3
                                        class="text-primary font-semibold text-base sm:text-lg leading-tight mb-1 sm:mb-2 line-clamp-2">
                                        {{ item.name }}</h3>
                                    <p class="text-primary/70 text-sm">{{ item.quantity }} x {{ formatPrice(item.price)
                                    }}</p>
                                </div>
                            </div>

                            <div
                                class="w-full sm:w-auto flex justify-end items-center sm:block pt-3 sm:pt-0 mt-1 sm:mt-0 border-t border-gray-100 sm:border-none">
                                <div class="flex items-center gap-4">
                                    <!-- Tombol Hapus memicu Modal -->
                                    <button @click="openDeleteModal(item)"
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

                    <!-- Rekomendasi Untukmu -->
                    <div class="mt-12 mb-8">
                        <h2 class="text-3xl font-bold text-primary mb-6">Rekomendasi untukmu</h2>
                        <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                            <div v-for="product in recommendations" :key="product.id"
                                class="bg-white rounded-xl border border-primary/10 overflow-hidden flex flex-col group hover:shadow-md transition-shadow cursor-pointer">
                                <div class="h-40 bg-gray-50 flex items-center justify-center p-4 relative">
                                    <img :src="product.image" :alt="product.name"
                                        class="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300" />
                                </div>
                                <div class="p-4 flex flex-col flex-grow">
                                    <h3 class="text-sm text-primary/80 line-clamp-2 min-h-[40px] mb-2">{{ product.name
                                        }}</h3>
                                    <p class="text-base font-bold text-primary mb-1">{{ formatPrice(product.price) }}
                                    </p>

                                    <div class="flex items-center gap-2 mb-3" v-if="product.originalPrice">
                                        <span class="text-xs text-primary/40 line-through">{{
                                            formatPrice(product.originalPrice) }}</span>
                                        <span
                                            class="text-[10px] font-bold text-red-500 bg-red-50 px-1.5 py-0.5 rounded">{{
                                                product.discount }}</span>
                                    </div>
                                    <div v-else class="mb-3 h-4"></div>

                                    <div class="flex items-center gap-1.5 text-xs text-primary/50 mb-4">
                                        <span class="text-yellow-400">⭐</span>
                                        <span>{{ product.rating }}</span>
                                        <span>|</span>
                                        <span>Terjual {{ product.sold }}</span>
                                    </div>

                                    <div class="mt-auto">
                                        <button @click.stop="addToCart(product, $event)"
                                            class="w-full py-1.5 border border-primary text-primary text-sm font-semibold rounded-lg hover:bg-primary/5 transition-colors">
                                            + Keranjang
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
                        <h2 class="text-lg font-bold text-primary mb-6">Shopping summary</h2>

                        <div class="flex items-center justify-between mb-4">
                            <span class="text-primary/80">Total</span>
                            <span class="font-bold text-primary text-xl">{{ formatPrice(filteredCartTotalPrice)
                                }}</span>
                        </div>

                        <div class="border-t border-gray-100 my-4"></div>

                        <button @click="isPromoModalOpen = true"
                            class="w-full border border-[#2CD3B5] bg-[#F2FCF9] rounded-xl p-4 flex items-center justify-between hover:bg-[#E6FBF7] transition-colors mb-6 group">
                            <div class="flex items-center gap-4">
                                <svg width="36" height="26" viewBox="0 0 36 26" fill="none"
                                    xmlns="http://www.w3.org/2000/svg" class="flex-shrink-0">
                                    <path
                                        d="M3 4C3 2.34315 4.34315 1 6 1H30C31.6569 1 33 2.34315 33 4V7C30.2386 7 28 9.23858 28 12C28 14.7614 30.2386 17 33 17V21C33 22.6569 31.6569 24 30 24H6C4.34315 24 3 22.6569 3 21V17C5.76142 17 8 14.7614 8 12C8 9.23858 5.76142 7 3 7V4Z"
                                        fill="#FDE047" />
                                    <path
                                        d="M3 21C3 22.6569 4.34315 24 6 24H30C31.6569 24 33 22.6569 33 21V21C33 22.6569 31.6569 24 30 24H6C4.34315 24 3 22.6569 3 21V21Z"
                                        fill="#EAB308" />
                                    <path
                                        d="M3 7C5.76142 7 8 9.23858 8 12C8 14.7614 5.76142 17 3 17V21C3 22.6569 4.34315 24 6 24H30C31.6569 24 33 22.6569 33 21V17C30.2386 17 28 14.7614 28 12C28 9.23858 30.2386 7 33 7V4C33 2.34315 31.6569 1 30 1H6C4.34315 1 3 2.34315 3 4V7Z"
                                        stroke="#F59E0B" stroke-width="2" />
                                    <line x1="25" y1="4" x2="25" y2="21" stroke="#F59E0B" stroke-width="1.5"
                                        stroke-dasharray="2 2" />
                                    <path
                                        d="M11 9L18 16M13.5 14.5C13.5 15.3284 12.8284 16 12 16C11.1716 16 10.5 15.3284 10.5 14.5C10.5 13.6716 11.1716 13 12 13C12.8284 13 13.5 13.6716 13.5 14.5ZM17.5 10.5C17.5 11.3284 16.8284 12 16 12C15.1716 12 14.5 11.3284 14.5 10.5C14.5 9.67157 15.1716 9 16 9C16.8284 9 17.5 9.67157 17.5 10.5Z"
                                        stroke="#F59E0B" stroke-width="2" stroke-linecap="round" />
                                </svg>
                                <span class="text-[15px] font-medium text-gray-800 text-left leading-snug">Pilih
                                    salah satu produk sebelum pakai promo, yaa!</span>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                                stroke="currentColor" class="w-5 h-5 text-gray-400 flex-shrink-0 ml-2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                        </button>

                        <NuxtLink to="/checkout"
                            class="w-full bg-primary text-white py-4 rounded-xl font-semibold text-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-2">
                            Buy Now ({{ filteredSelectedCartTotalItems }})
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </div>
        <<<<<<< HEAD <!-- Pop-Up Modal Konfirmasi Delete -->
            <UiDeleteConfirmModal :isOpen="isDeleteModalOpen" :itemName="itemToDelete?.name" @close="closeDeleteModal"
                @confirm="confirmDelete" />
            =======
            <!-- Promo Modal -->
            <CartPromoModal v-model:isOpen="isPromoModalOpen" />
            >>>>>>> develop
    </div>
</template>

<script setup>
import { useCart } from '~/composables/useCart'
import { ref, computed } from 'vue'

const { cartItems, removeFromCart, updateQuantity, selectedCartTotalItems, checkedCartItemsCount, cartTotalPrice, toggleItemSelection, toggleSelectAll, addToCart } = useCart()

// State & Fungsi untuk Modal Delete
const isDeleteModalOpen = ref(false)
const itemToDelete = ref(null)

const openDeleteModal = (item) => {
    itemToDelete.value = item
    isDeleteModalOpen.value = true
}

const closeDeleteModal = () => {
    isDeleteModalOpen.value = false
    itemToDelete.value = null
}

const confirmDelete = () => {
    if (itemToDelete.value) {
        removeFromCart(itemToDelete.value.name)
        closeDeleteModal()
    }
}

const recommendations = [
    { id: 3, name: 'Cocoon Lounge Chair', price: 5800000, originalPrice: 6500000, discount: '11%', rating: 4.9, sold: 210, image: '/images/chair/cocoon-lounge-chair.png' },
    { id: 16, name: 'Pandora Ottoman Bed', price: 12000000, originalPrice: 14000000, discount: '14%', rating: 4.7, sold: 38, image: '/images/bed/pandora-ottoman-bed.png' },
    { id: 19, name: 'Twin Nest Coffee Table', price: 3100000, originalPrice: 3500000, discount: '11%', rating: 4.6, sold: 85, image: '/images/table/twin-nest-coffee-table.png' },
    { id: 29, name: 'White Shaker Cabinet', price: 22900000, rating: 4.7, sold: 28, image: '/images/kitchen-set/white-shaker-cabinets.png' },
    { id: 31, name: 'Floating Shelf', price: 1050000, originalPrice: 1200000, discount: '12%', rating: 4.5, sold: 234, image: '/images/shelves/floating-shelf.png' },
    { id: 40, name: 'Nightstand Walnut', price: 2300000, rating: 4.8, sold: 112, image: '/images/nightstand/nightstand-walnut.png' },
]

const isAllSelected = computed({
    get: () => cartItems.value.length > 0 && cartItems.value.every(item => item.selected !== false),
    set: (val) => toggleSelectAll(val)
})

const categories = ['All Categories', 'Chair', 'Bed', 'Kitchen Set', 'Shelves', 'Nightstand', 'Table']
const selectedCategory = ref('All Categories')
const searchQuery = ref('')

const filteredCartItems = computed(() => {
    let items = cartItems.value

    if (selectedCategory.value !== 'All Categories') {
        const catMap = {
            'Chair': 'chair',
            'Bed': 'bed',
            'Table': 'table',
            'Kitchen Set': 'kitchen-set',
            'Shelves': 'shelves',
            'Nightstand': 'nightstand'
        }
        const keyword = catMap[selectedCategory.value]
        if (keyword) {
            items = items.filter(item => item.image.includes(`/${keyword}/`))
        }
    }

    if (searchQuery.value) {
        items = items.filter(item => item.name.toLowerCase().includes(searchQuery.value.toLowerCase()))
    }

    return items
})

const isAllFilteredSelected = computed({
    get: () => filteredCartItems.value.length > 0 && filteredCartItems.value.every(item => item.selected !== false),
    set: (val) => {
        filteredCartItems.value.forEach(item => {
            item.selected = val
        })
    }
})

const filteredCheckedCartItemsCount = computed(() => {
    return filteredCartItems.value.filter(item => item.selected !== false).length
})

const filteredSelectedCartTotalItems = computed(() => {
    return filteredCartItems.value
        .filter(item => item.selected !== false)
        .reduce((total, item) => total + item.quantity, 0)
})

const filteredCartTotalPrice = computed(() => {
    return filteredCartItems.value
        .filter(item => item.selected !== false)
        .reduce((total, item) => total + (item.price * item.quantity), 0)
})

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
