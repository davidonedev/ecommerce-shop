import type { ReactNode } from 'react'
import { cx } from './variants'

export interface SectionHeadingProps {
  id?: string
  children: ReactNode
  /** Nível do título. A home usa h2 (o h1 é o banner). */
  as?: 'h2' | 'h3'
  className?: string
}

/** Título de seção centralizado com o traço decorativo escuro de 40×3px embaixo. */
export function SectionHeading({ id, children, as: Tag = 'h2', className }: SectionHeadingProps) {
  return (
    <div className={cx('text-center', className)}>
      <Tag id={id} className="text-store-title text-text">
        {children}
      </Tag>
      <span aria-hidden className="mx-auto mt-2 block h-0.75 w-10 bg-text" />
    </div>
  )
}
