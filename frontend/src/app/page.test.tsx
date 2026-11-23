import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import HomePage from './page'

describe('Home', () => {
  it('tem um único h1 e os dois caminhos principais', () => {
    render(<HomePage />)

    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
    expect(
      screen.getByRole('heading', { level: 1, name: /seu nome, sua história, no seu tapete/i }),
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Criar o meu' })).toHaveAttribute('href', '/personalizar')
    expect(screen.getByRole('link', { name: 'Ver mais vendidos' })).toHaveAttribute('href', '/produtos')
  })
})
