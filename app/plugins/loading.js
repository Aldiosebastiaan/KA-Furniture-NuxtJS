import { defineNuxtPlugin, useRouter } from '#app'
import { setLoading, clearLoading } from '~/composables/useLoading'

export default defineNuxtPlugin(() => {
  const router = useRouter()
  router.beforeEach((to, from, next) => {
    setLoading()
    next()
  })
  router.afterEach(() => {
    clearLoading()
  })
})
