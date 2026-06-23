<template>
    <div class="min-h-screen bg-[#FDFBF7]/80 py-12 px-6 md:px-16 lg:px-24 font-montserrat">
        <div class="max-w-6xl mx-auto">
            <h1 class="text-3xl font-bold text-primary mb-8">Checkout</h1>

            <div v-if="checkoutItems.length > 0" class="flex flex-col lg:flex-row gap-8">
                <!-- Left Column: Shipping & Items -->
                <div class="flex-grow flex flex-col gap-6">

                    <!-- Shipping Address Card -->
                    <div class="bg-white p-6 rounded-2xl shadow-sm border border-primary/5">
                        <h2 class="text-sm font-bold text-primary/60 mb-4 uppercase">Alamat Pengiriman</h2>
                        <div class="flex items-start justify-between gap-4">
                            <div class="flex flex-col gap-2">
                                <div class="flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                        class="w-5 h-5 text-primary">
                                        <path fill-rule="evenodd"
                                            d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                                            clip-rule="evenodd" />
                                    </svg>
                                    <span class="font-bold text-black/80">Rumah • Aldio Sebastian</span>
                                </div>
                                <p class="text-primary/80 text-sm leading-relaxed">
                                    Perumahan Taman Batursari Indah, RT 05/RW 36 blok J2 No 123, Kecamatan Mranggen,
                                    Kabupaten Demak, Provinsi Jawa Tengah, Kode Pos 59567 (rumah pojok sebelah
                                    kanan),...
                                </p>
                            </div>
                            <button
                                @click="isAddressModalOpen = true"
                                class="flex-shrink-0 px-4 py-1.5 border border-gray-300 rounded-lg text-sm font-medium text-primary hover:bg-gray-50 transition-colors">
                                Ganti
                            </button>
                        </div>
                    </div>

                    <!-- Items Card -->
                    <div class="bg-white p-6 rounded-2xl shadow-sm border border-primary/5">
                        <h2 class="text-sm font-bold text-primary mb-4 uppercase">KA Furniture</h2>

                        <div v-for="(item, index) in checkoutItems" :key="item.name" class="flex flex-col gap-4"
                            :class="{ 'border-b border-gray-100 pb-6 mb-6': index !== checkoutItems.length - 1 }">

                            <!-- Item details -->
                            <div class="flex gap-4 items-start">
                                <div
                                    class="w-20 h-20 bg-primary/5 rounded-xl flex items-center justify-center p-2 flex-shrink-0">
                                    <img :src="item.image" :alt="item.name" class="w-full h-full object-contain" />
                                </div>
                                <div class="flex-grow flex flex-col justify-between">
                                    <h3 class="text-primary font-medium text-sm sm:text-base leading-tight">{{ item.name
                                    }}</h3>
                                    <div class="flex justify-between items-center mt-2">
                                        <span class="text-primary font-bold">{{ item.quantity }} x {{
                                            formatPrice(item.price) }}</span>
                                    </div>
                                </div>
                            </div>

                            <!-- Proteksi -->
                            <div class="flex items-center gap-2 mt-2">
                                <input type="checkbox" id="proteksi"
                                    class="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary accent-primary cursor-pointer" />
                                <label for="proteksi"
                                    class="text-sm text-primary/80 flex items-center gap-1 cursor-pointer">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                        class="w-4 h-4 text-gray-500">
                                        <path fill-rule="evenodd"
                                            d="M12.516 2.17a.75.75 0 00-1.032 0 11.209 11.209 0 01-7.877 3.08.75.75 0 00-.722.515A12.74 12.74 0 002.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 00.374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 00-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08zm3.094 8.016a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                                            clip-rule="evenodd" />
                                    </svg>
                                    Proteksi Rusak Total 3 bulan <span class="text-gray-500">(Rp8.600)</span>
                                </label>
                            </div>

                            <!-- Pengiriman -->
                            <div class="border border-gray-200 rounded-xl p-4 mt-2">
                                <div class="flex justify-between items-center cursor-pointer">
                                    <div>
                                        <p class="font-bold text-primary text-sm">Ekonomi (Rp30.000) <span
                                                class="bg-gray-100 text-xs text-gray-600 px-1.5 py-0.5 rounded font-normal ml-1">Bisa
                                                COD</span></p>
                                        <p class="text-sm text-gray-500 mt-1">Estimasi tiba 23 - 28 Jun</p>
                                    </div>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="2" stroke="currentColor" class="w-5 h-5 text-gray-400">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                    </svg>
                                </div>
                                <div class="border-t border-gray-100 my-3"></div>
                                <div class="flex items-center gap-2">
                                    <input type="checkbox" id="asuransi"
                                        class="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary accent-primary cursor-pointer" />
                                    <label for="asuransi"
                                        class="text-sm text-primary/80 flex items-center gap-1 cursor-pointer">
                                        Pakai Asuransi Pengiriman <span class="text-gray-500">(Rp1.200)</span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <!-- Catatan -->
                        <div
                            class="border-t border-gray-100 pt-4 flex items-center gap-2 text-sm text-gray-500 group cursor-pointer hover:text-primary transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-5 h-5">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                            </svg>
                            <input type="text" placeholder="Kasih Catatan"
                                class="flex-grow outline-none bg-transparent placeholder-gray-500 text-primary" />
                            <span class="text-xs text-gray-400">0/200</span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                                stroke="currentColor" class="w-4 h-4">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                        </div>

                    </div>
                </div>

                <!-- Right Column: Payment & Summary -->
                <div class="w-full lg:w-96 flex-shrink-0 flex flex-col gap-6">

                    <!-- Metode Pembayaran -->
                    <div class="bg-white p-6 rounded-2xl shadow-sm border border-primary/5">
                        <div class="flex items-center justify-between mb-4">
                            <h2 class="text-base font-bold text-black/80">Metode Pembayaran</h2>
                            <button class="text-sm font-semibold text-primary hover:text-primary/60">Lihat
                                Semua</button>
                        </div>

                        <div class="flex flex-col gap-4">
                            <label class="flex items-center justify-between cursor-pointer group">
                                <div class="flex items-center gap-3">
                                    <div
                                        class="w-10 h-6 bg-blue-100 rounded text-blue-800 text-[10px] font-bold flex items-center justify-center">
                                        BCA</div>
                                    <span class="text-sm font-medium text-primary">BCA Virtual Account</span>
                                </div>
                                <input type="radio" name="payment" value="bca"
                                    class="w-5 h-5 text-primary focus:ring-primary border-gray-300 accent-primary"
                                    checked />
                            </label>
                            <label class="flex items-center justify-between cursor-pointer group">
                                <div class="flex items-center gap-3">
                                    <div
                                        class="w-10 h-6 bg-yellow-100 rounded text-yellow-600 text-[10px] font-bold flex items-center justify-center">
                                        MANDIRI</div>
                                    <span class="text-sm font-medium text-primary">Mandiri Virtual Account</span>
                                </div>
                                <input type="radio" name="payment" value="mandiri"
                                    class="w-5 h-5 text-primary focus:ring-primary border-gray-300 accent-primary" />
                            </label>
                            <label class="flex items-center justify-between cursor-pointer group">
                                <div class="flex items-center gap-3">
                                    <div
                                        class="w-10 h-6 bg-blue-50 rounded text-blue-600 text-[10px] font-bold flex items-center justify-center">
                                        BRI</div>
                                    <span class="text-sm font-medium text-primary">BRI Virtual Account</span>
                                </div>
                                <input type="radio" name="payment" value="bri"
                                    class="w-5 h-5 text-primary focus:ring-primary border-gray-300 accent-primary" />
                            </label>
                            <label class="flex items-center justify-between cursor-pointer group">
                                <div class="flex items-center gap-3">
                                    <div
                                        class="w-10 h-6 bg-red-100 rounded text-red-600 text-[10px] font-bold flex items-center justify-center">
                                        ALFA</div>
                                    <span class="text-sm font-medium text-primary">Alfamart / Alfamidi</span>
                                </div>
                                <input type="radio" name="payment" value="alfa"
                                    class="w-5 h-5 text-primary focus:ring-primary border-gray-300 accent-primary" />
                            </label>
                        </div>
                    </div>

                    <!-- Promo Button -->
                    <button
                        class="bg-teal-50 border border-teal-200 p-4 rounded-xl flex items-center justify-between hover:bg-teal-100 transition-colors group">
                        <div class="flex items-center gap-3">
                            <span class="text-2xl">🎫</span>
                            <span class="font-medium text-teal-800 text-sm">Pakai promo biar makin hemat!</span>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                            stroke="currentColor" class="w-4 h-4 text-teal-600">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                    </button>

                    <!-- Summary -->
                    <div class="bg-white p-6 rounded-2xl shadow-sm border border-primary/5 sticky top-28">
                        <h2 class="text-base font-bold text-primary mb-4">Cek ringkasan transaksimu, yuk</h2>

                        <div class="flex items-center justify-between mb-2">
                            <span class="text-primary/70 text-sm">Total Harga ({{ selectedCartTotalItems }}
                                Barang)</span>
                            <span class="text-primary text-sm">{{ formatPrice(cartTotalPrice) }}</span>
                        </div>
                        <div class="flex items-center justify-between mb-4">
                            <span class="text-primary/70 text-sm">Total Ongkos Kirim</span>
                            <span class="text-primary text-sm">{{ formatPrice(30000) }}</span>
                        </div>

                        <div class="border-t border-gray-100 my-4"></div>

                        <div class="flex items-center justify-between mb-6">
                            <span class="font-bold text-primary">Total Tagihan</span>
                            <span class="font-bold text-primary text-xl">{{ formatPrice(cartTotalPrice + 30000)
                            }}</span>
                        </div>

                        <button @click="handlePayment"
                            class="w-full bg-primary text-white py-3.5 rounded-xl font-bold text-base hover:bg-primary/60 transition-colors flex items-center justify-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                                stroke="currentColor" class="w-5 h-5">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                            </svg>
                            Bayar Sekarang
                        </button>

                        <p class="text-[10px] text-gray-500 text-center mt-3 leading-relaxed">
                            Dengan melanjutkan pembayaran, kamu menyetujui S&K <br />
                            <a href="#" class="underline hover:text-primary">Asuransi Pengiriman & Proteksi</a>.
                        </p>
                    </div>

                </div>
            </div>

            <!-- Empty State -->
            <div v-else
                class="bg-white p-12 rounded-2xl shadow-sm border border-primary/5 flex flex-col items-center justify-center text-primary/50 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1"
                    stroke="currentColor" class="w-24 h-24 mb-6 opacity-50">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg>
                <p class="text-xl font-medium mb-2">Checkout is empty</p>
                <p class="text-sm mb-6">Select items from your cart to checkout.</p>
                <NuxtLink to="/cart"
                    class="bg-primary text-white px-8 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors">
                    Back to Cart
                </NuxtLink>
            </div>
            <!-- Address Modal -->
            <Transition
                enter-active-class="transition duration-200 ease-out"
                enter-from-class="opacity-0"
                enter-to-class="opacity-100"
                leave-active-class="transition duration-150 ease-in"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0"
            >
                <div v-if="isAddressModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div class="bg-white w-full max-w-lg rounded-2xl shadow-xl overflow-hidden transform transition-all" @click.stop>
                        <div class="p-6 border-b border-gray-100 flex justify-between items-center">
                            <h3 class="text-lg font-bold text-primary">Pilih Alamat Pengiriman</h3>
                            <button @click="isAddressModalOpen = false" class="text-gray-400 hover:text-gray-600 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div class="p-6 max-h-[60vh] overflow-y-auto flex flex-col gap-4">
                            <!-- Address Item 1 (Selected) -->
                            <div class="border-2 border-primary rounded-xl p-4 cursor-pointer bg-primary/5">
                                <div class="flex items-start justify-between mb-2">
                                    <div class="flex items-center gap-2">
                                        <span class="text-xs font-bold bg-primary text-white px-2 py-1 rounded">Utama</span>
                                        <span class="font-bold text-primary">Rumah • Aldio Sebastian</span>
                                    </div>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-primary">
                                        <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" />
                                    </svg>
                                </div>
                                <p class="text-sm text-primary/80 font-medium">081234567890</p>
                                <p class="text-sm text-primary/80 mt-1 leading-relaxed">Perumahan Taman Batursari Indah, RT 05/RW 36 blok J2 No 123, Kecamatan Mranggen, Kabupaten Demak, Provinsi Jawa Tengah, 59567</p>
                                <button class="mt-3 text-sm font-semibold text-primary hover:text-primary/70">Ubah Alamat</button>
                            </div>
                            
                            <!-- Address Item 2 -->
                            <div class="border border-gray-200 rounded-xl p-4 cursor-pointer hover:border-primary/50 transition-colors group">
                                <div class="flex items-start justify-between mb-2">
                                    <div class="flex items-center gap-2">
                                        <span class="text-xs font-medium border border-gray-300 text-gray-500 px-2 py-1 rounded">Kantor</span>
                                        <span class="font-bold text-primary">Kantor • Aldio Sebastian</span>
                                    </div>
                                    <button class="opacity-0 group-hover:opacity-100 text-xs font-medium bg-primary text-white px-3 py-1 rounded-full transition-opacity">Pilih</button>
                                </div>
                                <p class="text-sm text-primary/80 font-medium">081234567890</p>
                                <p class="text-sm text-primary/80 mt-1 leading-relaxed">Gedung Sudirman, Jl. Jend. Sudirman No. 1, Jakarta Pusat, DKI Jakarta, 10220</p>
                                <button class="mt-3 text-sm font-semibold text-primary hover:text-primary/70">Ubah Alamat</button>
                            </div>

                        </div>
                        <div class="p-6 border-t border-gray-100">
                            <button class="w-full py-3 border border-primary text-primary font-bold rounded-xl hover:bg-primary/5 transition-colors">
                                Tambah Alamat Baru
                            </button>
                        </div>
                    </div>
                </div>
            </Transition>

        </div>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCart } from '~/composables/useCart'

const router = useRouter()
const { cartItems, selectedCartTotalItems, cartTotalPrice, removeFromCart } = useCart()

const isAddressModalOpen = ref(false)

// Only checkout items that are selected in the cart
const checkoutItems = computed(() => {
    return cartItems.value.filter(item => item.selected !== false)
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

const handlePayment = () => {
    alert('Pembayaran berhasil! (Mock)')

    // Clear checkout items from cart
    checkoutItems.value.forEach(item => {
        removeFromCart(item.name)
    })

    router.push('/')
}
</script>
