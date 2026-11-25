import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { reviews } from '@/data/mock/reviews'
import { Reviews } from './reviews'

describe('Reviews', () => {
  it('lista os depoimentos, cada um com "Compra verificada" e 5 estrelas', () => {
    render(<Reviews reviews={reviews} />)
    expect(screen.getByRole('heading', { level: 2, name: 'Avaliações dos Clientes' })).toBeInTheDocument()
    expect(screen.getAllByText('Compra verificada')).toHaveLength(reviews.length)
    expect(screen.getAllByRole('img', { name: /5 de 5/ })).toHaveLength(reviews.length)
  })

  it('tem 6 depoimentos de exemplo', () => {
    expect(reviews).toHaveLength(6)
  })

  it('não renderiza o carrossel sem avaliações', () => {
    const { container } = render(<Reviews reviews={[]} />)
    expect(container).toBeEmptyDOMElement()
  })
})
