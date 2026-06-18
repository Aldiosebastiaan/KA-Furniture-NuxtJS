import { ref, computed } from 'vue'

export interface CartItem {
  name: string
  image: string
  quantity: number
}

const cartItems = ref<CartItem[]>([])
const isCartOpen = ref(false)

export const useCart = () => {
  const addToCart = (product: { name: string; image: string }) => {
    const existingItem = cartItems.value.find(item => item.name === product.name)
    if (existingItem) {
      existingItem.quantity += 1
    } else {
      cartItems.value.push({ ...product, quantity: 1 })
    }
  }

  const removeFromCart = (productName: string) => {
    cartItems.value = cartItems.value.filter(item => item.name !== productName)
  }

  const updateQuantity = (productName: string, amount: number) => {
    const item = cartItems.value.find(item => item.name === productName)
    if (item) {
      item.quantity += amount
      if (item.quantity <= 0) {
        removeFromCart(productName)
      }
    }
  }

  const toggleCart = () => {
    isCartOpen.value = !isCartOpen.value
  }

  const cartTotalItems = computed(() => {
    return cartItems.value.reduce((total, item) => total + item.quantity, 0)
  })

  return {
    cartItems,
    isCartOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    toggleCart,
    cartTotalItems,
  }
}
