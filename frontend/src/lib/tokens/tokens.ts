/**
 * Tokens do design system em TypeScript.
 *
 * ATENÇÃO: o CSS (src/app/globals.css) é a fonte de verdade em tempo de execução;
 * este arquivo o espelha para uso em código (vitrine, SVG do personalizador, testes).
 * Ao mudar um valor, mude nos dois lugares: o teste tokens.test.ts confere que não se afastam.
 * Guia: docs/design-tokens.md
 */

export type ColorToken = {
  /** Nome do token CSS sem o prefixo (--color-<name>) e das classes (bg-<name>). */
  name: string
  label: string
  hex: string
  usage: string
  /** true = derivado criado para passar no contraste (não está na tabela do briefing). */
  derived?: boolean
}

export const colors = [
  { name: 'sand', label: 'Areia', hex: '#F5EBE6', usage: 'Fundo do hero, tons quentes' },
  { name: 'bg', label: 'Branco', hex: '#FFFFFF', usage: 'Fundo da página' },
  {
    name: 'surface',
    label: 'Cinza-claro',
    hex: '#F4F4F5',
    usage: 'Tiles de categoria, imagem dos cards, painel 3',
  },
  { name: 'text', label: 'Texto', hex: '#111827', usage: 'Texto principal' },
  {
    name: 'text-muted',
    label: 'Texto suave',
    hex: '#5B6170',
    usage: 'Descrições, apoio, placeholder',
  },
  {
    name: 'text-subtle',
    label: 'Texto sutil',
    hex: '#9CA3AF',
    usage: 'SÓ preço riscado e legenda decorativa (não é cor de leitura)',
  },
  { name: 'star', label: 'Estrela', hex: '#F5A623', usage: 'Estrelas de avaliação' },
  {
    name: 'border',
    label: 'Borda',
    hex: '#E5E7EB',
    usage: 'Bordas de cards e divisores decorativos',
  },
  { name: 'on-dark', label: 'Sobre grafite', hex: '#FFFFFF', usage: 'Texto sobre grafite ou rosé escuro' },
  // Derivados
  {
    name: 'field-border',
    label: 'Borda de campo',
    hex: '#80868F',
    usage: 'Borda de input/select/botão cart/ponto inativo (3:1)',
    derived: true,
  },
  {
    name: 'danger',
    label: 'Erro',
    hex: '#B42318',
    usage: 'Mensagem de erro, aviso de erro',
    derived: true,
  },
  // Vitrine rosé + grafite (home, header e rodapé).
  {
    name: 'rose',
    label: 'Rosé',
    hex: '#E6ACA4',
    usage: 'Barra de aviso, newsletter, selos, linhas decorativas, contador do carrinho (só fundo; texto sobre ele é grafite)',
  },
  {
    name: 'rose-strong',
    label: 'Rosé escuro',
    hex: '#9C5953',
    usage: 'Botões, preços, textos pequenos e script em rosé (passa no AA sobre branco e creme)',
    derived: true,
  },
  {
    name: 'rose-strong-hover',
    label: 'Rosé escuro (hover)',
    hex: '#864B46',
    usage: 'Hover dos botões rosé escuro',
    derived: true,
  },
  { name: 'rose-soft', label: 'Rosé suave', hex: '#F7E4E0', usage: 'Fundos suaves' },
  { name: 'cream', label: 'Creme', hex: '#FAF4F0', usage: 'Fundo do hero e dos banners de coleção' },
  { name: 'graphite', label: 'Grafite', hex: '#3B3B3B', usage: 'Header, rodapé, botão primário, títulos e links ativos' },
  { name: 'graphite-hover', label: 'Grafite (hover)', hex: '#2B2B2B', usage: 'Hover do botão primário' },
  {
    name: 'on-graphite-muted',
    label: 'Sobre grafite (suave)',
    hex: '#D4D4D4',
    usage: 'Texto secundário sobre grafite (links do rodapé)',
    derived: true,
  },
  {
    name: 'success',
    label: 'Sucesso',
    hex: '#1B7F2E',
    usage: '"Compra verificada"',
    derived: true,
  },
  {
    name: 'soldout',
    label: 'Esgotado',
    hex: '#D10A0A',
    usage: 'Selo "Esgotado" (branco sobre ele passa no AA)',
    derived: true,
  },
] as const satisfies readonly ColorToken[]

export type ColorName = (typeof colors)[number]['name']

/** Hex (modo claro) por nome do token. */
export const colorHex = Object.fromEntries(colors.map((c) => [c.name, c.hex])) as Record<ColorName, string>

/** Apelidos legados (outras páginas): nome antigo -> token novo. Remover quando elas forem redesenhadas. */
export const legacyAliases = {
  ink: 'text',
  'ink-muted': 'text-muted',
  accent: 'graphite',
  'accent-hover': 'graphite-hover',
  'on-accent': 'on-dark',
  blush: 'sand',
  sage: 'rose',
  'on-sage': 'graphite',
} as const satisfies Record<string, ColorName>

export type TypeToken = {
  /** Classe Tailwind (text-<name>). */
  name: string
  label: string
  /** Faixa em px entre 360px e 1440px de viewport. */
  sizePx: readonly [min: number, max: number]
  lineHeight: number
  letterSpacing: string
  fontWeight: number
  family: 'Poppins' | 'Inter' | 'Allura' | 'Montserrat' | 'Raleway'
  uppercase: boolean
  sample: string
  usage: string
}

/** Estilos novos (briefing, seção 1.2). Cada um é um utilitário em globals.css. */
export const typeScale = [
  {
    name: 'overline',
    label: 'Overline',
    sizePx: [13, 13],
    lineHeight: 1.4,
    letterSpacing: '0.12em',
    fontWeight: 600,
    family: 'Poppins',
    uppercase: true,
    sample: 'Bem-vindo à [nome da loja]',
    usage: 'Acima do título do hero; cor rose-strong',
  },
  {
    name: 'display-hero',
    label: 'Display hero',
    sizePx: [34, 56],
    lineHeight: 1.05,
    letterSpacing: '-0.01em',
    fontWeight: 800,
    family: 'Poppins',
    uppercase: true,
    sample: 'Feito para você.',
    usage: 'Único h1 da home (2 linhas)',
  },
  {
    name: 'script',
    label: 'Script',
    sizePx: [26, 36],
    lineHeight: 1.2,
    letterSpacing: '0',
    fontWeight: 400,
    family: 'Allura',
    uppercase: false,
    sample: 'Personalizado com carinho!',
    usage: 'Uma frase por seção de destaque; rosé escuro sobre branco',
  },
  {
    name: 'section-title',
    label: 'Título de seção',
    sizePx: [18, 20],
    lineHeight: 1.3,
    letterSpacing: '0.04em',
    fontWeight: 700,
    family: 'Poppins',
    uppercase: true,
    sample: 'Compre por categoria',
    usage: 'H2 de seção',
  },
  {
    name: 'nav',
    label: 'Menu',
    sizePx: [13, 13],
    lineHeight: 1.4,
    letterSpacing: '0.06em',
    fontWeight: 600,
    family: 'Poppins',
    uppercase: true,
    sample: 'Tapetes',
    usage: 'Navegação',
  },
  {
    name: 'button',
    label: 'Botão',
    sizePx: [13, 13],
    lineHeight: 1.25,
    letterSpacing: '0.06em',
    fontWeight: 600,
    family: 'Poppins',
    uppercase: true,
    sample: 'Personalizar agora',
    usage: 'Todos os botões',
  },
  {
    name: 'button-sm',
    label: 'Botão pequeno',
    sizePx: [12, 12],
    lineHeight: 1.25,
    letterSpacing: '0.06em',
    fontWeight: 600,
    family: 'Poppins',
    uppercase: true,
    sample: 'Adicionar ao carrinho',
    usage: 'Botão do card, link de seção',
  },
  {
    name: 'body',
    label: 'Body',
    sizePx: [15, 16],
    lineHeight: 1.6,
    letterSpacing: '0',
    fontWeight: 400,
    family: 'Inter',
    uppercase: false,
    sample: 'Produzido um a um, com prévia digital antes de ir para a produção.',
    usage: 'Descrições',
  },
  {
    name: 'product-name',
    label: 'Nome do produto',
    sizePx: [14, 14],
    lineHeight: 1.4,
    letterSpacing: '0',
    fontWeight: 500,
    family: 'Inter',
    uppercase: false,
    sample: 'Tapete Personalizado com Nome',
    usage: 'Cards',
  },
  {
    name: 'price',
    label: 'Preço',
    sizePx: [17, 17],
    lineHeight: 1.3,
    letterSpacing: '0',
    fontWeight: 700,
    family: 'Poppins',
    uppercase: false,
    sample: 'R$ 189,90',
    usage: 'Preço atual',
  },
  {
    name: 'caption',
    label: 'Caption',
    sizePx: [12, 12],
    lineHeight: 1.4,
    letterSpacing: '0',
    fontWeight: 400,
    family: 'Inter',
    uppercase: false,
    sample: '2.500+ avaliações',
    usage: 'Apoio dos benefícios, nº de avaliações',
  },
  // Vitrine rosé (utilitários text-store-* em globals.css)
  {
    name: 'store-title',
    label: 'Título de seção (vitrine)',
    sizePx: [20, 24],
    lineHeight: 1.25,
    letterSpacing: '0',
    fontWeight: 700,
    family: 'Montserrat',
    uppercase: false,
    sample: 'Mais Vendidos',
    usage: 'H2 de seção, com traço de 40×3px embaixo',
  },
  {
    name: 'store-hero',
    label: 'Título do banner (vitrine)',
    sizePx: [28, 42],
    lineHeight: 1.2,
    letterSpacing: '0',
    fontWeight: 400,
    family: 'Raleway',
    uppercase: false,
    sample: 'Frete Grátis nas compras acima de R$ 299',
    usage: 'Único h1 da home (2 linhas)',
  },
  {
    name: 'store-product',
    label: 'Nome do produto (vitrine)',
    sizePx: [15, 15],
    lineHeight: 1.4,
    letterSpacing: '0',
    fontWeight: 500,
    family: 'Raleway',
    uppercase: false,
    sample: 'Tapete Personalizado com Nome',
    usage: 'Cards da vitrine',
  },
  {
    name: 'store-price',
    label: 'Preço (vitrine)',
    sizePx: [18, 18],
    lineHeight: 1.3,
    letterSpacing: '0',
    fontWeight: 700,
    family: 'Montserrat',
    uppercase: false,
    sample: 'R$ 189,90',
    usage: 'Preço do card, em rosé escuro',
  },
  {
    name: 'store-button',
    label: 'Botão (vitrine)',
    sizePx: [14, 14],
    lineHeight: 1.25,
    letterSpacing: '0',
    fontWeight: 600,
    family: 'Montserrat',
    uppercase: false,
    sample: 'Comprar',
    usage: 'Botões pílula da vitrine',
  },
] as const satisfies readonly TypeToken[]

export const fonts = {
  storeHeading: { label: 'Montserrat', cssVar: '--font-montserrat', usage: 'Vitrine: títulos, preços, botões (400-700)' },
  storeBody: { label: 'Raleway', cssVar: '--font-raleway', usage: 'Vitrine: texto e banners (400, 500)' },
  wordmark: { label: 'Cormorant Garamond', cssVar: '--font-cormorant', usage: 'Logotipo em caixa alta (400, 500)' },
  heading: { label: 'Poppins', cssVar: '--font-poppins', usage: 'Títulos, menu, botões, preço (600, 700, 800)' },
  sans: { label: 'Inter', cssVar: '--font-inter', usage: 'Texto (400, 500)' },
  script: { label: 'Allura', cssVar: '--font-allura', usage: 'Uma frase manuscrita por seção de destaque' },
} as const

/** As 4 fontes de personalização (texto do cliente nas prévias; não são fontes da interface). */
export const personalizeFonts = [
  {
    id: 'classic',
    label: 'Clássica',
    family: 'Fraunces',
    className: 'font-personalize-classic',
    cssVar: '--font-fraunces',
    italic: false,
  },
  {
    id: 'elegant',
    label: 'Elegante',
    family: 'Playfair Display',
    className: 'font-personalize-elegant',
    cssVar: '--font-playfair',
    italic: true,
  },
  {
    id: 'script',
    label: 'Manuscrita',
    family: 'Caveat',
    className: 'font-personalize-script',
    cssVar: '--font-caveat',
    italic: false,
  },
  {
    id: 'bold',
    label: 'Moderna',
    family: 'Archivo Black',
    className: 'font-personalize-bold',
    cssVar: '--font-archivo',
    italic: false,
  },
] as const

export type PersonalizeFontId = (typeof personalizeFonts)[number]['id']

/**
 * Paleta de cor do texto personalizado (as "bolinhas" do personalizador).
 * São opções do PRODUTO (cor aplicada sobre o tecido), não cores da interface: os ids são
 * usados na query string de /personalizar, por isso não mudam com a paleta da marca.
 */
export const personalizeColors = [
  { id: 'ink', label: 'Tinta', hex: '#1F1B16' },
  { id: 'terracotta', label: 'Terracota', hex: '#B8562F' },
  { id: 'sage', label: 'Sálvia', hex: '#5F7052' },
  { id: 'navy', label: 'Azul-noite', hex: '#2F3E5C' },
  { id: 'cream', label: 'Creme', hex: '#F2E8D8' },
] as const

export type PersonalizeColorId = (typeof personalizeColors)[number]['id']

/** Escala de espaçamento (base 4px). Classes Tailwind: p-1 = 4px … p-20 = 80px. */
export const spacing = [
  { step: 1, px: 4 },
  { step: 2, px: 8 },
  { step: 3, px: 12 },
  { step: 4, px: 16 },
  { step: 6, px: 24 },
  { step: 8, px: 32 },
  { step: 12, px: 48 },
  { step: 16, px: 64 },
  { step: 20, px: 80 },
] as const

export const radii = [
  { name: 'control', px: 4, usage: 'Botões, inputs, badges' },
  { name: 'card', px: 8, usage: 'Cards, tiles, faixa promocional, modais' },
  { name: 'full', px: 9999, usage: 'Selo de desconto, contador do carrinho, setas do carrossel' },
] as const

export const shadows = [
  { name: 'soft', usage: 'Quase nada: separação é por borda', value: '0 1px 2px rgb(33 33 33 / 0.05)' },
  { name: 'hover', usage: 'Hover de card', value: '0 6px 20px rgb(33 33 33 / 0.08)' },
  { name: 'lift', usage: 'Só sobreposições: modal, drawer, toast', value: '0 10px 32px rgb(33 33 33 / 0.18)' },
] as const

export const motion = {
  durations: { fast: 150, button: 200, base: 250, slow: 400 },
  easing: { soft: 'cubic-bezier(0.22, 1, 0.36, 1)' },
} as const

/** Layout. */
export const layout = {
  containerMaxPx: 1280,
  gutterPx: 24,
  gutterMobilePx: 16,
  sectionGapPx: { mobile: 48, tablet: 56, desktop: 64 },
  breakpointsPx: [360, 640, 768, 1024, 1280, 1440],
} as const
