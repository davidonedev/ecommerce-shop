import { Loader2 } from 'lucide-react'
import type { ButtonHTMLAttributes, ReactNode, Ref } from 'react'
import { iconButtonVariants } from './variants'

export interface IconButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'aria-label'> {
  /** Texto lido por leitores de tela (obrigatório: o botão não tem texto visível). */
  label: string
  size?: 'sm' | 'md' | 'lg'
  /** Para botões liga/desliga (favoritar, filtros): vira aria-pressed. */
  pressed?: boolean
  loading?: boolean
  children: ReactNode
  ref?: Ref<HTMLButtonElement>
}

export function IconButton({
  label,
  size = 'md',
  pressed,
  loading = false,
  className,
  children,
  disabled,
  type = 'button',
  ref,
  ...props
}: IconButtonProps) {
  return (
    <button
      ref={ref}
      type={type}
      aria-label={label}
      aria-pressed={pressed}
      aria-busy={loading || undefined}
      disabled={disabled || loading}
      data-loading={loading || undefined}
      className={iconButtonVariants({ size, className })}
      {...props}
    >
      {loading ? <Loader2 aria-hidden className="size-5 animate-spin motion-reduce:animate-none" /> : children}
    </button>
  )
}
