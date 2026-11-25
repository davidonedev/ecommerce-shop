import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { brand } from '@/lib/brand'

/**
 * Home PROVISÓRIA da base (PR 1). A home completa (hero com personalizador ao vivo,
 * categorias, mais vendidos etc.) é construída nos PRs 2 e 3.
 */
export default function HomePage() {
  return (
    <section className="container-page py-16 text-center md:py-24">
      <p className="text-caption text-ink-muted">{brand.tagline}</p>
      <h1 className="mx-auto mt-4 max-w-3xl text-display-xl">Seu nome, sua história, no seu tapete.</h1>
      <p className="mx-auto mt-6 max-w-xl text-body text-ink-muted">{brand.description}</p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <Button asChild variant="accent" size="lg">
          <Link href="/personalizar">Criar o meu</Link>
        </Button>
        <Button asChild variant="link">
          <Link href="/produtos">Ver mais vendidos</Link>
        </Button>
      </div>
    </section>
  )
}
