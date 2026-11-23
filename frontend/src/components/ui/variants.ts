/**
 * Receitas de classes (Tailwind) de todos os componentes base do design system.
 *
 * Só usa classes dos tokens definidos em src/app/globals.css: nenhuma cor ou tamanho "solto".
 * Sem dependências: o helper `createVariants` abaixo faz o papel do cva.
 *
 * Convenções de estado que os componentes devem seguir:
 *  - carregando:   `data-loading` presente no elemento (renderize `data-loading={loading || undefined}`)
 *  - selecionado:  prop `selected` do chip (e `aria-pressed` no elemento)
 *  - ativo:        `data-active="true"` em slides (classe fade-slide)
 *  - Radix:        `data-state="open|closed"`, `data-state="delayed-open"` (tooltip)
 *
 * Regras de contraste (WCAG AA) já embutidas aqui, ver docs/design-tokens.md:
 *  - texto sobre marinho: `text-on-dark` (secundário: `text-on-dark-muted`); foco sobre marinho: `focus-inverse`;
 *  - texto sobre caramelo: SEMPRE marinho (branco sobre caramelo dá 3,12:1);
 *  - texto pequeno em caramelo sobre claro: `text-caramel-ink` (o caramelo puro só em texto grande, bordas e preenchimentos);
 *  - borda de campo/controle: `border-field-border` (o token `border` serve só para divisores decorativos);
 *  - `text-text-subtle` não é cor de leitura: só preço riscado e legenda decorativa.
 */

import { cn } from '@/lib/utils'

type Dict = Record<string, Record<string, string>>
type PropFor<K extends string> = K extends 'true' | 'false' ? boolean : K

export type VariantProps<V extends Dict> = {
  [K in keyof V]?: PropFor<Extract<keyof V[K], string>>
}

/**
 * Junta classes ignorando valores vazios e RESOLVE CONFLITOS (tailwind-merge): a última vence.
 * Assim quem usa um componente consegue sobrescrever: passar `hidden md:inline-flex` num botão que já tem
 * `inline-flex` esconde o botão no celular. Conhece os estilos tipográficos do design system (ver lib/utils.ts).
 */
export function cx(...parts: Array<string | false | null | undefined>): string {
  return cn(...parts)
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
    return cx(...parts)
  }
}

/* ------------------------------------------------------------------ */
/* Foco e interação (compartilhados)                                   */
/* ------------------------------------------------------------------ */

/** Anel marinho de 2px (17:1 sobre branco). Para fundo marinho, acrescente `focus-inverse`. */
export const focusRing = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy'

/** Anel de foco para controles que ficam SOBRE fundo marinho (9,6:1). Use no lugar de `focusRing`, nunca junto. */
export const focusRingInverse =
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-caramel-light'

const pressable = 'transition duration-(--duration-button) ease-soft active:scale-[0.98] motion-reduce:active:scale-100'

/* ------------------------------------------------------------------ */
/* Button                                                              */
/* ------------------------------------------------------------------ */

// O anel de foco entra em buttonVariants (varia com o fundo) e `whitespace` vem do tamanho
// (o `cx` não resolve conflitos de classes, então nada aqui pode ser sobrescrito depois).
const buttonBase = cx(
  // `group` permite que a seta (arrow-slide) deslize quando o botão recebe hover ou foco.
  'group inline-flex select-none items-center justify-center gap-2',
  pressable,
  'disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50',
  'data-[loading]:pointer-events-none data-[loading]:cursor-wait data-[loading]:opacity-80',
)

const buttonVariantClass = {
  /** Ação padrão: fundo marinho, texto branco. */
  primary: 'rounded-control bg-navy text-on-dark hover:bg-navy-hover',
  /** Alternativa: fundo branco, borda e texto marinho. */
  outline: 'rounded-control border border-navy bg-bg text-navy hover:bg-surface',
  /** Sobre fundo marinho (barra superior, banners): caramelo claro com texto marinho (9,6:1). Use `focus-inverse`. */
  caramel: 'rounded-control bg-caramel-light text-navy hover:bg-caramel',
  ghost: 'rounded-control bg-transparent text-navy hover:bg-surface',
  /** Link: não impõe área de toque mínima (exceção WCAG 2.2 para links em texto corrido). */
  link: 'rounded-control text-navy underline decoration-1 underline-offset-4 hover:text-navy-hover hover:decoration-2',
  /** Botão do card ("ADICIONAR AO CARRINHO" / "PERSONALIZAR"): largura total, vira marinho no hover (200ms). */
  cart: cx(
    'w-full whitespace-normal rounded-control border border-field-border bg-bg px-3 py-2 text-center text-button-sm text-navy',
    'hover:border-navy hover:bg-navy hover:text-on-dark',
  ),
  /** LEGADO: igual a `primary`. Mantido para as páginas antigas; use `primary`. */
  accent: 'rounded-control bg-navy text-on-dark hover:bg-navy-hover',
  /** LEGADO: igual a `outline`. Mantido para as páginas antigas; use `outline`. */
  secondary: 'rounded-control border border-navy bg-bg text-navy hover:bg-surface',
} as const

/**
 * Todos os tamanhos têm área de toque ≥ 44px. `cart` e `link` ignoram o tamanho.
 * `xs` é o botão compacto da barra superior ("FALE CONOSCO →"): 32px visíveis, e um pseudo-elemento
 * estende a área clicável a 44px sem alterar o desenho.
 */
const buttonSizeClass = {
  xs: 'relative min-h-8 whitespace-nowrap px-4 text-button-sm after:absolute after:inset-x-0 after:-inset-y-1.5 after:content-[""]',
  sm: 'min-h-11 whitespace-nowrap px-5 text-button',
  md: 'min-h-12 whitespace-nowrap px-6 text-button',
  lg: 'min-h-14 whitespace-nowrap px-8 text-button',
} as const

const linkSizeClass = {
  xs: 'whitespace-nowrap text-small',
  sm: 'whitespace-nowrap text-small',
  md: 'whitespace-nowrap text-body',
  lg: 'whitespace-nowrap text-body',
} as const

export type ButtonVariant = keyof typeof buttonVariantClass
export type ButtonSize = keyof typeof buttonSizeClass

export function buttonVariants({
  variant = 'primary',
  size = 'md',
  className,
}: { variant?: ButtonVariant; size?: ButtonSize; className?: string } = {}): string {
  const sizeClass = variant === 'link' ? linkSizeClass[size] : variant === 'cart' ? 'min-h-12' : buttonSizeClass[size]
  return cx(
    buttonBase,
    variant === 'caramel' ? focusRingInverse : focusRing,
    buttonVariantClass[variant],
    sizeClass,
    className,
  )
}

/* ------------------------------------------------------------------ */
/* IconButton                                                          */
/* ------------------------------------------------------------------ */

export const iconButtonVariants = createVariants({
  base: cx(
    'inline-flex shrink-0 items-center justify-center rounded-full bg-transparent text-navy hover:bg-surface',
    'aria-pressed:bg-surface',
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
  base: 'inline-flex items-center gap-1 whitespace-nowrap rounded-control px-2 py-1',
  variants: {
    tone: {
      /** "-20%": retângulo marinho, texto branco 11px/700. */
      discount: 'bg-navy text-badge text-on-dark',
      /** "PERSONALIZÁVEL": contorno caramelo, texto caramel-ink (texto pequeno). */
      customizable: 'border border-caramel bg-bg text-badge-xs text-caramel-ink',
      bestseller: 'bg-navy text-badge-xs text-on-dark',
      new: 'bg-sand text-badge-xs text-navy',
      /** Texto marinho sobre caramelo claro (9,6:1). */
      ready: 'bg-caramel-light text-badge-xs text-navy',
    },
  },
  defaults: { tone: 'customizable' },
})

/* ------------------------------------------------------------------ */
/* Chip (escolha liga/desliga)                                         */
/* ------------------------------------------------------------------ */

export const chipVariants = createVariants({
  base: cx(
    'inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap rounded-control border px-4 text-small font-medium',
    pressable,
    focusRing,
    'disabled:pointer-events-none disabled:opacity-50',
  ),
  variants: {
    selected: {
      true: 'border-navy bg-navy text-on-dark',
      false: 'border-field-border bg-bg text-text hover:border-navy hover:bg-surface',
    },
  },
  defaults: { selected: 'false' },
})

/* ------------------------------------------------------------------ */
/* Campos                                                              */
/* ------------------------------------------------------------------ */

export const inputClass = cx(
  'block h-11 w-full rounded-control border border-field-border bg-bg px-4 text-body text-text',
  'placeholder:text-text-muted',
  'transition duration-(--duration-fast) ease-soft hover:border-navy',
  focusRing,
  'focus-visible:border-navy',
  'aria-[invalid=true]:border-danger',
  'disabled:cursor-not-allowed disabled:bg-surface disabled:text-text-muted',
)

/** Mantém a seta nativa do select (acessível e adaptada ao tema via color-scheme). */
export const selectClass = cx(inputClass, 'cursor-pointer pr-10')

/* ------------------------------------------------------------------ */
/* Card, tile e peças de carrossel                                     */
/* ------------------------------------------------------------------ */

/**
 * Card base: borda fina, sem sombra em repouso. Para sobe-2px + sombra leve no hover,
 * adicione `data-interactive` ao elemento (cards de produto e categoria).
 */
export const cardClass = cx(
  'relative overflow-hidden rounded-card border border-border bg-bg text-text',
  'transition duration-(--duration-base) ease-soft',
  'data-[interactive]:hover:-translate-y-0.5 data-[interactive]:hover:shadow-hover',
  'motion-reduce:data-[interactive]:hover:translate-y-0',
)

/** Tile quadrado de categoria: fundo cinza-claro, sobe 2px e ganha borda marinho no hover. */
export const categoryTileClass = cx(
  'group relative block aspect-square overflow-hidden rounded-card border border-transparent bg-surface text-navy',
  'transition duration-(--duration-base) ease-soft',
  'hover:-translate-y-0.5 hover:border-navy',
  'motion-reduce:hover:translate-y-0',
  focusRing,
)

/**
 * Setas do carrossel (alvo de toque de 44px nas duas):
 *  - circle:  círculo branco com borda fina (a da direita na referência);
 *  - chevron: só o chevron fino, sem círculo, junto à borda (a da esquerda na referência).
 */
export const carouselArrowClass = {
  circle: cx(
    'inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-border bg-bg text-navy shadow-soft',
    'transition duration-(--duration-button) ease-soft hover:border-navy',
    focusRing,
    'disabled:pointer-events-none disabled:opacity-40',
  ),
  chevron: cx(
    'inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-transparent text-navy',
    'transition duration-(--duration-button) ease-soft hover:bg-surface',
    focusRing,
    'disabled:pointer-events-none disabled:opacity-40',
  ),
} as const

/* ------------------------------------------------------------------ */
/* Peças do topo e do rodapé (fundo marinho)                           */
/* ------------------------------------------------------------------ */

/** Link de coluna do footer: cinza-claro, branco no hover. Foco com anel claro (fundo marinho). */
export const footerLinkClass = cx(
  'inline-flex min-h-8 items-center rounded-control text-small text-on-dark-muted transition-colors duration-(--duration-fast)',
  'hover:text-on-dark hover:underline hover:underline-offset-4',
  focusRingInverse,
)

/** Ícone social do footer: círculo com contorno (alvo de 44px). */
export const socialButtonClass = cx(
  'inline-flex size-11 items-center justify-center rounded-full border border-on-dark-muted text-on-dark',
  'transition duration-(--duration-button) ease-soft hover:bg-navy-hover hover:border-on-dark',
  focusRingInverse,
)

/** Selo de forma de pagamento: caixinha branca com texto marinho. */
export const paymentBadgeClass =
  'inline-flex h-7 min-w-12 items-center justify-center rounded-control bg-bg px-2 text-caption font-medium text-navy'

/** Input colado ao botão ("e-mail + INSCREVER"): tira o raio e a borda do lado de encontro. */
export const inputJoinedClass = 'rounded-r-none border-r-0'
/** Botão colado ao input. */
export const buttonJoinedClass = 'rounded-l-none'

/** Botão do ponto (alvo de toque de 44px de altura); o desenho do ponto é o filho. */
export const carouselDotButtonClass = cx('inline-flex h-11 w-7 items-center justify-center rounded-control', focusRing)

/** Desenho do ponto: pequeno e cinza; o ativo é caramelo e mais largo. */
export const carouselDotClass = {
  base: 'block h-2 rounded-full transition-all duration-(--duration-base) ease-soft',
  active: 'w-6 bg-caramel',
  inactive: 'w-2 bg-field-border',
} as const

/** Link de seção ("VER TODOS OS PRODUTOS →"). A seta usa `arrow-slide`. */
export const sectionLinkClass = cx(
  'group inline-flex min-h-11 items-center gap-2 rounded-control text-button-sm text-navy',
  'hover:text-navy-hover hover:underline hover:underline-offset-4',
  focusRing,
)

/* ------------------------------------------------------------------ */
/* Skeleton                                                            */
/* ------------------------------------------------------------------ */

export const skeletonClass = cx(
  'relative isolate overflow-hidden rounded-card bg-surface',
  'before:absolute before:inset-0 before:-translate-x-full before:animate-shimmer',
  'before:bg-linear-to-r before:from-transparent before:via-bg/60 before:to-transparent',
  'motion-reduce:before:hidden',
)

/* ------------------------------------------------------------------ */
/* Sobreposições (Dialog / Drawer / Toast / Tooltip)                   */
/* ------------------------------------------------------------------ */

export const dialogOverlayClass = cx(
  'fixed inset-0 z-50 bg-scrim backdrop-blur-[2px]',
  'data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out',
)

const drawerBase = 'fixed z-50 flex flex-col bg-bg text-text shadow-lift focus:outline-none'

const drawerSideClass = {
  left: 'inset-y-0 left-0 w-[min(88vw,var(--drawer-width))] data-[state=open]:animate-slide-in-left data-[state=closed]:animate-slide-out-left',
  right:
    'inset-y-0 right-0 w-[min(88vw,var(--drawer-width))] data-[state=open]:animate-slide-in-right data-[state=closed]:animate-slide-out-right',
  bottom:
    'inset-x-0 bottom-0 max-h-[85dvh] rounded-t-panel data-[state=open]:animate-slide-in-bottom data-[state=closed]:animate-slide-out-bottom',
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
  'overflow-y-auto rounded-panel bg-bg p-6 text-text shadow-lift focus:outline-none md:p-8',
  'data-[state=open]:animate-pop-in data-[state=closed]:animate-pop-out',
)

export const toastClass = cx(
  'pointer-events-auto flex w-full items-start gap-3 rounded-card border border-border bg-bg p-4 text-text shadow-lift',
  'data-[state=open]:animate-slide-in-bottom data-[state=closed]:animate-fade-out',
)

export const tooltipClass = cx(
  'z-50 max-w-xs rounded-control bg-navy px-3 py-1.5 text-small text-on-dark shadow-soft',
  'data-[state=delayed-open]:animate-fade-in data-[state=instant-open]:animate-fade-in',
)

/* ------------------------------------------------------------------ */
/* Accordion                                                           */
/* ------------------------------------------------------------------ */

export const accordionItemClass = 'border-b border-border'

/** Dica: o ícone (chevron) deve ser filho direto do trigger; ele gira quando aberto. */
export const accordionTriggerClass = cx(
  'flex min-h-12 w-full items-center justify-between gap-4 rounded-control py-4 text-left text-body font-medium text-text',
  'transition duration-(--duration-fast) ease-soft hover:text-navy-hover',
  focusRing,
  '[&>svg]:shrink-0 [&>svg]:transition-transform [&>svg]:duration-(--duration-base) [&[data-state=open]>svg]:rotate-180',
)

export const accordionContentClass = cx(
  'overflow-hidden text-body text-text-muted',
  'data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up',
)
