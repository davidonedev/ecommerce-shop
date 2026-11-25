import type { HTMLAttributes } from 'react'
import { cx, skeletonClass } from './variants'

/** Placeholder de carregamento. Defina o tamanho por classe (ex.: className="h-6 w-40"). */
export function Skeleton({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div aria-hidden className={cx(skeletonClass, className)} {...props} />
}
