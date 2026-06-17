<template>
    <section class="flex items-start px-6 md:px-16 lg:px-24 pt-12 pb-20">
        <div class="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            <!-- Left Content -->
            <div class="flex flex-col gap-6">
                <h1 class="text-3xl md:text-5xl lg:text-6xl font-semibold text-primary leading-tight">
                    Timeless Furniture for the Modern Minimalist
                </h1>

                <p class="text-sm md:text-base text-primary/80 max-w-sm leading-relaxed">
                    An interior design concept that prioritizes beautiful, functional, durable and timeless furniture to
                    create modern and minimalist spaces.
                </p>

                <div class="flex items-center gap-4 mt-2">
                    <UiButton variant="accent">Buy Now</UiButton>
                    <UiButton variant="outline">Show Products</UiButton>
                </div>
            </div>

            <!-- Right Image -->
            <div class="relative w-full aspect-[4/3] lg:aspect-square">
                <img src="/images/hero-room.png" alt="Modern minimalist living room"
                    class="w-full h-full object-cover rounded-3xl" />
            </div>

        </div>
    </section>
</template>