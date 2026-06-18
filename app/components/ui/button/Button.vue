<template>
    <a v-if="to" :href="to" :class="[
        'inline-flex items-center justify-center font-semibold text-sm px-6 py-3 rounded-full transition-all duration-200 cursor-pointer',
        variants[variant]
    ]">
        <slot />
    </a>
    <button v-else :class="[
        'inline-flex items-center justify-center font-semibold text-sm px-6 py-3 rounded-full transition-all duration-200 cursor-pointer',
        variants[variant]
    ]">
        <slot />
    </button>
</template>

<script setup>
defineProps({
    variant: {
        type: String,
        default: 'accent',
        validator: (val) => ['accent', 'ghost', 'outline'].includes(val)
    },
    to: {
        type: [String, Object],
        default: undefined
    }
})

const variants = {
    accent: 'bg-accent text-primary hover:brightness-95 active:scale-95',
    ghost: 'bg-transparent text-primary border border-primary/20 hover:bg-primary/5 active:scale-95',
    outline: 'bg-transparent text-primary border border-primary hover:bg-primary hover:text-secondary active:scale-95',
}
</script>