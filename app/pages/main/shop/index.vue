<template>
  <div class="min-h-screen" :class="{ 'opacity-0': !pageReady }">

    <!-- Promo Carousel -->
    <section class="px-6 md:px-16 lg:px-24 pt-8 pb-6">
      <div class="max-w-7xl mx-auto">
        <div class="relative w-full rounded-3xl overflow-hidden" style="height: 280px;">
          <TransitionGroup name="carousel">
            <div v-for="(slide, index) in promoSlides" :key="slide.id" v-show="activeSlide === index"
              class="absolute inset-0">
              <img :src="slide.image" :alt="slide.alt" class="w-full h-full object-cover" />
              <div class="absolute inset-0 bg-black/30 flex flex-col justify-center px-12">
                <span class="text-accent text-sm font-semibold mb-2 uppercase tracking-widest">
                  {{ slide.tag }}
                </span>
                <h2 class="text-secondary text-3xl md:text-4xl font-bold max-w-md leading-tight">
                  {{ slide.title }}
                </h2>
                <p class="text-secondary/70 text-sm mt-2 max-w-sm">{{ slide.desc }}</p>
                <UiButton variant="accent" to="/main/shop" class="mt-5 w-fit">{{ slide.cta }}</UiButton>
              </div>
            </div>
          </TransitionGroup>

          <!-- Dots -->
          <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            <button v-for="(_, i) in promoSlides" :key="i" @click="activeSlide = i"
              class="h-2 rounded-full transition-all duration-300"
              :class="activeSlide === i ? 'w-6 bg-accent' : 'w-2 bg-white/50'" />
          </div>

          <!-- Arrows -->
          <button @click="prevSlide"
            class="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center text-white transition-all">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button @click="nextSlide"
            class="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center text-white transition-all">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <section class="px-6 md:px-16 lg:px-24 pb-20">
      <div class="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">

        <!-- LEFT SIDEBAR -->
        <aside class="w-full lg:w-64 shrink-0 flex flex-col gap-8">

          <!-- Search -->
          <div class="relative">
            <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/40" fill="none"
              stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input v-model="searchQuery" type="text" placeholder="Search furniture..."
              class="w-full pl-9 pr-4 py-2.5 rounded-xl border border-primary/15 bg-transparent text-primary text-sm placeholder:text-primary/30 focus:outline-none hover:border-primary/40 hover:ring-1 hover:ring-primary/40 focus:border-primary/60 focus:ring-1 focus:ring-primary/60 transition-colors" />
          </div>

          <!-- Price Range -->
          <div>
            <p class="text-primary font-semibold text-sm mb-4">Rentang Harga</p>
            <div class="flex flex-col gap-3">
              <input type="range" v-model="priceRange" :min="0" :max="50000000" :step="500000"
                class="w-full accent-primary" />
              <div class="flex justify-between text-xs text-primary/50">
                <span>Rp 0</span>
                <span class="text-primary font-medium">{{ formatPrice(priceRange) }}</span>
              </div>
            </div>
          </div>

          <!-- Filter by Rating -->
          <div>
            <p class="text-primary font-semibold text-sm mb-4">Minimum Rating</p>
            <div class="flex flex-col gap-2">
              <label v-for="r in [4, 3]" :key="r" class="flex items-center gap-2 cursor-pointer group">
                <input type="radio" :value="r" v-model="minRating" class="accent-primary" />
                <span class="text-sm text-primary/70 group-hover:text-primary transition-colors">
                  {{ '⭐'.repeat(r) }} ke atas
                </span>
              </label>
              <label class="flex items-center gap-2 cursor-pointer group">
                <input type="radio" :value="0" v-model="minRating" class="accent-primary" />
                <span class="text-sm text-primary/70 group-hover:text-primary transition-colors">Semua</span>
              </label>
            </div>
          </div>

        </aside>

        <!-- RIGHT CONTENT -->
        <div class="flex-1 min-w-0">

          <!-- Category Tabs -->
          <div class="border-b border-primary/10 mb-8">
            <div class="flex gap-0 overflow-x-auto scrollbar-hide">
              <button v-for="cat in categories" :key="cat" @click="switchCategory(cat)"
                class="relative shrink-0 px-5 py-3 text-sm font-medium transition-all duration-200 whitespace-nowrap"
                :class="activeCategory === cat
                  ? 'text-primary'
                  : 'text-primary/40 hover:text-primary/70'">
                {{ cat }}
                <span v-if="activeCategory === cat"
                  class="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full" />
              </button>
            </div>
          </div>

          <!-- Loading Skeleton -->
          <Transition name="fade" mode="out-in">
            <div v-if="isLoading" key="skeleton" class="grid grid-cols-2 xl:grid-cols-3 gap-5">
              <div v-for="i in 6" :key="i" class="flex flex-col gap-3 animate-pulse">
                <div class="w-full rounded-2xl bg-primary/10" style="height: 220px;" />
                <div class="h-3 bg-primary/10 rounded-full w-3/4" />
                <div class="h-3 bg-primary/10 rounded-full w-1/2" />
                <div class="h-3 bg-primary/10 rounded-full w-2/3" />
              </div>
            </div>

            <!-- Product Grid -->
            <div v-else key="products">
              <Transition name="fade" mode="out-in">
                <div v-if="filteredProducts.length > 0" :key="activeCategory + searchQuery + priceRange + minRating"
                  class="grid grid-cols-2 xl:grid-cols-3 gap-5">
                  <div v-for="(product, i) in filteredProducts" :key="product.id"
                    class="flex flex-col gap-3 cursor-pointer group product-card"
                    :style="{ animationDelay: `${i * 60}ms` }">
                    <!-- Image Card -->
                    <div class="relative bg-primary rounded-2xl overflow-hidden flex items-center justify-center"
                      style="height: 290px;">
                      <button @click="addToCart(product, $event)"
                        class="absolute top-3 right-3 bg-accent text-primary text-xs font-semibold px-4 py-2 rounded-xl flex items-center gap-1.5 hover:brightness-95 transition-all opacity-100 z-10 shadow-sm cursor-pointer">
                        Simpan
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                          stroke="currentColor" class="w-3.5 h-3.5">
                          <path stroke-linecap="round" stroke-linejoin="round"
                            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                        </svg>
                      </button>
                      <img :src="product.image" :alt="product.name"
                        class="w-3/5 h-3/5 object-contain drop-shadow-lg transition-transform duration-300 group-hover:scale-105" />
                    </div>

                    <!-- Info -->
                    <div class="flex flex-col gap-1 px-1">
                      <p class="text-primary font-semibold text-sm leading-tight">{{ product.name }}</p>
                      <p class="text-primary font-bold text-base">{{ formatPrice(product.price) }}</p>
                      <div class="flex items-center gap-2 text-xs text-primary/50">
                        <span>⭐ {{ product.rating }}</span>
                        <span>·</span>
                        <span>{{ product.sold }} Terjual</span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Empty State -->
                <div v-else key="empty" class="flex flex-col items-center justify-center py-24 gap-4">
                  <svg class="w-16 h-16 text-primary/20" fill="none" stroke="currentColor" stroke-width="1.5"
                    viewBox="0 0 24 24">
                    <path d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                  </svg>
                  <p class="text-primary/40 text-sm">Produk tidak ditemukan</p>
                </div>
              </Transition>
            </div>
          </Transition>

        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useCart } from '~/composables/useCart'

const { addToCart } = useCart()

// ── Page entrance ──────────────────────────────────────────────
const pageReady = ref(false)
onMounted(() => {
  setTimeout(() => { pageReady.value = true }, 80)
  startCarousel()
  loadProducts()
})

// ── Carousel ───────────────────────────────────────────────────
const activeSlide = ref(0)
const promoSlides = [
  {
    id: 1,
    image: '/images/promo/promo-1.png',
    tag: 'Special Offer',
    title: 'Up to 40% Off Selected Items',
    desc: 'Limited time offer on our premium furniture collection.',
    cta: 'Shop Now',
    alt: 'Promo 1'
  },
  {
    id: 2,
    image: '/images/promo/promo-2.png',
    tag: 'New Arrival',
    title: 'Discover Our Latest Collection',
    desc: 'Fresh designs crafted with the finest materials.',
    cta: 'Explore',
    alt: 'Promo 2'
  },
  {
    id: 3,
    image: '/images/promo/promo-3.png',
    tag: 'Free Shipping',
    title: 'Free Delivery for Orders Over 2 Juta',
    desc: 'Enjoy free shipping across all major cities in Indonesia.',
    cta: 'Learn More',
    alt: 'Promo 3'
  },
]

let carouselTimer = null
function startCarousel() {
  carouselTimer = setInterval(() => {
    activeSlide.value = (activeSlide.value + 1) % promoSlides.length
  }, 4000)
}
function nextSlide() {
  activeSlide.value = (activeSlide.value + 1) % promoSlides.length
}
function prevSlide() {
  activeSlide.value = (activeSlide.value - 1 + promoSlides.length) % promoSlides.length
}

// ── Categories ─────────────────────────────────────────────────
const categories = ['For You', 'Chair', 'Bed', 'Table', 'Kitchen Set', 'Shelves', 'Nightstand']
const activeCategory = ref('For You')

// ── Filters ────────────────────────────────────────────────────
const searchQuery = ref('')
const priceRange = ref(50000000)
const minRating = ref(0)

// ── Products data ──────────────────────────────────────────────
const allProducts = {
  'For You': [
    { id: 1, name: 'Wall Shelving Unit', price: 4200000, rating: 4.5, sold: 76, image: '/images/shelves/wall-shelf.png' },
    { id: 2, name: 'Twin Nest Coffee Table', price: 3100000, rating: 4.6, sold: 85, image: '/images/table/twin-nest-coffee-table.png' },
    { id: 3, name: 'Cocoon Lounge Chair', price: 5800000, rating: 4.9, sold: 210, image: '/images/chair/cocoon-lounge-chair.png' },
    { id: 4, name: 'Nightstand Oak', price: 1900000, rating: 4.5, sold: 67, image: '/images/nightstand/nightstand-oak.png' },
    { id: 5, name: 'Side Table', price: 1800000, rating: 4.4, sold: 118, image: '/images/table/side-table.png' },
    { id: 6, name: 'Accent Chair', price: 3400000, rating: 4.4, sold: 91, image: '/images/chair/accent-chair.png' },
  ],
  'Chair': [
    { id: 7, name: 'Accent Chair', price: 3400000, rating: 4.4, sold: 91, image: '/images/chair/accent-chair.png' },
    { id: 8, name: 'Rocking Chair', price: 2800000, rating: 4.6, sold: 54, image: '/images/chair/rocking-chair.png' },
    { id: 9, name: 'Bar Stool', price: 1500000, rating: 4.3, sold: 113, image: '/images/chair/bar-stool-chair.png' },
    { id: 10, name: 'Malaga Dining Chair', price: 1600000, rating: 4.5, sold: 160, image: '/images/chair/malaga-dining-chair.png' },
    { id: 11, name: 'Glenda Dining Chair', price: 1300000, rating: 4.6, sold: 178, image: '/images/chair/glenda-dining-chair.png' },
    { id: 12, name: 'The Lamb Lounge Chair', price: 5800000, rating: 4.9, sold: 210, image: '/images/chair/lamb-lounge-chair.png' },
    { id: 13, name: 'Nuvola Dining Chair', price: 1200000, rating: 4.5, sold: 200, image: '/images/chair/nuvola-dining-chair.png' },
    { id: 14, name: 'Cocoon Lounge Chair', price: 4800000, rating: 4.8, sold: 221, image: '/images/chair/cocoon-lounge-chair.png' },
    { id: 15, name: 'Vanity Dining Chair', price: 1400000, rating: 4.7, sold: 189, image: '/images/chair/vanity-dining-chair.png' },
  ],
  'Bed': [
    { id: 16, name: 'Pandora Ottoman Bed', price: 12000000, rating: 4.7, sold: 38, image: '/images/bed/pandora-ottoman-bed.png' },
    { id: 14, name: 'Canopy Bed', price: 18500000, rating: 4.9, sold: 21, image: '/images/bed/canopy-bed.png' },
    { id: 15, name: 'Storage Bed', price: 9800000, rating: 4.5, sold: 55, image: '/images/bed/storage-bed.png' },
    { id: 16, name: 'Daybed', price: 6200000, rating: 4.4, sold: 47, image: '/images/bed/daybed.png' },
    { id: 17, name: 'Orthopedic Posture Master Bamboo', price: 7500000, rating: 4.3, sold: 62, image: '/images/bed/orthopedic-posture-master-bamboo.png' },
    { id: 18, name: 'Calley Bedside Table', price: 10200000, rating: 4.6, sold: 145, image: '/images/bed/calley-bedside-table.png' },
  ],
  'Table': [
    { id: 19, name: 'Twin Nest Coffee Table', price: 3100000, rating: 4.6, sold: 85, image: '/images/table/twin-nest-coffee-table.png' },
    { id: 20, name: 'Dining Table', price: 7200000, rating: 4.7, sold: 72, image: '/images/table/dining-table.png' },
    { id: 21, name: 'Side Table', price: 1800000, rating: 4.4, sold: 118, image: '/images/table/side-table.png' },
    { id: 22, name: 'Nordic Console Table', price: 4500000, rating: 4.5, sold: 44, image: '/images/table/nordic-console-table.png' },
    { id: 23, name: 'Study Desk', price: 3800000, rating: 4.6, sold: 99, image: '/images/table/study-desk.png' },
    { id: 24, name: 'Outdoor Table', price: 2900000, rating: 4.3, sold: 33, image: '/images/table/outdoor-table.png' },
  ],
  'Kitchen Set': [
    { id: 25, name: 'Kitchen Island', price: 18000000, rating: 4.8, sold: 19, image: '/images/kitchen-set/kitchen-island.png' },
    { id: 26, name: 'Bar Cabinet', price: 20000000, rating: 4.5, sold: 37, image: '/images/kitchen-set/bar-cabinet.png' },
    { id: 27, name: 'Kitchen Stool', price: 15200000, rating: 4.4, sold: 88, image: '/images/kitchen-set/kitchen-stool.png' },
    { id: 28, name: 'Wine Rack', price: 14200000, rating: 4.3, sold: 56, image: '/images/kitchen-set/wine-rack.png' },
    { id: 29, name: 'White Shaker Cabinet', price: 22900000, rating: 4.7, sold: 28, image: '/images/kitchen-set/white-shaker-cabinets.png' },
    { id: 30, name: 'White Drew Cabinet', price: 17300000, rating: 4.5, sold: 74, image: '/images/kitchen-set/white-drew-cabinet.png' },
  ],
  'Shelves': [
    { id: 31, name: 'Floating Shelf', price: 1050000, rating: 4.5, sold: 234, image: '/images/shelves/floating-shelf.png' },
    { id: 32, name: 'Bookcase', price: 2100000, rating: 4.6, sold: 107, image: '/images/shelves/bookcase.png' },
    { id: 33, name: 'Corner Shelf', price: 1200000, rating: 4.4, sold: 89, image: '/images/shelves/corner-shelf.png' },
    { id: 34, name: 'Display Cabinet', price: 3600000, rating: 4.7, sold: 52, image: '/images/shelves/display-cabinet.png' },
    { id: 35, name: 'Wall Shelving Unit', price: 4200000, rating: 4.5, sold: 76, image: '/images/shelves/wall-shelf.png' },
    { id: 36, name: 'Ladder Shelf', price: 1400000, rating: 4.3, sold: 93, image: '/images/shelves/ladder-shelf.png' },
  ],
  'Nightstand': [
    { id: 37, name: 'Nightstand Oak', price: 1900000, rating: 4.5, sold: 67, image: '/images/nightstand/nightstand-oak.png' },
    { id: 38, name: 'Nightstand Pine', price: 1700000, rating: 4.4, sold: 45, image: '/images/nightstand/nightstand-pine.png' },
    { id: 39, name: 'Nightstand Teak', price: 2100000, rating: 4.7, sold: 89, image: '/images/nightstand/nightstand-teak.png' },
    { id: 40, name: 'Nightstand Walnut', price: 2300000, rating: 4.8, sold: 112, image: '/images/nightstand/nightstand-walnut.png' },
  ],
}

// ── Loading state ──────────────────────────────────────────────
const isLoading = ref(false)
const products = ref([])

function loadProducts() {
  isLoading.value = true
  products.value = []
  setTimeout(() => {
    products.value = allProducts[activeCategory.value] || []
    isLoading.value = false
  }, 700)
}

function switchCategory(cat) {
  if (activeCategory.value === cat) return
  activeCategory.value = cat
  searchQuery.value = ''
  loadProducts()
}

// ── Filtered products ──────────────────────────────────────────
const filteredProducts = computed(() => {
  return products.value.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchPrice = p.price <= priceRange.value
    const matchRating = p.rating >= minRating.value
    return matchSearch && matchPrice && matchRating
  })
})

// ── Helpers ────────────────────────────────────────────────────
function formatPrice(val) {
  return 'Rp ' + Number(val).toLocaleString('id-ID')
}
</script>

<style scoped>
.fade-enter-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

.carousel-enter-active {
  transition: opacity 0.6s ease;
}

.carousel-leave-active {
  transition: opacity 0.6s ease;
}

.carousel-enter-from {
  opacity: 0;
}

.carousel-leave-to {
  opacity: 0;
}

/* page entrance */
div {
  transition: opacity 0.4s ease;
}

.product-card {
  animation: cardIn 0.4s ease both;
}

@keyframes cardIn {
  from {
    opacity: 0;
    transform: translateY(16px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
