import { describe, expect, it } from 'vitest'
import { products } from '@/data/mock/products'
import { PERSONALIZE_TEXT_MAX, parsePersonalizeParams, sanitizePersonalizeText } from './personalize'

const parse = (query: string) => parsePersonalizeParams(new URLSearchParams(query))

describe('sanitizePersonalizeText', () => {
  it('limita a 14 caracteres', () => {
    expect(PERSONALIZE_TEXT_MAX).toBe(14)
    expect(sanitizePersonalizeText('Familia Albuquerque de Souza')).toBe('Familia Albuqu')
    expect(Array.from(sanitizePersonalizeText('x'.repeat(500)))).toHaveLength(14)
  })

  it('conta letras e não bytes (acento e emoji valem 1)', () => {
    expect(sanitizePersonalizeText('ÁÉÍÓÚÂÊÔÃÕÇÀÜÑX')).toBe('ÁÉÍÓÚÂÊÔÃÕÇÀÜÑ')
    expect(sanitizePersonalizeText('🏠'.repeat(20))).toBe('🏠'.repeat(14))
  })

  it('apara, junta espaços e remove caracteres de controle', () => {
    expect(sanitizePersonalizeText('   Casa   da \n\t Ana  ')).toBe('Casa da Ana')
    expect(sanitizePersonalizeText('A\u0000B\u0007C')).toBe('A B C')
  })

  it('devolve texto vazio para valor ausente', () => {
    expect(sanitizePersonalizeText(null)).toBe('')
    expect(sanitizePersonalizeText(undefined)).toBe('')
    expect(sanitizePersonalizeText('   ')).toBe('')
  })

  it('mantém HTML como texto puro (quem exibe é o React, que escapa)', () => {
    expect(sanitizePersonalizeText('<b>oi</b>')).toBe('<b>oi</b>')
  })
})

describe('parsePersonalizeParams', () => {
  it('aceita valores conhecidos', () => {
    expect(parse('tipo=bolsa&texto=Casa%20da%20Ana&fonte=script&cor=navy')).toMatchObject({
      tipo: 'bolsa',
      produto: null,
      texto: 'Casa da Ana',
      fonte: 'script',
      cor: 'navy',
    })
  })

  it('volta ao padrão quando fonte, cor ou tipo são inválidos', () => {
    expect(parse('tipo=sapato&fonte=comic-sans&cor=%23ff0000')).toMatchObject({
      tipo: null,
      fonte: 'classic',
      cor: 'ink',
    })
  })

  it('sem parâmetros, devolve tudo vazio e padrões', () => {
    expect(parse('')).toEqual({ tipo: null, produto: null, texto: '', fonte: 'classic', cor: 'ink' })
  })

  it('reconhece o produto pelo slug e deduz o tipo da categoria', () => {
    const tapete = products.find((p) => p.category === 'tapetes')!
    const bolsa = products.find((p) => p.category === 'bolsas')!

    expect(parse(`produto=${tapete.slug}`)).toMatchObject({ produto: tapete, tipo: 'tapete' })
    expect(parse(`produto=${bolsa.slug}`)).toMatchObject({ produto: bolsa, tipo: 'bolsa' })
    expect(parse('produto=nao-existe').produto).toBeNull()
  })

  it('o tipo explícito vence a dedução pela categoria', () => {
    const tapete = products.find((p) => p.category === 'tapetes')!

    expect(parse(`produto=${tapete.slug}&tipo=bolsa`).tipo).toBe('bolsa')
  })
})
