/** Contraste WCAG 2.x entre duas cores hex (#RRGGBB). Usado pela vitrine e pelos testes. */

function channel(value: number): number {
  const v = value / 255
  return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4
}

export function relativeLuminance(hex: string): number {
  const h = hex.replace('#', '')
  const r = parseInt(h.slice(0, 2), 16)
  const g = parseInt(h.slice(2, 4), 16)
  const b = parseInt(h.slice(4, 6), 16)
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b)
}

export function contrastRatio(a: string, b: string): number {
  const [light, dark] = [relativeLuminance(a), relativeLuminance(b)].sort((x, y) => y - x)
  return (light + 0.05) / (dark + 0.05)
}

export type ContrastLevel = 'AA' | 'UI' | 'falha'

/** AA texto ≥ 4.5:1; "UI" = só componentes gráficos/texto grande (≥ 3:1). */
export function contrastLevel(ratio: number): ContrastLevel {
  if (ratio >= 4.5) return 'AA'
  if (ratio >= 3) return 'UI'
  return 'falha'
}
