<template>
  <div class="min-h-screen bg-secondary font-sans flex flex-col">
    <Navbar />
    <div class="flex-grow">
      <NuxtPage />
    </div>
    <FooterSection />
    <CartModal />
    <CartAnimation />
  </div>
</template>

<script setup>
</script>
