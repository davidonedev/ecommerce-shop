import type { ButtonHTMLAttributes, Ref } from 'react'
import { chipVariants } from './variants'

export interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean
  ref?: Ref<HTMLButtonElement>
}

/** Pill selecionável (liga/desliga). Para escolha única entre várias, agrupe em role="group" ou radiogroup. */
export function Chip({ selected = false, className, type = 'button', ref, ...props }: ChipProps) {
  return (
    <button
      ref={ref}
      type={type}
      aria-pressed={selected}
      className={chipVariants({ selected, className })}
      {...props}
    />
  )
}
