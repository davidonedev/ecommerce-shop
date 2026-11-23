/**
 * Receitas de classes (Tailwind) de todos os componentes base do design system.
 *
 * Só usa classes dos tokens definidos em src/app/globals.css: nenhuma cor ou tamanho "solto".
 * Sem dependências: o helper `createVariants` abaixo faz o papel do cva.
 *
 * Convenções de estado que os componentes devem seguir:
 *  - carregando:   `data-loading` presente no elemento (renderize `data-loading={loading || undefined}`)
 *  - selecionado:  prop `selected` do chip (e `aria-pressed` no elemento)
 *  - Radix:        `data-state="open|closed"`, `data-state="delayed-open"` (tooltip)
 *
 * Regras de contraste (WCAG AA) já embutidas aqui, ver docs/design-tokens.md:
 *  - texto sobre terracota usa `text-on-accent` (nunca `text-bg`);
 *  - texto/link terracota sobre fundo claro usa `text-accent-hover`;
 *  - borda de campo usa `border-ink-muted` (o token `border` serve só para divisores decorativos).
 */

type Dict = Record<string, Record<string, string>>
type PropFor<K extends string> = K extends 'true' | 'false' ? boolean : K

export type VariantProps<V extends Dict> = {
  [K in keyof V]?: PropFor<Extract<keyof V[K], string>>
}

/** Junta classes ignorando valores vazios. */
export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ')
}

function createVariants<V extends Dict>(config: {
  base: string
  variants: V
  defaults: { [K in keyof V]: Extract<keyof V[K], string> }
}) {
  return (props: VariantProps<V> & { className?: string } = {}): string => {
    const input = props as Record<string, unknown>
    const parts: string[] = [config.base]
    for (const key of Object.keys(config.variants)) {
      const value = String(input[key] ?? config.defaults[key])
      parts.push(config.variants[key][value])
    }
    if (props.className) parts.push(props.className)
    return parts.filter(Boolean).join(' ')
  }
}

/* ------------------------------------------------------------------ */
/* Foco (compartilhado)                                                */
/* ------------------------------------------------------------------ */

const focusRing = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent'

const pressable = 'transition duration-(--duration-base) ease-soft active:scale-[0.98] motion-reduce:active:scale-100'

/* ------------------------------------------------------------------ */
/* Button                                                              */
/* ------------------------------------------------------------------ */

const buttonBase = cx(
  'inline-flex select-none items-center justify-center gap-2 whitespace-nowrap font-sans font-medium',
  pressable,
  focusRing,
  'disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50',
  'data-[loading]:pointer-events-none data-[loading]:cursor-wait data-[loading]:opacity-80',
)

const buttonVariantClass = {
  /** Ação padrão: tinta. */
  primary: 'rounded-full bg-ink text-surface hover:bg-ink-muted hover:shadow-soft',
  /** Destaque: terracota. No máximo 1 por dobra. */
  accent: 'rounded-full bg-accent text-on-accent hover:bg-accent-hover hover:shadow-soft',
  secondary: 'rounded-full border border-ink bg-transparent text-ink hover:bg-ink hover:text-surface',
  ghost: 'rounded-full bg-transparent text-ink hover:bg-sand',
  /** Link: não impõe área de toque mínima (exceção WCAG 2.2 para links em texto corrido). */
  link: 'rounded-sm text-accent-hover underline decoration-1 underline-offset-4 hover:text-ink hover:decoration-2',
} as const

/** Todos os tamanhos têm área de toque ≥ 44px (min-h-11). */
const buttonSizeClass = {
  sm: 'min-h-11 px-5 text-small',
  md: 'min-h-12 px-6 text-body',
  lg: 'min-h-14 px-8 text-body',
} as const

const linkSizeClass = {
  sm: 'text-small',
  md: 'text-body',
  lg: 'text-body',
} as const

export type ButtonVariant = keyof typeof buttonVariantClass
export type ButtonSize = keyof typeof buttonSizeClass

export function buttonVariants({
  variant = 'primary',
  size = 'md',
  className,
}: { variant?: ButtonVariant; size?: ButtonSize; className?: string } = {}): string {
  return cx(
    buttonBase,
    buttonVariantClass[variant],
    variant === 'link' ? linkSizeClass[size] : buttonSizeClass[size],
    className,
  )
}

/* ------------------------------------------------------------------ */
/* IconButton                                                          */
/* ------------------------------------------------------------------ */

export const iconButtonVariants = createVariants({
  base: cx(
    'inline-flex shrink-0 items-center justify-center rounded-full bg-transparent text-ink hover:bg-sand',
    'aria-pressed:bg-sand',
    pressable,
    focusRing,
    'disabled:pointer-events-none disabled:opacity-50',
    'data-[loading]:pointer-events-none data-[loading]:opacity-80',
  ),
  variants: {
    size: {
      sm: 'size-11',
      md: 'size-12',
      lg: 'size-14',
    },
  },
  defaults: { size: 'md' },
})

/* ------------------------------------------------------------------ */
/* Badge                                                               */
/* ------------------------------------------------------------------ */

export const badgeVariants = createVariants({
  base: 'inline-flex items-center gap-1 rounded-full px-2.5 py-1 font-sans font-semibold text-caption',
  variants: {
    tone: {
      customizable: 'bg-accent text-on-accent',
      bestseller: 'bg-ink text-surface',
      new: 'bg-blush text-ink',
      ready: 'bg-sage text-on-sage',
    },
  },
  defaults: { tone: 'customizable' },
})

/* ------------------------------------------------------------------ */
/* Chip (pill selecionável)                                            */
/* ------------------------------------------------------------------ */

export const chipVariants = createVariants({
  base: cx(
    'inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap rounded-full border px-4 font-sans text-small',
    pressable,
    focusRing,
    'disabled:pointer-events-none disabled:opacity-50',
  ),
  variants: {
    selected: {
      true: 'border-ink bg-ink text-surface',
      false: 'border-ink-muted bg-surface text-ink hover:border-ink hover:bg-sand',
    },
  },
  defaults: { selected: 'false' },
})

/* ------------------------------------------------------------------ */
/* Campos                                                              */
/* ------------------------------------------------------------------ */

export const inputClass = cx(
  'block w-full min-h-12 rounded-sm border border-ink-muted bg-surface px-4 font-sans text-body text-ink',
  'placeholder:text-ink-muted',
  'transition duration-(--duration-fast) ease-soft hover:border-ink',
  focusRing,
  'focus-visible:border-ink',
  'aria-[invalid=true]:border-accent-hover',
  'disabled:cursor-not-allowed disabled:bg-sand disabled:opacity-60',
)

/** Mantém a seta nativa do select (acessível e adaptada ao tema via color-scheme). */
export const selectClass = cx(inputClass, 'cursor-pointer pr-10')

/* ------------------------------------------------------------------ */
/* Card                                                                */
/* ------------------------------------------------------------------ */

/**
 * Card base. Para elevação no hover, adicione `data-interactive` ao elemento
 * (cards de produto e categoria).
 */
export const cardClass = cx(
  'relative overflow-hidden rounded-md border border-border bg-surface text-ink shadow-soft',
  'transition duration-(--duration-base) ease-soft',
  'data-[interactive]:hover:-translate-y-1 data-[interactive]:hover:shadow-lift',
  'motion-reduce:data-[interactive]:hover:translate-y-0',
)

/* ------------------------------------------------------------------ */
/* Skeleton                                                            */
/* ------------------------------------------------------------------ */

export const skeletonClass = cx(
  'relative isolate overflow-hidden rounded-md bg-sand',
  'before:absolute before:inset-0 before:-translate-x-full before:animate-shimmer',
  'before:bg-linear-to-r before:from-transparent before:via-surface/60 before:to-transparent',
  'motion-reduce:before:hidden',
)

/* ------------------------------------------------------------------ */
/* Sobreposições (Dialog / Drawer / Toast / Tooltip)                   */
/* ------------------------------------------------------------------ */

export const dialogOverlayClass = cx(
  'fixed inset-0 z-50 bg-scrim backdrop-blur-[2px]',
  'data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out',
)

const drawerBase = 'fixed z-50 flex flex-col bg-surface text-ink shadow-lift focus:outline-none'

const drawerSideClass = {
  left: 'inset-y-0 left-0 w-[min(88vw,var(--drawer-width))] data-[state=open]:animate-slide-in-left data-[state=closed]:animate-slide-out-left',
  right:
    'inset-y-0 right-0 w-[min(88vw,var(--drawer-width))] data-[state=open]:animate-slide-in-right data-[state=closed]:animate-slide-out-right',
  bottom:
    'inset-x-0 bottom-0 max-h-[85dvh] rounded-t-lg data-[state=open]:animate-slide-in-bottom data-[state=closed]:animate-slide-out-bottom',
} as const

export type DrawerSide = keyof typeof drawerSideClass

export function drawerContentClass({
  side = 'right',
  className,
}: { side?: DrawerSide; className?: string } = {}): string {
  return cx(drawerBase, drawerSideClass[side], className)
}

export const modalContentClass = cx(
  'fixed left-1/2 top-1/2 z-50 max-h-[90dvh] w-[min(92vw,var(--modal-width))] -translate-x-1/2 -translate-y-1/2',
  'overflow-y-auto rounded-lg bg-surface p-6 text-ink shadow-lift focus:outline-none md:p-8',
  'data-[state=open]:animate-pop-in data-[state=closed]:animate-pop-out',
)

export const toastClass = cx(
  'pointer-events-auto flex w-full items-start gap-3 rounded-md border border-border bg-surface p-4 text-ink shadow-lift',
  'data-[state=open]:animate-slide-in-bottom data-[state=closed]:animate-fade-out',
)

export const tooltipClass = cx(
  'z-50 max-w-xs rounded-sm bg-ink px-3 py-1.5 font-sans text-small text-surface shadow-soft',
  'data-[state=delayed-open]:animate-fade-in data-[state=instant-open]:animate-fade-in',
)

/* ------------------------------------------------------------------ */
/* Accordion                                                           */
/* ------------------------------------------------------------------ */

export const accordionItemClass = 'border-b border-border'

/** Dica: o ícone (chevron) deve ser filho direto do trigger; ele gira quando aberto. */
export const accordionTriggerClass = cx(
  'flex min-h-12 w-full items-center justify-between gap-4 rounded-sm py-4 text-left font-sans font-medium text-body text-ink',
  'transition duration-(--duration-fast) ease-soft hover:text-accent-hover',
  focusRing,
  '[&>svg]:shrink-0 [&>svg]:transition-transform [&>svg]:duration-(--duration-base) [&[data-state=open]>svg]:rotate-180',
)

export const accordionContentClass = cx(
  'overflow-hidden font-sans text-body text-ink-muted',
  'data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up',
)
