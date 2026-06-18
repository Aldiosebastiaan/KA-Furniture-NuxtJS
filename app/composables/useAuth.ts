import { useState } from '#app'
import { computed } from 'vue'

export const useAuth = () => {
  const user = useState<any>('auth-user', () => null)
  const isInitialized = useState<boolean>('auth-initialized', () => false)

  const initAuth = () => {
    if (import.meta.client && !isInitialized.value) {
      const sessionData = localStorage.getItem('auth_session')
      if (sessionData) {
        try {
          user.value = JSON.parse(sessionData)
        } catch (e) {
          console.error('Failed to parse session data', e)
        }
      }
      isInitialized.value = true
    }
  }

  initAuth()

  const getUsers = () => {
    if (import.meta.server) return []
    try {
      const data = localStorage.getItem('auth_users')
      return data ? JSON.parse(data) : []
    } catch {
      return []
    }
  }

  const saveUsers = (users: any[]) => {
    if (import.meta.client) {
      localStorage.setItem('auth_users', JSON.stringify(users))
    }
  }

  const register = (name: string, email: string, password: string) => {
    const users = getUsers()
    const exists = users.find((u: any) => u.email === email)
    if (exists) {
      throw new Error('Email already registered')
    }

    const newUser = { id: Date.now().toString(), name, email, password }
    users.push(newUser)
    saveUsers(users)

    user.value = { id: newUser.id, name: newUser.name, email: newUser.email }
    if (import.meta.client) {
      localStorage.setItem('auth_session', JSON.stringify(user.value))
    }
  }

  const login = (email: string, password: string) => {
    const users = getUsers()
    const foundUser = users.find((u: any) => u.email === email && u.password === password)

    if (!foundUser) {
      throw new Error('Invalid email or password')
    }

    user.value = { id: foundUser.id, name: foundUser.name, email: foundUser.email }
    if (import.meta.client) {
      localStorage.setItem('auth_session', JSON.stringify(user.value))
    }
  }

  const loginWithGoogle = () => {
    user.value = { id: 'google-' + Date.now(), name: 'Google User', email: 'user@gmail.com' }
    if (import.meta.client) {
      localStorage.setItem('auth_session', JSON.stringify(user.value))
    }
  }

  const logout = () => {
    user.value = null
    if (import.meta.client) {
      localStorage.removeItem('auth_session')
    }
  }

  return {
    user,
    isLoggedIn: computed(() => !!user.value),
    register,
    login,
    loginWithGoogle,
    logout
  }
}
