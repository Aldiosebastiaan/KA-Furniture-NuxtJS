import { ref, computed } from 'vue'

export interface CartItem {
  name: string
  image: string
  quantity: number
  price: number
  selected?: boolean
}

interface CartAnimation {
  id: number
  startX: number
  startY: number
  endX: number
  endY: number
}

const cartItems = ref<CartItem[]>([])
const isCartOpen = ref(false)
const animations = ref<CartAnimation[]>([])
let animationId = 0
const isCartBumping = ref(false)

export const useCart = () => {
  const triggerAnimation = (event: MouseEvent) => {
    const btn = event.currentTarget as HTMLElement
    const rect = btn.getBoundingClientRect()
    const cartIcon = document.getElementById('cart-icon')
    
    let targetX = window.innerWidth - 50
    let targetY = 30
    
    if (cartIcon) {
      const cartRect = cartIcon.getBoundingClientRect()
      targetX = cartRect.left + cartRect.width / 2
      targetY = cartRect.top + cartRect.height / 2
    }

    animations.value.push({
      id: animationId++,
      startX: rect.left + rect.width / 2,
      startY: rect.top + rect.height / 2,
      endX: targetX,
      endY: targetY
    })

    setTimeout(() => {
      animations.value.shift()
      // Trigger bump when item reaches cart
      isCartBumping.value = true
      setTimeout(() => {
        isCartBumping.value = false
      }, 300)
    }, 800)
  }

  const addToCart = (product: { name: string; image: string; price: number }, event?: MouseEvent) => {
    if (event) triggerAnimation(event)
    
    const existingItem = cartItems.value.find(item => item.name === product.name)
    if (existingItem) {
      existingItem.quantity += 1
    } else {
      cartItems.value.push({ ...product, quantity: 1, selected: true })
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

  const toggleItemSelection = (productName: string) => {
    const item = cartItems.value.find(item => item.name === productName)
    if (item) {
      item.selected = item.selected === false ? true : false
    }
  }

  const toggleSelectAll = (select: boolean) => {
    cartItems.value.forEach(item => {
      item.selected = select
    })
  }

  const cartTotalItems = computed(() => {
    return cartItems.value
      .reduce((total, item) => total + item.quantity, 0)
  })

  const selectedCartTotalItems = computed(() => {
    return cartItems.value
      .filter(item => item.selected !== false)
      .reduce((total, item) => total + item.quantity, 0)
  })

  const checkedCartItemsCount = computed(() => {
    return cartItems.value.filter(item => item.selected !== false).length
  })

  const cartTotalPrice = computed(() => {
    return cartItems.value
      .filter(item => item.selected !== false)
      .reduce((total, item) => total + (item.price * item.quantity), 0)
  })

  return {
    cartItems,
    isCartOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    toggleCart,
    cartTotalItems,
    selectedCartTotalItems,
    checkedCartItemsCount,
    cartTotalPrice,
    toggleItemSelection,
    toggleSelectAll,
    animations,
    isCartBumping
  }
}
