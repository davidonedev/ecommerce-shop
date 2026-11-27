import { colorHex, colors, contrastRatio } from '@/lib/tokens'

/** Cor do texto sobre o swatch: a de maior contraste entre o texto escuro e o branco. */
function readableOn(hex: string): 'var(--color-text)' | 'var(--color-on-dark)' {
  return contrastRatio(hex, colorHex.text) >= contrastRatio(hex, '#FFFFFF')
    ? 'var(--color-text)'
    : 'var(--color-on-dark)'
}

export function ColorSwatches() {
  return (
    <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {colors.map((color) => (
        <li key={color.name} className="overflow-hidden rounded-card border border-border bg-bg">
          <div
            className="flex h-24 items-end border-b border-border p-3"
            style={{ background: `var(--color-${color.name})`, color: readableOn(color.hex) }}
          >
            <span className="text-small font-semibold">{color.hex}</span>
          </div>
          <div className="p-3">
            <p className="text-small font-semibold text-text">{color.label}</p>
            <p className="text-caption text-text-muted">
              {color.name}
              {'derived' in color && color.derived ? ' · derivado' : ''}
            </p>
            <p className="mt-2 text-small text-text-muted">{color.usage}</p>
          </div>
        </li>
      ))}
    </ul>
  )
}
