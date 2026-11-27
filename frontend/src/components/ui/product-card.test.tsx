import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { products } from '@/data/mock/products'
import { useCartStore } from '@/store/cartStore'
import type { Product } from '@/types/product'
import { discountPercent, ProductCard } from './product-card'

const base = products.find((p) => !p.personalizable) ?? products[0]

function make(overrides: Partial<Product> = {}): Product {
  return { ...base, personalizable: false, badges: [], ...overrides }
}

describe('discountPercent', () => {
  it('calcula o percentual inteiro a partir do preço anterior', () => {
    expect(discountPercent(80, 100)).toBe(20)
    expect(discountPercent(169.9, 199.9)).toBe(15)
  })

  it('é 0 sem preço anterior, igual ou menor que o atual', () => {
    expect(discountPercent(100)).toBe(0)
    expect(discountPercent(100, 100)).toBe(0)
    expect(discountPercent(100, 90)).toBe(0)
  })
})

describe('ProductCard variant="shop"', () => {
  beforeEach(() => useCartStore.setState({ items: [] }))

  it('mostra o selo -20% calculado, com texto acessível, e o preço antigo riscado ao lado do atual', () => {
    render(<ProductCard variant="shop" product={make({ price: 159.99, oldPrice: 199.99 })} />)

    const badge = screen.getByText(/^-20%/)
    expect(badge.className).toContain('bg-graphite')
    expect(badge).toHaveTextContent('-20% de desconto')

    const price = screen.getByText('R$ 159,99')
    expect(price.className).toContain('text-price')
    const old = screen.getByText('R$ 199,99')
    expect(old.tagName).toBe('S')
    // Quem usa leitor de tela ouve qual é o preço atual e qual é o anterior.
    expect(screen.getByText(/Preço atual:/)).toBeInTheDocument()
    expect(screen.getByText(/Preço anterior:/)).toBeInTheDocument()
  })

  it('sem preço anterior não mostra selo nem preço riscado', () => {
    render(<ProductCard variant="shop" product={make({ price: 159.99 })} />)

    expect(screen.queryByText(/^-\d+%/)).toBeNull()
    expect(screen.queryByText(/Preço anterior/)).toBeNull()
  })

  it('mostra o selo PERSONALIZÁVEL à esquerda só quando o produto tem esse selo', () => {
    const { rerender } = render(<ProductCard variant="shop" product={make({ badges: ['customizable'] })} />)
    expect(screen.getByText('Personalizável').className).toContain('border-rose-strong')

    rerender(<ProductCard variant="shop" product={make({ badges: [] })} />)
    expect(screen.queryByText('Personalizável')).toBeNull()
  })

  it('mostra as estrelas com a nota e o nº de avaliações', () => {
    render(<ProductCard variant="shop" product={make({ rating: 4.5, reviewCount: 96 })} />)

    expect(screen.getByRole('img', { name: '4,5 de 5, 96 avaliações' })).toBeInTheDocument()
    expect(screen.getByText('(96)')).toBeInTheDocument()
  })

  it('o botão de produto pronto é de largura total, diz ADICIONAR AO CARRINHO e chama onAddToCart', async () => {
    const onAddToCart = vi.fn()
    const product = make()
    render(<ProductCard variant="shop" product={product} onAddToCart={onAddToCart} />)

    const button = screen.getByRole('button', { name: new RegExp(`Adicionar ao carrinho.*${product.name}`) })
    expect(button.className).toContain('w-full')
    await userEvent.click(button)
    expect(onAddToCart).toHaveBeenCalledWith(product)
    // Com callback próprio, o card não mexe no carrinho por conta própria.
    expect(useCartStore.getState().items).toHaveLength(0)
  })

  it('sem callback, adiciona ao carrinho (zustand), mesmo sem o provedor de avisos', async () => {
    const product = make()
    render(<ProductCard variant="shop" product={product} />)

    await userEvent.click(screen.getByRole('button', { name: /Adicionar ao carrinho/ }))
    expect(useCartStore.getState().items).toEqual([{ product, quantity: 1 }])
  })

  it('produto personalizável troca o botão por um link PERSONALIZAR para /personalizar', () => {
    const product = make({ personalizable: true })
    render(<ProductCard variant="shop" product={product} />)

    const link = screen.getByRole('link', { name: new RegExp(`Personalizar.*${product.name}`) })
    expect(link).toHaveAttribute('href', `/personalizar?produto=${product.slug}`)
    expect(link.className).toContain('w-full')
    expect(screen.queryByRole('button', { name: /Adicionar ao carrinho/ })).toBeNull()
  })

  it('a imagem fica em área quadrada com fundo cinza-claro e o nome é um título com link', () => {
    const { container } = render(<ProductCard variant="shop" product={make()} headingAs="h3" />)

    expect(container.querySelector('.aspect-square.bg-surface')).not.toBeNull()
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(base.name)
  })
})

describe('ProductCard variant="detailed" (padrão, usado em /produtos)', () => {
  it('continua mostrando parcelas e o botão Personalizar', () => {
    render(<ProductCard product={make({ installments: 6 })} />)

    expect(screen.getByText(/ou 6x de/)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Personalizar' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Favoritar/ })).toBeInTheDocument()
  })
})
