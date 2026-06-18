<template>
    <section class="px-6 md:px-16 lg:px-24 py-24 overflow-x-hidden">
        <div class="max-w-7xl mx-auto w-full animate-on-scroll">

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                <!-- Left: Image Card -->
                <div class="relative flex items-end order-last lg:order-first mt-8 lg:mt-0">
                    <!-- Green background card -->
                    <div
                        class="relative bg-primary rounded-3xl w-[80%] sm:w-[85%] lg:w-full max-w-[280px] sm:max-w-[340px] lg:max-w-[400px] aspect-[3.6/4]">
                        <!-- Furniture image overflow -->
                        <img src="/images/nordic-console-table.png" alt="Wooden sideboard furniture"
                            class="absolute bottom-8 -right-12 sm:bottom-12 sm:-right-16 lg:bottom-16 lg:-right-20 w-[90%] lg:w-[85%] object-contain drop-shadow-xl" />
                    </div>
                </div>

                <!-- Right: Text Content -->
                <div class="flex flex-col gap-5 lg:pl-20 order-first lg:order-last">
                    <h2 class="text-4xl md:text-5xl font-bold text-primary leading-tight">
                        New experience <br /> will unlock
                    </h2>
                    <p class="text-primary/80 text-sm md:text-base leading-relaxed max-w-sm">
                        A collection of furniture that will change your life.
                        Innovative design, high-quality materials and unmatched
                        comfort for an extraordinary experience.
                    </p>
                </div>

            </div>

        </div>
    </section>
</template>