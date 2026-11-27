'use client'

import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import type { ReactNode } from 'react'
import { IconButton } from './icon-button'
import { cx, dialogOverlayClass, modalContentClass } from './variants'

/**
 * Modal (Radix Dialog): foco preso dentro, Esc fecha, foco volta ao gatilho ao fechar.
 * Uso: <Modal> <ModalTrigger asChild>...</ModalTrigger> <ModalContent title="...">...</ModalContent> </Modal>
 */
export const Modal = DialogPrimitive.Root
export const ModalTrigger = DialogPrimitive.Trigger
export const ModalClose = DialogPrimitive.Close

export interface ModalContentProps {
  /** Título do modal (obrigatório para leitores de tela). */
  title: string
  description?: string
  /** Esconde o título visualmente, mantendo-o para leitores de tela. */
  hideTitle?: boolean
  className?: string
  children?: ReactNode
}

export function ModalContent({ title, description, hideTitle, className, children }: ModalContentProps) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className={dialogOverlayClass} />
      <DialogPrimitive.Content
        className={cx(modalContentClass, className)}
        // Sem descrição, informa ao Radix que é intencional (evita aviso no console); com descrição, ele liga sozinho.
        {...(description ? {} : { 'aria-describedby': undefined })}
      >
        <DialogPrimitive.Title className={hideTitle ? 'sr-only' : 'pr-12 text-section-title text-graphite'}>
          {title}
        </DialogPrimitive.Title>
        {description ? (
          <DialogPrimitive.Description className="mt-2 text-text-muted">{description}</DialogPrimitive.Description>
        ) : null}
        <div className="mt-4">{children}</div>
        <DialogPrimitive.Close asChild>
          <IconButton label="Fechar" size="sm" className="absolute right-3 top-3">
            <X aria-hidden className="size-5" />
          </IconButton>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  )
}
