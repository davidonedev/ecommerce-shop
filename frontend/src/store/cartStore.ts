import { create } from 'zustand'
import type { Product } from '@/types/product'

export interface CartItem {
  product: Product
  quantity: number
}

interface CartState {
  items: CartItem[]
  addItem: (product: Product, quantity?: number) => void
  removeItem: (productId: number) => void
  clear: () => void
  totalItems: () => number
  totalPrice: () => number
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  addItem: (product, quantity = 1) =>
    set((state) => {
      const amount = Math.max(1, Math.floor(quantity))
      const existing = state.items.find((i) => i.product.id === product.id)
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.product.id === product.id ? { ...i, quantity: i.quantity + amount } : i,
          ),
        }
      }
      return { items: [...state.items, { product, quantity: amount }] }
    }),
  removeItem: (productId) => set((state) => ({ items: state.items.filter((i) => i.product.id !== productId) })),
  clear: () => set({ items: [] }),
  totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
  totalPrice: () => get().items.reduce((sum, i) => sum + i.quantity * i.product.price, 0),
}))
