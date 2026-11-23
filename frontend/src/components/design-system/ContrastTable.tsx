import { colorHex, contrastLevel, contrastRatio, type ColorName } from '@/lib/tokens'

type Pair = { fg: ColorName; bg: ColorName; use: string }

/** Pares de uso aprovados (texto ≥ 4.5:1) e os que NÃO podem ser usados como texto. */
const pairs: Pair[] = [
  { fg: 'ink', bg: 'bg', use: 'Texto principal' },
  { fg: 'ink', bg: 'surface', use: 'Texto em cards' },
  { fg: 'ink', bg: 'sand', use: 'Texto em seções areia' },
  { fg: 'ink', bg: 'blush', use: 'Texto na seção de presentes' },
  { fg: 'ink-muted', bg: 'bg', use: 'Texto secundário' },
  { fg: 'ink-muted', bg: 'surface', use: 'Texto secundário em cards' },
  { fg: 'ink-muted', bg: 'sand', use: 'Texto secundário em areia' },
  { fg: 'surface', bg: 'ink', use: 'Botão primário, tooltip' },
  { fg: 'on-accent', bg: 'accent', use: 'Botão de destaque, badge Personalizável' },
  { fg: 'on-accent', bg: 'accent-hover', use: 'Hover do botão de destaque' },
  { fg: 'accent-hover', bg: 'bg', use: 'Links e texto terracota sobre Linho' },
  { fg: 'accent-hover', bg: 'surface', use: 'Links em cards' },
  { fg: 'accent', bg: 'surface', use: 'Texto terracota só sobre Branco quente' },
  { fg: 'on-sage', bg: 'sage', use: 'Badge Pronta entrega' },
  { fg: 'ink-muted', bg: 'bg', use: 'Borda de campo (mín. 3:1)' },
  // Combinações a evitar como texto
  { fg: 'bg', bg: 'accent', use: 'EVITAR: texto Linho sobre terracota (use on-accent)' },
  { fg: 'accent', bg: 'bg', use: 'EVITAR: texto terracota sobre Linho (use accent-hover)' },
  { fg: 'ink-muted', bg: 'blush', use: 'EVITAR: texto secundário sobre Rosé (use ink)' },
  { fg: 'surface', bg: 'sage', use: 'EVITAR: texto claro sobre sálvia (use on-sage)' },
  { fg: 'border', bg: 'bg', use: 'EVITAR: borda de campo (só divisor decorativo)' },
]

const levelLabel = { AA: 'AA texto', UI: 'Só UI/texto grande', falha: 'Reprova' } as const

export function ContrastTable() {
  return (
    <div className="overflow-x-auto rounded-md border border-border bg-surface shadow-soft">
      <table className="w-full min-w-[40rem] border-collapse text-left text-small">
        <caption className="sr-only">Razões de contraste WCAG entre pares de cores do sistema</caption>
        <thead className="bg-sand text-ink">
          <tr>
            <th scope="col" className="px-4 py-3 font-semibold">
              Amostra
            </th>
            <th scope="col" className="px-4 py-3 font-semibold">
              Par
            </th>
            <th scope="col" className="px-4 py-3 font-semibold">
              Uso
            </th>
            <th scope="col" className="px-4 py-3 text-right font-semibold">
              Razão
            </th>
            <th scope="col" className="px-4 py-3 font-semibold">
              Nível
            </th>
          </tr>
        </thead>
        <tbody>
          {pairs.map((pair) => {
            const ratio = contrastRatio(colorHex[pair.fg], colorHex[pair.bg])
            const level = contrastLevel(ratio)
            return (
              <tr key={`${pair.fg}-${pair.bg}-${pair.use}`} className="border-t border-border">
                <td className="px-4 py-2">
                  <span
                    className="inline-flex min-w-16 justify-center rounded-sm px-2 py-1 font-sans font-semibold"
                    style={{ background: `var(--color-${pair.bg})`, color: `var(--color-${pair.fg})` }}
                  >
                    Aa
                  </span>
                </td>
                <td className="px-4 py-2 text-ink">
                  {pair.fg} / {pair.bg}
                </td>
                <td className="px-4 py-2 text-ink-muted">{pair.use}</td>
                <td className="px-4 py-2 text-right tabular-nums text-ink">{ratio.toFixed(2)}:1</td>
                <td className="px-4 py-2 text-ink">{levelLabel[level]}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
