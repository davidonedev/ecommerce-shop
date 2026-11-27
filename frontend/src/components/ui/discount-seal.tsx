import { cx } from './variants'

export interface DiscountSealProps {
  /** Texto pequeno de cima. Padrão "ATÉ". */
  prefix?: string
  /** Valor grande, em rosé claro. Padrão "50%". */
  value?: string
  /** Texto pequeno de baixo. Padrão "OFF". */
  suffix?: string
  /** Texto lido por leitores de tela. Padrão: "Até 50% de desconto" montado a partir das props. */
  label?: string
  className?: string
}

/**
 * Selo circular grafite ("ATÉ 50% OFF"), ~110px no desktop e 80px no celular.
 * No hero, posicione-o (absolute) sobre a divisa entre o texto e a foto, no alto.
 * Texto branco sobre grafite (17:1) e "50%" em rosé claro (9,6:1).
 */
export function DiscountSeal({ prefix = 'Até', value = '50%', suffix = 'OFF', label, className }: DiscountSealProps) {
  const accessibleLabel = label ?? `${prefix} ${value} de desconto`.replace(/^./, (c) => c.toUpperCase())

  return (
    <div
      role="img"
      aria-label={accessibleLabel}
      className={cx(
        'flex size-20 shrink-0 flex-col items-center justify-center rounded-full bg-graphite text-center text-on-dark md:size-28',
        className,
      )}
    >
      <span aria-hidden className="text-badge-xs">
        {prefix}
      </span>
      <span aria-hidden className="text-seal text-rose-soft">
        {value}
      </span>
      <span aria-hidden className="text-badge-xs">
        {suffix}
      </span>
    </div>
  )
}
