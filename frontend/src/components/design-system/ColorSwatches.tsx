import { colorHex, colors, contrastRatio } from '@/lib/tokens'

/** Cor do texto sobre o swatch: a de maior contraste entre tinta e branco quente. */
function readableOn(hex: string): 'var(--color-ink)' | 'var(--color-surface)' {
  return contrastRatio(hex, colorHex.ink) >= contrastRatio(hex, colorHex.surface)
    ? 'var(--color-ink)'
    : 'var(--color-surface)'
}

export function ColorSwatches() {
  return (
    <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {colors.map((color) => (
        <li key={color.name} className="overflow-hidden rounded-md border border-border bg-surface shadow-soft">
          <div
            className="flex h-24 items-end p-3"
            style={{ background: `var(--color-${color.name})`, color: readableOn(color.hex) }}
          >
            <span className="font-sans text-small font-semibold">{color.hex}</span>
          </div>
          <div className="p-3">
            <p className="font-sans text-small font-semibold text-ink">{color.label}</p>
            <p className="font-sans text-caption text-ink-muted">{color.name}</p>
            <p className="mt-2 text-small text-ink-muted">{color.usage}</p>
            <p className="mt-2 flex items-center gap-2 text-small text-ink-muted">
              <span
                aria-hidden="true"
                className="inline-block size-4 rounded-full border border-border"
                style={{ background: color.darkHex }}
              />
              Escuro: {color.darkHex}
            </p>
          </div>
        </li>
      ))}
    </ul>
  )
}
