<template>
    <div class="mt-12 mb-8">
        <div class="flex items-center justify-between mb-6">
            <h2 class="text-3xl font-bold text-primary">{{ title }}</h2>
            <div v-if="showRefresh"
                class="bg-white px-4 py-2 rounded-xl shadow-sm border border-primary/5 flex items-center justify-center">
                <button @click="randomizeProducts"
                    class="text-accent text-sm font-semibold hover:brightness-95 flex items-center gap-1.5 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                        stroke="currentColor" class="w-4 h-4" :class="{ 'animate-spin text-accent': isRefreshing }">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                    </svg>
                    Refresh
                </button>
            </div>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4 transition-opacity duration-300"
            :class="{ 'opacity-50': isRefreshing }">
            <div v-for="product in displayProducts" :key="product.id"
                class="bg-white rounded-xl border border-primary/10 overflow-hidden flex flex-col group hover:shadow-md transition-shadow cursor-pointer">
                <div class="h-40 bg-gray-50 flex items-center justify-center p-4 relative">
                    <img :src="product.image" :alt="product.name"
                        class="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div class="p-4 flex flex-col flex-grow">
                    <h3 class="text-sm text-primary/80 line-clamp-2 min-h-[40px] mb-2">{{ product.name }}</h3>
                    <p class="text-base font-bold text-primary mb-1">{{ formatPrice(product.price) }}</p>

                    <div class="flex items-center gap-2 mb-3" v-if="product.originalPrice">
                        <span class="text-xs text-primary/40 line-through">{{ formatPrice(product.originalPrice)
                            }}</span>
                        <span class="text-[10px] font-bold text-red-500 bg-red-50 px-1.5 py-0.5 rounded">{{
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
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useCart } from '~/composables/useCart'

const props = defineProps({
    title: {
        type: String,
        default: 'Rekomendasi untukmu'
    },
    count: {
        type: Number,
        default: 6
    },
    showRefresh: {
        type: Boolean,
        default: true
    }
})

const { addToCart } = useCart()
const displayProducts = ref([])
const isRefreshing = ref(false)

const allRecommendations = [
    { id: 1, name: 'Wall Shelving Unit', price: 4200000, rating: 4.5, sold: 76, image: '/images/shelves/wall-shelf.png' },
    { id: 2, name: 'Twin Nest Coffee Table', price: 3100000, originalPrice: 3500000, discount: '11%', rating: 4.6, sold: 85, image: '/images/table/twin-nest-coffee-table.png' },
    { id: 3, name: 'Cocoon Lounge Chair', price: 5800000, originalPrice: 6500000, discount: '11%', rating: 4.9, sold: 210, image: '/images/chair/cocoon-lounge-chair.png' },
    { id: 4, name: 'Nightstand Oak', price: 1900000, rating: 4.5, sold: 67, image: '/images/nightstand/nightstand-oak.png' },
    { id: 5, name: 'Side Table', price: 1800000, rating: 4.4, sold: 118, image: '/images/table/side-table.png' },
    { id: 6, name: 'Accent Chair', price: 3400000, rating: 4.4, sold: 91, image: '/images/chair/accent-chair.png' },
    { id: 7, name: 'Pandora Ottoman Bed', price: 12000000, originalPrice: 14000000, discount: '14%', rating: 4.7, sold: 38, image: '/images/bed/pandora-ottoman-bed.png' },
    { id: 8, name: 'White Shaker Cabinet', price: 22900000, rating: 4.7, sold: 28, image: '/images/kitchen-set/white-shaker-cabinets.png' },
    { id: 9, name: 'Floating Shelf', price: 1050000, originalPrice: 1200000, discount: '12%', rating: 4.5, sold: 234, image: '/images/shelves/floating-shelf.png' },
    { id: 10, name: 'Nightstand Walnut', price: 2300000, rating: 4.8, sold: 112, image: '/images/nightstand/nightstand-walnut.png' },
    { id: 11, name: 'Canopy Bed', price: 18500000, rating: 4.9, sold: 21, image: '/images/bed/canopy-bed.png' },
    { id: 12, name: 'Dining Table', price: 7200000, rating: 4.7, sold: 72, image: '/images/table/dining-table.png' },
    { id: 13, name: 'Kitchen Island', price: 18000000, rating: 4.8, sold: 19, image: '/images/kitchen-set/kitchen-island.png' },
    { id: 14, name: 'Bookcase', price: 2100000, rating: 4.6, sold: 107, image: '/images/shelves/bookcase.png' },
    { id: 15, name: 'Study Desk', price: 3800000, rating: 4.6, sold: 99, image: '/images/table/study-desk.png' }
]

const formatPrice = (price) => {
    if (!price) return '0'
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(price)
}

const randomizeProducts = () => {
    if (isRefreshing.value) return
    isRefreshing.value = true

    setTimeout(() => {
        const shuffled = [...allRecommendations].sort(() => 0.5 - Math.random())
        displayProducts.value = shuffled.slice(0, props.count)
        isRefreshing.value = false
    }, 400)
}

onMounted(() => {
    randomizeProducts()
})
</script>
