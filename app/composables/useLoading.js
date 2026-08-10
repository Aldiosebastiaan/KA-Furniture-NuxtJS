import { ref } from 'vue'

// Global loading flag used across the app
export const isGlobalLoading = ref(false)

export const setLoading = () => {
  isGlobalLoading.value = true
}

export const clearLoading = () => {
  isGlobalLoading.value = false
}
