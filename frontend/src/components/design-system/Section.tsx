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
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-24 py-12 md:py-14">
      <header className="mb-8 max-w-2xl">
        <p className="text-overline text-rose-strong">Tokens</p>
        <h2 id={`${id}-title`} className="mt-2 text-section-title text-graphite">
          {title}
        </h2>
        {description ? <p className="mt-3 text-body text-text-muted">{description}</p> : null}
      </header>
      {children}
    </section>
  )
}
