<template>
    <Transition name="fade">
        <div v-if="isOpen"
            class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            @click.self="$emit('close')">
            <div
                class="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl border border-primary/10 transform transition-all">
                <div
                    class="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-red-100 text-red-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                </div>
                <h3 class="text-lg font-bold text-center text-primary mb-2">{{ title }}</h3>
                <p class="text-sm text-center text-primary/70 mb-6">
                    <slot name="message">
                        Apakah kamu yakin ingin menghapus <span class="font-semibold text-primary">"{{ itemName }}"</span> dari keranjang belanja?
                    </slot>
                </p>
                <div class="flex gap-3">
                    <button @click="$emit('close')"
                        class="flex-1 py-2.5 border border-gray-200 text-primary rounded-xl font-medium hover:bg-gray-50 transition-colors text-sm">
                        {{ cancelText }}
                    </button>
                    <button @click="$emit('confirm')"
                        class="flex-1 py-2.5 bg-red-500 text-white rounded-xl font-medium hover:bg-red-600 transition-colors text-sm">
                        {{ confirmText }}
                    </button>
                </div>
            </div>
        </div>
    </Transition>
</template>

<script setup>
defineProps({
    isOpen: {
        type: Boolean,
        default: false
    },
    itemName: {
        type: String,
        default: ''
    },
    title: {
        type: String,
        default: 'Hapus Produk?'
    },
    confirmText: {
        type: String,
        default: 'Hapus'
    },
    cancelText: {
        type: String,
        default: 'Batal'
    }
})

defineEmits(['close', 'confirm'])
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
