import type { LucideIcon } from 'lucide-react'
import { cx } from './variants'

export interface BenefitItem {
  /** Ícone de linha (Lucide). Decorativo: o texto já diz tudo. */
  icon: LucideIcon
  /** Título curto em caixa alta, 11px / 600. Ex.: "Frete grátis". */
  title: string
  /** Apoio de 11px. Ex.: "Acima de R$ 299". */
  description: string
}

export interface BenefitRowProps {
  items: readonly BenefitItem[]
  /** Nome da lista para leitores de tela. */
  label?: string
  className?: string
}

/**
 * Linha de benefícios do hero: ícone de linha + título (11px, caixa alta, 600) + apoio (11px),
 * com divisores verticais finos entre os itens. No celular rola na horizontal (sem quebrar linha).
 * Texto suave sobre branco/areia passa em AA (6,2:1 e 5,1:1).
 *
 * ATENÇÃO em grid/flex: o item pai que contém esta lista precisa de `min-w-0`, senão a coluna cresce até caber
 * todos os itens (que não quebram linha) em vez de rolar na horizontal.
 */
export function BenefitRow({ items, label = 'Benefícios', className }: BenefitRowProps) {
  return (
    <ul
      aria-label={label}
      className={cx(
        'flex snap-x items-stretch overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
        className,
      )}
    >
      {items.map(({ icon: Icon, title, description }) => (
        <li
          key={title}
          className="flex shrink-0 snap-start items-center gap-2.5 border-l border-border px-4 first:border-l-0 first:pl-0"
        >
          <Icon aria-hidden strokeWidth={1.5} className="size-6 shrink-0 text-graphite" />
          <p className="min-w-0">
            <span className="block text-benefit-title text-graphite">{title}</span>
            <span className="block text-benefit-text text-text-muted">{description}</span>
          </p>
        </li>
      ))}
    </ul>
  )
}
