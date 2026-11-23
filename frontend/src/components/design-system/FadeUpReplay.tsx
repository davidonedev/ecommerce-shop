'use client'

import { useState } from 'react'
import { buttonVariants } from '@/components/ui/variants'

/** Mostra a entrada padrão (animate-fade-up) e permite reproduzi-la de novo. */
export function FadeUpReplay() {
  const [run, setRun] = useState(0)

  return (
    <div className="flex flex-col items-start gap-4">
      <div key={run} className="animate-fade-up rounded-md border border-border bg-surface p-6 shadow-soft">
        <p className="font-sans text-small font-semibold text-ink">animate-fade-up</p>
        <p className="text-small text-ink-muted">Fade + 16px, 400ms ease-out, uma vez.</p>
      </div>
      <button
        type="button"
        className={buttonVariants({ variant: 'secondary', size: 'sm' })}
        onClick={() => setRun((n) => n + 1)}
      >
        Reproduzir
      </button>
    </div>
  )
}
