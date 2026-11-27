import type { Metadata } from 'next'
import { TokenShowcase } from '@/components/design-system/TokenShowcase'
import { ComponentsShowcase } from './components-showcase'

export const metadata: Metadata = {
  title: 'Design system',
  // Página interna de referência: fora dos resultados de busca.
  robots: { index: false, follow: false },
}

export default function DesignSystemPage() {
  return (
    <div className="container-page py-10 md:py-14">
      <header className="max-w-2xl">
        <p className="text-overline text-rose-strong">Design system</p>
        <h1 className="mt-2 text-display-hero text-graphite">grafite e rosé</h1>
        <p className="text-script mt-2 text-rose-strong">Feito com carinho!</p>
        <p className="mt-3 text-body text-text-muted">
          Tokens e componentes base da loja. Tudo o que aparece nas próximas páginas nasce daqui.
        </p>
      </header>

      <TokenShowcase />

      <section aria-labelledby="componentes-title" className="py-12 md:py-14">
        <p className="text-overline text-rose-strong">Componentes</p>
        <h2 id="componentes-title" className="mt-2 text-section-title text-graphite">
          Componentes base
        </h2>
        <ComponentsShowcase />
      </section>
    </div>
  )
}
