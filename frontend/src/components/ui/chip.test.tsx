import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import { describe, expect, it } from 'vitest'
import { Chip } from './chip'

function Toggle() {
  const [selected, setSelected] = useState(false)
  return (
    <Chip selected={selected} onClick={() => setSelected((v) => !v)}>
      Elegante
    </Chip>
  )
}

describe('Chip', () => {
  it('expõe o estado em aria-pressed e alterna ao clicar', async () => {
    render(<Toggle />)

    const chip = screen.getByRole('button', { name: 'Elegante' })
    expect(chip).toHaveAttribute('aria-pressed', 'false')

    await userEvent.click(chip)
    expect(chip).toHaveAttribute('aria-pressed', 'true')

    await userEvent.click(chip)
    expect(chip).toHaveAttribute('aria-pressed', 'false')
  })

  it('alterna pelo teclado (Espaço e Enter)', async () => {
    render(<Toggle />)

    const chip = screen.getByRole('button', { name: 'Elegante' })
    chip.focus()
    await userEvent.keyboard(' ')
    expect(chip).toHaveAttribute('aria-pressed', 'true')
    await userEvent.keyboard('{Enter}')
    expect(chip).toHaveAttribute('aria-pressed', 'false')
  })
})
