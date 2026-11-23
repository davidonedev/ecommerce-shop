import type { HTMLAttributes } from 'react'
import { badgeVariants } from './variants'

export type BadgeTone = 'customizable' | 'bestseller' | 'new' | 'ready'

export const badgeLabels: Record<BadgeTone, string> = {
  customizable: 'Personalizável',
  bestseller: 'Mais vendido',
  new: 'Novo',
  ready: 'Pronta entrega',
}

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone
}

/** Selo de destaque. Sem `children`, mostra o texto padrão do tom. */
export function Badge({ tone = 'customizable', className, children, ...props }: BadgeProps) {
  return (
    <span className={badgeVariants({ tone, className })} {...props}>
      {children ?? badgeLabels[tone]}
    </span>
  )
}
