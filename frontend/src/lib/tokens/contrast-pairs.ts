import type { ColorName } from './tokens'

/**
 * Pares de cor (texto/fundo ou controle/fundo) e a DECISÃO de uso de cada um.
 * Alimenta a tabela de /design-system e o teste tokens.test.ts (que garante que a decisão
 * continua verdadeira se um hex mudar).
 *
 * kind:
 *  - 'text'    texto de leitura: precisa de ≥ 4,5:1
 *  - 'large'   texto grande (≥ 24px, ou ≥ 18,66px em negrito): precisa de ≥ 3:1
 *  - 'ui'      borda, ícone, ponto, foco: precisa de ≥ 3:1
 *  - 'avoid'   combinação que NÃO deve ser usada como está (a razão fica abaixo do mínimo)
 */
export type ContrastKind = 'text' | 'large' | 'ui' | 'avoid'

export type ContrastPair = {
  fg: ColorName
  bg: ColorName
  kind: ContrastKind
  /** Onde se usa (ou, para 'avoid', o que usar no lugar). */
  use: string
}

export const contrastPairs: readonly ContrastPair[] = [
  // Texto principal e suave
  { fg: 'text', bg: 'bg', kind: 'text', use: 'Texto principal' },
  { fg: 'text', bg: 'sand', kind: 'text', use: 'Texto sobre areia (hero)' },
  { fg: 'text', bg: 'surface', kind: 'text', use: 'Texto em cards e tiles' },
  { fg: 'text-muted', bg: 'bg', kind: 'text', use: 'Descrições, placeholder' },
  { fg: 'text-muted', bg: 'sand', kind: 'text', use: 'Descrição no hero' },
  { fg: 'text-muted', bg: 'surface', kind: 'text', use: 'Apoio em cards' },
  // Marinho: estrutura e ação
  { fg: 'on-dark', bg: 'navy', kind: 'text', use: 'Botão primário, barra superior, footer, badge -20%' },
  { fg: 'on-dark', bg: 'navy-hover', kind: 'text', use: 'Hover do botão primário' },
  { fg: 'navy', bg: 'bg', kind: 'text', use: 'Títulos, botão outline, links' },
  { fg: 'navy', bg: 'sand', kind: 'text', use: 'Títulos sobre areia' },
  { fg: 'navy', bg: 'surface', kind: 'text', use: 'Texto no painel 3 da faixa promocional' },
  { fg: 'on-dark-muted', bg: 'navy', kind: 'text', use: 'Texto secundário no footer e na barra' },
  // Caramelo: só destaque
  { fg: 'caramel-ink', bg: 'bg', kind: 'text', use: 'Overline e badge Personalizável (texto pequeno)' },
  { fg: 'caramel-ink', bg: 'surface', kind: 'text', use: 'Badge Personalizável sobre a imagem do card' },
  { fg: 'caramel-ink', bg: 'sand', kind: 'text', use: 'Overline sobre areia' },
  { fg: 'navy', bg: 'caramel', kind: 'text', use: 'Texto do painel 2 (oferta) e do botão sobre caramelo' },
  { fg: 'navy', bg: 'caramel-light', kind: 'text', use: 'Botão "Fale conosco" (barra superior)' },
  { fg: 'caramel-light', bg: 'navy', kind: 'large', use: '"50%" do selo de desconto (texto grande)' },
  { fg: 'caramel-light', bg: 'navy', kind: 'text', use: 'Parte final da frase da barra superior' },
  { fg: 'caramel', bg: 'bg', kind: 'large', use: 'Frase manuscrita (Allura ≥ 26px) sobre branco' },
  { fg: 'caramel', bg: 'navy', kind: 'text', use: 'Realces em caramelo sobre o marinho' },
  // Elementos de interface (≥ 3:1)
  { fg: 'field-border', bg: 'bg', kind: 'ui', use: 'Borda de input, select e botão cart; ponto inativo do carrossel' },
  { fg: 'caramel', bg: 'bg', kind: 'ui', use: 'Ponto ativo do carrossel, borda do badge' },
  { fg: 'navy', bg: 'bg', kind: 'ui', use: 'Anel de foco, ícones, borda de hover' },
  { fg: 'caramel-light', bg: 'navy', kind: 'ui', use: 'Anel de foco sobre fundo marinho (focus-inverse)' },
  { fg: 'danger', bg: 'bg', kind: 'text', use: 'Mensagem de erro de formulário' },
  // Combinações a evitar
  { fg: 'on-dark', bg: 'caramel', kind: 'avoid', use: 'Branco sobre caramelo: use texto marinho' },
  { fg: 'caramel', bg: 'bg', kind: 'avoid', use: 'Caramelo em texto PEQUENO: use caramel-ink' },
  { fg: 'caramel', bg: 'sand', kind: 'avoid', use: 'Caramelo sobre areia: use caramel-ink' },
  { fg: 'text-subtle', bg: 'bg', kind: 'avoid', use: 'Cinza sutil como texto: só preço riscado e legenda decorativa' },
  { fg: 'border', bg: 'bg', kind: 'avoid', use: 'Borda de campo: use field-border (border é só divisor decorativo)' },
  { fg: 'text-muted', bg: 'navy', kind: 'avoid', use: 'Texto suave sobre marinho: use on-dark-muted' },
  {
    fg: 'star',
    bg: 'bg',
    kind: 'avoid',
    use: 'Estrela amarela: o valor também vai em texto (showValue) e no aria-label',
  },
]
