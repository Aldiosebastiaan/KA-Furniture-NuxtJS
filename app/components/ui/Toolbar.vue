<template>
    <div
        class="bg-white p-4 sm:px-6 rounded-2xl shadow-sm border border-primary/5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div class="flex items-center gap-3 w-full sm:w-auto">
            <input type="checkbox" :id="selectAllId"
                class="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary accent-primary cursor-pointer"
                :checked="isAllSelected"
                @change="$emit('update:isAllSelected', $event.target.checked)" />
            <label :for="selectAllId" class="font-medium text-primary cursor-pointer select-none">
                {{ selectAllLabel }} ({{ selectedCount }})
            </label>
        </div>

        <div class="flex items-center gap-3 w-full sm:w-auto flex-grow justify-end">
            <div class="relative w-full sm:w-48 lg:w-64">
                <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                        stroke="currentColor" class="w-4 h-4 text-gray-400">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                </span>
                <input type="text" :placeholder="searchPlaceholder" :value="searchQuery"
                    @input="$emit('update:searchQuery', $event.target.value)"
                    class="w-full border border-gray-200 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/80 focus:border-primary transition-colors text-primary" />
            </div>
            <div class="relative w-full sm:w-48 lg:w-48">
                <span class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-4 h-4 text-gray-400">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
                    </svg>
                </span>
                <button @click="isCategoryOpen = !isCategoryOpen"
                    class="w-full border border-gray-200 rounded-lg pl-10 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/80 focus:border-primary transition-colors text-primary bg-white flex justify-between items-center text-left">
                    <span class="truncate">{{ selectedCategory }}</span>
                    <span class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                            stroke="currentColor" class="w-4 h-4 text-gray-400 transition-transform"
                            :class="{ 'rotate-180': isCategoryOpen }">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                    </span>
                </button>
                <div v-if="isCategoryOpen"
                    class="absolute z-[60] w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto py-1">
                    <div v-for="cat in categories" :key="cat"
                        @click="handleCategorySelect(cat)"
                        class="px-4 py-2 text-sm text-primary hover:bg-primary/5 cursor-pointer transition-colors"
                        :class="{ 'font-semibold bg-primary/5': selectedCategory === cat }">
                        {{ cat }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
    isAllSelected: {
        type: Boolean,
        default: false
    },
    selectedCount: {
        type: Number,
        default: 0
    },
    searchQuery: {
        type: String,
        default: ''
    },
    selectedCategory: {
        type: String,
        default: 'All Categories'
    },
    categories: {
        type: Array,
        default: () => []
    },
    selectAllLabel: {
        type: String,
        default: 'Pilih Semua'
    },
    searchPlaceholder: {
        type: String,
        default: 'Search Items'
    },
    selectAllId: {
        type: String,
        default: 'selectAll'
    }
})

const emit = defineEmits(['update:isAllSelected', 'update:searchQuery', 'update:selectedCategory'])

const isCategoryOpen = ref(false)

const handleCategorySelect = (category) => {
    emit('update:selectedCategory', category)
    isCategoryOpen.value = false
}

// Click outside to close category dropdown
const closeCategoryDropdown = (e) => {
    const isClickInside = e.target.closest('.relative')
    if (!isClickInside && isCategoryOpen.value) {
        isCategoryOpen.value = false
    }
}

onMounted(() => {
    document.addEventListener('click', closeCategoryDropdown)
})

onUnmounted(() => {
    document.removeEventListener('click', closeCategoryDropdown)
})
</script>
