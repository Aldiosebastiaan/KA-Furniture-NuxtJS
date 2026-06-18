<template>
    <footer class="px-6 md:px-16 lg:px-24 pt-16 pb-8">
        <div class="max-w-7xl mx-auto w-full animate-on-scroll">

            <!-- Main Footer -->
            <div class="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10 pb-10">

                <!-- Left: Logo + Tagline + Socials -->
                <div class="flex flex-col gap-6">
                    <div>
                        <p class="text-3xl font-bold text-primary">KA Furniture.</p>
                        <p class="text-primary/60 text-sm mt-1">Levate Your Space With Our Interior Design Services</p>
                    </div>

                    <!-- Social Icons -->
                    <div class="flex items-center gap-3">

                        <a v-for="social in socials" :key="social.name" :href="social.href" :aria-label="social.name"
                            class="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-primary
                        hover:brightness-95 transition-all duration-200 active:scale-95">
                            <component :is="social.icon" class="w-4 h-4" />
                        </a>
                    </div>
                </div>

                <!-- Right: Nav Links -->
                <nav class="flex flex-wrap items-center gap-4 md:gap-8 lg:pt-2">

                    <a v-for="link in navLinks" :key="link.name" :href="link.href"
                        class="text-primary font-medium text-sm hover:text-primary/60 transition-colors duration-200">
                        {{ link.name }}
                    </a>
                </nav>

            </div>

            <!-- Divider -->
            <div class="border-t border-primary/15" />

            <!-- Bottom Bar -->
            <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-6">
                <p class="text-primary/50 text-xs">KA Furniture @2025 All Rights Reserved</p>

                <div class="flex flex-wrap items-center gap-4 md:gap-6">

                    <a v-for="policy in policies" :key="policy" href="#"
                        class="text-primary/60 text-xs hover:text-primary transition-colors duration-200">
                        {{ policy }}
                    </a>
                </div>
            </div>

        </div>
    </footer>
</template>

<script setup>
import IconLinkedin from '@/components/ui/icons/IconLinkedin.vue'
import IconX from '@/components/ui/icons/IconX.vue'
import IconInstagram from '@/components/ui/icons/IconInstagram.vue'
import IconFacebook from '@/components/ui/icons/IconFacebook.vue'

const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Collection', href: '#collection' },
    { name: 'Showcase', href: '#showcase' },
    { name: 'Services', href: '#services' },
    { name: 'Shop Now', href: '/shop' },
]
const policies = ['Term & condition', 'Privacy Policy', 'Cookies']

const socials = [
    { name: 'LinkedIn', href: '#', icon: IconLinkedin },
    { name: 'X', href: '#', icon: IconX },
    { name: 'Instagram', href: '#', icon: IconInstagram },
    { name: 'Facebook', href: '#', icon: IconFacebook },
]
</script>