import { typeScale } from '@/lib/tokens'

/** Classes literais (o Tailwind só gera o que encontra escrito por extenso). */
const sampleClass: Record<(typeof typeScale)[number]['name'], string> = {
  overline: 'text-overline text-rose-strong',
  'display-hero': 'text-display-hero text-graphite',
  script: 'text-script text-rose-strong',
  'section-title': 'text-section-title text-graphite',
  nav: 'text-nav text-text',
  button: 'text-button text-text',
  'button-sm': 'text-button-sm text-text',
  body: 'text-body text-text',
  'product-name': 'text-product-name text-text',
  price: 'text-price text-text',
  caption: 'text-caption text-text-muted',
  'store-title': 'text-store-title text-text',
  'store-hero': 'text-store-hero text-text',
  'store-product': 'text-store-product text-text',
  'store-price': 'text-store-price text-rose-strong',
  'store-button': 'text-store-button text-text',
}

/** Escala tipográfica do briefing: Poppins (títulos/UI), Inter (texto) e Allura (uma frase de destaque). */
export function TypeScaleDemo() {
  return (
    <div className="divide-y divide-border rounded-card border border-border bg-bg">
      {typeScale.map((token) => (
        <div key={token.name} className="grid gap-3 p-5 md:grid-cols-[15rem_1fr] md:items-baseline md:gap-8">
          <div>
            <p className="text-small font-semibold text-text">text-{token.name}</p>
            <p className="text-caption text-text-muted">
              {token.family} {token.fontWeight}
              {token.uppercase ? ' · CAIXA ALTA' : ''}
            </p>
            <p className="text-caption text-text-muted">
              {token.sizePx[0] === token.sizePx[1] ? `${token.sizePx[0]}px` : `${token.sizePx[0]}–${token.sizePx[1]}px`}
              {' · '}lh {token.lineHeight} · {token.letterSpacing}
            </p>
          </div>
          <div>
            <p className={sampleClass[token.name]}>{token.sample}</p>
            <p className="mt-1 text-caption text-text-muted">{token.usage}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
