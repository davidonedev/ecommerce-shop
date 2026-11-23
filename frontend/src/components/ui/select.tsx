import type { Ref, SelectHTMLAttributes } from 'react'
import { cx, selectClass } from './variants'

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  invalid?: boolean
  ref?: Ref<HTMLSelectElement>
}

/**
 * Select nativo estilizado: acessível por padrão e com o seletor próprio do celular.
 * Use com <option> como filhos.
 */
export function Select({ invalid, className, ref, ...props }: SelectProps) {
  return <select ref={ref} aria-invalid={invalid || undefined} className={cx(selectClass, className)} {...props} />
}
