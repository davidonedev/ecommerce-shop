import { Star } from 'lucide-react'
import { cx } from './variants'

export interface RatingProps {
  /** Nota de 0 a 5 (aceita decimais, ex.: 4,9). */
  value: number
  /** Quantidade de avaliações, exibida ao lado das estrelas. */
  count?: number
  className?: string
}

const formatNumber = new Intl.NumberFormat('pt-BR')

/** Estrelas com preenchimento proporcional à nota. Lida como "Nota 4,9 de 5" por leitores de tela. */
export function Rating({ value, count, className }: RatingProps) {
  const clamped = Math.min(5, Math.max(0, value))
  const percent = (clamped / 5) * 100
  const label = `Nota ${clamped.toLocaleString('pt-BR')} de 5${count !== undefined ? `, ${formatNumber.format(count)} avaliações` : ''}`

  return (
    <div className={cx('inline-flex items-center gap-2 text-small text-ink-muted', className)}>
      <span role="img" aria-label={label} className="relative inline-flex">
        <span aria-hidden className="inline-flex gap-0.5 text-border">
          {[0, 1, 2, 3, 4].map((i) => (
            <Star key={i} className="size-4 fill-current" strokeWidth={0} />
          ))}
        </span>
        <span
          aria-hidden
          className="absolute inset-y-0 left-0 overflow-hidden text-accent"
          style={{ width: `${percent}%` }}
        >
          <span className="inline-flex gap-0.5">
            {[0, 1, 2, 3, 4].map((i) => (
              <Star key={i} className="size-4 shrink-0 fill-current" strokeWidth={0} />
            ))}
          </span>
        </span>
      </span>
      {count !== undefined && <span aria-hidden>({formatNumber.format(count)})</span>}
    </div>
  )
}
