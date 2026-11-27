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
  // Grafite: estrutura e ação
  { fg: 'on-dark', bg: 'graphite', kind: 'text', use: 'Botão primário, header, menu, rodapé, botão da newsletter' },
  { fg: 'on-dark', bg: 'graphite-hover', kind: 'text', use: 'Hover do botão primário' },
  { fg: 'graphite', bg: 'bg', kind: 'text', use: 'Títulos, botão outline, links' },
  { fg: 'graphite', bg: 'sand', kind: 'text', use: 'Títulos sobre areia' },
  { fg: 'graphite', bg: 'surface', kind: 'text', use: 'Texto no painel 3 da faixa promocional' },
  { fg: 'graphite', bg: 'rose', kind: 'text', use: 'Painel de oferta e barra de aviso (texto escuro sobre o rosé claro)' },
  { fg: 'graphite', bg: 'rose-soft', kind: 'text', use: 'Botão "Fale conosco" (barra superior)' },
  { fg: 'rose-soft', bg: 'graphite', kind: 'large', use: '"50%" do selo de desconto (texto grande)' },
  { fg: 'rose-soft', bg: 'graphite', kind: 'text', use: 'Realces e parte final da frase da barra superior' },
  { fg: 'on-graphite-muted', bg: 'graphite', kind: 'text', use: 'Links e textos secundários do rodapé' },
  { fg: 'rose', bg: 'graphite', kind: 'text', use: 'Logotipo, lupa e contador sobre o grafite' },
  // Rosé escuro: destaque em texto
  { fg: 'rose-strong', bg: 'bg', kind: 'text', use: 'Overline, badge Personalizável, preço, "12x", link "Avise-me", frase manuscrita' },
  { fg: 'rose-strong', bg: 'surface', kind: 'text', use: 'Badge Personalizável sobre a imagem do card' },
  { fg: 'rose-strong', bg: 'sand', kind: 'text', use: 'Overline sobre areia' },
  // Elementos de interface (≥ 3:1)
  { fg: 'field-border', bg: 'bg', kind: 'ui', use: 'Borda de input, select e botão cart; ponto inativo do carrossel' },
  { fg: 'rose-strong', bg: 'bg', kind: 'ui', use: 'Ponto ativo do carrossel, borda do badge' },
  { fg: 'graphite', bg: 'bg', kind: 'ui', use: 'Anel de foco, ícones, borda de hover' },
  { fg: 'rose-soft', bg: 'graphite', kind: 'ui', use: 'Anel de foco sobre fundo grafite (focus-inverse)' },
  { fg: 'danger', bg: 'bg', kind: 'text', use: 'Mensagem de erro de formulário' },
  // Vitrine
  { fg: 'on-dark', bg: 'rose-strong', kind: 'text', use: 'Botões "Comprar" e "Conferir agora", selos LANÇAMENTO/DESTAQUE' },
  { fg: 'on-dark', bg: 'rose-strong-hover', kind: 'text', use: 'Hover dos botões rosé escuro' },
  { fg: 'rose-strong', bg: 'cream', kind: 'text', use: 'Linha rosé e script no hero e nos banners de coleção' },
  { fg: 'text', bg: 'cream', kind: 'text', use: 'Título do hero e dos banners' },
  { fg: 'text-muted', bg: 'cream', kind: 'text', use: 'Apoio nos banners de coleção' },
  { fg: 'success', bg: 'bg', kind: 'text', use: '"Compra verificada"' },
  { fg: 'on-dark', bg: 'soldout', kind: 'text', use: 'Selo "Esgotado"' },
  { fg: 'text-muted', bg: 'bg', kind: 'ui', use: 'Seletor de quantidade (− e +)' },
  // Combinações a evitar
  { fg: 'on-dark', bg: 'rose', kind: 'avoid', use: 'Branco sobre o rosé claro (1,9:1): use grafite ou o rosé escuro' },
  { fg: 'rose', bg: 'bg', kind: 'avoid', use: 'Rosé claro como texto sobre branco: use rose-strong' },
  { fg: 'text-subtle', bg: 'bg', kind: 'avoid', use: 'Cinza sutil como texto: só preço riscado e legenda decorativa' },
  { fg: 'border', bg: 'bg', kind: 'avoid', use: 'Borda de campo: use field-border (border é só divisor decorativo)' },
  { fg: 'text-muted', bg: 'graphite', kind: 'avoid', use: 'Texto suave sobre grafite: use on-graphite-muted' },
  {
    fg: 'star',
    bg: 'bg',
    kind: 'avoid',
    use: 'Estrela amarela: o valor também vai em texto (showValue) e no aria-label',
  },
]
