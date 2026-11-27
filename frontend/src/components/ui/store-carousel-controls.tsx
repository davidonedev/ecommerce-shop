import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { ButtonHTMLAttributes } from 'react'
import { cx } from './variants'

export interface StoreArrowProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'aria-label'> {
  direction: 'prev' | 'next'
  /** Texto lido por leitores de tela. Padrão: "Slide anterior" / "Próximo slide". */
  label?: string
}

/** Seta circular branca com chevron rosé escuro (alvo de toque de 44px). */
export function StoreArrow({ direction, label, className, type = 'button', ...props }: StoreArrowProps) {
  const Icon = direction === 'prev' ? ChevronLeft : ChevronRight
  return (
    <button
      type={type}
      aria-label={label ?? (direction === 'prev' ? 'Slide anterior' : 'Próximo slide')}
      className={cx(
        'inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-border bg-bg text-rose-strong shadow-soft',
        'transition duration-(--duration-button) ease-soft hover:border-rose-strong',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-strong',
        'disabled:pointer-events-none disabled:opacity-40',
        className,
      )}
      {...props}
    >
      <Icon aria-hidden strokeWidth={1.5} className="size-5" />
    </button>
  )
}

export interface StoreDotsProps {
  count: number
  /** Índice do slide ativo (começa em 0). */
  active: number
  onSelect: (index: number) => void
  label?: string
  className?: string
}

/** Pontos de paginação: cinza, com o ativo escuro. Cada ponto tem alvo de toque de 44px de altura. */
export function StoreDots({ count, active, onSelect, label = 'Escolher slide', className }: StoreDotsProps) {
  return (
    <div role="group" aria-label={label} className={cx('flex items-center justify-center', className)}>
      {Array.from({ length: count }, (_, index) => {
        const isActive = index === active
        return (
          <button
            key={index}
            type="button"
            aria-label={`Ir para o slide ${index + 1} de ${count}`}
            aria-current={isActive ? 'true' : undefined}
            onClick={() => onSelect(index)}
            className="inline-flex h-11 w-6 items-center justify-center rounded-control focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-strong"
          >
            <span
              aria-hidden
              className={cx('block size-2 rounded-full', isActive ? 'bg-text' : 'bg-field-border')}
            />
          </button>
        )
      })}
    </div>
  )
}
