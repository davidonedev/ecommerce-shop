import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('App', () => {
  it('renderiza a Home com o título de boas-vindas', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { name: /bem-vindo à ecommerce shop/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /carrinho \(0\)/i })).toBeInTheDocument()
  })
})
