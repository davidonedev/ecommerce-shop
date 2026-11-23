import { ColorSwatches } from './ColorSwatches'
import { ContrastTable } from './ContrastTable'
import { MotionDemo } from './MotionDemo'
import { PersonalizeFontsDemo } from './PersonalizeFontsDemo'
import { Section } from './Section'
import { GrainDemo, RadiiDemo, ShadowsDemo, SpacingDemo } from './ShapeDemo'
import { TypeScaleDemo } from './TypeScaleDemo'

const index = [
  ['cores', 'Cores'],
  ['contraste', 'Contraste'],
  ['tipografia', 'Tipografia'],
  ['personalizacao', 'Personalização'],
  ['espacamento', 'Espaçamento'],
  ['formas', 'Raios e sombras'],
  ['movimento', 'Movimento'],
] as const

/**
 * Vitrine visual dos tokens do design system.
 * Renderize dentro de /design-system, acima da vitrine dos componentes.
 */
export function TokenShowcase() {
  return (
    <div>
      <nav
        aria-label="Seções dos tokens"
        className="sticky top-0 z-10 -mx-4 border-b border-border bg-bg/90 px-4 backdrop-blur md:-mx-6 md:px-6"
      >
        <ul className="flex gap-2 overflow-x-auto py-3">
          {index.map(([id, label]) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className="inline-flex min-h-11 items-center rounded-full px-4 text-small text-ink hover:bg-sand"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <Section
        id="cores"
        title="Paleta"
        description="Fundo Linho, tinta quente e um único acento terracota. A terracota entra com parcimônia: no máximo 1 CTA de destaque por dobra."
      >
        <ColorSwatches />
      </Section>

      <Section
        id="contraste"
        title="Contraste (WCAG AA)"
        description="Razões calculadas a partir dos próprios tokens. Texto precisa de pelo menos 4,5:1."
      >
        <ContrastTable />
      </Section>

      <Section
        id="tipografia"
        title="Tipografia"
        description="Fraunces nos títulos, com tamanho óptico alto nos maiores, e Inter no texto e na interface. A escala é fluida entre 360px e 1440px."
      >
        <TypeScaleDemo />
      </Section>

      <Section
        id="personalizacao"
        title="Fontes e cores da personalização"
        description="As 4 fontes e 5 cores do mini-personalizador e da prévia ao vivo."
      >
        <PersonalizeFontsDemo />
      </Section>

      <Section id="espacamento" title="Espaçamento" description="Base de 4px: 4, 8, 12, 16, 24, 32, 48, 64, 96 e 128.">
        <SpacingDemo />
      </Section>

      <Section id="formas" title="Raios, sombras e textura">
        <div className="space-y-10">
          <RadiiDemo />
          <ShadowsDemo />
          <GrainDemo />
        </div>
      </Section>

      <Section
        id="movimento"
        title="Movimento"
        description="Pequeno e com propósito. Nada de parallax ou rolagem sequestrada."
      >
        <MotionDemo />
      </Section>
    </div>
  )
}
