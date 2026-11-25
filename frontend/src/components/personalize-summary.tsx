'use client'

import { useSearchParams } from 'next/navigation'
import { cx } from '@/components/ui/variants'
import { parsePersonalizeParams, personalizeTypes } from '@/lib/personalize'
import { personalizeColors, personalizeFonts } from '@/lib/tokens'

/**
 * Mostra o que a pessoa escolheu (no hero da home ou na página do produto), já validado:
 * só valores conhecidos de tipo, fonte e cor; texto limpo e limitado. Mostra uma prévia do texto
 * na fonte e cor escolhidas.
 */
export function PersonalizeSummary() {
  const selection = parsePersonalizeParams(useSearchParams())
  const font = personalizeFonts.find((f) => f.id === selection.fonte) ?? personalizeFonts[0]
  const color = personalizeColors.find((c) => c.id === selection.cor) ?? personalizeColors[0]
  const tipoLabel = personalizeTypes.find((t) => t.id === selection.tipo)?.label

  const rows = [
    { label: 'Produto', value: tipoLabel },
    { label: 'Modelo', value: selection.produto?.name },
    { label: 'Texto', value: selection.texto },
    { label: 'Fonte', value: font.label },
    { label: 'Cor', value: color.label },
  ]

  return (
    <>
      {selection.texto ? (
        <div
          // Creme some sobre o fundo claro: nesse caso a prévia usa fundo escuro.
          className={cx(
            'mt-8 flex min-h-40 items-center justify-center rounded-md px-6 py-10 text-center shadow-soft',
            selection.cor === 'cream' ? 'bg-ink' : 'bg-sand',
          )}
        >
          <p
            className={cx('max-w-full wrap-break-word text-h2', font.className, font.italic && 'italic')}
            style={{ color: color.hex }}
          >
            {selection.texto}
          </p>
        </div>
      ) : null}

      <dl className="mt-8 divide-y divide-border rounded-md border border-border bg-surface shadow-soft">
        {rows.map(({ label, value }) => (
          <div key={label} className="flex flex-wrap justify-between gap-2 p-4">
            <dt className="text-ink-muted">{label}</dt>
            <dd className="font-medium wrap-break-word">{value || 'Não informado'}</dd>
          </div>
        ))}
      </dl>
    </>
  )
}
