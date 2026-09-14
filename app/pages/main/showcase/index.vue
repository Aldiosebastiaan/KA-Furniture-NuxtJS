<template>
    <div class="min-h-screen bg-secondary selection:bg-accent selection:text-primary pb-24 overflow-x-hidden">

        <!-- ==================== 1. HERO & SPOTLIGHT PRODUCT ==================== -->
        <section class="relative pt-10 pb-20 px-6 md:px-16 lg:px-24">
            <div class="max-w-7xl mx-auto">


                <!-- Headline & Header -->
                <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
                    <div class="max-w-2xl">
                        <h1
                            class="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary tracking-tight leading-[1.15]">
                            Seni Furnitur & <br />
                            <span class="text-transparent bg-clip-text bg-primary">
                                Kekayaan Material
                            </span>
                        </h1>
                    </div>
                    <p class="text-primary/75 text-base lg:text-lg max-w-md leading-relaxed">
                        Menghadirkan keindahan abadi melalui perpaduan kayu jati pilihan, kain bertekstur mewah, serta
                        detail pengerjaan tangan berstandar tinggi.
                    </p>
                </div>

                <!-- Interactive Hero Showcase Box -->
                <div
                    class="relative bg-white/80 backdrop-blur-md rounded-3xl p-6 md:p-10 shadow-xl border border-primary/10 overflow-hidden">

                    <!-- Background Ambient Glow -->
                    <div
                        class="absolute -top-24 -right-24 w-96 h-96 bg-accent/15 rounded-full blur-3xl pointer-events-none">
                    </div>
                    <div
                        class="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none">
                    </div>

                    <!-- Product Switcher Tabs -->
                    <div class="flex flex-wrap items-center gap-3 mb-8 border-b border-primary/10 pb-5">
                        <span class="text-xs font-bold tracking-wider uppercase text-primary/50 mr-2">Sorotan
                            Produk:</span>
                        <button v-for="(spotlight, idx) in spotlightProducts" :key="spotlight.id"
                            @click="activeSpotlightIndex = idx"
                            class="px-5 py-2 rounded-full text-xs md:text-sm font-semibold transition-all duration-300 flex items-center gap-2"
                            :class="activeSpotlightIndex === idx
                                ? 'bg-primary text-white shadow-md scale-105'
                                : 'bg-primary/5 text-primary/70 hover:bg-primary/10'">
                            <span>{{ spotlight.badge }}</span>
                            <span class="font-bold">{{ spotlight.name }}</span>
                        </button>
                    </div>

                    <!-- Spotlight Content Grid -->
                    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

                        <!-- Left: Interactive Image with Hotspots -->
                        <div
                            class="lg:col-span-7 relative flex items-center justify-center p-4 md:p-8 bg-gradient-to-br from-secondary/50 via-white to-primary/5 rounded-2xl border border-primary/10 min-h-[380px] md:min-h-[460px]">

                            <!-- Tag Pill -->
                            <div
                                class="absolute top-4 left-4 z-20 bg-primary/90 backdrop-blur text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1.5">
                                <span class="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                                <span>{{ currentSpotlight.category }}</span>
                            </div>

                            <!-- Main Showcase Image with Smooth Transition -->
                            <Transition name="fade-scale" mode="out-in">
                                <img :key="currentSpotlight.image" :src="currentSpotlight.image"
                                    :alt="currentSpotlight.name"
                                    class="max-h-[320px] md:max-h-[400px] w-auto object-contain drop-shadow-2xl transition-transform duration-500 hover:scale-105" />
                            </Transition>

                            <!-- Interactive Hotspot Pins -->
                            <div v-for="hotspot in currentSpotlight.hotspots" :key="hotspot.id"
                                class="absolute z-30 group" :style="{ top: hotspot.y, left: hotspot.x }">
                                <!-- Pulse Circle -->
                                <button @click="activeHotspot = activeHotspot?.id === hotspot.id ? null : hotspot"
                                    class="relative flex items-center justify-center w-8 h-8 rounded-full bg-accent text-primary font-bold text-xs shadow-lg ring-4 ring-white/80 group-hover:scale-110 transition-transform cursor-pointer"
                                    :aria-label="hotspot.title">
                                    <span
                                        class="absolute inset-0 rounded-full bg-accent animate-ping opacity-40"></span>
                                    <span class="relative z-10 font-bold text-xs">+</span>
                                </button>

                                <!-- Tooltip Popup -->
                                <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-56 p-3.5 bg-primary text-secondary rounded-xl shadow-2xl text-xs pointer-events-auto transition-all duration-300 z-40 border border-secondary/20"
                                    :class="activeHotspot?.id === hotspot.id ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto'">
                                    <div class="font-bold text-accent text-xs mb-1 flex items-center gap-1.5">
                                        <span class="w-1.5 h-1.5 rounded-full bg-accent"></span>
                                        {{ hotspot.title }}
                                    </div>
                                    <p class="text-secondary/80 leading-relaxed text-[11px]">{{ hotspot.description }}
                                    </p>
                                    <div
                                        class="mt-2 pt-1.5 border-t border-white/10 text-[10px] text-accent/90 font-medium">
                                        Material: {{ hotspot.material }}
                                    </div>
                                    <!-- Tooltip Triangle -->
                                    <div
                                        class="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-primary">
                                    </div>
                                </div>
                            </div>

                            <!-- Hotspot Hint Instruction -->
                            <div
                                class="absolute bottom-3 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[11px] text-primary/70 border border-primary/10 shadow-sm hidden sm:flex items-center gap-1.5">
                                <span class="w-2 h-2 rounded-full bg-accent"></span>
                                <span>Klik tanda <b>+</b> untuk melihat anatomi bahan</span>
                            </div>
                        </div>

                        <!-- Right: Product Story & Specifications -->
                        <div class="lg:col-span-5 flex flex-col justify-between">
                            <div>
                                <div class="flex items-center justify-between gap-4 mb-2">
                                    <span
                                        class="text-xs font-bold uppercase tracking-widest text-accent bg-primary px-3 py-1 rounded-md">
                                        {{ currentSpotlight.series }}
                                    </span>
                                    <div class="flex items-center gap-1 text-amber-500 text-xs font-bold">
                                        <span>★</span>
                                        <span>{{ currentSpotlight.rating }}</span>
                                        <span class="text-primary/40 font-normal">({{ currentSpotlight.reviews }}
                                            review)</span>
                                    </div>
                                </div>

                                <h2 class="text-2xl md:text-3xl font-bold text-primary mb-3">
                                    {{ currentSpotlight.name }}
                                </h2>

                                <p class="text-primary/80 text-sm leading-relaxed mb-6">
                                    {{ currentSpotlight.description }}
                                </p>

                                <!-- Key Material Pills -->
                                <div class="bg-secondary/70 rounded-2xl p-4 mb-6 border border-primary/10 space-y-3">
                                    <div
                                        class="flex items-center justify-between text-xs pb-2 border-b border-primary/10">
                                        <span class="text-primary/60 font-medium">Rangka Utama (Frame):</span>
                                        <span class="font-bold text-primary">{{ currentSpotlight.frameMaterial }}</span>
                                    </div>
                                    <div
                                        class="flex items-center justify-between text-xs pb-2 border-b border-primary/10">
                                        <span class="text-primary/60 font-medium">Bahan Pelapis (Fabric):</span>
                                        <span class="font-bold text-primary">{{ currentSpotlight.fabricMaterial
                                        }}</span>
                                    </div>
                                    <div
                                        class="flex items-center justify-between text-xs pb-2 border-b border-primary/10">
                                        <span class="text-primary/60 font-medium">Bantalan (Cushion):</span>
                                        <span class="font-bold text-primary">{{ currentSpotlight.cushionType }}</span>
                                    </div>
                                    <div class="flex items-center justify-between text-xs">
                                        <span class="text-primary/60 font-medium">Dimensi Presisi:</span>
                                        <span class="font-bold text-primary">{{ currentSpotlight.dimension }}</span>
                                    </div>
                                </div>

                                <!-- Price and Action Buttons -->
                                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                                    <div>
                                        <span class="text-xs text-primary/60 block">Harga Spesial Showcase</span>
                                        <span class="text-2xl font-bold text-primary font-montserrat">
                                            {{ formatPrice(currentSpotlight.price) }}
                                        </span>
                                    </div>

                                    <div class="flex items-center gap-3">
                                        <button @click="openModalWithProduct(currentSpotlight)"
                                            class="px-4 py-2.5 rounded-full border border-primary/30 text-primary hover:bg-primary/10 font-semibold text-xs transition-colors">
                                            Detail Lengkap
                                        </button>
                                        <button @click="handleAddToCart(currentSpotlight, $event)"
                                            class="px-6 py-2.5 rounded-full bg-accent text-primary hover:brightness-95 active:scale-95 font-bold text-xs shadow-md transition-all flex items-center gap-2">
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                            </svg>
                                            <span>Pesan Sekarang</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </section>

        <!-- ==================== 2. PHILOSOPHY & STORYTELLING ==================== -->
        <section class="py-20 px-6 md:px-16 lg:px-24 bg-primary text-secondary relative overflow-hidden">
            <!-- Background Ambient Lines -->
            <div class="absolute -right-32 -top-32 w-96 h-96 rounded-full bg-accent/10 blur-3xl pointer-events-none">
            </div>
            <div class="absolute -left-32 -bottom-32 w-96 h-96 rounded-full bg-white/5 blur-3xl pointer-events-none">
            </div>

            <div class="max-w-7xl mx-auto relative z-10">

                <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

                    <!-- Image Collage -->
                    <div class="lg:col-span-5 relative">
                        <div class="relative rounded-3xl overflow-hidden shadow-2xl border border-secondary/15">
                            <img src="/images/section/banner-section.png" alt="Pengrajin KA Furniture"
                                class="w-full h-[440px] object-cover hover:scale-105 transition-transform duration-700" />
                            <div
                                class="absolute inset-0 bg-gradient-to-t from-primary/90 via-transparent to-transparent">
                            </div>

                            <!-- Overlay Quote -->
                            <div
                                class="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-secondary/10 backdrop-blur-md border border-secondary/20">
                                <p class="text-xs text-secondary/90 italic">
                                    "Setiap potongan kayu memiliki jiwanya sendiri. Tugas kami adalah membentuknya
                                    menjadi kenyamanan abadi di rumah Anda."
                                </p>
                                <span class="block text-[11px] text-accent font-bold mt-2">— Master Artisan KA
                                    Furniture</span>
                            </div>
                        </div>

                        <!-- Floating Badge -->
                        <div
                            class="absolute -top-5 -right-5 bg-accent text-primary px-4 py-3 rounded-2xl shadow-xl font-bold text-center border-2 border-primary hidden sm:block">
                            <span class="block text-2xl leading-none">100%</span>
                            <span class="text-[10px] uppercase tracking-wider">Solid Wood</span>
                        </div>
                    </div>

                    <!-- Narrative Content -->
                    <div class="lg:col-span-7 flex flex-col justify-center">
                        <span class="text-accent text-xs font-bold tracking-widest uppercase mb-3">
                            Tentang Produk Kami
                        </span>
                        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                            Harmoni Keindahan Alami & <br />
                            <span class="text-accent">Standar Pengerjaan Presisi</span>
                        </h2>

                        <p class="text-secondary/80 text-sm sm:text-base leading-relaxed mb-6">
                            Di KA Furniture, kami meyakini bahwa furnitur bukan sekadar pengisi ruangan, melainkan
                            investasi kenyamanan dan estetika jangka panjang. Setiap produk dirancang dengan memadukan
                            kehangatan kayu solid tropis Nusantara dengan siluet minimalis kontemporer.
                        </p>

                        <p class="text-secondary/70 text-sm leading-relaxed mb-8">
                            Dari pemilihan gelondongan kayu jati bersertifikasi, proses pengeringan oven terukur
                            (kiln-drying), hingga pemilihan serat kain ramah kulit berdaya tahan tinggi — kami menjamin
                            setiap sudut dibuat tanpa kompromi kualitas.
                        </p>

                        <!-- 4 Value Pillars -->
                        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <div
                                class="bg-secondary/5 border border-secondary/10 rounded-2xl p-4 hover:bg-secondary/10 transition-colors">
                                <div class="text-accent text-2xl mb-2">🌿</div>
                                <h3 class="text-xs font-bold text-secondary mb-1">Kayu Berkelanjutan</h3>
                                <p class="text-[11px] text-secondary/60">Kayu jati & oak legal bersertifikasi Perhutani.
                                </p>
                            </div>

                            <div
                                class="bg-secondary/5 border border-secondary/10 rounded-2xl p-4 hover:bg-secondary/10 transition-colors">
                                <div class="text-accent text-2xl mb-2">🔨</div>
                                <h3 class="text-xs font-bold text-secondary mb-1">Handcrafted Art</h3>
                                <p class="text-[11px] text-secondary/60">Dikerjakan oleh pengrajin berpengalaman 20+
                                    tahun.</p>
                            </div>

                            <div
                                class="bg-secondary/5 border border-secondary/10 rounded-2xl p-4 hover:bg-secondary/10 transition-colors">
                                <div class="text-accent text-2xl mb-2">🛡️</div>
                                <h3 class="text-xs font-bold text-secondary mb-1">Garansi 10 Tahun</h3>
                                <p class="text-[11px] text-secondary/60">Jaminan ketahanan struktur & rangka anti rayap.
                                </p>
                            </div>

                            <div
                                class="bg-secondary/5 border border-secondary/10 rounded-2xl p-4 hover:bg-secondary/10 transition-colors">
                                <div class="text-accent text-2xl mb-2">🌱</div>
                                <h3 class="text-xs font-bold text-secondary mb-1">Finishing Aman</h3>
                                <p class="text-[11px] text-secondary/60">Non-toxic, ramah anak, dan ramah lingkungan.
                                </p>
                            </div>
                        </div>

                    </div>

                </div>

            </div>
        </section>

        <!-- ==================== 3. PRODUCT TYPES & CATEGORIES ==================== -->
        <section class="py-20 px-6 md:px-16 lg:px-24">
            <div class="max-w-7xl mx-auto">

                <div class="text-center max-w-2xl mx-auto mb-12">
                    <span
                        class="text-xs font-bold uppercase tracking-widest text-primary/60 bg-primary/5 px-3 py-1 rounded-full">
                        Katalog Varian
                    </span>
                    <h2 class="text-3xl sm:text-4xl font-bold text-primary mt-3 mb-4">
                        Eksplorasi Jenis & Kategori Furnitur
                    </h2>
                    <p class="text-primary/70 text-sm sm:text-base">
                        Temukan koleksi furnitur yang sesuai dengan kebutuhan ruang santai, ruang makan, hingga kamar
                        tidur Anda.
                    </p>
                </div>

                <!-- Filter Category Tabs -->
                <div class="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
                    <button v-for="category in categories" :key="category.id" @click="selectedCategory = category.id"
                        class="px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300"
                        :class="selectedCategory === category.id
                            ? 'bg-primary text-secondary shadow-lg scale-105'
                            : 'bg-white text-primary/70 border border-primary/10 hover:border-primary/30 hover:bg-primary/5'">
                        {{ category.name }} ({{ getCategoryCount(category.id) }})
                    </button>
                </div>

                <!-- Products Showcase Grid -->
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div v-for="product in filteredProducts" :key="product.id"
                        class="group bg-white rounded-3xl p-5 border border-primary/10 shadow-sm hover:shadow-xl hover:border-accent transition-all duration-300 flex flex-col justify-between">
                        <div>
                            <!-- Product Image Box with Badges -->
                            <div
                                class="relative aspect-[4/3] bg-primary/5 rounded-2xl overflow-hidden mb-5 p-4 flex items-center justify-center">
                                <img :src="product.image" :alt="product.name"
                                    class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" />

                                <span
                                    class="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-primary text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm border border-primary/10">
                                    {{ product.typeTag }}
                                </span>

                                <button @click="openModalWithProduct(product)"
                                    class="absolute bottom-3 right-3 bg-primary/80 hover:bg-primary text-secondary text-xs px-3 py-1.5 rounded-full shadow-md backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-center gap-1">
                                    <span>Lihat Detail</span>
                                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>

                            <!-- Product Info -->
                            <div class="space-y-2 mb-4">
                                <div class="flex items-center justify-between">
                                    <span class="text-xs text-primary/50 font-medium">{{ product.categoryName }}</span>
                                    <div class="flex items-center text-amber-500 text-xs font-semibold">
                                        <span>★ {{ product.rating }}</span>
                                    </div>
                                </div>

                                <h3
                                    class="text-lg font-bold text-primary group-hover:text-emerald-900 transition-colors">
                                    {{ product.name }}
                                </h3>

                                <p class="text-primary/70 text-xs line-clamp-2 leading-relaxed">
                                    {{ product.description }}
                                </p>
                            </div>

                            <!-- Specs Summary -->
                            <div
                                class="bg-secondary/60 rounded-xl p-3 mb-5 space-y-1.5 text-[11px] border border-primary/5">
                                <div class="flex justify-between">
                                    <span class="text-primary/60">Bahan:</span>
                                    <span class="font-semibold text-primary truncate max-w-[170px]">{{ product.material
                                    }}</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="text-primary/60">Kain / Upholstery:</span>
                                    <span class="font-semibold text-primary truncate max-w-[170px]">{{ product.fabric
                                    }}</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="text-primary/60">Dimensi:</span>
                                    <span class="font-semibold text-primary">{{ product.dimension }}</span>
                                </div>
                            </div>
                        </div>

                        <!-- Price & Add to Cart -->
                        <div class="pt-3 border-t border-primary/10 flex items-center justify-between">
                            <div>
                                <span class="text-[10px] text-primary/50 block">Harga</span>
                                <span class="text-base font-bold text-primary font-montserrat">{{
                                    formatPrice(product.price) }}</span>
                            </div>

                            <button @click="handleAddToCart(product, $event)"
                                class="bg-accent hover:brightness-95 active:scale-95 text-primary text-xs font-bold px-4 py-2 rounded-full shadow-sm flex items-center gap-1.5 transition-all"
                                title="Tambahkan ke Keranjang">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M12 4v16m8-8H4" />
                                </svg>
                                <span>Keranjang</span>
                            </button>
                        </div>

                    </div>
                </div>

            </div>
        </section>

        <!-- ==================== 4. MATERIALS SHOWCASE (BAHAN UTAMA) ==================== -->
        <section
            class="py-20 px-6 md:px-16 lg:px-24 bg-gradient-to-b from-white/90 to-secondary border-y border-primary/10">
            <div class="max-w-7xl mx-auto">

                <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
                    <div>
                        <span
                            class="text-xs font-bold uppercase tracking-widest text-primary/60 bg-primary/5 px-3 py-1 rounded-full">
                            Bahan Baku Berkualitas
                        </span>
                        <h2 class="text-3xl sm:text-4xl font-bold text-primary mt-3">
                            Eksplorasi Material & Kayu Pilihan
                        </h2>
                    </div>
                    <p class="text-primary/70 text-sm max-w-md">
                        Kami hanya menggunakan bahan grade-A yang telah melalui proses seleksi ketat untuk memastikan
                        keawetan serta estetika alami yang memukau.
                    </p>
                </div>

                <!-- Materials Grid -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div v-for="mat in materialsList" :key="mat.id"
                        class="bg-white rounded-3xl p-6 border border-primary/10 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
                        <div>
                            <div
                                class="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center text-2xl mb-5 text-primary">
                                {{ mat.icon }}
                            </div>

                            <span
                                class="text-[10px] font-bold tracking-widest uppercase text-accent bg-primary px-2.5 py-0.5 rounded">
                                {{ mat.grade }}
                            </span>

                            <h3 class="text-xl font-bold text-primary mt-3 mb-2">
                                {{ mat.name }}
                            </h3>

                            <p class="text-primary/75 text-xs leading-relaxed mb-6">
                                {{ mat.description }}
                            </p>

                            <!-- Technical Specs List -->
                            <div class="space-y-2.5 pt-4 border-t border-primary/10 text-xs">
                                <div class="flex items-center justify-between">
                                    <span class="text-primary/60">Kadar Air (MC):</span>
                                    <span class="font-bold text-primary">{{ mat.moisture }}</span>
                                </div>
                                <div class="flex items-center justify-between">
                                    <span class="text-primary/60">Karakter Serat:</span>
                                    <span class="font-bold text-primary">{{ mat.grain }}</span>
                                </div>
                                <div class="flex items-center justify-between">
                                    <span class="text-primary/60">Finishing:</span>
                                    <span class="font-bold text-primary">{{ mat.finish }}</span>
                                </div>
                                <div class="flex items-center justify-between">
                                    <span class="text-primary/60">Daya Tahan:</span>
                                    <span class="font-bold text-emerald-800">{{ mat.durability }}</span>
                                </div>
                            </div>
                        </div>

                        <div class="mt-6 pt-4 border-t border-primary/5">
                            <span class="text-[11px] text-primary/60 block mb-1">Cocok untuk:</span>
                            <span class="text-xs font-semibold text-primary">{{ mat.bestFor }}</span>
                        </div>
                    </div>
                </div>

            </div>
        </section>

        <!-- ==================== 5. FABRIC & UPHOLSTERY STUDIO (KAIN YANG DIPAKAI) ==================== -->
        <section class="py-20 px-6 md:px-16 lg:px-24">
            <div class="max-w-7xl mx-auto">

                <div class="text-center max-w-2xl mx-auto mb-14">
                    <span
                        class="text-xs font-bold uppercase tracking-widest text-primary/60 bg-primary/5 px-3 py-1 rounded-full">
                        Koleksi Tekstil & Pelapis
                    </span>
                    <h2 class="text-3xl sm:text-4xl font-bold text-primary mt-3 mb-4">
                        Studio Kain & Upholstery Mewah
                    </h2>
                    <p class="text-primary/70 text-sm sm:text-base">
                        Sentuhan kelembutan yang menentukan kenyamanan duduk Anda. Pilih tekstur dan warna kain yang
                        selaras dengan tema interior hunian Anda.
                    </p>
                </div>

                <!-- Fabric Types & Swatch Explorer Container -->
                <div class="bg-white rounded-3xl p-6 md:p-10 border border-primary/10 shadow-xl">

                    <!-- Fabric Selector Tabs -->
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                        <button v-for="(fabric, idx) in fabricTypes" :key="fabric.id"
                            @click="activeFabricIndex = idx; activeColorSwatch = fabric.swatches[0]"
                            class="p-4 rounded-2xl text-left border transition-all duration-300" :class="activeFabricIndex === idx
                                ? 'border-accent bg-primary text-secondary shadow-md scale-[1.02]'
                                : 'border-primary/10 bg-secondary/30 text-primary hover:bg-secondary/60'">
                            <div class="text-lg mb-1">{{ fabric.icon }}</div>
                            <h3 class="font-bold text-sm leading-tight">{{ fabric.name }}</h3>
                            <span class="text-[11px] opacity-75 block mt-1">{{ fabric.origin }}</span>
                        </button>
                    </div>

                    <!-- Active Fabric Details Grid -->
                    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-4 border-t border-primary/10">

                        <!-- Left: Fabric Info & Indicators -->
                        <div class="lg:col-span-6 space-y-6">
                            <div>
                                <div class="flex items-center gap-2 mb-2">
                                    <span
                                        class="text-xs font-bold uppercase tracking-widest text-accent bg-primary px-3 py-0.5 rounded">
                                        {{ currentFabric.tag }}
                                    </span>
                                    <span class="text-xs text-primary/60 font-medium">Martindale: {{
                                        currentFabric.martindale }}</span>
                                </div>
                                <h3 class="text-2xl md:text-3xl font-bold text-primary mb-3">
                                    {{ currentFabric.name }}
                                </h3>
                                <p class="text-primary/80 text-sm leading-relaxed">
                                    {{ currentFabric.description }}
                                </p>
                            </div>

                            <!-- Quality Metrics -->
                            <div class="grid grid-cols-3 gap-3">
                                <div class="bg-secondary/60 rounded-2xl p-3 border border-primary/10 text-center">
                                    <span class="text-[10px] text-primary/60 block">Kelembutan</span>
                                    <span class="text-sm font-bold text-primary">{{ currentFabric.softness }}</span>
                                </div>
                                <div class="bg-secondary/60 rounded-2xl p-3 border border-primary/10 text-center">
                                    <span class="text-[10px] text-primary/60 block">Sirkulasi Udara</span>
                                    <span class="text-sm font-bold text-primary">{{ currentFabric.breathability
                                    }}</span>
                                </div>
                                <div class="bg-secondary/60 rounded-2xl p-3 border border-primary/10 text-center">
                                    <span class="text-[10px] text-primary/60 block">Daya Tahan Noda</span>
                                    <span class="text-sm font-bold text-primary">{{ currentFabric.stainResistance
                                    }}</span>
                                </div>
                            </div>

                            <!-- Care Instruction -->
                            <div class="bg-primary/5 rounded-2xl p-4 border border-primary/10 flex items-start gap-3">
                                <div class="text-primary text-xl mt-0.5">💡</div>
                                <div class="text-xs text-primary/80">
                                    <span class="font-bold text-primary block mb-0.5">Panduan Perawatan:</span>
                                    {{ currentFabric.careGuide }}
                                </div>
                            </div>
                        </div>

                        <!-- Right: Interactive Color Swatch Picker -->
                        <div class="lg:col-span-6 bg-secondary/40 rounded-2xl p-6 border border-primary/10">
                            <div class="flex items-center justify-between mb-4">
                                <span class="text-xs font-bold uppercase tracking-wider text-primary">Pilihan Palet
                                    Warna:</span>
                                <span
                                    class="text-xs font-semibold text-emerald-800 bg-white px-2.5 py-1 rounded-full border border-primary/10">
                                    {{ activeColorSwatch.name }}
                                </span>
                            </div>

                            <!-- Swatch Circles -->
                            <div class="flex flex-wrap gap-4 mb-6">
                                <button v-for="swatch in currentFabric.swatches" :key="swatch.id"
                                    @click="activeColorSwatch = swatch"
                                    class="group relative w-12 h-12 rounded-full border-2 transition-all duration-200 flex items-center justify-center"
                                    :class="activeColorSwatch.id === swatch.id ? 'border-primary scale-110 shadow-lg ring-4 ring-primary/20' : 'border-white hover:scale-105'"
                                    :style="{ backgroundColor: swatch.hex }" :title="swatch.name">
                                    <span v-if="activeColorSwatch.id === swatch.id"
                                        class="w-3 h-3 rounded-full bg-white/90 shadow"></span>
                                </button>
                            </div>

                            <!-- Swatch Preview Card -->
                            <div class="bg-white rounded-xl p-4 border border-primary/10 flex items-center gap-4">
                                <div class="w-16 h-16 rounded-xl shadow-inner border border-black/10 shrink-0 transition-colors duration-300"
                                    :style="{ backgroundColor: activeColorSwatch.hex }"></div>
                                <div>
                                    <h4 class="text-sm font-bold text-primary">{{ activeColorSwatch.name }}</h4>
                                    <p class="text-xs text-primary/70 mt-0.5 leading-relaxed">
                                        {{ activeColorSwatch.vibe }}
                                    </p>
                                    <span class="inline-block mt-2 text-[10px] text-primary/50 font-mono">Kode Warna: {{
                                        activeColorSwatch.code }}</span>
                                </div>
                            </div>

                            <!-- Custom Fabric Request Note -->
                            <div class="mt-4 text-center">
                                <p class="text-[11px] text-primary/70">
                                    Ingin warna atau bahan khusus lainnya? Kami menyediakan 50+ katalog swatch khusus
                                    custom order.
                                </p>
                            </div>
                        </div>

                    </div>

                </div>

            </div>
        </section>

        <!-- ==================== 6. INTERIOR LOOKBOOK GALLERY ==================== -->
        <section class="py-20 px-6 md:px-16 lg:px-24 bg-primary/5">
            <div class="max-w-7xl mx-auto">

                <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div>
                        <span
                            class="text-xs font-bold uppercase tracking-widest text-primary/60 bg-white px-3 py-1 rounded-full border border-primary/10">
                            Inspirasi Tata Ruang
                        </span>
                        <h2 class="text-3xl sm:text-4xl font-bold text-primary mt-3">
                            Lookbook Interior Galeri
                        </h2>
                    </div>
                    <p class="text-primary/70 text-sm max-w-md">
                        Lihat bagaimana furnitur KA Furniture bertransformasi menghidupkan suasana ruang keluarga, ruang
                        kerja, hingga kamar istirahat.
                    </p>
                </div>

                <!-- Masonry / Lookbook Grid -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div v-for="(look, i) in lookbookItems" :key="look.id"
                        class="group relative rounded-3xl overflow-hidden shadow-md bg-white border border-primary/10 transition-all duration-500 hover:shadow-2xl"
                        :class="i === 1 ? 'md:row-span-2' : ''">
                        <img :src="look.image" :alt="look.title"
                            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 min-h-[300px]" />
                        <div
                            class="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity">
                        </div>

                        <!-- Caption on Hover / Normal -->
                        <div class="absolute bottom-0 left-0 right-0 p-6 text-secondary">
                            <span class="text-accent text-[10px] font-bold uppercase tracking-widest mb-1 block">
                                {{ look.space }}
                            </span>
                            <h3 class="text-xl font-bold mb-2">{{ look.title }}</h3>
                            <p class="text-xs text-secondary/80 line-clamp-2">{{ look.description }}</p>

                            <div class="mt-4 pt-3 border-t border-white/20 flex items-center justify-between">
                                <span class="text-[11px] text-accent font-semibold">{{ look.highlightItem }}</span>
                                <NuxtLink to="/main/shop"
                                    class="text-xs font-bold text-white hover:text-accent transition-colors flex items-center gap-1">
                                    <span>Lihat Produk</span>
                                    <span>→</span>
                                </NuxtLink>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>

        <!-- ==================== 7. CUSTOM CONSULTATION BANNER ==================== -->
        <section class="py-16 px-6 md:px-16 lg:px-24">
            <div
                class="max-w-7xl mx-auto bg-primary text-secondary rounded-3xl p-8 md:p-14 relative overflow-hidden shadow-2xl border border-secondary/20">

                <div class="relative z-10 max-w-2xl">
                    <span
                        class="inline-block bg-accent text-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4">
                        Layanan Kustomisasi Eksklusif
                    </span>
                    <h2 class="text-3xl sm:text-4xl md:text-5xl font-bold mb-5 leading-tight">
                        Ingin Dimensi & Pilihan Bahan Khusus?
                    </h2>
                    <p class="text-secondary/80 text-sm sm:text-base leading-relaxed mb-8">
                        Tim desainer interior kami siap membantu mewujudkan furnitur impian dengan ukuran spesifik,
                        pilihan kain custom, serta finishing kayu yang disesuaikan dengan konsep hunian Anda.
                    </p>

                    <div class="flex flex-wrap items-center gap-4">
                        <a href="https://wa.me/?text=Halo%20KA%20Furniture,%20saya%20ingin%20konsultasi%20custom%20order%20showcase"
                            target="_blank"
                            class="px-8 py-3.5 rounded-full bg-accent text-primary font-bold text-sm hover:brightness-95 active:scale-95 transition-all shadow-lg inline-flex items-center gap-2">
                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path
                                    d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.698.077-1.127-.061-.264-.085-.595-.205-1.026-.393-1.815-.791-3.003-2.618-3.095-2.74-.092-.121-.743-.988-.743-1.884 0-.896.471-1.338.64-1.52.169-.181.368-.227.49-.227.123 0 .245.001.353.006.113.005.263-.043.411.314.153.371.522 1.272.568 1.365.046.092.077.2.015.323-.061.123-.092.2-.184.307-.092.107-.195.239-.279.321-.092.092-.188.192-.081.376.107.184.478.788 1.023 1.274.704.628 1.297.822 1.482.914.184.092.292.077.4-.046.107-.123.46-.537.583-.721.123-.184.246-.153.414-.092.169.061 1.074.507 1.258.6.184.092.307.138.353.215.046.077.046.444-.098.849z" />
                            </svg>
                            <span>Konsultasi Desain Gratis</span>
                        </a>

                        <NuxtLink to="/main/shop"
                            class="px-8 py-3.5 rounded-full border border-secondary/30 text-secondary hover:bg-white/10 font-semibold text-sm transition-colors">
                            Katalog Lengkap Toko
                        </NuxtLink>
                    </div>
                </div>

            </div>
        </section>

        <!-- ==================== 8. QUICK DETAIL MODAL ==================== -->
        <Teleport to="body">
            <div v-if="isModalOpen && selectedProductModal"
                class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm transition-opacity"
                @click.self="closeModal">
                <div
                    class="relative w-full max-w-3xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-primary/10 overflow-hidden max-h-[90vh] overflow-y-auto">

                    <!-- Close Button -->
                    <button @click="closeModal"
                        class="absolute top-5 right-5 w-9 h-9 rounded-full bg-primary/5 hover:bg-primary/15 text-primary flex items-center justify-center transition-colors z-20">
                        ✕
                    </button>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <!-- Modal Image -->
                        <div
                            class="aspect-square bg-secondary/50 rounded-2xl p-6 flex items-center justify-center border border-primary/10">
                            <img :src="selectedProductModal.image" :alt="selectedProductModal.name"
                                class="w-full h-full object-contain drop-shadow-xl" />
                        </div>

                        <!-- Modal Details -->
                        <div class="space-y-4">
                            <div>
                                <span
                                    class="text-[10px] font-bold uppercase tracking-widest text-accent bg-primary px-3 py-1 rounded">
                                    {{ selectedProductModal.categoryName || selectedProductModal.category || 'Showcase'
                                    }}
                                </span>
                                <h3 class="text-2xl font-bold text-primary mt-2">
                                    {{ selectedProductModal.name }}
                                </h3>
                                <span class="text-xl font-bold text-primary font-montserrat block mt-1">
                                    {{ formatPrice(selectedProductModal.price) }}
                                </span>
                            </div>

                            <p class="text-primary/75 text-xs sm:text-sm leading-relaxed">
                                {{ selectedProductModal.description }}
                            </p>

                            <!-- Detailed Spec Table -->
                            <div class="bg-secondary/60 rounded-2xl p-4 border border-primary/10 space-y-2 text-xs">
                                <div class="flex justify-between">
                                    <span class="text-primary/60">Bahan Rangka:</span>
                                    <span class="font-bold text-primary">{{ selectedProductModal.material ||
                                        selectedProductModal.frameMaterial }}</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="text-primary/60">Bahan Kain / Pelapis:</span>
                                    <span class="font-bold text-primary">{{ selectedProductModal.fabric ||
                                        selectedProductModal.fabricMaterial }}</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="text-primary/60">Dimensi Ukuran:</span>
                                    <span class="font-bold text-primary">{{ selectedProductModal.dimension }}</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="text-primary/60">Garansi:</span>
                                    <span class="font-bold text-emerald-800">10 Tahun Rangka Solid</span>
                                </div>
                            </div>

                            <!-- Modal CTA -->
                            <div class="pt-3 flex items-center gap-3">
                                <button @click="handleAddToCart(selectedProductModal, $event); closeModal()"
                                    class="w-full py-3 rounded-full bg-accent text-primary font-bold text-sm hover:brightness-95 active:scale-95 shadow-md transition-all flex items-center justify-center gap-2">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                    </svg>
                                    <span>Tambah ke Keranjang</span>
                                </button>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </Teleport>

    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useCart } from '~/composables/useCart'

// Format Currency
const formatPrice = (price) => {
    if (!price) return 'Rp 0'
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(price)
}

const { addToCart } = useCart()

const handleAddToCart = (product, event) => {
    addToCart({
        name: product.name,
        image: product.image,
        price: product.price
    }, event)
}

// -----------------------------------------------------------
// 1. HERO SPOTLIGHT DATA WITH HOTSPOTS
// -----------------------------------------------------------
const activeSpotlightIndex = ref(0)
const activeHotspot = ref(null)

const spotlightProducts = [
    {
        id: 'spotlight-1',
        badge: '👑 Flagship Seating',
        name: 'Cocoon Lounge Armchair',
        series: 'Signature Nordic Series',
        category: 'Living Room Lounge',
        rating: 4.9,
        reviews: 128,
        price: 3850000,
        image: '/images/chair/cocoon-lounge-chair.png',
        frameMaterial: 'Kayu Jati Solid Grade-A (Perhutani)',
        fabricMaterial: 'Royal Velvet & High-Density Weave',
        cushionType: 'Dual Layer Ergonomic HR-35 Foam',
        dimension: '82 x 78 x 86 cm',
        description: 'Kursi santai premium dengan lengkungan ergonomis yang memeluk tubuh secara alami. Memadukan kekuatan kayu jati solid dengan kelembutan beludru premium.',
        hotspots: [
            {
                id: 'h1',
                x: '25%',
                y: '30%',
                title: 'Ergonomic Winged Backrest',
                description: 'Lekukan sandaran presisi yang menopang punggung dan leher secara rileks.',
                material: 'High Resilience Foam + Royal Velvet'
            },
            {
                id: 'h2',
                x: '72%',
                y: '55%',
                title: 'Deep Comfort Seat Cushion',
                description: 'Bantalan tebal 14cm anti kempis dengan elastisitas tinggi dan tahan beban 180kg.',
                material: 'HR-35 Foam + Cloud Fiber'
            },
            {
                id: 'h3',
                x: '38%',
                y: '85%',
                title: 'Solid Teak Hardwood Frame',
                description: 'Kaki & rangka kayu jati oven berserat rapat dengan pernis natural matte anti gores.',
                material: 'Kiln-Dried Perhutani Teak (MC 11%)'
            }
        ]
    },
    {
        id: 'spotlight-2',
        badge: '✨ Sanctuary Bed',
        name: 'Canopy Haven Bedframe',
        series: 'Master Bedroom Suite',
        category: 'Bedroom Sanctuary',
        rating: 5.0,
        reviews: 64,
        price: 12500000,
        image: '/images/bed/canopy-bed.png',
        frameMaterial: 'Solid American White Oak',
        fabricMaterial: 'Organic Belgian Linen Blend',
        cushionType: 'Padded Upholstered Headboard',
        dimension: '210 x 190 x 205 cm (King Size)',
        description: 'Tempat tidur berkanopi dengan struktur kokoh dan sandaran empuk berlapis linen alami. Menciptakan suasana istirahat yang tenteram dan berkelas.',
        hotspots: [
            {
                id: 'h4',
                x: '50%',
                y: '22%',
                title: 'Minimalist Canopy Rails',
                description: 'Konstruksi tiang oak solid dengan sambungan mortise & tenon presisi tahan guncangan.',
                material: 'Solid American White Oak'
            },
            {
                id: 'h5',
                x: '48%',
                y: '58%',
                title: 'Upholstered Linen Headrest',
                description: 'Sandaran kepala empuk yang sejuk di kulit dengan tekstur serat linen lembut.',
                material: 'Belgian Linen + Eco-Fiber'
            },
            {
                id: 'h6',
                x: '65%',
                y: '78%',
                title: 'Reinforced Slat Base',
                description: 'Bilah kayu penopang kasur dengan ventilasi udara optimal untuk sirkulasi kasur.',
                material: 'Heavy-Duty Kiln-Dried Slat'
            }
        ]
    },
    {
        id: 'spotlight-3',
        badge: '🌟 Centerpiece Art',
        name: 'Twin Nest Carrara Table',
        series: 'Living Architecture',
        category: 'Living Room Table',
        rating: 4.8,
        reviews: 92,
        price: 4200000,
        image: '/images/table/twin-nest-coffee-table.png',
        frameMaterial: 'Polished Brass & Metal Alloy',
        fabricMaterial: 'Natural Italian Carrara Marble Top',
        cushionType: 'N/A (Natural Stone Top)',
        dimension: 'Dia 80cm (Large) & Dia 55cm (Small)',
        description: 'Meja kopi bersarang dengan paduan marmer putih Carrara berpola urat alami dan rangka aksen emas yang menawan.',
        hotspots: [
            {
                id: 'h7',
                x: '35%',
                y: '45%',
                title: 'Polished Carrara Marble Top',
                description: 'Permukaan marmer asli dengan nano coating pelindung tumpahan noda kopi/teh.',
                material: 'Italian Carrara Natural Stone'
            },
            {
                id: 'h8',
                x: '62%',
                y: '70%',
                title: 'Brushed Brass Metal Base',
                description: 'Rangka besi alloy dilapisi electroplating emas anti karat dan tahan gores.',
                material: 'Anti-Rust Electroplated Brass'
            }
        ]
    }
]

const currentSpotlight = computed(() => spotlightProducts[activeSpotlightIndex.value])

// -----------------------------------------------------------
// 2. PRODUCT TYPES / CATEGORIES
// -----------------------------------------------------------
const selectedCategory = ref('all')

const categories = [
    { id: 'all', name: 'Semua Jenis' },
    { id: 'living', name: 'Living Room' },
    { id: 'dining', name: 'Dining & Bar' },
    { id: 'bedroom', name: 'Bedroom' },
    { id: 'storage', name: 'Storage & Shelves' },
    { id: 'kitchen', name: 'Kitchen Accent' }
]

const showcaseProducts = [
    {
        id: 'sp-1',
        name: 'Lamb Lounge Swivel Chair',
        category: 'living',
        categoryName: 'Living Room',
        typeTag: 'Lounge Chair',
        rating: 4.9,
        price: 3600000,
        image: '/images/chair/lamb-lounge-chair.png',
        material: 'Solid Oak Wood Frame',
        fabric: 'Bouclé Cloud Weave Soft',
        dimension: '78 x 75 x 82 cm',
        description: 'Kursi berputar santai dengan tekstur kain bouclé bergelombang yang sangat nyaman dan hangat.'
    },
    {
        id: 'sp-2',
        name: 'Nordic Solid Dining Table',
        category: 'dining',
        categoryName: 'Dining Room',
        typeTag: 'Dining Table',
        rating: 4.8,
        price: 6800000,
        image: '/images/table/dining-table.png',
        material: 'Kayu Jati Solid Perhutani',
        fabric: 'Natural Teak Oil Finish',
        dimension: '180 x 90 x 75 cm',
        description: 'Meja makan kayu jati solid 6 kursi dengan ketebalan top 4cm dan serat alami mempesona.'
    },
    {
        id: 'sp-3',
        name: 'Nuvola Dining Accent Chair',
        category: 'dining',
        categoryName: 'Dining Room',
        typeTag: 'Dining Chair',
        rating: 4.9,
        price: 1850000,
        image: '/images/chair/nuvola-dining-chair.png',
        material: 'American Walnut Base',
        fabric: 'Premium Belgian Linen',
        dimension: '54 x 58 x 84 cm',
        description: 'Kursi makan dengan sandaran busa melengkung ergonomis untuk pengalaman bersantap yang nyaman.'
    },
    {
        id: 'sp-4',
        name: 'Pandora Ottoman Daybed',
        category: 'bedroom',
        categoryName: 'Bedroom',
        typeTag: 'Storage Bed',
        rating: 5.0,
        price: 9400000,
        image: '/images/bed/pandora-ottoman-bed.png',
        material: 'Solid Teak & Hydraulic Lift',
        fabric: 'Velvet Slate & Linen',
        dimension: '200 x 160 x 110 cm',
        description: 'Tempat tidur dengan kompartemen penyimpanan rahasia di bawah kasur menggunakan mekanisme hidrolik.'
    },
    {
        id: 'sp-5',
        name: 'Teak Heritage Nightstand',
        category: 'bedroom',
        categoryName: 'Bedroom',
        typeTag: 'Nightstand',
        rating: 4.8,
        price: 1650000,
        image: '/images/nightstand/nightstand-teak.png',
        material: 'Kayu Jati Solid 100%',
        fabric: 'Brass Pull Handles',
        dimension: '48 x 40 x 52 cm',
        description: 'Meja nakas samping tempat tidur dengan laci soft-close dan aksen gagang kuningan antik.'
    },
    {
        id: 'sp-6',
        name: 'Ladder Minimalist Bookcase',
        category: 'storage',
        categoryName: 'Storage & Shelves',
        typeTag: 'Bookcase / Shelf',
        rating: 4.7,
        price: 2750000,
        image: '/images/shelves/ladder-shelf.png',
        material: 'Solid Teak & Metal Frame',
        fabric: 'Matte Powder Coating',
        dimension: '70 x 35 x 180 cm',
        description: 'Rak bertingkat multifungsi untuk memajang buku, tanaman hias, dan pajangan artistik.'
    },
    {
        id: 'sp-7',
        name: 'Glenda Bar Stool High Chair',
        category: 'dining',
        categoryName: 'Dining & Bar',
        typeTag: 'Bar Stool',
        rating: 4.8,
        price: 1450000,
        image: '/images/chair/bar-stool-chair.png',
        material: 'Black Powder Coated Metal',
        fabric: 'Full-Grain Vintage Leather',
        dimension: '45 x 48 x 95 cm',
        description: 'Kursi bar modern dengan dudukan kulit asli yang tebal dan sandaran kaki ergonomis.'
    },
    {
        id: 'sp-8',
        name: 'Nordic Console Dresser Table',
        category: 'living',
        categoryName: 'Living Room',
        typeTag: 'Console Table',
        rating: 4.9,
        price: 3200000,
        image: '/images/table/nordic-console-table.png',
        material: 'Solid American White Oak',
        fabric: 'Brushed Brass Knobs',
        dimension: '120 x 40 x 78 cm',
        description: 'Meja konsol ramping dengan 2 laci luas, cocok ditempatkan di lorong masuk atau ruang tamu.'
    },
    {
        id: 'sp-9',
        name: 'White Drew Kitchen Island Cabinet',
        category: 'kitchen',
        categoryName: 'Kitchen Accent',
        typeTag: 'Kitchen Island',
        rating: 5.0,
        price: 8900000,
        image: '/images/kitchen-set/kitchen-island.png',
        material: 'Solid Teak Top + HMR Cabinet',
        fabric: 'Polyurethane Water-Resistant',
        dimension: '140 x 75 x 88 cm',
        description: 'Island meja dapur serbaguna dengan top kayu jati tebal dan rak penyimpanan piring tertutup.'
    }
]

const filteredProducts = computed(() => {
    if (selectedCategory.value === 'all') return showcaseProducts
    return showcaseProducts.filter(p => p.category === selectedCategory.value)
})

const getCategoryCount = (catId) => {
    if (catId === 'all') return showcaseProducts.length
    return showcaseProducts.filter(p => p.category === catId).length
}

// -----------------------------------------------------------
// 3. MATERIALS SHOWCASE
// -----------------------------------------------------------
const materialsList = [
    {
        id: 'mat-1',
        icon: '🪵',
        grade: 'Grade A Perhutani',
        name: 'Kayu Jati Solid (Teak)',
        description: 'Kayu jati berserat padat kaya akan minyak alami yang membuatnya tahan terhadap rayap, kelembapan, dan cuaca tropis tanpa mudah memuai.',
        moisture: '10% - 12% (Kiln-Dried)',
        grain: 'Serat Emas Alami Mewah',
        finish: 'Natural Matte Oil / PU',
        durability: '50+ Tahun (Kekuatan Tinggi)',
        bestFor: 'Rangka sofa, meja makan, dan ranjang.'
    },
    {
        id: 'mat-2',
        icon: '🌲',
        grade: 'FSC Certified',
        name: 'American White Oak',
        description: 'Kayu oak impor dari hutan berkelanjutan Amerika Utara dengan ciri khas tekstur serat lurus tegas dan nuansa warna pirang kontemporer.',
        moisture: '8% - 10% Oven Terukur',
        grain: 'Garis Lurus Bersih & Rapi',
        finish: 'Blonde Eco-Polyurethane',
        durability: '30+ Tahun (Tahan Benturan)',
        bestFor: 'Kursi makan, meja konsol, dan rak pajangan.'
    },
    {
        id: 'mat-3',
        icon: '✨',
        grade: 'Electroplated Finish',
        name: 'Brushed Brass & Metal',
        description: 'Besi alloy dan kuningan dengan lapisan electroplating satin yang tahan terhadap korosi dan oksidasi, memberikan aksen mewah yang bersahaja.',
        moisture: 'N/A (Anti Korosi)',
        grain: 'Satin Brushed Texture',
        finish: 'Warm Gold / Matte Black',
        durability: 'Seumur Hidup Bebas Karat',
        bestFor: 'Kaki kursi lounge, handle laci, dan rangka meja.'
    },
    {
        id: 'mat-4',
        icon: '🏛️',
        grade: 'Natural Stone Italy',
        name: 'Carrara White Marble',
        description: 'Marmer putih murni Italia dengan corak urat abu-abu unik di setiap potongannya. Dilapisi pelindung nano sealer untuk perlindungan pori-pori.',
        moisture: 'Waterproof Nano-Sealed',
        grain: 'Urat Alami Abu-abu Mewah',
        finish: 'Honed Soft Silk Polish',
        durability: 'Tahan Panas & Goresan Wajar',
        bestFor: 'Top meja kopi dan meja island dapur.'
    }
]

// -----------------------------------------------------------
// 4. FABRIC & UPHOLSTERY STUDIO
// -----------------------------------------------------------
const activeFabricIndex = ref(0)

const fabricTypes = [
    {
        id: 'fb-1',
        icon: '☁️',
        tag: 'Trending Cozy',
        name: 'Bouclé Cloud Weave',
        origin: 'Koleksi Tekstil Prancis',
        martindale: '45,000 Rubs',
        softness: 'Sangat Lembut & Hangat',
        breathability: 'Tinggi (Serat Berongga)',
        stainResistance: 'Lapisan Hydrophobic',
        careGuide: 'Cukup bersihkan debu dengan vacuum berbulu halus atau lap lembap lembut.',
        description: 'Kain dengan tekstur ikal bergelombang yang menciptakan nuansa estetik, empuk, dan sangat nyaman disentuh untuk bersantai seharian.',
        swatches: [
            { id: 's1', name: 'Cloud Ivory White', hex: '#F6F3EE', code: '#F6F3EE', vibe: 'Kesan bersih, luas, dan minimalis modern.' },
            { id: 's2', name: 'Oatmeal Warm Sand', hex: '#DECBB9', code: '#DECBB9', vibe: 'Warna hangat natural cocok untuk gaya Japandi.' },
            { id: 's3', name: 'Charcoal Shadow', hex: '#4A4B4D', code: '#4A4B4D', vibe: 'Maskulin, elegan, dan tahan noda sehari-hari.' },
            { id: 's4', name: 'Forest Moss Green', hex: '#3B4D3C', code: '#3B4D3C', vibe: 'Aksen alami yang menyatu dengan kayu jati.' }
        ]
    },
    {
        id: 'fb-2',
        icon: '👑',
        tag: 'Ultra Luxurious',
        name: 'Royal Velvet (Beludru)',
        origin: 'Koleksi Velvet Italia',
        martindale: '60,000 Rubs',
        softness: 'Halus Seperti Sutra',
        breathability: 'Sedang & Sejuk',
        stainResistance: 'Easy-Clean Treated',
        careGuide: 'Gunakan sikat beludru searah serat untuk mengembalikan kilau mewah.',
        description: 'Bahan beludru berdensitas tinggi dengan kilau cahaya yang memikat dari berbagai sudut pandang. Tahan cakaran ringan dan anti pilling.',
        swatches: [
            { id: 's5', name: 'Deep Emerald Green', hex: '#28412B', code: '#28412B', vibe: 'Warna signature KA Furniture yang agung.' },
            { id: 's6', name: 'Warm Amber Ochre', hex: '#C68B35', code: '#C68B35', vibe: 'Sentuhan emas mewah yang mencuri perhatian.' },
            { id: 's7', name: 'Terracotta Rust', hex: '#9E4731', code: '#9E4731', vibe: 'Hangat, eksotis, dan berkarakter kuat.' },
            { id: 's8', name: 'Midnight Navy Blue', hex: '#1E2D42', code: '#1E2D42', vibe: 'Ketenangan mewah untuk ruang istirahat.' }
        ]
    },
    {
        id: 'fb-3',
        icon: '🌿',
        tag: 'Organic & Cool',
        name: 'Belgian Linen Blend',
        origin: 'Serat Alami Belgia',
        martindale: '35,000 Rubs',
        softness: 'Sejuk & Lembut di Kulit',
        breathability: 'Sangat Tinggi (Anti Gerah)',
        stainResistance: 'Standard Natural',
        careGuide: 'Dapat dilepas untuk dry clean atau dicuci lembut dengan air dingin.',
        description: 'Terbuat dari rami alami pilihan yang sangat sejuk untuk iklim tropis Indonesia. Memberikan drape santai dengan estetika organik yang abadi.',
        swatches: [
            { id: 's9', name: 'Pure Bleached Linen', hex: '#EBEAE5', code: '#EBEAE5', vibe: 'Segar dan terang untuk ruangan berpencahayaan alami.' },
            { id: 's10', name: 'Raw Flax Beige', hex: '#D1C2A5', code: '#D1C2A5', vibe: 'Warna rami alami tanpa pewarna kimia berlebih.' },
            { id: 's11', name: 'Soft Olive Ash', hex: '#878E76', code: '#878E76', vibe: 'Nuansa alam yang menenangkan dan teduh.' },
            { id: 's12', name: 'Slate Pebble Grey', hex: '#8F9499', code: '#8F9499', vibe: 'Netral kontemporer yang mudah dipadupadankan.' }
        ]
    },
    {
        id: 'fb-4',
        icon: '🛋️',
        tag: 'Timeless Patina',
        name: 'Full-Grain Vintage Leather',
        origin: 'Kulit Sapi Asli Tuscany',
        martindale: '100,000+ Rubs',
        softness: 'Lentur & Makin Halus',
        breathability: 'Alami Bernapas',
        stainResistance: 'Sangat Tinggi (Water-Resistant)',
        careGuide: 'Oleskan leather conditioner setiap 6 bulan untuk menjaga kelembapan kulit.',
        description: 'Kulit sapi asli lapis atas yang mempertahankan pori-pori alami. Seiring bertambahnya usia, kulit ini akan membentuk patina eksklusif yang unik.',
        swatches: [
            { id: 's13', name: 'Cognac Saddle Brown', hex: '#7A3D18', code: '#7A3D18', vibe: 'Klasik abadi, memancarkan wibawa dan kemewahan.' },
            { id: 's14', name: 'Espresso Dark Chocolate', hex: '#3B2418', code: '#3B2418', vibe: 'Warna gelap dalam yang tahan lama dan praktis.' },
            { id: 's15', name: 'Tan Caramel Glow', hex: '#A86C3E', code: '#A86C3E', vibe: 'Cerah, hangat, dan bertekstur lembut.' },
            { id: 's16', name: 'Obsidian Jet Black', hex: '#1C1C1C', code: '#1C1C1C', vibe: 'Sleek, modern, dan sangat berwibawa.' }
        ]
    }
]

const currentFabric = computed(() => fabricTypes[activeFabricIndex.value])
const activeColorSwatch = ref(fabricTypes[0].swatches[0])

// -----------------------------------------------------------
// 5. INTERIOR LOOKBOOK
// -----------------------------------------------------------
const lookbookItems = [
    {
        id: 'lb-1',
        image: '/images/showcase/showcase-1.png',
        space: 'Living Room Sanctuary',
        title: 'Kehangatan Ruang Santai Keluarga',
        description: 'Kombinasi sofa berbalut linen dengan coffee table jati menciptakan suasana akrab yang menenangkan.',
        highlightItem: 'Cocoon Chair + Twin Table'
    },
    {
        id: 'lb-2',
        image: '/images/showcase/showcase-2.png',
        space: 'Reading Corner & Library',
        title: 'Sudut Baca Bersahaja',
        description: 'Rak buku kayu solid dengan pencahayaan hangat menghidupkan ruang refleksi dan produktivitas.',
        highlightItem: 'Heritage Bookcase + Armchair'
    },
    {
        id: 'lb-3',
        image: '/images/showcase/showcase-3.png',
        space: 'Dining Architecture',
        title: 'Momen Bersantap Penuh Makna',
        description: 'Meja makan panjang dari gelondongan kayu jati solid mengundang kehangatan obrolan keluarga.',
        highlightItem: 'Nordic Table + Nuvola Chairs'
    },
    {
        id: 'lb-4',
        image: '/images/showcase/showcase-6.png',
        space: 'Master Bedroom Retreat',
        title: 'Kenyamanan Istirahat Sempurna',
        description: 'Ranjang kanopi minimalis dengan tekstil lembut menjamin kualitas tidur berkualitas setiap malam.',
        highlightItem: 'Haven Canopy Bed + Daybed'
    }
]

// -----------------------------------------------------------
// 6. MODAL QUICK DETAIL STATE
// -----------------------------------------------------------
const isModalOpen = ref(false)
const selectedProductModal = ref(null)

const openModalWithProduct = (prod) => {
    selectedProductModal.value = prod
    isModalOpen.value = true
}

const closeModal = () => {
    isModalOpen.value = false
    selectedProductModal.value = null
}
</script>

<style scoped>
/* Transition animation for spotlight image */
.fade-scale-enter-active,
.fade-scale-leave-active {
    transition: all 0.35s ease;
}

.fade-scale-enter-from {
    opacity: 0;
    transform: scale(0.92);
}

.fade-scale-leave-to {
    opacity: 0;
    transform: scale(1.04);
}
</style>