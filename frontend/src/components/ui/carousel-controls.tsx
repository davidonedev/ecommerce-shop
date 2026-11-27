import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { ButtonHTMLAttributes, Ref } from 'react'
import { carouselArrowClass, carouselDotButtonClass, carouselDotClass, cx } from './variants'

export interface CarouselArrowProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'aria-label'> {
  direction: 'prev' | 'next'
  /**
   * circle: círculo branco com borda fina (seta da direita na referência);
   * chevron: só o chevron fino, sem círculo (seta da esquerda na referência).
   */
  appearance?: 'circle' | 'chevron'
  /** Texto lido por leitores de tela. Padrão: "Slide anterior" / "Próximo slide". */
  label?: string
  ref?: Ref<HTMLButtonElement>
}

/** Seta de carrossel com área de toque de 44px nas duas aparências. */
export function CarouselArrow({
  direction,
  appearance = 'circle',
  label,
  className,
  type = 'button',
  ref,
  ...props
}: CarouselArrowProps) {
  const Icon = direction === 'prev' ? ChevronLeft : ChevronRight
  return (
    <button
      ref={ref}
      type={type}
      aria-label={label ?? (direction === 'prev' ? 'Slide anterior' : 'Próximo slide')}
      className={cx(carouselArrowClass[appearance], className)}
      {...props}
    >
      <Icon aria-hidden strokeWidth={appearance === 'chevron' ? 1.25 : 1.5} className="size-5" />
    </button>
  )
}

export interface CarouselDotsProps {
  /** Quantidade de slides. */
  count: number
  /** Índice do slide ativo (começa em 0). */
  active: number
  onSelect: (index: number) => void
  /** Nome do grupo para leitores de tela. */
  label?: string
  className?: string
}

/** Pontos pequenos e centralizados; o ativo é rosé e mais largo. Cada ponto tem alvo de 44px de altura. */
export function CarouselDots({ count, active, onSelect, label = 'Escolher slide', className }: CarouselDotsProps) {
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
            className={carouselDotButtonClass}
          >
            <span
              aria-hidden
              className={cx(carouselDotClass.base, isActive ? carouselDotClass.active : carouselDotClass.inactive)}
            />
          </button>
        )
      })}
    </div>
  )
}
