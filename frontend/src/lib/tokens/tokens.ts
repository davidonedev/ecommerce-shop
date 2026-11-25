/**
 * Tokens do design system em TypeScript.
 *
 * ATENÇÃO: o CSS (src/app/globals.css) é a fonte de verdade em tempo de execução;
 * este arquivo o espelha para uso em código (vitrine, SVG do personalizador, testes).
 * Ao mudar um valor, mude nos dois lugares. Guia: docs/design-tokens.md
 */

export type ColorToken = {
  /** Nome do token CSS sem o prefixo (--color-<name>) e das classes (bg-<name>). */
  name: string
  label: string
  hex: string
  /** Hex no modo escuro (preparado, ainda não ativado). */
  darkHex: string
  usage: string
}

export const colors = [
  { name: 'bg', label: 'Linho', hex: '#F7F3EE', darkHex: '#171411', usage: 'Fundo principal' },
  { name: 'surface', label: 'Branco quente', hex: '#FFFDFA', darkHex: '#1F1B16', usage: 'Cards, modais' },
  { name: 'sand', label: 'Areia', hex: '#E8DFD3', darkHex: '#2A2520', usage: 'Seções alternadas, bordas suaves' },
  { name: 'ink', label: 'Tinta', hex: '#1F1B16', darkHex: '#F3EDE6', usage: 'Texto principal, botão primário' },
  { name: 'ink-muted', label: 'Tinta suave', hex: '#6B6259', darkHex: '#B3A89B', usage: 'Texto secundário' },
  { name: 'accent', label: 'Terracota', hex: '#B8562F', darkHex: '#E08A62', usage: 'CTAs de destaque, badges' },
  {
    name: 'accent-hover',
    label: 'Terracota escura',
    hex: '#9A4524',
    darkHex: '#EBA07C',
    usage: 'Hover do acento, links',
  },
  { name: 'sage', label: 'Sálvia', hex: '#7F8F72', darkHex: '#9CAD8F', usage: 'Selos de confiança, sucesso' },
  { name: 'blush', label: 'Rosé', hex: '#E9C9B8', darkHex: '#3A2A22', usage: 'Seção de presentes, toques afetivos' },
  { name: 'border', label: 'Borda', hex: '#DDD3C6', darkHex: '#3A332B', usage: 'Divisores decorativos' },
  {
    name: 'on-accent',
    label: 'Sobre terracota',
    hex: '#FFFDFA',
    darkHex: '#1F1B16',
    usage: 'Texto sobre fundo terracota',
  },
  { name: 'on-sage', label: 'Sobre sálvia', hex: '#1F1B16', darkHex: '#1F1B16', usage: 'Texto sobre fundo sálvia' },
] as const satisfies readonly ColorToken[]

export type ColorName = (typeof colors)[number]['name']

/** Hex (modo claro) por nome do token. */
export const colorHex = Object.fromEntries(colors.map((c) => [c.name, c.hex])) as Record<ColorName, string>

export type TypeToken = {
  /** Classe Tailwind (text-<name>). */
  name: string
  label: string
  /** Faixa em px entre 360px e 1440px de viewport. */
  sizePx: readonly [min: number, max: number]
  lineHeight: number
  letterSpacing: string
  fontWeight: number
  family: 'display' | 'sans'
  sample: string
}

export const typeScale = [
  {
    name: 'display-xl',
    label: 'Display XL (hero)',
    sizePx: [48, 88],
    lineHeight: 1,
    letterSpacing: '-0.02em',
    fontWeight: 400,
    family: 'display',
    sample: 'Seu nome, sua história',
  },
  {
    name: 'h1',
    label: 'H1',
    sizePx: [40, 56],
    lineHeight: 1.1,
    letterSpacing: '-0.015em',
    fontWeight: 400,
    family: 'display',
    sample: 'Tapetes que contam histórias',
  },
  {
    name: 'h2',
    label: 'H2',
    sizePx: [32, 44],
    lineHeight: 1.15,
    letterSpacing: '-0.01em',
    fontWeight: 400,
    family: 'display',
    sample: 'Comprar por categoria',
  },
  {
    name: 'h3',
    label: 'H3',
    sizePx: [22, 28],
    lineHeight: 1.25,
    letterSpacing: '-0.005em',
    fontWeight: 600,
    family: 'display',
    sample: 'Tapete de entrada personalizado',
  },
  {
    name: 'body',
    label: 'Body',
    sizePx: [16, 17],
    lineHeight: 1.6,
    letterSpacing: '0',
    fontWeight: 400,
    family: 'sans',
    sample: 'Produzido um a um, com prévia digital antes de ir para a produção.',
  },
  {
    name: 'small',
    label: 'Small',
    sizePx: [14, 14],
    lineHeight: 1.5,
    letterSpacing: '0',
    fontWeight: 400,
    family: 'sans',
    sample: 'Entrega para todo o Brasil',
  },
  {
    name: 'caption',
    label: 'Caption / overline',
    sizePx: [12, 12],
    lineHeight: 1.4,
    letterSpacing: '0.12em',
    fontWeight: 600,
    family: 'sans',
    sample: 'Feito sob medida para você',
  },
] as const satisfies readonly TypeToken[]

export const fonts = {
  display: { label: 'Fraunces', cssVar: '--font-fraunces', usage: 'Títulos (opsz alto em tamanhos grandes)' },
  sans: { label: 'Inter', cssVar: '--font-inter', usage: 'Texto e interface' },
} as const

/** As 4 fontes de personalização (chips do mini-personalizador e prévia). */
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
 * Paleta de cor do texto personalizado (as 5 "bolinhas" do personalizador).
 * Pensada para aplicar sobre tecido/tapete: tom escuro, quente e legível.
 */
export const personalizeColors = [
  { id: 'ink', label: 'Tinta', hex: '#1F1B16' },
  { id: 'terracotta', label: 'Terracota', hex: '#B8562F' },
  { id: 'sage', label: 'Sálvia', hex: '#5F7052' },
  { id: 'navy', label: 'Azul-noite', hex: '#2F3E5C' },
  { id: 'cream', label: 'Creme', hex: '#F2E8D8' },
] as const

export type PersonalizeColorId = (typeof personalizeColors)[number]['id']

/** Escala de espaçamento (base 4px). Classes Tailwind: p-1 = 4px … p-32 = 128px. */
export const spacing = [
  { step: 1, px: 4 },
  { step: 2, px: 8 },
  { step: 3, px: 12 },
  { step: 4, px: 16 },
  { step: 6, px: 24 },
  { step: 8, px: 32 },
  { step: 12, px: 48 },
  { step: 16, px: 64 },
  { step: 24, px: 96 },
  { step: 32, px: 128 },
] as const

export const radii = [
  { name: 'sm', px: 6, usage: 'Inputs, tooltips' },
  { name: 'md', px: 12, usage: 'Cards' },
  { name: 'lg', px: 24, usage: 'Blocos, hero, modais' },
  { name: 'full', px: 9999, usage: 'Pills, chips, botões' },
] as const

export const shadows = [
  {
    name: 'soft',
    usage: 'Cards e botões em repouso/hover',
    value: '0 1px 2px rgb(31 27 22 / 0.06), 0 8px 24px rgb(31 27 22 / 0.06)',
  },
  {
    name: 'lift',
    usage: 'Elevação em hover, drawers, modais',
    value: '0 2px 4px rgb(31 27 22 / 0.06), 0 16px 40px rgb(31 27 22 / 0.12)',
  },
] as const

export const motion = {
  durations: { fast: 150, base: 250, slow: 400 },
  easing: { soft: 'cubic-bezier(0.22, 1, 0.36, 1)' },
  grainOpacity: 0.035,
} as const

/** Layout. */
export const layout = {
  containerMaxPx: 1320,
  gutterPx: 24,
  gutterMobilePx: 16,
  breakpointsPx: [360, 640, 768, 1024, 1280, 1440],
} as const
