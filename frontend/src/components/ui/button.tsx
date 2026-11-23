import { Slot } from '@radix-ui/react-slot'
import { Loader2 } from 'lucide-react'
import type { ButtonHTMLAttributes, Ref } from 'react'
import { buttonVariants, type ButtonSize, type ButtonVariant } from './variants'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  /** Mostra um indicador de carregamento e bloqueia cliques. */
  loading?: boolean
  /** Renderiza o filho (ex.: um Link) com o visual do botão. Não combina com `loading`. */
  asChild?: boolean
  ref?: Ref<HTMLButtonElement>
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  asChild = false,
  className,
  children,
  disabled,
  type = 'button',
  ref,
  ...props
}: ButtonProps) {
  const classes = buttonVariants({ variant, size, className })

  if (asChild) {
    return (
      <Slot className={classes} {...props}>
        {children}
      </Slot>
    )
  }

  return (
    <button
      ref={ref}
      type={type}
      className={classes}
      disabled={disabled || loading}
      data-loading={loading || undefined}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading && <Loader2 aria-hidden className="size-4 animate-spin motion-reduce:animate-none" />}
      {children}
    </button>
  )
}
