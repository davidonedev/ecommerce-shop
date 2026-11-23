import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { Button } from './button'
import { Drawer, DrawerContent, DrawerTrigger } from './drawer'
import { Modal, ModalContent, ModalTrigger } from './modal'
import { ToastProvider, useToast } from './toast'
import { Tooltip, TooltipProvider } from './tooltip'

describe('Modal', () => {
  it('abre com nome acessível, prende o foco, fecha com Esc e devolve o foco ao botão', async () => {
    const user = userEvent.setup()
    render(
      <Modal>
        <ModalTrigger asChild>
          <Button>Abrir</Button>
        </ModalTrigger>
        <ModalContent title="Tamanhos" description="Escolha o tamanho do tapete.">
          <button>Primeiro</button>
          <button>Segundo</button>
        </ModalContent>
      </Modal>,
    )

    const trigger = screen.getByRole('button', { name: 'Abrir' })
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()

    await user.click(trigger)
    const dialog = await screen.findByRole('dialog', { name: 'Tamanhos' })
    expect(dialog).toHaveAccessibleDescription('Escolha o tamanho do tapete.')
    expect(dialog).toContainElement(document.activeElement as HTMLElement)

    // Tab nunca sai do modal: depois de percorrer tudo, o foco continua dentro dele.
    for (let i = 0; i < 6; i++) {
      await user.tab()
      expect(dialog).toContainElement(document.activeElement as HTMLElement)
    }

    await user.keyboard('{Escape}')
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
    expect(trigger).toHaveFocus()
  })

  it('tem botão Fechar acessível', async () => {
    const user = userEvent.setup()
    render(
      <Modal>
        <ModalTrigger asChild>
          <Button>Abrir</Button>
        </ModalTrigger>
        <ModalContent title="Aviso">Conteúdo</ModalContent>
      </Modal>,
    )

    await user.click(screen.getByRole('button', { name: 'Abrir' }))
    await user.click(await screen.findByRole('button', { name: 'Fechar' }))

    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
  })
})

describe('Drawer', () => {
  it('abre como diálogo nomeado e fecha com Esc devolvendo o foco', async () => {
    const user = userEvent.setup()
    render(
      <Drawer>
        <DrawerTrigger asChild>
          <Button>Menu</Button>
        </DrawerTrigger>
        <DrawerContent title="Menu" side="left">
          <button>Produtos</button>
        </DrawerContent>
      </Drawer>,
    )

    const trigger = screen.getByRole('button', { name: 'Menu' })
    await user.click(trigger)
    expect(await screen.findByRole('dialog', { name: 'Menu' })).toBeInTheDocument()

    await user.keyboard('{Escape}')
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
    expect(trigger).toHaveFocus()
  })
})

function ToastDemo() {
  const { toast } = useToast()
  return (
    <Button onClick={() => toast({ title: 'Adicionado ao carrinho', description: 'Capacho', tone: 'success' })}>
      Avisar
    </Button>
  )
}

describe('Toast', () => {
  it('mostra o aviso e permite fechar', async () => {
    const user = userEvent.setup()
    render(
      <ToastProvider>
        <ToastDemo />
      </ToastProvider>,
    )

    await user.click(screen.getByRole('button', { name: 'Avisar' }))
    expect(await screen.findByText('Adicionado ao carrinho')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Fechar aviso' }))
    await waitFor(() => expect(screen.queryByText('Adicionado ao carrinho')).not.toBeInTheDocument())
  })

  it('useToast fora do provedor falha com mensagem clara', () => {
    expect(() => render(<ToastDemo />)).toThrow(/ToastProvider/)
  })
})

describe('Tooltip', () => {
  it('aparece ao focar com o teclado e some com Esc', async () => {
    const user = userEvent.setup()
    render(
      <TooltipProvider delayDuration={0}>
        <Tooltip content="Guia de tamanhos">
          <Button>Ajuda</Button>
        </Tooltip>
      </TooltipProvider>,
    )

    await user.tab()
    expect(screen.getByRole('button', { name: 'Ajuda' })).toHaveFocus()
    expect(await screen.findByRole('tooltip')).toHaveTextContent('Guia de tamanhos')

    await user.keyboard('{Escape}')
    await waitFor(() => expect(screen.queryByRole('tooltip')).not.toBeInTheDocument())
  })
})
