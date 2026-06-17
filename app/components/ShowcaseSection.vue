<template>
    <section id="showcase" class="px-6 md:px-16 lg:px-24 py-20">
        <div class="max-w-7xl mx-auto w-full animate-on-scroll">

            <!-- Header -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                <h2 class="text-4xl md:text-5xl font-bold text-primary leading-tight">
                    Explore Our Design <br />
                    Showcase
                </h2>

                <p class="text-primary/80 text-sm md:text-base leading-relaxed self-start">
                    Welcome to our design gallery, where comfort is the main focus.
                    See how our furniture, which is designed with the best and best
                    possible, to get and create a space that is not only beautiful,
                    but also very comfortable to enjoy every day.
                </p>
            </div>

            <!-- Gallery -->
            <div class="showcase-grid">

                <!-- 1 -->
                <div class="gallery-item area-1">
                    <img src="/images/showcase-1.png" alt="Chair in garden" />
                </div>

                <!-- 2 -->
                <div class="gallery-item area-2">
                    <img src="/images/showcase-2.png" alt="Bookshelf" />
                </div>

                <!-- 3 -->
                <div class="gallery-item area-3">
                    <img src="/images/showcase-3.png" alt="Interior" />
                </div>

                <!-- 5 -->
                <div class="gallery-item area-5">
                    <img src="/images/showcase-5.png" alt="Wood Shelf" />
                </div>

                <!-- 4 -->
                <div class="gallery-item area-4">
                    <img src="/images/showcase-4.png" alt="Chair Hill" />
                </div>

                <!-- 6 -->
                <div class="gallery-item area-6">
                    <img src="/images/showcase-6.png" alt="Living Room" />
                </div>

            </div>

            <!-- CTA -->
            <div class="flex justify-center mt-12">
                <UiButton variant="accent" size="md">
                    Explore Our Showcase
                </UiButton>
            </div>

        </div>
    </section>
</template>

<style scoped>
.showcase-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;

    grid-template-areas:
        "one two three"
        "five two six"
        "five four six";

    align-items: start;
}

.area-1 {
    grid-area: one;
    height: 390px;
}

.area-2 {
    grid-area: two;
    height: 726px;
}

.area-3 {
    grid-area: three;
    height: 390px;
}

.area-4 {
    grid-area: four;
    height: 390px;
}

.area-5 {
    grid-area: five;
    height: 726px;
}

.area-6 {
    grid-area: six;
    height: 726px;
}

.gallery-item {
    overflow: hidden;
    border-radius: 28px;
}

.gallery-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
}

@media (max-width: 1024px) {
    .showcase-grid {
        grid-template-columns: repeat(2, 1fr);

        grid-template-areas:
            "one two"
            "three two"
            "five six"
            "four four";
    }
}

@media (max-width: 768px) {
    .showcase-grid {
        grid-template-columns: 1fr;

        grid-template-areas:
            "one"
            "two"
            "three"
            "five"
            "four"
            "six";
    }

    .area-1,
    .area-2,
    .area-3,
    .area-4,
    .area-5,
    .area-6 {
        height: 320px;
    }
}
</style>