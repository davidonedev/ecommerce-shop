import { describe, expect, it } from 'vitest'
import { categoryHref, getStoreCategory, storeCategories } from './categories'
import { mainNav, navCategories } from './mock/navigation'

describe('categorias da loja', () => {
  it('são exatamente 3, na ordem da loja', () => {
    expect(storeCategories.map((c) => c.name)).toEqual(['Chinelos Personalizados', 'Bolsas Personalizadas', 'Tapetes'])
  })

  it('os slugs são únicos e bons para endereço', () => {
    const slugs = storeCategories.map((c) => c.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
    for (const slug of slugs) expect(slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/)
  })

  it('getStoreCategory acha pelo slug e devolve undefined para o que não existe', () => {
    expect(getStoreCategory('tapetes')?.name).toBe('Tapetes')
    expect(getStoreCategory('capachos')).toBeUndefined()
  })

  it('o endereço da categoria é /categorias/<slug>', () => {
    expect(categoryHref('tapetes')).toBe('/categorias/tapetes')
  })

  it('o menu tem as 3 categorias primeiro, depois os atalhos', () => {
    expect(navCategories.map((i) => i.href)).toEqual(storeCategories.map((c) => categoryHref(c.slug)))
    expect(mainNav.slice(0, 3)).toEqual(navCategories)
    expect(mainNav.slice(3).map((i) => i.href)).toEqual(['/produtos', '/personalizar'])
  })
})
