import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { DiscountSeal } from './discount-seal'

describe('DiscountSeal', () => {
  it('mostra ATÉ / 50% / OFF e é lido como um desconto, sem repetir os textos soltos', () => {
    const { container } = render(<DiscountSeal />)

    const seal = screen.getByRole('img', { name: 'Até 50% de desconto' })
    expect(seal).toHaveTextContent('Até')
    expect(seal).toHaveTextContent('50%')
    expect(seal).toHaveTextContent('OFF')
    // Os três textos internos são decorativos: o leitor de tela só lê o rótulo do conjunto.
    const hidden = container.querySelectorAll('[aria-hidden="true"]')
    expect(hidden).toHaveLength(3)
  })

  it('aceita textos e rótulo próprios', () => {
    render(<DiscountSeal prefix="Só hoje" value="30%" label="30% de desconto só hoje" />)

    expect(screen.getByRole('img', { name: '30% de desconto só hoje' })).toHaveTextContent('30%')
  })

  it('é um círculo marinho; o valor fica em caramelo claro (texto grande sobre marinho)', () => {
    const { container } = render(<DiscountSeal />)

    const seal = container.firstElementChild as HTMLElement
    expect(seal.className).toContain('rounded-full')
    expect(seal.className).toContain('bg-navy')
    expect(seal.className).toContain('md:size-28')
    expect(screen.getByText('50%').className).toContain('text-caramel-light')
  })
})
