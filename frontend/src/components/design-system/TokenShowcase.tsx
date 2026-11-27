import { ColorSwatches } from './ColorSwatches'
import { ContrastTable } from './ContrastTable'
import { MotionDemo } from './MotionDemo'
import { PersonalizeFontsDemo } from './PersonalizeFontsDemo'
import { Section } from './Section'
import { RadiiDemo, ShadowsDemo, SpacingDemo } from './ShapeDemo'
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
        className="sticky top-0 z-10 -mx-4 border-b border-border bg-bg/95 px-4 backdrop-blur md:-mx-6 md:px-6"
      >
        <ul className="flex gap-1 overflow-x-auto py-2">
          {index.map(([id, label]) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className="text-nav inline-flex min-h-11 items-center rounded-control px-4 text-graphite hover:bg-surface"
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
        description="Grafite para estrutura e ação, rosé só como destaque e o resto neutro. Os derivados (rosé escuro, borda de campo, texto sobre grafite, erro) existem só para passar no contraste."
      >
        <ColorSwatches />
      </Section>

      <Section
        id="contraste"
        title="Contraste (WCAG AA)"
        description="Razões calculadas a partir dos próprios tokens, com a decisão de uso de cada par. Texto precisa de 4,5:1; texto grande e elementos de interface, de 3:1."
      >
        <ContrastTable />
      </Section>

      <Section
        id="tipografia"
        title="Tipografia"
        description="Poppins em títulos, menu, botões e preço (caixa alta e negrito), Inter no texto e Allura em uma única frase de destaque por seção."
      >
        <TypeScaleDemo />
      </Section>

      <Section
        id="personalizacao"
        title="Fontes e cores da personalização"
        description="O texto do cliente aparece em 4 fontes e 5 cores nas prévias. Elas não são fontes da interface e só carregam quando usadas."
      >
        <PersonalizeFontsDemo />
      </Section>

      <Section id="espacamento" title="Espaçamento" description="Base de 4px: 4, 8, 12, 16, 24, 32, 48, 64 e 80.">
        <SpacingDemo />
      </Section>

      <Section id="formas" title="Raios e sombras">
        <div className="space-y-10">
          <RadiiDemo />
          <ShadowsDemo />
        </div>
      </Section>

      <Section
        id="movimento"
        title="Movimento"
        description="Discreto e funcional. Sem autoplay, sem parallax, sem rolagem sequestrada."
      >
        <MotionDemo />
      </Section>
    </div>
  )
}
