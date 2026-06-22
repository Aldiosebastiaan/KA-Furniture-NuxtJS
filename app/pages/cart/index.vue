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

                    <div v-else class="flex flex-col gap-4 sm:gap-6">
                        <!-- Toolbar: Pilih Semua, Search, Category Filter -->
                        <div
                            class="bg-white p-4 sm:px-6 rounded-2xl shadow-sm border border-primary/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div class="flex items-center gap-3 w-full sm:w-auto">
                                <input type="checkbox" id="selectAll"
                                    class="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary accent-primary cursor-pointer"
                                    v-model="isAllFilteredSelected" />
                                <label for="selectAll" class="font-medium text-primary cursor-pointer select-none">
                                    Pilih Semua ({{ filteredCheckedCartItemsCount }})
                                </label>
                            </div>

                            <div class="flex items-center gap-3 w-full sm:w-auto flex-grow justify-end">
                                <div class="relative w-full sm:w-48 lg:w-64">
                                    <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                            stroke-width="2" stroke="currentColor" class="w-4 h-4 text-gray-400">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                        </svg>
                                    </span>
                                    <input type="text" placeholder="Search Items" v-model="searchQuery"
                                        class="w-full border border-gray-200 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/80 focus:border-primary transition-colors text-primary" />
                                </div>
                                <div class="relative w-full sm:w-48 lg:w-48">
                                    <span class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                            stroke-width="1.5" stroke="currentColor" class="w-4 h-4 text-gray-400">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
                                        </svg>
                                    </span>
                                    <button @click="isCategoryOpen = !isCategoryOpen"
                                        class="w-full border border-gray-200 rounded-lg pl-10 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/80 focus:border-primary transition-colors text-primary bg-white flex justify-between items-center text-left">
                                        <span class="truncate">{{ selectedCategory }}</span>
                                        <span
                                            class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                stroke-width="2" stroke="currentColor"
                                                class="w-4 h-4 text-gray-400 transition-transform"
                                                :class="{ 'rotate-180': isCategoryOpen }">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                    d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                            </svg>
                                        </span>
                                    </button>
                                    <div v-if="isCategoryOpen"
                                        class="absolute z-[60] w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto py-1">
                                        <div v-for="cat in categories" :key="cat"
                                            @click="selectedCategory = cat; isCategoryOpen = false"
                                            class="px-4 py-2 text-sm text-primary hover:bg-primary/5 cursor-pointer transition-colors"
                                            :class="{ 'font-semibold bg-primary/5': selectedCategory === cat }">
                                            {{ cat }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div v-if="filteredCartItems.length === 0"
                            class="py-12 text-center text-primary/50 border border-dashed border-primary/20 rounded-2xl">
                            <p>Tidak ada item yang sesuai dengan pencarian/filter.</p>
                        </div>
                        <div v-else v-for="item in filteredCartItems" :key="item.name"
                            class="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-primary/5">

                            <div class="flex items-center gap-3 sm:gap-6 w-full sm:w-auto flex-grow">
                                <!-- Checkbox (Placeholder) -->
                                <div class="flex-shrink-0">
                                    <input type="checkbox"
                                        class="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary accent-primary cursor-pointer"
                                        :checked="item.selected !== false" @change="toggleItemSelection(item.name)" />
                                </div>

                                <!-- Product Image -->
                                <div
                                    class="w-20 h-20 sm:w-24 sm:h-24 bg-primary/5 rounded-xl flex items-center justify-center p-2 sm:p-3 flex-shrink-0">
                                    <img :src="item.image" :alt="item.name" class="w-full h-full object-contain" />
                                </div>

                                <!-- Product Details -->
                                <div class="flex-grow">
                                    <h3
                                        class="text-primary font-semibold text-base sm:text-lg leading-tight mb-1 sm:mb-2 line-clamp-2">
                                        {{ item.name }}</h3>
                                    <p class="text-primary/70 text-sm">{{ item.quantity }} x {{ formatPrice(item.price)
                                        }}</p>
                                </div>
                            </div>

                            <!-- Quantity and Delete -->
                            <div
                                class="w-full sm:w-auto flex justify-end items-center sm:block pt-3 sm:pt-0 mt-1 sm:mt-0 border-t border-gray-100 sm:border-none">
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

                    <!-- Rekomendasi Untukmu -->
                    <div class="mt-12 mb-8">
                        <h2 class="text-3xl font-bold text-primary mb-6">Rekomendasi untukmu</h2>
                        <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                            <div v-for="product in recommendations" :key="product.id"
                                class="bg-white rounded-xl border border-primary/10 overflow-hidden flex flex-col group hover:shadow-md transition-shadow cursor-pointer">
                                <!-- Image -->
                                <div class="h-40 bg-gray-50 flex items-center justify-center p-4 relative">
                                    <img :src="product.image" :alt="product.name"
                                        class="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300" />
                                </div>
                                <!-- Info -->
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

                        <button
                            class="w-full border border-gray-200 rounded-xl p-4 flex items-center justify-between hover:bg-gray-50 transition-colors mb-6 group">
                            <div
                                class="flex items-center gap-3 text-primary/60 group-hover:text-primary transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke-width="1.5" stroke="primary" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z" />
                                </svg>
                                <span class="font-medium text-sm">There are no promotions yet</span>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                                stroke="currentColor"
                                class="w-4 h-4 text-primary/40 group-hover:text-primary/70 transition-colors">
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
    </div>
</template>

<script setup>
import { useCart } from '~/composables/useCart'

const { cartItems, removeFromCart, updateQuantity, selectedCartTotalItems, checkedCartItemsCount, cartTotalPrice, toggleItemSelection, toggleSelectAll, addToCart } = useCart()

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
const isCategoryOpen = ref(false)
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
