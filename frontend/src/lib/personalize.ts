import { getProductBySlug } from '@/data/mock/products'
import { personalizeColors, personalizeFonts, type PersonalizeColorId, type PersonalizeFontId } from '@/lib/tokens'
import type { Product } from '@/types/product'

/** Tamanho máximo do texto personalizado (o mesmo limite do mini-personalizador do hero). */
export const PERSONALIZE_TEXT_MAX = 14

export const personalizeTypes = [
  { id: 'tapete', label: 'Tapete' },
  { id: 'bolsa', label: 'Bolsa' },
] as const

export type PersonalizeType = (typeof personalizeTypes)[number]['id']

export const DEFAULT_PERSONALIZE_FONT: PersonalizeFontId = 'classic'
export const DEFAULT_PERSONALIZE_COLOR: PersonalizeColorId = 'ink'

export interface PersonalizeSelection {
  tipo: PersonalizeType | null
  produto: Product | null
  /** Texto já limpo e limitado a PERSONALIZE_TEXT_MAX caracteres ('' quando não informado). */
  texto: string
  fonte: PersonalizeFontId
  cor: PersonalizeColorId
}

/** Qualquer coisa com `get(chave)`: URLSearchParams, ReadonlyURLSearchParams do Next etc. */
export interface ParamReader {
  get(key: string): string | null
}

/** Caracteres de controle (C0 e C1), inclusive tab e quebra de linha. */
const CONTROL_CHARS = /[\u0000-\u001F\u007F-\u009F]/g

/**
 * Limpa o texto vindo da URL: remove caracteres de controle, junta espaços repetidos,
 * apara as pontas e corta em PERSONALIZE_TEXT_MAX caracteres (contando letras, não bytes: emoji e acento valem 1).
 * O resultado é sempre texto puro; quem exibe deve renderizá-lo como texto (o React já escapa).
 */
export function sanitizePersonalizeText(raw: string | null | undefined): string {
  if (!raw) return ''
  const clean = raw.replace(CONTROL_CHARS, ' ').replace(/\s+/g, ' ').trim()
  return Array.from(clean).slice(0, PERSONALIZE_TEXT_MAX).join('').trim()
}

/**
 * Lê os parâmetros de /personalizar aceitando só valores conhecidos:
 *   tipo=tapete|bolsa · produto=<slug existente> · texto=<até 14 caracteres>
 *   fonte=classic|elegant|script|bold · cor=ink|terracotta|sage|navy|cream
 * Valor desconhecido nunca quebra a página: tipo/produto viram null e fonte/cor voltam ao padrão.
 */
export function parsePersonalizeParams(params: ParamReader): PersonalizeSelection {
  const produto = getProductBySlug(params.get('produto') ?? '') ?? null

  const tipoParam = params.get('tipo')
  let tipo: PersonalizeType | null = personalizeTypes.find((t) => t.id === tipoParam)?.id ?? null
  if (!tipo && produto) {
    if (produto.category === 'tapetes') tipo = 'tapete'
    else if (produto.category === 'bolsas') tipo = 'bolsa'
  }

  const fonteParam = params.get('fonte')
  const corParam = params.get('cor')

  return {
    tipo,
    produto,
    texto: sanitizePersonalizeText(params.get('texto')),
    fonte: personalizeFonts.find((f) => f.id === fonteParam)?.id ?? DEFAULT_PERSONALIZE_FONT,
    cor: personalizeColors.find((c) => c.id === corParam)?.id ?? DEFAULT_PERSONALIZE_COLOR,
  }
}
