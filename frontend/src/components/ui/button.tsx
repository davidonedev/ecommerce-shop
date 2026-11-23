import { Slot } from '@radix-ui/react-slot'
import { ArrowRight, Loader2 } from 'lucide-react'
import type { ButtonHTMLAttributes, Ref } from 'react'
import { buttonVariants, cx, type ButtonSize, type ButtonVariant } from './variants'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * primary (marinho), outline, caramel (sobre fundo marinho), ghost, link, cart (largura total, do card).
   * `accent` e `secondary` são apelidos LEGADOS de primary e outline.
   */
  variant?: ButtonVariant
  size?: ButtonSize
  /** Mostra um indicador de carregamento e bloqueia cliques. */
  loading?: boolean
  /** Acrescenta a seta "→" depois do texto; ela desliza 4px no hover/foco. Com `asChild`, use <ButtonArrow /> no filho. */
  arrow?: boolean
  /** Renderiza o filho (ex.: um Link) com o visual do botão. Não combina com `loading`. */
  asChild?: boolean
  ref?: Ref<HTMLButtonElement>
}

/** Seta "→" decorativa que desliza no hover/foco do botão (ou link) pai. */
export function ButtonArrow({ className }: { className?: string }) {
  return <ArrowRight aria-hidden strokeWidth={1.5} className={cx('arrow-slide size-4 shrink-0', className)} />
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  arrow = false,
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
      {arrow && <ButtonArrow />}
    </button>
  )
}
