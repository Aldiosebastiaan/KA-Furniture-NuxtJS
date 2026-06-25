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
                                    <span class="font-bold text-black/80">{{ selectedAddress.label }} • {{ selectedAddress.name }}</span>
                                </div>
                                <p class="text-primary/80 text-sm leading-relaxed">
                                    {{ selectedAddress.address }}
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
                            <button @click="isPaymentModalOpen = true" class="text-sm font-semibold text-primary hover:text-primary/60">Lihat
                                Semua</button>
                        </div>

                        <div class="flex flex-col gap-4">
                            <label v-for="pay in quickPaymentMethods" :key="pay.id" @click="selectedPaymentId = pay.id" class="flex items-center justify-between cursor-pointer group p-2 rounded-xl hover:bg-gray-50 transition-colors">
                                <div class="flex items-center gap-3">
                                    <div :class="`w-12 h-7 rounded text-[10px] font-bold flex items-center justify-center border border-current/10 ${pay.tagClass}`">
                                        {{ pay.code }}
                                    </div>
                                    <div class="flex flex-col">
                                        <span class="text-sm font-medium text-primary">{{ pay.name }}</span>
                                        <span class="text-[11px] text-gray-500">{{ pay.desc }}</span>
                                    </div>
                                </div>
                                <input type="radio" name="payment" :value="pay.id" v-model="selectedPaymentId"
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
                            <div v-for="addr in addresses" :key="addr.id"
                                @click="selectAddress(addr.id)"
                                :class="[
                                    'rounded-xl p-4 cursor-pointer transition-colors group',
                                    selectedAddressId === addr.id ? 'border-2 border-primary bg-primary/5' : 'border border-gray-200 hover:border-primary/50'
                                ]">
                                <div class="flex items-start justify-between mb-2">
                                    <div class="flex items-center gap-2">
                                        <span v-if="addr.isMain" class="text-xs font-bold bg-primary text-white px-2 py-1 rounded">Utama</span>
                                        <span v-else class="text-xs font-medium border border-gray-300 text-gray-500 px-2 py-1 rounded">{{ addr.label }}</span>
                                        <span class="font-bold text-primary">{{ addr.label }} • {{ addr.name }}</span>
                                    </div>
                                    <svg v-if="selectedAddressId === addr.id" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-primary">
                                        <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" />
                                    </svg>
                                    <button v-else class="opacity-0 group-hover:opacity-100 text-xs font-medium bg-primary text-white px-3 py-1 rounded-full transition-opacity">Pilih</button>
                                </div>
                                <p class="text-sm text-primary/80 font-medium">{{ addr.phone }}</p>
                                <p class="text-sm text-primary/80 mt-1 leading-relaxed">{{ addr.address }}</p>
                                <button @click.stop="openEditAddressModal(addr.id)" class="mt-3 text-sm font-semibold text-primary hover:text-primary/70">Ubah Alamat</button>
                            </div>
                        </div>
                        <div class="p-6 border-t border-gray-100">
                            <button @click="openAddAddressModal" class="w-full py-3 border border-primary text-primary font-bold rounded-xl hover:bg-primary/5 transition-colors">
                                Tambah Alamat Baru
                            </button>
                        </div>
                    </div>
                </div>
            </Transition>

            <!-- Edit Address Modal -->
            <Transition
                enter-active-class="transition duration-200 ease-out"
                enter-from-class="opacity-0"
                enter-to-class="opacity-100"
                leave-active-class="transition duration-150 ease-in"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0"
            >
                <div v-if="isEditAddressModalOpen" class="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div class="bg-white w-full max-w-4xl rounded-2xl shadow-xl overflow-hidden transform transition-all flex flex-col max-h-[90vh]" @click.stop>
                        <div class="p-6 border-b border-gray-100 flex justify-between items-center flex-shrink-0">
                            <h3 class="text-lg font-bold text-primary">{{ modalMode === 'edit' ? 'Ubah Detail Alamat' : 'Tambah Alamat Baru' }}</h3>
                            <button @click="isEditAddressModalOpen = false" class="text-gray-400 hover:text-gray-600 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        
                        <form @submit.prevent="handleSaveAddress" class="flex-grow overflow-y-auto p-6 flex flex-col gap-6">
                            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <!-- Left Column: Form Details -->
                                <div class="flex flex-col gap-4">
                                    <h4 class="text-sm font-bold text-primary border-b border-gray-100 pb-2">Detail Informasi Alamat</h4>
                                    <div>
                                        <label class="block text-xs font-bold text-primary/70 uppercase mb-1">Label Alamat</label>
                                        <input v-model="editAddressForm.label" type="text" placeholder="Contoh: Rumah / Kantor / Apartemen" class="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm text-primary transition-all" required />
                                    </div>
                                    <div>
                                        <label class="block text-xs font-bold text-primary/70 uppercase mb-1">Nama Penerima</label>
                                        <input v-model="editAddressForm.name" type="text" placeholder="Nama lengkap penerima" class="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm text-primary transition-all" required />
                                    </div>
                                    <div>
                                        <label class="block text-xs font-bold text-primary/70 uppercase mb-1">Nomor Telepon</label>
                                        <input v-model="editAddressForm.phone" type="text" placeholder="Contoh: 081234567890" class="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm text-primary transition-all" required />
                                    </div>
                                    <div>
                                        <label class="block text-xs font-bold text-primary/70 uppercase mb-1">Provinsi</label>
                                        <select v-model="editAddressForm.province" @change="handleProvinceChange" class="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm text-primary transition-all bg-white" required>
                                            <option value="" disabled>Pilih Provinsi</option>
                                            <option v-for="prov in availableProvinces" :key="prov" :value="prov">{{ prov }}</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label class="block text-xs font-bold text-primary/70 uppercase mb-1">Kota / Kabupaten</label>
                                        <select v-model="editAddressForm.city" @change="handleCityChange" :disabled="!editAddressForm.province" class="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm text-primary transition-all bg-white disabled:bg-gray-100 disabled:text-gray-400" required>
                                            <option value="" disabled>Pilih Kota / Kabupaten</option>
                                            <option v-for="c in availableCities" :key="c" :value="c">{{ c }}</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label class="block text-xs font-bold text-primary/70 uppercase mb-1">Kecamatan</label>
                                        <select v-model="editAddressForm.district" :disabled="!editAddressForm.city" class="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm text-primary transition-all bg-white disabled:bg-gray-100 disabled:text-gray-400" required>
                                            <option value="" disabled>Pilih Kecamatan</option>
                                            <option v-for="dist in availableDistricts" :key="dist" :value="dist">{{ dist }}</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label class="block text-xs font-bold text-primary/70 uppercase mb-1">Alamat Jalan & Kode Pos</label>
                                        <textarea v-model="editAddressForm.street" rows="3" placeholder="Nama jalan, gedung, RT/RW, nomor rumah, kode pos" class="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm text-primary transition-all resize-none" required></textarea>
                                    </div>
                                </div>

                                <!-- Right Column: Map Section -->
                                <div class="flex flex-col gap-4">
                                    <div class="flex items-center justify-between border-b border-gray-100 pb-2">
                                        <h4 class="text-sm font-bold text-primary">Titik Lokasi Peta</h4>
                                        <span class="text-xs font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full flex items-center gap-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-3 h-3">
                                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" />
                                            </svg>
                                            Akurasi Tinggi
                                        </span>
                                    </div>
                                    <p class="text-xs text-gray-500 leading-relaxed">
                                        Tentukan titik lokasi peta yang akurat agar kurir dapat menemukan alamat Anda dengan cepat dan tepat.
                                    </p>
                                    
                                    <!-- Map Container -->
                                    <div class="bg-slate-100 rounded-2xl overflow-hidden border border-gray-200 relative h-[320px] shadow-inner flex flex-col items-center justify-center group">
                                        <iframe 
                                            width="100%" 
                                            height="100%" 
                                            frameborder="0" 
                                            scrolling="no" 
                                            marginheight="0" 
                                            marginwidth="0" 
                                            src="https://www.openstreetmap.org/export/embed.html?bbox=106.75%2C-6.25%2C106.85%2C-6.15&layer=mapnik" 
                                            class="absolute inset-0 w-full h-full pointer-events-auto filter contrast-105"
                                        ></iframe>
                                        
                                        <!-- Search Bar Overlay -->
                                        <div class="absolute top-3 left-3 right-3 bg-white/95 backdrop-blur-md p-2 rounded-xl shadow-lg flex items-center gap-2 border border-gray-100 z-10">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 text-gray-400 ml-1">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                            </svg>
                                            <input v-model="searchMapQuery" @keydown.enter.prevent="handleSearchMap" type="text" placeholder="Cari lokasi atau jalan di peta..." class="flex-grow outline-none bg-transparent text-xs text-primary font-medium placeholder-gray-400" />
                                            <button type="button" @click="handleSearchMap" class="bg-primary text-white text-xs px-3 py-1.5 rounded-lg font-bold hover:bg-primary/90 transition-colors shadow">
                                                Cari
                                            </button>
                                        </div>

                                        <!-- Center Floating Pin Overlay -->
                                        <div class="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                                            <div class="flex flex-col items-center -mt-10 animate-bounce">
                                                <div class="bg-primary text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-lg mb-1 pointer-events-auto">
                                                    Lokasi Pengiriman
                                                </div>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-10 h-10 text-primary drop-shadow-md">
                                                    <path fill-rule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
                                                </svg>
                                            </div>
                                        </div>

                                        <!-- Bottom Right Detect Location Button -->
                                        <div class="absolute bottom-3 right-3 z-10">
                                            <button type="button" @click="handleDetectLocation" class="bg-white/95 backdrop-blur-md hover:bg-white text-primary px-4 py-2 rounded-xl shadow-lg border border-gray-100 flex items-center gap-2 text-xs font-bold transition-all transform active:scale-95">
                                                <svg v-if="isLocating" class="animate-spin -ml-1 mr-1 h-4 w-4 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4 text-primary">
                                                    <path fill-rule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
                                                </svg>
                                                {{ isLocating ? 'Mencari Lokasi...' : 'Gunakan Lokasi Saat Ini' }}
                                            </button>
                                        </div>
                                    </div>

                                    <!-- Coordinate details card -->
                                    <div class="bg-primary/5 border border-primary/10 p-4 rounded-xl flex items-center justify-between gap-4">
                                        <div class="flex items-center gap-3">
                                            <div class="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary flex-shrink-0">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
                                                    <path fill-rule="evenodd" d="M8.161 2.58a1.75 1.75 0 011.678 0l4.993 2.774a1.75 1.75 0 001.678 0l4.993-2.774a1.75 1.75 0 012.502 1.522v10.63a1.75 1.75 0 01-.91 1.531l-5.242 2.912a1.75 1.75 0 01-1.678 0l-4.993-2.774a1.75 1.75 0 00-1.678 0l-4.993 2.774a1.75 1.75 0 01-2.502-1.522V4.102a1.75 1.75 0 01.91-1.531l5.242-2.912zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5z" clip-rule="evenodd" />
                                                </svg>
                                            </div>
                                            <div>
                                                <p class="text-xs font-bold text-primary">Koordinat Lokasi Terpilih</p>
                                                <p class="text-xs text-gray-500 mt-0.5 font-mono">{{ mapCoordinates.lat }}, {{ mapCoordinates.lng }}</p>
                                            </div>
                                        </div>
                                        <button type="button" @click="handleResetPin" class="text-xs font-bold text-primary hover:text-primary/70 transition-colors flex-shrink-0 underline">
                                            Reset Pin
                                        </button>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Bottom Action Buttons -->
                            <div class="flex items-center justify-end gap-4 pt-6 border-t border-gray-100 flex-shrink-0">
                                <button type="button" @click="isEditAddressModalOpen = false" class="px-8 py-3 border border-gray-300 rounded-xl text-sm font-medium text-primary hover:bg-gray-50 transition-colors">
                                    Batal
                                </button>
                                <button type="submit" class="px-8 py-3 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
                                    {{ modalMode === 'edit' ? 'Simpan Alamat' : 'Tambahkan Alamat' }}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </Transition>

            <!-- Payment Methods Modal -->
            <Transition
                enter-active-class="transition duration-200 ease-out"
                enter-from-class="opacity-0"
                enter-to-class="opacity-100"
                leave-active-class="transition duration-150 ease-in"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0"
            >
                <div v-if="isPaymentModalOpen" class="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div class="bg-white w-full max-w-2xl rounded-2xl shadow-xl overflow-hidden transform transition-all flex flex-col max-h-[85vh]" @click.stop>
                        <div class="p-6 border-b border-gray-100 flex justify-between items-center flex-shrink-0">
                            <div>
                                <h3 class="text-lg font-bold text-primary">Pilih Metode Pembayaran</h3>
                                <p class="text-xs text-gray-500 mt-0.5">Pilih metode pembayaran yang paling nyaman untuk Anda</p>
                            </div>
                            <button @click="isPaymentModalOpen = false" class="text-gray-400 hover:text-gray-600 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div class="flex-grow overflow-y-auto p-6 flex flex-col gap-8">
                            <div v-for="cat in paymentCategories" :key="cat.category" class="flex flex-col gap-4">
                                <h4 class="text-xs font-bold text-primary/70 uppercase tracking-wider border-b border-gray-100 pb-2">{{ cat.category }}</h4>
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div 
                                        v-for="method in cat.methods" 
                                        :key="method.id"
                                        @click="selectPaymentMethod(method.id)"
                                        :class="[
                                            'p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-4 group',
                                            selectedPaymentId === method.id 
                                                ? 'border-primary bg-primary/5 shadow-sm' 
                                                : 'border-gray-200 hover:border-primary/40 hover:bg-gray-50/50'
                                        ]"
                                    >
                                        <div :class="`w-14 h-8 rounded-lg text-[11px] font-bold flex items-center justify-center flex-shrink-0 border border-current/10 ${method.tagClass}`">
                                            {{ method.code }}
                                        </div>
                                        <div class="flex flex-col flex-grow">
                                            <span class="text-sm font-bold text-primary group-hover:text-primary transition-colors">{{ method.name }}</span>
                                            <span class="text-xs text-gray-500 mt-1 leading-snug">{{ method.desc }}</span>
                                        </div>
                                        <div class="flex-shrink-0 self-center">
                                            <div :class="[
                                                'w-5 h-5 rounded-full border flex items-center justify-center transition-colors',
                                                selectedPaymentId === method.id ? 'border-primary bg-primary' : 'border-gray-300 group-hover:border-primary/50'
                                            ]">
                                                <div v-if="selectedPaymentId === method.id" class="w-2 h-2 bg-white rounded-full"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="p-6 border-t border-gray-100 flex justify-end flex-shrink-0 bg-gray-50/50">
                            <button @click="isPaymentModalOpen = false" class="px-8 py-2.5 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
                                Konfirmasi Pilihan
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

const provincesData = {
    'Jawa Tengah': {
        'Kabupaten Demak': ['Mranggen', 'Karangtengah', 'Sayung', 'Demak Kota'],
        'Kota Semarang': ['Tembalang', 'Banyumanik', 'Semarang Tengah', 'Pedurungan'],
        'Kota Surakarta': ['Banjarsari', 'Jebres', 'Laweyan', 'Pasar Kliwon']
    },
    'DKI Jakarta': {
        'Jakarta Pusat': ['Tanah Abang', 'Menteng', 'Gambir', 'Sawah Besar'],
        'Jakarta Selatan': ['Kebayoran Baru', 'Setiabudi', 'Cilandak', 'Pasar Minggu'],
        'Jakarta Barat': ['Cengkareng', 'Grogol Petamburan', 'Kebon Jeruk', 'Kembangan'],
        'Jakarta Timur': ['Cakung', 'Duren Sawit', 'Jatinegara', 'Matraman'],
        'Jakarta Utara': ['Kelapa Gading', 'Penjaringan', 'Tanjung Priok', 'Koja']
    },
    'Jawa Barat': {
        'Kota Bandung': ['Coblong', 'Cicendo', 'Bandung Wetan', 'Buahbatu'],
        'Kota Bogor': ['Bogor Barat', 'Bogor Tengah', 'Bogor Timur', 'Bogor Utara'],
        'Kota Bekasi': ['Bekasi Barat', 'Bekasi Selatan', 'Bekasi Timur', 'Bekasi Utara'],
        'Kota Depok': ['Beji', 'Cimanggis', 'Pancoran Mas', 'Sukmajaya']
    },
    'Jawa Timur': {
        'Kota Surabaya': ['Gubeng', 'Wonokromo', 'Tegalsari', 'Sukolilo'],
        'Kota Malang': ['Blimbing', 'Klojen', 'Lowokwaru', 'Sukun'],
        'Kabupaten Sidoarjo': ['Sidoarjo', 'Waru', 'Taman', 'Sedati']
    },
    'Banten': {
        'Kota Tangerang': ['Tangerang', 'Ciledug', 'Cipondoh', 'Karawaci'],
        'Kota Tangerang Selatan': ['Serpong', 'Ciputat', 'Pamulang', 'Pondok Aren']
    },
    'DI Yogyakarta': {
        'Kota Yogyakarta': ['Gondokusuman', 'Jetis', 'Danurejan', 'Mergangsan'],
        'Kabupaten Sleman': ['Depok', 'Gamping', 'Mlati', 'Ngaglik'],
        'Kabupaten Bantul': ['Banguntapan', 'Bantul', 'Kasihan', 'Sewon']
    }
}

const addresses = ref([
    {
        id: 'rumah',
        label: 'Rumah',
        name: 'Aldio Sebastian',
        phone: '081234567890',
        street: 'Perumahan Taman Batursari Indah, RT 05/RW 36 blok J2 No 123, Kode Pos 59567',
        province: 'Jawa Tengah',
        city: 'Kabupaten Demak',
        district: 'Mranggen',
        address: 'Perumahan Taman Batursari Indah, RT 05/RW 36 blok J2 No 123, Kode Pos 59567, Kec. Mranggen, Kabupaten Demak, Jawa Tengah',
        isMain: true
    },
    {
        id: 'kantor',
        label: 'Kantor',
        name: 'Aldio Sebastian',
        phone: '081234567890',
        street: 'Gedung Sudirman, Jl. Jend. Sudirman No. 1, Kode Pos 10220',
        province: 'DKI Jakarta',
        city: 'Jakarta Pusat',
        district: 'Tanah Abang',
        address: 'Gedung Sudirman, Jl. Jend. Sudirman No. 1, Kode Pos 10220, Kec. Tanah Abang, Jakarta Pusat, DKI Jakarta',
        isMain: false
    }
])

const selectedAddressId = ref('rumah')

const selectedAddress = computed(() => {
    return addresses.value.find(a => a.id === selectedAddressId.value) || addresses.value[0]
})

const isAddressModalOpen = ref(false)
const isEditAddressModalOpen = ref(false)
const modalMode = ref('add') // 'add' or 'edit'

const editAddressForm = ref({
    id: null,
    label: '',
    name: '',
    phone: '',
    street: '',
    province: '',
    city: '',
    district: ''
})

const searchMapQuery = ref('')
const mapCoordinates = ref({ lat: -6.2088, lng: 106.8456 })
const isLocating = ref(false)

const handleSearchMap = () => {
    if (!searchMapQuery.value) return
    alert(`Mencari lokasi untuk "${searchMapQuery.value}" di peta...`)
    mapCoordinates.value = {
        lat: (-6.2088 + (Math.random() - 0.5) * 0.05).toFixed(4),
        lng: (106.8456 + (Math.random() - 0.5) * 0.05).toFixed(4)
    }
}

const handleDetectLocation = () => {
    isLocating.value = true
    setTimeout(() => {
        isLocating.value = false
        mapCoordinates.value = { lat: -6.2115, lng: 106.8412 }
        alert('Lokasi saat ini berhasil ditemukan!')
    }, 1200)
}

const handleResetPin = () => {
    mapCoordinates.value = { lat: -6.2088, lng: 106.8456 }
    searchMapQuery.value = ''
    alert('Posisi pin berhasil di-reset ke default.')
}

const availableProvinces = computed(() => Object.keys(provincesData))

const availableCities = computed(() => {
    if (!editAddressForm.value.province || !provincesData[editAddressForm.value.province]) return []
    return Object.keys(provincesData[editAddressForm.value.province])
})

const availableDistricts = computed(() => {
    if (!editAddressForm.value.province || !editAddressForm.value.city) return []
    const cities = provincesData[editAddressForm.value.province]
    if (!cities || !cities[editAddressForm.value.city]) return []
    return cities[editAddressForm.value.city]
})

const handleProvinceChange = () => {
    editAddressForm.value.city = ''
    editAddressForm.value.district = ''
}

const handleCityChange = () => {
    editAddressForm.value.district = ''
}

const openAddAddressModal = () => {
    modalMode.value = 'add'
    editAddressForm.value = {
        id: 'addr_' + Date.now(),
        label: '',
        name: '',
        phone: '',
        street: '',
        province: '',
        city: '',
        district: '',
        isMain: false
    }
    isEditAddressModalOpen.value = true
}

const openEditAddressModal = (id) => {
    const target = addresses.value.find(a => a.id === id)
    if (target) {
        modalMode.value = 'edit'
        editAddressForm.value = { ...target }
        isEditAddressModalOpen.value = true
    }
}

const handleSaveAddress = () => {
    const updated = { ...editAddressForm.value }
    updated.address = `${updated.street}, Kec. ${updated.district}, ${updated.city}, ${updated.province}`

    if (modalMode.value === 'edit') {
        const index = addresses.value.findIndex(a => a.id === updated.id)
        if (index !== -1) {
            addresses.value[index] = { ...addresses.value[index], ...updated }
        }
        alert('Alamat berhasil diperbarui!')
    } else {
        addresses.value.push(updated)
        selectedAddressId.value = updated.id
        alert('Alamat baru berhasil ditambahkan!')
    }
    isEditAddressModalOpen.value = false
}

const selectAddress = (id) => {
    selectedAddressId.value = id
    isAddressModalOpen.value = false
}

const paymentCategories = [
    {
        category: 'E-Wallet / E-Money',
        methods: [
            { id: 'gopay', name: 'GoPay', code: 'GOPAY', tagClass: 'bg-emerald-100 text-emerald-800', desc: 'Bayar instan dengan saldo GoPay' },
            { id: 'ovo', name: 'OVO', code: 'OVO', tagClass: 'bg-purple-100 text-purple-800', desc: 'Kumpulkan OVO Points di setiap transaksi' },
            { id: 'dana', name: 'DANA', code: 'DANA', tagClass: 'bg-blue-100 text-blue-800', desc: 'Bebas biaya admin & bayar praktis' },
            { id: 'shopeepay', name: 'ShopeePay', code: 'SHOPEE', tagClass: 'bg-orange-100 text-orange-800', desc: 'Cepat, aman, dan banyak cashback' },
        ]
    },
    {
        category: 'Transfer Bank (Virtual Account)',
        methods: [
            { id: 'bca', name: 'BCA Virtual Account', code: 'BCA', tagClass: 'bg-blue-100 text-blue-800', desc: 'Verifikasi otomatis 24/7' },
            { id: 'mandiri', name: 'Mandiri Virtual Account', code: 'MANDIRI', tagClass: 'bg-yellow-100 text-yellow-800', desc: 'Verifikasi otomatis 24/7' },
            { id: 'bri', name: 'BRI Virtual Account', code: 'BRI', tagClass: 'bg-blue-50 text-blue-700', desc: 'Verifikasi otomatis 24/7' },
            { id: 'bni', name: 'BNI Virtual Account', code: 'BNI', tagClass: 'bg-orange-50 text-orange-700', desc: 'Verifikasi otomatis 24/7' },
            { id: 'bsi', name: 'BSI Virtual Account', code: 'BSI', tagClass: 'bg-cyan-100 text-cyan-800', desc: 'Bank Syariah Indonesia' },
            { id: 'permata', name: 'Permata Virtual Account', code: 'PERMATA', tagClass: 'bg-indigo-100 text-indigo-800', desc: 'Verifikasi otomatis 24/7' },
            { id: 'cimb', name: 'CIMB Niaga Virtual Account', code: 'CIMB', tagClass: 'bg-red-50 text-red-800', desc: 'Verifikasi otomatis 24/7' },
        ]
    },
    {
        category: 'Gerai Retail / Minimarket',
        methods: [
            { id: 'alfa', name: 'Alfamart / Alfamidi', code: 'ALFA', tagClass: 'bg-red-100 text-red-600', desc: 'Bayar tunai di gerai terdekat' },
            { id: 'indomaret', name: 'Indomaret / Ceriamart', code: 'IDMR', tagClass: 'bg-blue-100 text-blue-700', desc: 'Bayar tunai di gerai terdekat' },
        ]
    }
]

const selectedPaymentId = ref('bca')
const isPaymentModalOpen = ref(false)

const allPaymentMethods = computed(() => {
    return paymentCategories.reduce((acc, cat) => [...acc, ...cat.methods], [])
})

const quickPaymentMethods = computed(() => {
    const defaults = ['bca', 'gopay', 'shopeepay', 'mandiri']
    let list = allPaymentMethods.value.filter(p => defaults.includes(p.id))
    if (!defaults.includes(selectedPaymentId.value)) {
        const current = allPaymentMethods.value.find(p => p.id === selectedPaymentId.value)
        if (current) {
            list = [current, ...list.slice(0, 3)]
        }
    }
    return list
})

const selectPaymentMethod = (id) => {
    selectedPaymentId.value = id
    isPaymentModalOpen.value = false
}

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
