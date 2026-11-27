import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Rating } from './rating'

describe('Rating', () => {
  it('é lido como "4,9 de 5, 2.300 avaliações"', () => {
    render(<Rating value={4.9} count={2300} />)

    expect(screen.getByRole('img', { name: '4,9 de 5, 2.300 avaliações' })).toBeInTheDocument()
  })

  it('sem contagem, lê só a nota', () => {
    render(<Rating value={5} />)

    expect(screen.getByRole('img', { name: '5 de 5' })).toBeInTheDocument()
  })

  it('mostra o nº de avaliações entre parênteses, só visualmente', () => {
    render(<Rating value={4} count={128} />)

    const count = screen.getByText('(128)')
    expect(count).toHaveAttribute('aria-hidden', 'true')
  })

  it('preenche as estrelas em proporção à nota e usa o amarelo das estrelas', () => {
    render(<Rating value={3.5} />)

    const fill = screen.getByTestId('rating-fill')
    expect(fill.style.width).toBe('70%')
    expect(fill.className).toContain('text-star')
  })

  it('limita a nota entre 0 e 5', () => {
    const { rerender } = render(<Rating value={9} />)
    expect(screen.getByTestId('rating-fill').style.width).toBe('100%')

    rerender(<Rating value={-2} />)
    expect(screen.getByTestId('rating-fill').style.width).toBe('0%')
  })

  it('showValue mostra a nota também em texto (o amarelo não atinge 3:1 sozinho)', () => {
    render(<Rating value={4.9} count={10} showValue />)

    expect(screen.getByText('4,9')).toBeInTheDocument()
    // A nota continua sendo lida uma vez só: o texto visível é decorativo para o leitor de tela.
    expect(screen.getByText('4,9')).toHaveAttribute('aria-hidden', 'true')
  })

  it('desenha 5 estrelas de 12px (size-3)', () => {
    const { container } = render(<Rating value={4} />)

    const stars = container.querySelectorAll('svg')
    expect(stars).toHaveLength(10) // 5 de fundo + 5 preenchidas
    for (const star of stars) expect(star.getAttribute('class')).toContain('size-3')
  })
})
