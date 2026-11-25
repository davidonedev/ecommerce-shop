import { typeScale } from '@/lib/tokens'

/** Classes literais (o Tailwind só gera o que encontra escrito por extenso). */
const sampleClass: Record<(typeof typeScale)[number]['name'], string> = {
  'display-xl': 'font-display text-display-xl text-ink',
  h1: 'font-display text-h1 text-ink',
  h2: 'font-display text-h2 text-ink',
  h3: 'font-display text-h3 text-ink',
  body: 'font-sans text-body text-ink',
  small: 'font-sans text-small text-ink',
  caption: 'font-sans text-caption text-ink-muted',
}

export function TypeScaleDemo() {
  return (
    <div className="divide-y divide-border rounded-md border border-border bg-surface shadow-soft">
      {typeScale.map((token) => (
        <div key={token.name} className="grid gap-3 p-5 md:grid-cols-[14rem_1fr] md:items-baseline md:gap-8">
          <div>
            <p className="font-sans text-small font-semibold text-ink">text-{token.name}</p>
            <p className="text-small text-ink-muted">
              {token.sizePx[0] === token.sizePx[1] ? `${token.sizePx[0]}px` : `${token.sizePx[0]}–${token.sizePx[1]}px`}
              {' · '}lh {token.lineHeight} · {token.letterSpacing}
            </p>
          </div>
          <p className={sampleClass[token.name]}>{token.sample}</p>
        </div>
      ))}
    </div>
  )
}
