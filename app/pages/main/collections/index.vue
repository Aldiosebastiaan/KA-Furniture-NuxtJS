<template>
  <div class="min-h-screen bg-secondary pb-24" :class="{ 'opacity-0': !pageReady }">
    <!-- Hero Section -->
    <section class="relative pt-12 pb-16 px-6 md:px-16 lg:px-24">
      <div class="max-w-7xl mx-auto flex flex-col items-center text-center">
        <h1 class="text-4xl md:text-6xl font-bold text-primary mb-4 tracking-tight collection-title">
          Curated Collections
        </h1>
        <p class="text-primary/70 max-w-xl text-lg mb-8 collection-subtitle">
          Explore our thoughtfully assembled furniture sets designed to bring harmony and style to every room in your
          home.
        </p>
      </div>
    </section>

    <!-- Collections Grid -->
    <section class="px-6 md:px-16 lg:px-24">
      <div class="max-w-7xl mx-auto flex flex-col gap-16">
        <div v-for="(collection, index) in collections" :key="collection.id"
          class="group flex flex-col lg:flex-row gap-8 lg:gap-12 items-center collection-card"
          :class="{ 'lg:flex-row-reverse': index % 2 !== 0 }">
          <!-- Main Image Showcase -->
          <div class="w-full lg:w-3/5 relative rounded-3xl overflow-hidden shadow-2xl">
            <div class="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-500 z-10">
            </div>
            <img :src="collection.coverImage" :alt="collection.title"
              class="w-full h-[400px] md:h-[500px] object-cover transition-transform duration-700 group-hover:scale-105" />

            <!-- Floating Badge -->
            <div class="absolute top-6 left-6 z-20 bg-secondary/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
              <span class="text-primary text-xs font-bold tracking-wider uppercase">{{ collection.season }}</span>
            </div>
          </div>

          <!-- Collection Info -->
          <div class="w-full lg:w-2/5 flex flex-col justify-center">
            <h2 class="text-3xl md:text-4xl font-bold text-primary mb-4">{{ collection.title }}</h2>
            <p class="text-primary/70 mb-8 leading-relaxed">
              {{ collection.description }}
            </p>

            <!-- Mini Products Grid -->
            <div class="grid grid-cols-3 gap-4 mb-8">
              <div v-for="product in collection.products" :key="product.id"
                class="bg-white rounded-xl p-2 shadow-sm border border-primary/5 hover:border-accent hover:shadow-md transition-all cursor-pointer group/item"
                @click="openPreview(product)">
                <div
                  class="aspect-square bg-primary/5 rounded-lg mb-2 overflow-hidden flex items-center justify-center p-2 relative">
                  <img :src="product.image" :alt="product.name"
                    class="w-full h-full object-contain group-hover/item:scale-110 group-hover/item:blur-sm transition-all duration-300" />
                  <!-- Overlay Text -->
                  <div
                    class="absolute inset-0 flex items-center justify-center opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 bg-primary/10">
                    <span
                      class="bg-secondary/90 text-primary text-[10px] font-bold px-2 py-1 rounded-full shadow-sm border border-primary/10 backdrop-blur-md">Quick
                      Preview</span>
                  </div>
                </div>
                <p class="text-primary text-[10px] font-semibold truncate text-center">{{ product.name }}</p>
              </div>
            </div>

            <UiButton variant="accent" class="w-fit flex items-center gap-2 group/btn" to="/main/shop">
              Explore Collection
              <svg class="w-4 h-4 transition-transform group-hover/btn:translate-x-1" fill="none" stroke="currentColor"
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </UiButton>
          </div>
        </div>
      </div>
    </section>

    <!-- Craftsmanship Section -->
    <section class="mt-16 relative py-20 px-6 md:px-16 lg:px-24 bg-primary text-secondary overflow-hidden">
      <!-- Decorative elements -->
      <div class="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
      <div class="absolute bottom-0 left-0 w-80 h-80 bg-secondary/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4"></div>
      
      <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-16 relative z-10">
        <div class="w-full md:w-1/2">
          <img src="/images/section/banner-section.png" alt="Craftsmanship" class="w-full h-[350px] md:h-[450px] object-cover rounded-3xl shadow-2xl border border-secondary/10" />
        </div>
        <div class="w-full md:w-1/2 flex flex-col items-start">
          <span class="text-accent text-sm font-bold tracking-widest uppercase mb-4">Our Philosophy</span>
          <h2 class="text-3xl md:text-5xl font-bold mb-6 leading-tight">The Art of <br/> Craftsmanship</h2>
          <p class="text-secondary/70 text-lg mb-8 leading-relaxed max-w-lg">
            Every piece in our collection is born from a passion for exceptional design and sustainable materials. We partner with master artisans to bring you furniture that stands the test of time, both in durability and timeless aesthetics.
          </p>
          <UiButton variant="accent" to="/main/shop" class="px-8 py-3 flex items-center gap-2 group/craft">
            Discover Our Story
            <svg class="w-4 h-4 transition-transform group-hover/craft:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </UiButton>
        </div>
      </div>
    </section>

    <!-- Newsletter Section -->
    <section class="py-24 px-6 md:px-16 lg:px-24">
      <div class="max-w-5xl mx-auto bg-muted rounded-[3rem] p-10 md:p-16 text-center relative overflow-hidden shadow-sm border border-primary/5">
        <div class="relative z-10 flex flex-col items-center">
          <span class="text-primary/50 text-sm font-bold tracking-widest uppercase mb-4">Stay Updated</span>
          <h2 class="text-3xl md:text-4xl font-bold text-primary mb-4">Join The Inner Circle</h2>
          <p class="text-primary/70 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Be the first to know about our newest collections, exclusive events, and limited-time offers directly in your inbox.
          </p>
          
          <form @submit.prevent class="flex flex-col sm:flex-row gap-4 w-full max-w-lg mx-auto">
            <input type="email" placeholder="Enter your email address" required
              class="flex-1 bg-white/80 backdrop-blur-sm border border-primary/10 rounded-xl px-6 py-3 md:py-4 text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all placeholder:text-primary/40" />
            <button type="submit" class="bg-primary text-secondary hover:bg-primary/90 font-semibold px-8 py-3 md:py-4 rounded-xl transition-colors shadow-md">
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>

    <!-- Product Preview Modal -->
    <Transition name="fade">
      <div v-if="selectedProduct" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-primary/40 backdrop-blur-sm" @click="closePreview"></div>

        <!-- Modal Content -->
        <div
          class="relative w-full max-w-5xl bg-secondary rounded-3xl p-6 md:p-8 shadow-2xl flex flex-col md:flex-row gap-6 items-center transform transition-all modal-content">
          <!-- Close Button -->
          <button @click="closePreview"
            class="absolute top-4 right-4 text-primary/50 hover:text-primary transition-colors bg-white/50 hover:bg-white rounded-full p-2 z-10">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <!-- Product Image -->
          <div
            class="w-full md:w-1/2 aspect-square bg-primary/5 rounded-2xl p-4 flex items-center justify-center relative">
            <img :src="selectedProduct.image" :alt="selectedProduct.name"
              class="w-full h-full object-contain drop-shadow-lg" />
          </div>

          <!-- Product Details -->
          <div class="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
            <h3 class="text-3xl md:text-4xl font-bold text-primary mb-3">{{ selectedProduct.name }}</h3>
            <p class="text-primary/70 text-base md:text-lg mb-8 leading-relaxed">Experience the perfect blend of comfort and style
              with this premium piece.</p>

            <UiButton variant="accent" class="w-full flex justify-center" @click="goToShop(selectedProduct.name)">
              View in Shop
            </UiButton>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const pageReady = ref(false)
const selectedProduct = ref(null)

onMounted(() => {
  setTimeout(() => { pageReady.value = true }, 100)
})

const openPreview = (product) => {
  selectedProduct.value = product
}

const closePreview = () => {
  selectedProduct.value = null
}

const goToShop = (productName) => {
  // Simple navigation to shop
  router.push('/main/shop')
}

const collections = [
  {
    id: 1,
    title: 'Scandinavian Serenity',
    season: 'Spring 2026',
    description: 'Embrace the minimalist beauty of Nordic design. Featuring light woods, clean lines, and functional elegance that brings a breath of fresh air to your living space.',
    coverImage: '/images/showcase/showcase-1.png',
    products: [
      { id: 1, name: 'Cocoon Lounge', image: '/images/chair/cocoon-lounge-chair.png' },
      { id: 2, name: 'Twin Nest Table', image: '/images/table/twin-nest-coffee-table.png' },
      { id: 3, name: 'Wall Shelf', image: '/images/shelves/wall-shelf.png' },
    ]
  },
  {
    id: 2,
    title: 'Modern Master Bedroom',
    season: 'Timeless',
    description: 'Transform your bedroom into a sanctuary of rest. This collection pairs luxurious textures with modern silhouettes to create an atmosphere of pure relaxation.',
    coverImage: '/images/showcase/showcase-2.png',
    products: [
      { id: 4, name: 'Pandora Bed', image: '/images/bed/pandora-ottoman-bed.png' },
      { id: 5, name: 'Nightstand Oak', image: '/images/nightstand/nightstand-oak.png' },
      { id: 6, name: 'Accent Chair', image: '/images/chair/accent-chair.png' },
    ]
  },
  {
    id: 3,
    title: 'Culinary Elegance',
    season: 'Chef\'s Choice',
    description: 'Elevate your dining and cooking experience with our premium kitchen collection. Combining robust materials with sleek aesthetics for the heart of your home.',
    coverImage: '/images/showcase/showcase-6.png',
    products: [
      { id: 7, name: 'Kitchen Island', image: '/images/kitchen-set/kitchen-island.png' },
      { id: 8, name: 'Malaga Chair', image: '/images/chair/malaga-dining-chair.png' },
      { id: 9, name: 'Display Cabinet', image: '/images/shelves/display-cabinet.png' },
    ]
  }
]
</script>

<style scoped>
div {
  transition: opacity 0.6s ease-out;
}

.collection-title {
  animation: slideDown 0.6s ease-out forwards;
}

.collection-subtitle {
  animation: slideUp 0.8s ease-out forwards;
  opacity: 0;
  animation-delay: 0.2s;
}

.collection-card {
  animation: fadeUp 0.8s ease-out forwards;
  opacity: 0;
}

.collection-card:nth-child(1) {
  animation-delay: 0.3s;
}

.collection-card:nth-child(2) {
  animation-delay: 0.5s;
}

.collection-card:nth-child(3) {
  animation-delay: 0.7s;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.modal-content {
  animation: popIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes popIn {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(10px);
  }

  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}
</style>