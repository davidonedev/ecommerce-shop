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
    expect(link.className).toContain('bg-accent')
  })
})
