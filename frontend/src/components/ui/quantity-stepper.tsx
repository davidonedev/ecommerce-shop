'use client'

import { Minus, Plus } from 'lucide-react'
import { cx } from './variants'

export interface QuantityStepperProps {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  /** Nome do produto, para leitores de tela ("Diminuir quantidade de ..."). */
  label?: string
  className?: string
}

const stepClass = cx(
  'inline-flex size-8 shrink-0 items-center justify-center rounded-full border border-field-border bg-bg text-text',
  'transition duration-(--duration-fast) ease-soft hover:border-rose-strong hover:text-rose-strong',
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-strong',
  'disabled:pointer-events-none disabled:opacity-40',
)

/** Seletor de quantidade compacto: − e + em círculos de borda fina. */
export function QuantityStepper({ value, onChange, min = 1, max = 99, label, className }: QuantityStepperProps) {
  const suffix = label ? ` de ${label}` : ''
  return (
    <div role="group" aria-label={`Quantidade${suffix}`} className={cx('inline-flex items-center gap-1.5', className)}>
      <button
        type="button"
        aria-label={`Diminuir quantidade${suffix}`}
        disabled={value <= min}
        onClick={() => onChange(Math.max(min, value - 1))}
        className={stepClass}
      >
        <Minus aria-hidden strokeWidth={1.5} className="size-4" />
      </button>
      <output aria-live="polite" className="min-w-5 text-center text-store-button text-text">
        {value}
      </output>
      <button
        type="button"
        aria-label={`Aumentar quantidade${suffix}`}
        disabled={value >= max}
        onClick={() => onChange(Math.min(max, value + 1))}
        className={stepClass}
      >
        <Plus aria-hidden strokeWidth={1.5} className="size-4" />
      </button>
    </div>
  )
}
