import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './accordion'

function Faq() {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="prazo">
        <AccordionTrigger>Qual o prazo?</AccordionTrigger>
        <AccordionContent>Até 7 dias úteis.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="lavagem">
        <AccordionTrigger>Posso lavar?</AccordionTrigger>
        <AccordionContent>Sim, em ciclo delicado.</AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

describe('Accordion', () => {
  it('começa fechado e abre ao clicar, atualizando aria-expanded', async () => {
    render(<Faq />)

    const trigger = screen.getByRole('button', { name: 'Qual o prazo?' })
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
    expect(screen.queryByText('Até 7 dias úteis.')).not.toBeInTheDocument()

    await userEvent.click(trigger)
    expect(trigger).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByText('Até 7 dias úteis.')).toBeVisible()
  })

  it('abre pelo teclado e navega entre os itens com as setas', async () => {
    render(<Faq />)

    const first = screen.getByRole('button', { name: 'Qual o prazo?' })
    const second = screen.getByRole('button', { name: 'Posso lavar?' })

    first.focus()
    await userEvent.keyboard('{Enter}')
    expect(first).toHaveAttribute('aria-expanded', 'true')

    await userEvent.keyboard('{ArrowDown}')
    expect(second).toHaveFocus()
  })

  it('em modo single, abrir um item fecha o outro', async () => {
    render(<Faq />)

    const first = screen.getByRole('button', { name: 'Qual o prazo?' })
    const second = screen.getByRole('button', { name: 'Posso lavar?' })

    await userEvent.click(first)
    await userEvent.click(second)
    expect(first).toHaveAttribute('aria-expanded', 'false')
    expect(second).toHaveAttribute('aria-expanded', 'true')
  })
})
