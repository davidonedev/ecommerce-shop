import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import type { ComponentProps } from 'react'
import { cx, sectionLinkClass } from './variants'

export type SectionLinkProps = Omit<ComponentProps<typeof Link>, 'className'> & { className?: string }

/** Link de seção, alinhado à direita do título: "VER TODOS OS PRODUTOS →". A seta desliza 4px no hover. */
export function SectionLink({ className, children, ...props }: SectionLinkProps) {
  return (
    <Link className={cx(sectionLinkClass, className)} {...props}>
      {children}
      <ArrowRight aria-hidden strokeWidth={1.5} className="arrow-slide size-4 shrink-0" />
    </Link>
  )
}
