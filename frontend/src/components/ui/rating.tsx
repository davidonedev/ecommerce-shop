import { Star } from 'lucide-react'
import { cx } from './variants'

export interface RatingProps {
  /** Nota de 0 a 5 (aceita decimais, ex.: 4,9). */
  value: number
  /** Quantidade de avaliações, exibida entre parênteses ao lado das estrelas. */
  count?: number
  /**
   * Mostra a nota em texto ("4,9") ao lado das estrelas. O amarelo da estrela não atinge 3:1 sobre branco,
   * então use onde a nota for informação importante (bloco de confiança, página de produto).
   */
  showValue?: boolean
  className?: string
}

const formatNumber = new Intl.NumberFormat('pt-BR')
const formatValue = new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 1 })

/** 5 estrelas amarelas de 12px, preenchidas em proporção à nota. Lida como "4,9 de 5, 2.300 avaliações". */
export function Rating({ value, count, showValue = false, className }: RatingProps) {
  const clamped = Math.min(5, Math.max(0, value))
  const percent = (clamped / 5) * 100
  const label = `${formatValue.format(clamped)} de 5${count !== undefined ? `, ${formatNumber.format(count)} avaliações` : ''}`

  return (
    <div className={cx('inline-flex items-center gap-1.5 text-caption text-text-muted', className)}>
      <span role="img" aria-label={label} className="relative inline-flex">
        <span aria-hidden className="inline-flex gap-0.5 text-border">
          {[0, 1, 2, 3, 4].map((i) => (
            <Star key={i} className="size-3 fill-current" strokeWidth={0} />
          ))}
        </span>
        <span
          aria-hidden
          data-testid="rating-fill"
          className="absolute inset-y-0 left-0 overflow-hidden text-star"
          style={{ width: `${percent}%` }}
        >
          <span className="inline-flex gap-0.5">
            {[0, 1, 2, 3, 4].map((i) => (
              <Star key={i} className="size-3 shrink-0 fill-current" strokeWidth={0} />
            ))}
          </span>
        </span>
      </span>
      {showValue && (
        <span aria-hidden className="text-small font-semibold text-text">
          {formatValue.format(clamped)}
        </span>
      )}
      {count !== undefined && <span aria-hidden>({formatNumber.format(count)})</span>}
    </div>
  )
}
