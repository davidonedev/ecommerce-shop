'use client'

import { ShoppingCart } from 'lucide-react'
import { useState } from 'react'
import { CountBadge } from '@/components/ui/count-badge'
import { buttonVariants } from '@/components/ui/variants'

/** Mostra a entrada padrão (animate-fade-up) e permite reproduzi-la de novo. */
export function FadeUpReplay() {
  const [run, setRun] = useState(0)

  return (
    <div className="flex flex-col items-start gap-4">
      <div key={run} className="animate-fade-up rounded-card border border-border bg-bg p-6">
        <p className="text-small font-semibold text-text">animate-fade-up</p>
        <p className="text-small text-text-muted">Fade + 16px, 400ms ease-out, uma vez.</p>
      </div>
      <button
        type="button"
        className={buttonVariants({ variant: 'outline', size: 'sm' })}
        onClick={() => setRun((n) => n + 1)}
      >
        Reproduzir
      </button>
    </div>
  )
}

/** Crossfade de slide (fade-slide, 400ms): só o slide com data-active="true" aparece e entra na ordem do teclado. */
export function SlideFadeDemo() {
  const [active, setActive] = useState(0)
  const slides = ['Slide 1: Feito para você.', 'Slide 2: Coleção de Natal', 'Slide 3: Para empresas']

  return (
    <div className="flex flex-col items-start gap-4">
      <div className="relative h-24 w-full max-w-sm overflow-hidden rounded-card border border-border bg-sand">
        {slides.map((text, index) => (
          <p
            key={text}
            data-active={index === active}
            aria-hidden={index !== active}
            className="fade-slide absolute inset-0 flex items-center justify-center px-4 text-center text-section-title text-navy"
          >
            {text}
          </p>
        ))}
      </div>
      <button
        type="button"
        className={buttonVariants({ variant: 'outline', size: 'sm' })}
        onClick={() => setActive((n) => (n + 1) % slides.length)}
      >
        Próximo slide
      </button>
    </div>
  )
}

/** O contador do carrinho "pula" (animate-cart-bump) quando o número muda. */
export function CartBumpDemo() {
  const [count, setCount] = useState(1)

  return (
    <div className="flex items-center gap-6">
      <span className="relative inline-flex">
        <ShoppingCart aria-hidden strokeWidth={1.5} className="size-7 text-navy" />
        <CountBadge count={count} className="absolute -right-2 -top-2" />
      </span>
      <button
        type="button"
        className={buttonVariants({ variant: 'outline', size: 'sm' })}
        onClick={() => setCount((n) => n + 1)}
      >
        Adicionar item
      </button>
      <p className="text-small text-text-muted">Itens: {count}</p>
    </div>
  )
}
