import { beforeEach, describe, expect, it } from 'vitest'
import { products } from '@/data/mock/products'
import { useCartStore } from './cartStore'

const [tapete, bolsa] = products

describe('cartStore', () => {
  beforeEach(() => {
    useCartStore.getState().clear()
  })

  it('adiciona um produto novo com quantidade 1', () => {
    useCartStore.getState().addItem(tapete)

    expect(useCartStore.getState().items).toEqual([{ product: tapete, quantity: 1 }])
  })

  it('soma a quantidade ao adicionar o mesmo produto de novo', () => {
    const { addItem } = useCartStore.getState()
    addItem(tapete)
    addItem(tapete)

    expect(useCartStore.getState().items).toHaveLength(1)
    expect(useCartStore.getState().items[0].quantity).toBe(2)
  })

  it('calcula total de itens e valor total', () => {
    const { addItem } = useCartStore.getState()
    addItem(tapete)
    addItem(tapete)
    addItem(bolsa)

    const state = useCartStore.getState()
    expect(state.totalItems()).toBe(3)
    expect(state.totalPrice()).toBeCloseTo(tapete.price * 2 + bolsa.price, 2)
  })

  it('remove um produto e esvazia o carrinho', () => {
    const { addItem, removeItem, clear } = useCartStore.getState()
    addItem(tapete)
    addItem(bolsa)

    removeItem(tapete.id)
    expect(useCartStore.getState().items.map((i) => i.product.id)).toEqual([bolsa.id])

    clear()
    expect(useCartStore.getState().items).toEqual([])
  })
})
