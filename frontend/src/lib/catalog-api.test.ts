import { describe, expect, it } from 'vitest'
import { isProductSort, toProduct, type ApiProduct } from './catalog-api'

const base: ApiProduct = {
  id: 1,
  name: 'Produto',
  slug: 'produto',
  description: null,
  categoryName: null,
  categorySlug: null,
  price: 10,
  oldPrice: null,
  inStock: true,
  imageUrl: '/mock/produtos/x.jpg',
  hoverImageUrl: null,
  rating: 4.5,
  reviewCount: 3,
  personalizable: false,
  bestSeller: false,
}

describe('toProduct', () => {
  it.each([
    ['chinelos-personalizados', 'chinelo-personalizado-nome', 'chinelos'],
    ['chinelos-personalizados', 'rasteirinha-pompons', 'chinelos'],
    ['bolsas-personalizadas', 'bolsa-tote-monograma', 'bolsas'],
    ['bolsas-personalizadas', 'necessaire-iniciais', 'bolsas'],
    ['tapetes', 'capacho-bem-vindos-sobrenome', 'tapetes'],
    ['tapetes', 'tapete-pet-nome', 'tapetes'],
  ])('categoria %s + produto %s -> %s', (categorySlug, slug, expected) => {
    expect(toProduct({ ...base, categorySlug, slug }).category).toBe(expected)
  })

  it('produto sem estoque vira soldOut e o destaque vira bestSeller', () => {
    const product = toProduct({ ...base, inStock: false, bestSeller: true })
    expect(product.soldOut).toBe(true)
    expect(product.bestSeller).toBe(true)
  })

  it('sem foto de ambiente, usa a principal nas duas posições', () => {
    const product = toProduct(base)
    expect(product.images[1].src).toBe(product.images[0].src)
  })
})

describe('isProductSort', () => {
  it('aceita só as ordenações da API', () => {
    expect(isProductSort('price_asc')).toBe(true)
    expect(isProductSort('qualquer')).toBe(false)
    expect(isProductSort(undefined)).toBe(false)
  })
})
