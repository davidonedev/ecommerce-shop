import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = { title: 'Página não encontrada' }

/** 404 em português, com os caminhos principais para a pessoa continuar navegando. */
export default function NotFound() {
  return (
    <section className="container-page py-16 text-center md:py-24">
      <p className="text-caption text-ink-muted">Erro 404</p>
      <h1 className="mx-auto mt-4 max-w-2xl text-h1">Não encontramos esta página.</h1>
      <p className="mx-auto mt-4 max-w-md text-body text-ink-muted">
        O endereço pode ter mudado ou o produto não está mais disponível.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <Button asChild variant="primary">
          <Link href="/produtos">Ver produtos</Link>
        </Button>
        <Button asChild variant="link">
          <Link href="/">Voltar para o início</Link>
        </Button>
      </div>
    </section>
  )
}
