import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { Product } from '../../models/product'

type CartItem = {
  product: Product
  quantity: number
}

type CartStore = {
  count: number
  addACart: () => void
  cart: CartItem[]
  addToCart: (product: Product, quantity: number) => void
  removeFromCart: (productId: number) => void
  clearCart: () => void
  cartTotalQuantity: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      count: 0,
      addACart: () => set((state) => ({ count: state.count + 1 })),
      cart: [],
      addToCart: (product: Product, quantity: number) => {
        set((state) => {
          const existingItemIndex = state.cart.findIndex(
            (item) => item.product.id === product.id
          )

          if (existingItemIndex !== -1) {
            const updatedCart = [...state.cart]
            updatedCart[existingItemIndex].quantity += quantity
            return { cart: updatedCart }
          } else {
            return { cart: [...state.cart, { product, quantity }] }
          }
        })
      },
      removeFromCart: (productId: number) => {
        set((state) => ({
          cart: state.cart.filter((item) => item.product.id !== productId),
        }))
      },
      clearCart: () => set({ cart: [] }),
      cartTotalQuantity: () => {
        return get().cart.reduce((total, item) => total + item.quantity, 0)
      },
    }),
    {
      name: 'food-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
)
export default useCartStore
