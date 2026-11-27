import { colorHex, contrastPairs, contrastRatio, type ContrastKind } from '@/lib/tokens'

const kindLabel: Record<ContrastKind, string> = {
  text: 'Texto (≥ 4,5:1)',
  large: 'Texto grande (≥ 3:1)',
  ui: 'Elemento de UI (≥ 3:1)',
  avoid: 'EVITAR',
}

const minimum: Record<ContrastKind, number> = { text: 4.5, large: 3, ui: 3, avoid: 4.5 }

/** Tabela de pares e decisões de uso, calculada ao vivo a partir dos tokens (lib/tokens/contrast-pairs.ts). */
export function ContrastTable() {
  return (
    <div className="overflow-x-auto rounded-card border border-border bg-bg">
      <table className="w-full min-w-[44rem] border-collapse text-left text-small">
        <caption className="sr-only">
          Razões de contraste WCAG entre pares de cores do sistema e a decisão de uso
        </caption>
        <thead className="bg-surface text-text">
          <tr>
            <th scope="col" className="px-4 py-3 font-semibold">
              Amostra
            </th>
            <th scope="col" className="px-4 py-3 font-semibold">
              Par
            </th>
            <th scope="col" className="px-4 py-3 font-semibold">
              Uso / decisão
            </th>
            <th scope="col" className="px-4 py-3 text-right font-semibold">
              Razão
            </th>
            <th scope="col" className="px-4 py-3 font-semibold">
              Critério
            </th>
            <th scope="col" className="px-4 py-3 font-semibold">
              Resultado
            </th>
          </tr>
        </thead>
        <tbody>
          {contrastPairs.map((pair) => {
            const ratio = contrastRatio(colorHex[pair.fg], colorHex[pair.bg])
            const passes = pair.kind === 'avoid' ? ratio < minimum.avoid : ratio >= minimum[pair.kind]
            return (
              <tr key={`${pair.fg}-${pair.bg}-${pair.kind}-${pair.use}`} className="border-t border-border">
                <td className="px-4 py-2">
                  <span
                    className="inline-flex min-w-16 justify-center rounded-control border border-border px-2 py-1 font-semibold"
                    style={{ background: `var(--color-${pair.bg})`, color: `var(--color-${pair.fg})` }}
                  >
                    Aa
                  </span>
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-text">
                  {pair.fg} / {pair.bg}
                </td>
                <td className="px-4 py-2 text-text-muted">{pair.use}</td>
                <td className="px-4 py-2 text-right tabular-nums text-text">{ratio.toFixed(2)}:1</td>
                <td className="px-4 py-2 text-text">{kindLabel[pair.kind]}</td>
                <td className="px-4 py-2 font-semibold text-text">
                  {pair.kind === 'avoid' ? 'Reprova: não usar assim' : passes ? 'Passa' : 'Reprova'}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
