<template>
    <section id="collection" class="px-6 md:px-16 lg:px-24 py-20">
        <div class="max-w-7xl mx-auto w-full animate-on-scroll">

            <!-- Header -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
                <h2 class="text-4xl md:text-5xl font-semibold text-primary leading-tight">
                    Our very special <br /> first collection
                </h2>
                <p class="text-primary/80 text-sm md:text-base leading-relaxed self-center">
                    Discover our special first collection with impeccable details, made by expert craftsmen
                    from the finest materials. Every product is an investment for your home.
                </p>
            </div>

            <!-- Filter Tabs -->
            <div class="flex items-center gap-3 flex-wrap mb-10">
                <UiButton v-for="tab in tabs" :key="tab" :variant="activeTab === tab ? 'accent' : 'ghost'"
                    @click="switchTab(tab)">
                    {{ tab }}
                </UiButton>
            </div>

            <!-- Product Grid -->
            <div class="relative overflow-hidden">
                <Transition name="fade-slide" mode="out-in">
                    <div :key="activeTab" class="grid grid-cols-2 lg:grid-cols-4" style="gap: 14px;">
                        <div v-for="product in currentProducts" :key="product.name" class="flex flex-col gap-3">
                            <!-- Card -->
                            <div class="relative bg-primary rounded-2xl overflow-hidden flex items-center justify-center group"
                                style="width: 100%; height: 290px;">
                                <!-- Badge Simpan -->
                                <button
                                    @click="addToCart(product)"
                                    class="absolute top-3 right-3 bg-accent text-primary text-xs font-semibold px-4 py-2 rounded-xl flex items-center gap-1.5 hover:brightness-95 transition-all opacity-0 group-hover:opacity-100 md:opacity-100 z-10 shadow-sm cursor-pointer">
                                    Simpan
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-3.5 h-3.5">
                                      <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                                    </svg>
                                </button>

                                <img :src="product.image" :alt="product.name"
                                    class="w-3/5 h-3/5 object-contain drop-shadow-lg group-hover:scale-105 transition-transform duration-300" />
                            </div>

                            <!-- Product Name -->
                            <p class="text-center text-primary font-semibold text-sm md:text-base">
                                {{ product.name }}
                            </p>
                        </div>
                    </div>
                </Transition>
            </div>

        </div>
    </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useCart } from '~/composables/useCart'

const { addToCart } = useCart()

const tabs = ['Shop now', 'Chair', 'Bed', 'Kitchen', 'Shleves']
const activeTab = ref('Shop now')

const allProducts = {
    'Shop now': [
        { name: 'The Lamb Lounge Chair', image: '/images/arm-chair-2.png' },
        { name: 'Twin Coffee Table', image: '/images/twin-nest-coffee-table.png' },
        { name: 'Cocoon Wood Lounge Chair', image: '/images/arm-chair-1.png' },
        { name: 'Wooden Rack', image: '/images/rack-5.png' },
    ],
    'Chair': [
        { name: 'Vanity Dining Chair', image: '/images/arm-chair-3.png' },
        { name: 'Malaga Dining Chair', image: '/images/arm-chair-4.png' },
        { name: 'Glenda Dining Chair', image: '/images/arm-chair-5.png' },
        { name: 'Nuvola Dining Chair', image: '/images/arm-chair-6.png' },
    ],
    'Bed': [
        { name: 'Pandora Ottoman Bed', image: '/images/bed-1.png' },
        { name: 'Canopy Bed', image: '/images/bed-2.png' },
        { name: 'Storage Bed', image: '/images/bed-3.png' },
        { name: 'Daybed', image: '/images/bed-4.png' },
    ],
    'Kitchen': [
        { name: 'Kitchen Island', image: '/images/kitchen-set-1.png' },
        { name: 'Stylish Bar Cabinet', image: '/images/kitchen-set-2.png' },
        { name: 'Kitchen Stool', image: '/images/kitchen-set-3.png' },
        { name: 'White Shaker Cabinets', image: '/images/kitchen-set-4.png' },
    ],
    'Shleves': [
        { name: 'Floating Shelf', image: '/images/rack-1.png' },
        { name: 'Bookcase', image: '/images/rack-2.png' },
        { name: 'Corner Shelf', image: '/images/rack-3.png' },
        { name: 'Display Cabinet', image: '/images/rack-4.png' },
    ],
}

const currentProducts = computed(() => allProducts[activeTab.value])

function switchTab(tab) {
    activeTab.value = tab
}
</script>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
    transition: all 0.35s ease;
}

.fade-slide-enter-from {
    opacity: 0;
    transform: translateY(16px);
}

.fade-slide-leave-to {
    opacity: 0;
    transform: translateY(-16px);
}
</style>