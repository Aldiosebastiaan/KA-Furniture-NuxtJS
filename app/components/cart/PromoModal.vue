<template>
  <div>
    <Transition enter-active-class="transition duration-200 ease-out" enter-from-class="opacity-0"
      enter-to-class="opacity-100" leave-active-class="transition duration-150 ease-in" leave-from-class="opacity-100"
      leave-to-class="opacity-0">

      <!-- Modal container -->
      <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <div
          class="bg-white rounded-2xl shadow-2xl w-full max-w-md pointer-events-auto transform transition-all flex flex-col max-h-[90vh]">
          <!-- Header -->
          <div class="px-6 py-4 border-b border-primary/10 flex items-center justify-between">
            <h2 class="text-xl font-semibold text-primary">Promo & Diskon</h2>
            <button @click="close" class="text-primary hover:text-primary/70 transition-colors p-2 -mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Body -->
          <div class="p-6 overflow-y-auto flex flex-col gap-4">
            <!-- Promo 1 -->
            <div
              class="border border-gray-200 rounded-xl p-4 cursor-pointer hover:border-primary/30 hover:bg-primary/5 transition-all group flex items-start gap-4">
              <div class="w-12 h-12 bg-teal-50 rounded-lg flex items-center justify-center flex-shrink-0 text-teal-600">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                </svg>
              </div>
              <div class="flex-grow">
                <h3 class="font-bold text-primary group-hover:text-primary mb-1">Diskon 50% Pengguna Baru</h3>
                <p class="text-sm text-primary/60 mb-2">Maks. diskon Rp 50.000 dengan min. transaksi Rp 200.000.</p>
                <span class="inline-block px-2 py-1 bg-teal-50 text-teal-700 text-xs font-semibold rounded">Klaim
                  Promo</span>
              </div>
            </div>

            <!-- Promo 2 -->
            <div
              class="border border-gray-200 rounded-xl p-4 cursor-pointer hover:border-primary/30 hover:bg-primary/5 transition-all group flex items-start gap-4">
              <div
                class="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center flex-shrink-0 text-orange-600">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                </svg>
              </div>
              <div class="flex-grow">
                <h3 class="font-bold text-primary group-hover:text-primary mb-1">Gratis Ongkir se-Indonesia</h3>
                <p class="text-sm text-primary/60 mb-2">Nikmati gratis ongkir s.d Rp 40.000 tanpa minimal belanja.</p>
                <span class="inline-block px-2 py-1 bg-orange-50 text-orange-700 text-xs font-semibold rounded">Klaim
                  Promo</span>
              </div>
            </div>

            <!-- Promo 3 -->
            <div
              class="border border-gray-200 rounded-xl p-4 cursor-pointer hover:border-primary/30 hover:bg-primary/5 transition-all group flex items-start gap-4">
              <div class="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0 text-blue-600">
                <span class="font-bold text-lg">%</span>
              </div>
              <div class="flex-grow">
                <h3 class="font-bold text-primary group-hover:text-primary mb-1">Cashback 10%</h3>
                <p class="text-sm text-primary/60 mb-2">Cashback hingga Rp 100.000 untuk pembelian produk meja kerja.
                </p>
                <span class="inline-block px-2 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded">Klaim
                  Promo</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:isOpen'])

const close = () => {
  emit('update:isOpen', false)
}
</script>
