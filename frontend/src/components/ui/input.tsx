import type { InputHTMLAttributes, Ref } from 'react'
import { cx, inputClass } from './variants'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Marca o campo como inválido (aria-invalid + borda de erro). */
  invalid?: boolean
  ref?: Ref<HTMLInputElement>
}

export function Input({ invalid, className, ref, ...props }: InputProps) {
  return <input ref={ref} aria-invalid={invalid || undefined} className={cx(inputClass, className)} {...props} />
}
