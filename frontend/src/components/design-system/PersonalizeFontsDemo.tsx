import { personalizeColors, personalizeFonts } from '@/lib/tokens'

const fontClass: Record<(typeof personalizeFonts)[number]['id'], string> = {
  classic: 'font-personalize-classic',
  elegant: 'font-personalize-elegant italic',
  script: 'font-personalize-script',
  bold: 'font-personalize-bold',
}

/** As 4 fontes e as 5 cores do TEXTO DO CLIENTE (prévias e /personalizar). Não são fontes da interface. */
export function PersonalizeFontsDemo() {
  return (
    <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
      <ul className="grid gap-4 sm:grid-cols-2">
        {personalizeFonts.map((font) => (
          <li key={font.id} className="rounded-card border border-border bg-bg p-5">
            <p className="text-caption text-text-muted">
              {font.label} · {font.family}
            </p>
            <p className={`mt-3 text-h2 text-navy ${fontClass[font.id]}`}>Casa da Ana</p>
          </li>
        ))}
      </ul>

      <div className="rounded-card border border-border bg-sand p-5">
        <p className="text-caption text-text-muted">Cores do texto</p>
        <ul className="mt-4 flex flex-wrap gap-4">
          {personalizeColors.map((color) => (
            <li key={color.id} className="flex flex-col items-center gap-2">
              <span
                className="size-11 rounded-full border border-field-border"
                style={{ background: color.hex }}
                role="img"
                aria-label={`${color.label} ${color.hex}`}
              />
              <span className="text-small text-text">{color.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
