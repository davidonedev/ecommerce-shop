import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'
import { products } from '@/data/mock/products'
import { useCartStore } from '@/store/cartStore'
import type { Product } from '@/types/product'
import { QuantityStepper } from './quantity-stepper'
import { StoreProductCard } from './store-product-card'

const base = products.find((p) => !p.personalizable) ?? products[0]

function make(overrides: Partial<Product> = {}): Product {
  return { ...base, personalizable: false, badges: [], price: 189.9, oldPrice: undefined, ...overrides }
}

describe('StoreProductCard', () => {
  beforeEach(() => useCartStore.setState({ items: [] }))

  it('mostra preço, valor à vista no Pix e parcelamento com juros', () => {
    render(<StoreProductCard product={make()} />)
    expect(screen.getByText('R$ 189,90').className).toContain('text-rose-strong')
    expect(screen.getByText('R$ 180,41')).toBeInTheDocument()
    expect(screen.getByText(/à vista/)).toBeInTheDocument()
    expect(screen.getByText('12x')).toBeInTheDocument()
    expect(screen.getByText(/com juros/)).toBeInTheDocument()
  })

  it('"Comprar" adiciona ao carrinho', async () => {
    const user = userEvent.setup()
    render(<StoreProductCard product={make()} />)
    await user.click(screen.getByRole('button', { name: /Comprar/ }))
    expect(useCartStore.getState().items).toHaveLength(1)
    expect(useCartStore.getState().items[0].quantity).toBe(1)
  })

  it('com seletor, adiciona a quantidade escolhida', async () => {
    const user = userEvent.setup()
    render(<StoreProductCard product={make()} showQuantity />)
    await user.click(screen.getByRole('button', { name: /Aumentar quantidade/ }))
    await user.click(screen.getByRole('button', { name: /Aumentar quantidade/ }))
    await user.click(screen.getByRole('button', { name: /Comprar/ }))
    expect(useCartStore.getState().items[0].quantity).toBe(3)
  })

  it('produto personalizável tem o botão "Personalizar" em vez de "Comprar" e sem seletor', () => {
    render(<StoreProductCard product={make({ personalizable: true })} showQuantity />)
    expect(screen.getByRole('link', { name: /Personalizar/ })).toHaveAttribute('href', expect.stringContaining('/personalizar'))
    expect(screen.queryByRole('button', { name: /Comprar/ })).not.toBeInTheDocument()
    expect(screen.queryByRole('group', { name: /Quantidade/ })).not.toBeInTheDocument()
  })

  it('esgotado mostra o selo, troca o botão por "Avise-me quando chegar" e esconde o preço', () => {
    render(<StoreProductCard product={make({ soldOut: true })} />)
    expect(screen.getByText('Esgotado')).toBeInTheDocument()
    expect(screen.getByText('Esgotado :(')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Avise-me quando chegar/ })).toHaveAttribute('rel', 'noopener noreferrer')
    expect(screen.queryByRole('button', { name: /Comprar/ })).not.toBeInTheDocument()
    expect(screen.queryByText('R$ 189,90')).not.toBeInTheDocument()
  })

  it('selos LANÇAMENTO e DESTAQUE só aparecem quando pedidos e quando o produto os tem', () => {
    const product = make({ badges: ['new'], bestSeller: true })
    const { rerender } = render(<StoreProductCard product={product} />)
    expect(screen.queryByText('Lançamento')).not.toBeInTheDocument()
    rerender(<StoreProductCard product={product} showBadges />)
    expect(screen.getByText('Lançamento')).toBeInTheDocument()
    expect(screen.getByText('Destaque')).toBeInTheDocument()
  })
})

describe('QuantityStepper', () => {
  it('não passa do mínimo nem do máximo', async () => {
    const user = userEvent.setup()
    const values: number[] = []
    const { rerender } = render(<QuantityStepper value={1} min={1} max={2} onChange={(v) => values.push(v)} />)
    expect(screen.getByRole('button', { name: /Diminuir/ })).toBeDisabled()
    await user.click(screen.getByRole('button', { name: /Aumentar/ }))
    expect(values).toEqual([2])
    rerender(<QuantityStepper value={2} min={1} max={2} onChange={(v) => values.push(v)} />)
    expect(screen.getByRole('button', { name: /Aumentar/ })).toBeDisabled()
  })
})
