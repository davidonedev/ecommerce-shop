import type { Metadata } from 'next'
import { Suspense } from 'react'
import { PersonalizeSummary } from '@/components/personalize-summary'
import { Skeleton } from '@/components/ui/skeleton'

export const metadata: Metadata = { title: 'Personalizar' }

/**
 * Esqueleto da página de personalização (o personalizador completo vem em uma próxima entrega).
 * Já recebe os dados escolhidos no hero da home por query string. Só valores conhecidos são aceitos
 * (veja src/lib/personalize.ts): texto de até 14 caracteres, fonte e cor da paleta do design system.
 *   /personalizar?tipo=tapete&texto=Casa%20da%20Ana&fonte=classic&cor=terracotta
 */
export default function PersonalizePage() {
  return (
    <section className="container-page max-w-2xl py-10 md:py-14">
      <h1 className="text-h1">Personalizar</h1>
      <p className="mt-2 text-ink-muted">
        O personalizador completo chega em breve. Estes são os dados que você escolheu:
      </p>
      <Suspense fallback={<Skeleton className="mt-8 h-40" />}>
        <PersonalizeSummary />
      </Suspense>
    </section>
  )
}
