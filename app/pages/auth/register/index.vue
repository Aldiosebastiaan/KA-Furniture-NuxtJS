<template>
  <div class="flex items-stretch bg-secondary w-full" style="min-height: calc(100vh - 80px)">
    <!-- Left Image Panel (Hidden on Mobile) -->
    <div class="hidden lg:flex w-1/2 relative bg-primary items-center justify-center overflow-hidden">
      <!-- Use a different image or same hero image -->
      <img src="/images/hero-room.png" alt="Elegant Furniture"
        class="absolute inset-0 w-full h-full object-cover opacity-80" />
      <div class="absolute inset-0 bg-gradient-to-t from-primary/90 to-primary/20"></div>
      <div class="relative z-10 p-16 flex flex-col justify-end h-full w-full text-[#FFFAE6]">
        <h2 class="text-4xl font-bold mb-4 font-montserrat">Join Us.</h2>
        <p class="text-lg opacity-90 max-w-md">Create an account to start curating your dream space with our modern,
          minimalist furniture collections.</p>
      </div>
    </div>

    <!-- Right Form Panel -->
    <div class="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-16 relative">
      <NuxtLink to="/"
        class="absolute top-8 right-8 text-primary/60 hover:text-primary transition-colors flex items-center gap-2 text-sm font-medium">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
          class="w-4 h-4">
          <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
        </svg>
        Back
      </NuxtLink>

      <div class="w-full max-w-md flex flex-col gap-6">

        <div class="flex flex-col gap-2 text-center lg:text-left">
          <h1 class="text-3xl font-bold text-primary font-montserrat">Create an account</h1>
          <p class="text-primary/70">Let's get started. Please enter your details.</p>
        </div>

        <form @submit.prevent="handleRegister" class="flex flex-col gap-4">
          <div v-if="error" class="bg-red-50 text-red-600 text-sm p-3 rounded-xl border border-red-100 text-center">
            {{ error }}
          </div>

          <div class="flex flex-col gap-2">
            <label class="text-sm font-medium text-primary">Full Name</label>
            <input v-model="name" type="text" placeholder="Enter your full name" required
              class="w-full px-4 py-3 rounded-xl border border-primary/20 bg-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-primary placeholder:text-primary/40" />
          </div>

          <div class="flex flex-col gap-2">
            <label class="text-sm font-medium text-primary">Email</label>
            <input v-model="email" type="email" placeholder="Enter your email" required
              class="w-full px-4 py-3 rounded-xl border border-primary/20 bg-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-primary placeholder:text-primary/40" />
          </div>

          <div class="flex flex-col gap-2">
            <label class="text-sm font-medium text-primary">Password</label>
            <input v-model="password" type="password" placeholder="Create a password" required minlength="6"
              class="w-full px-4 py-3 rounded-xl border border-primary/20 bg-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-primary placeholder:text-primary/40" />
          </div>

          <button type="submit"
            class="w-full bg-primary text-white py-3 rounded-full font-semibold hover:bg-primary/90 active:scale-[0.98] transition-all mt-4">
            Sign up
          </button>

          <div class="relative flex items-center py-2">
            <div class="flex-grow border-t border-primary/10"></div>
            <span class="flex-shrink-0 mx-4 text-primary/40 text-sm">or</span>
            <div class="flex-grow border-t border-primary/10"></div>
          </div>

          <button type="button" @click="handleGoogleLogin"
            class="w-full flex items-center justify-center gap-3 bg-white border border-primary/20 text-primary py-3 rounded-full font-medium hover:bg-primary/5 active:scale-[0.98] transition-all">
            <svg class="w-5 h-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4" />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853" />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05" />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335" />
            </svg>
            Sign up with Google
          </button>
        </form>

        <p class="text-center text-sm text-primary/70">
          Already have an account?
          <NuxtLink to="/auth/login/index" class="text-primary font-semibold hover:text-accent transition-colors">Sign
            in</NuxtLink>
        </p>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '~/composables/useAuth'

const router = useRouter()
const auth = useAuth()

const name = ref('')
const email = ref('')
const password = ref('')
const error = ref('')

const handleRegister = () => {
  error.value = ''
  try {
    auth.register(name.value, email.value, password.value)
    router.push('/')
  } catch (err) {
    error.value = err.message || 'Registration failed'
  }
}

const handleGoogleLogin = () => {
  try {
    auth.loginWithGoogle()
    router.push('/')
  } catch (err) {
    error.value = 'Google sign up failed'
  }
}
</script>
