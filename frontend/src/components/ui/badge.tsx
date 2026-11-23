import type { HTMLAttributes } from 'react'
import { badgeVariants } from './variants'

/**
 * discount: "-20%" (marinho, canto superior direito da imagem);
 * customizable: "PERSONALIZÁVEL" (contorno caramelo, canto superior esquerdo).
 */
export type BadgeTone = 'discount' | 'customizable' | 'bestseller' | 'new' | 'ready'

export const badgeLabels: Record<BadgeTone, string> = {
  discount: 'Oferta',
  customizable: 'Personalizável',
  bestseller: 'Mais vendido',
  new: 'Novo',
  ready: 'Pronta entrega',
}

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone
}

/** Selo de destaque. Sem `children`, mostra o texto padrão do tom (para `discount`, passe "-20%"). */
export function Badge({ tone = 'customizable', className, children, ...props }: BadgeProps) {
  return (
    <span className={badgeVariants({ tone, className })} {...props}>
      {children ?? badgeLabels[tone]}
    </span>
  )
}
