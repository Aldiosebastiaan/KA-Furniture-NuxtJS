<template>
  <div class="min-h-screen bg-secondary font-sans">
    <Navbar />
    <HeroSection />
    <CollectionSection />
    <ExperienceSection />
    <ShowcaseSection />
    <BannerSection />
    <FooterSection />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible')
        // Optional: stop observing once it's visible so it doesn't animate again
        // observer.unobserve(entry.target)
      }
    })
  }, {
    threshold: 0.1, // Trigger when 10% of the element is visible
    rootMargin: "0px 0px -50px 0px"
  })

  // Observe all elements with the animate-on-scroll class
  document.querySelectorAll('.animate-on-scroll').forEach((el) => {
    observer.observe(el)
  })
})
</script>
