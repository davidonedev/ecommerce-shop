'use client'

import { useState } from 'react'
import { cx } from './variants'

export interface CountBadgeProps {
  /** Quantidade exibida. Acima de 99 mostra "99+". Com 0, o selo não aparece. */
  count: number
  className?: string
}

/**
 * Contador circular grafite (sobre o ícone do carrinho). Quando o número muda, "pula" (animate-cart-bump,
 * desligado em reduced-motion). O número é decorativo (aria-hidden): descreva a quantidade no rótulo do link do carrinho.
 */
export function CountBadge({ count, className }: CountBadgeProps) {
  const [previous, setPrevious] = useState(count)
  const [bump, setBump] = useState(false)

  // Padrão recomendado do React para reagir a mudança de prop sem useEffect.
  if (count !== previous) {
    setPrevious(count)
    setBump(true)
  }

  if (count <= 0) return null

  return (
    <span
      aria-hidden
      data-bump={bump || undefined}
      onAnimationEnd={() => setBump(false)}
      className={cx(
        'inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-graphite px-1 text-badge text-on-dark',
        bump && 'animate-cart-bump',
        className,
      )}
    >
      {count > 99 ? '99+' : count}
    </span>
  )
}
