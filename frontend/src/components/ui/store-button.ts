import { cx } from './variants'

/**
 * Botão pílula da vitrine rosé (home, header e rodapé). Cantos totalmente arredondados, sem sombra pesada.
 *
 * Contraste (WCAG AA): o texto branco só entra sobre o rosé ESCURO (`rose-strong`, 5,3:1).
 * Sobre o rosé claro (barra de aviso, newsletter) o texto é grafite; o botão da newsletter é grafite.
 */
const base = cx(
  'group inline-flex min-h-11 select-none items-center justify-center gap-2 whitespace-nowrap rounded-full px-6 text-store-button',
  'transition duration-(--duration-button) ease-soft active:scale-[0.98] motion-reduce:active:scale-100',
  'disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50',
)

const tones = {
  /** Ação principal: "Comprar", "Personalizar", "Conferir agora". */
  rose: cx(
    'bg-rose-strong text-on-dark hover:bg-rose-strong-hover',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-strong',
  ),
  /** Sobre o rosé claro (faixa da newsletter): grafite com texto branco. */
  graphite: cx(
    'bg-graphite text-on-dark hover:bg-text',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-graphite',
  ),
  /** Contorno discreto (ex.: link de apoio). */
  outline: cx(
    'border border-rose-strong bg-bg text-rose-strong hover:bg-rose-soft',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-strong',
  ),
} as const

export type StoreButtonTone = keyof typeof tones

export function storeButtonClass({
  tone = 'rose',
  full = false,
  className,
}: { tone?: StoreButtonTone; full?: boolean; className?: string } = {}): string {
  return cx(base, tones[tone], full && 'w-full', className)
}
