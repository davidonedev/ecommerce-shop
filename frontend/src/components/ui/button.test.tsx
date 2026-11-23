import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Button } from './button'

describe('Button', () => {
  it('chama onClick e usa type="button" por padrão', async () => {
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Comprar</Button>)

    const button = screen.getByRole('button', { name: 'Comprar' })
    expect(button).toHaveAttribute('type', 'button')
    await userEvent.click(button)
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('não dispara clique quando desabilitado', async () => {
    const onClick = vi.fn()
    render(
      <Button disabled onClick={onClick}>
        Comprar
      </Button>,
    )

    await userEvent.click(screen.getByRole('button', { name: 'Comprar' }))
    expect(onClick).not.toHaveBeenCalled()
  })

  it('em loading fica ocupado, bloqueado e não dispara clique', async () => {
    const onClick = vi.fn()
    render(
      <Button loading onClick={onClick}>
        Enviando
      </Button>,
    )

    const button = screen.getByRole('button', { name: 'Enviando' })
    expect(button).toBeDisabled()
    expect(button).toHaveAttribute('aria-busy', 'true')
    await userEvent.click(button)
    expect(onClick).not.toHaveBeenCalled()
  })

  it('com asChild aplica o visual ao link filho', () => {
    render(
      <Button asChild variant="accent">
        <a href="/personalizar">Criar o meu</a>
      </Button>,
    )

    const link = screen.getByRole('link', { name: 'Criar o meu' })
    expect(link).toHaveAttribute('href', '/personalizar')
    expect(link.className).toContain('bg-navy')
  })

  it('o apelido legado accent tem o mesmo visual do primary (marinho)', () => {
    render(<Button variant="accent">Legado</Button>)
    expect(screen.getByRole('button', { name: 'Legado' }).className).toContain('bg-navy')
  })

  it('variant cart ocupa a largura toda, aceita quebra de linha e fica marinho no hover', () => {
    render(<Button variant="cart">Adicionar ao carrinho</Button>)

    const { className } = screen.getByRole('button', { name: 'Adicionar ao carrinho' })
    expect(className).toContain('w-full')
    expect(className).toContain('whitespace-normal')
    expect(className).not.toContain('whitespace-nowrap')
    expect(className).toContain('hover:bg-navy')
    expect(className).toContain('hover:text-on-dark')
    expect(className).toContain('text-button-sm')
    expect(className).toContain('min-h-12')
  })

  it('arrow acrescenta a seta decorativa depois do texto', () => {
    render(<Button arrow>Personalizar agora</Button>)

    const button = screen.getByRole('button', { name: 'Personalizar agora' })
    const svg = button.querySelector('svg')
    expect(svg).not.toBeNull()
    expect(svg).toHaveAttribute('aria-hidden', 'true')
    expect(svg?.getAttribute('class')).toContain('arrow-slide')
    expect(button.lastElementChild).toBe(svg)
  })

  it('variant caramel usa o anel de foco claro (fica sobre fundo marinho) e texto marinho', () => {
    render(<Button variant="caramel">Fale conosco</Button>)

    const { className } = screen.getByRole('button', { name: 'Fale conosco' })
    expect(className).toContain('bg-caramel-light')
    expect(className).toContain('text-navy')
    expect(className).toContain('focus-visible:outline-caramel-light')
    expect(className).not.toContain('focus-visible:outline-navy')
  })

  it('size xs é compacto mas estende a área de toque a 44px por pseudo-elemento', () => {
    render(
      <Button variant="caramel" size="xs">
        Fale conosco
      </Button>,
    )

    const { className } = screen.getByRole('button', { name: 'Fale conosco' })
    expect(className).toContain('min-h-8')
    expect(className).toContain('after:-inset-y-1.5')
  })

  it('classes passadas por quem usa vencem as do botão (hidden md:inline-flex esconde no celular)', () => {
    render(
      <Button variant="caramel" size="xs" className="hidden md:inline-flex">
        Fale conosco
      </Button>,
    )

    const classes = screen.getByRole('button', { hidden: true, name: 'Fale conosco' }).className.split(' ')
    expect(classes).toContain('hidden')
    expect(classes).toContain('md:inline-flex')
    // O inline-flex puro do botão foi substituído, senão ele ganharia do hidden e o botão apareceria no celular.
    expect(classes).not.toContain('inline-flex')
  })
})
