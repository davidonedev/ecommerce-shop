import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { products } from '@/data/mock/products'
import { CategoryShowcase } from './category-showcase'

describe('CategoryShowcase', () => {
  it('mostra o título da categoria, os produtos e o link "Ver todos" para a página dela', () => {
    render(<CategoryShowcase slug="tapetes" name="Tapetes" products={products.slice(0, 4)} />)
    expect(screen.getByRole('heading', { level: 2, name: 'Tapetes' })).toBeInTheDocument()
    expect(within(screen.getByRole('list', { name: 'Tapetes' })).getAllByRole('listitem')).toHaveLength(4)
    expect(screen.getByRole('link', { name: /Ver todos/ })).toHaveAttribute('href', '/categorias/tapetes')
  })

  it('não renderiza nada quando a categoria não tem produtos', () => {
    const { container } = render(<CategoryShowcase slug="tapetes" name="Tapetes" products={[]} />)
    expect(container).toBeEmptyDOMElement()
  })
})
