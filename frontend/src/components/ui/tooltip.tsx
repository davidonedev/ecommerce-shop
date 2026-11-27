'use client'

import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import type { ReactNode } from 'react'
import { tooltipClass } from './variants'

/** Agrupa tooltips (atraso compartilhado). Já incluído no layout raiz. */
export const TooltipProvider = TooltipPrimitive.Provider

export interface TooltipProps {
  /** Texto do tooltip. */
  content: ReactNode
  side?: 'top' | 'right' | 'bottom' | 'left'
  /** O elemento que dispara o tooltip (deve aceitar ref, ex.: button ou a). */
  children: ReactNode
}

/** Dica curta ao passar o mouse ou focar com o teclado. Não coloque informação essencial só no tooltip. */
export function Tooltip({ content, side = 'top', children }: TooltipProps) {
  return (
    <TooltipPrimitive.Root>
      <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content side={side} sideOffset={8} className={tooltipClass}>
          {content}
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  )
}
