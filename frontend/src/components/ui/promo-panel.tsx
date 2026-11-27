import { ArrowRight, type LucideIcon } from 'lucide-react'
import Link from 'next/link'
import type { ReactNode } from 'react'
import { cx, focusRing, focusRingInverse } from './variants'

export type PromoPanelTone = 'graphite' | 'rose' | 'light'

/**
 * Cores por painel (todas verificadas, ver docs/design-tokens.md):
 *  - graphite:    texto branco (17:1), apoio on-graphite-muted;
 *  - rose: texto GRAFITE (5,5:1). Branco sobre rosé reprova (3,1:1);
 *  - light:   fundo cinza-claro, texto grafite (15,6:1) e apoio suave (5,6:1).
 */
const toneClass: Record<PromoPanelTone, { box: string; title: string; text: string; ring: string }> = {
  graphite: { box: 'bg-graphite text-on-dark', title: 'text-on-dark', text: 'text-on-graphite-muted', ring: focusRingInverse },
  rose: { box: 'bg-rose text-graphite', title: 'text-graphite', text: 'text-graphite', ring: focusRing },
  light: { box: 'bg-surface text-graphite', title: 'text-graphite', text: 'text-text-muted', ring: focusRing },
}

export interface PromoPanelProps {
  tone: PromoPanelTone
  /** Ícone de linha grande à esquerda (decorativo). */
  icon: LucideIcon
  title: string
  children: ReactNode
  href: string
  linkLabel: string
  className?: string
}

/** Um dos 3 painéis da faixa promocional: ícone grande, título em caixa alta, texto e link com seta. */
export function PromoPanel({ tone, icon: Icon, title, children, href, linkLabel, className }: PromoPanelProps) {
  const t = toneClass[tone]
  return (
    <div className={cx('flex items-center gap-5 p-6 md:p-8', t.box, className)}>
      <Icon aria-hidden strokeWidth={1.25} className="size-12 shrink-0 md:size-14" />
      <div className="min-w-0">
        <h3 className={cx('text-panel-title', t.title)}>{title}</h3>
        <p className={cx('mt-1 text-small', t.text)}>{children}</p>
        <Link
          href={href}
          className={cx(
            'group mt-2 inline-flex min-h-8 items-center gap-2 rounded-control text-small font-semibold',
            'underline-offset-4 hover:underline',
            t.title,
            t.ring,
          )}
        >
          {linkLabel}
          <ArrowRight aria-hidden strokeWidth={1.5} className="arrow-slide size-4" />
        </Link>
      </div>
    </div>
  )
}

/** Faixa contínua com os painéis lado a lado (empilhados no celular), cantos de 8px. */
export function PromoPanels({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cx('grid overflow-hidden rounded-panel md:grid-cols-3', className)}>{children}</div>
}
