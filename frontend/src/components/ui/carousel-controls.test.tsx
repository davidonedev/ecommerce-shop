import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import { describe, expect, it, vi } from 'vitest'
import { CarouselArrow, CarouselDots } from './carousel-controls'

function Dots() {
  const [active, setActive] = useState(0)
  return <CarouselDots count={3} active={active} onSelect={setActive} label="Slides do hero" />
}

describe('CarouselDots', () => {
  it('cria um botão por slide, com nome e aria-current só no ativo', () => {
    render(<Dots />)

    const group = screen.getByRole('group', { name: 'Slides do hero' })
    const buttons = screen.getAllByRole('button')
    expect(group).toContainElement(buttons[0])
    expect(buttons).toHaveLength(3)
    expect(buttons[0]).toHaveAccessibleName('Ir para o slide 1 de 3')
    expect(buttons[0]).toHaveAttribute('aria-current', 'true')
    expect(buttons[1]).not.toHaveAttribute('aria-current')
  })

  it('troca o ativo ao clicar e pelo teclado (Tab + Enter), e o ativo fica rosé e mais largo', async () => {
    render(<Dots />)

    await userEvent.click(screen.getByRole('button', { name: 'Ir para o slide 3 de 3' }))
    const buttons = screen.getAllByRole('button')
    expect(buttons[2]).toHaveAttribute('aria-current', 'true')
    expect(buttons[0]).not.toHaveAttribute('aria-current')
    expect(buttons[2].firstElementChild?.className).toContain('bg-rose')
    expect(buttons[2].firstElementChild?.className).toContain('w-6')
    expect(buttons[0].firstElementChild?.className).toContain('bg-field-border')

    buttons[1].focus()
    await userEvent.keyboard('{Enter}')
    expect(buttons[1]).toHaveAttribute('aria-current', 'true')
  })

  it('cada ponto tem alvo de toque de 44px de altura', () => {
    render(<Dots />)
    for (const button of screen.getAllByRole('button')) {
      expect(button.className).toContain('h-11')
    }
  })
})

describe('CarouselArrow', () => {
  it('tem nome acessível padrão por direção e dispara o clique', async () => {
    const onClick = vi.fn()
    render(
      <>
        <CarouselArrow direction="prev" />
        <CarouselArrow direction="next" onClick={onClick} />
      </>,
    )

    expect(screen.getByRole('button', { name: 'Slide anterior' })).toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: 'Próximo slide' }))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('tem duas aparências: círculo com borda (direita) e só chevron (esquerda), ambas com 44px', () => {
    render(
      <>
        <CarouselArrow direction="prev" appearance="chevron" label="Voltar" />
        <CarouselArrow direction="next" appearance="circle" label="Avançar" />
      </>,
    )

    const chevron = screen.getByRole('button', { name: 'Voltar' })
    const circle = screen.getByRole('button', { name: 'Avançar' })
    expect(circle.className).toContain('border')
    expect(circle.className).toContain('bg-bg')
    expect(chevron.className).not.toContain('border-border')
    expect(chevron.className).toContain('bg-transparent')
    expect(chevron.className).toContain('size-11')
    expect(circle.className).toContain('size-11')
  })
})
