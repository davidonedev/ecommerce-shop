import type { ReactNode } from 'react'

type SectionProps = {
  id: string
  title: string
  description?: ReactNode
  children: ReactNode
}

/** Bloco padrão da vitrine: overline, título e descrição, seguidos do conteúdo. */
export function Section({ id, title, description, children }: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-24 py-12 md:py-16">
      <header className="mb-8 max-w-2xl">
        <p className="text-caption text-ink-muted">Tokens</p>
        <h2 id={`${id}-title`} className="mt-2 font-display text-h2 text-ink">
          {title}
        </h2>
        {description ? <p className="mt-3 text-body text-ink-muted">{description}</p> : null}
      </header>
      {children}
    </section>
  )
}
