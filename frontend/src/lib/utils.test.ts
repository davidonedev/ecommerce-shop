import { describe, expect, it } from 'vitest'
import { cn, formatPrice, installmentAmount } from './utils'

describe('formatPrice', () => {
  it('formata em reais no padrão brasileiro, com espaço inseparável após o R$', () => {
    expect(formatPrice(189.9)).toBe('R$ 189,90')
    expect(formatPrice(1234.5)).toBe('R$ 1.234,50')
  })
})

describe('installmentAmount', () => {
  it('arredonda para baixo ao centavo, sem nunca passar do preço', () => {
    expect(installmentAmount(389.9, 6)).toBe(64.98)
    expect(installmentAmount(129.9, 4)).toBe(32.47)
    expect(installmentAmount(119.9, 3)).toBe(39.96)
    expect(installmentAmount(100, 6)).toBe(16.66)
  })

  it('divide exato quando dá', () => {
    expect(installmentAmount(120, 4)).toBe(30)
  })

  it('trata parcela inválida como pagamento à vista', () => {
    expect(installmentAmount(50, 0)).toBe(50)
  })

  it('nunca soma mais que o preço', () => {
    for (const price of [89.9, 119.9, 129.9, 149.9, 169.9, 189.9, 219.9, 259.9, 389.9]) {
      for (const n of [1, 2, 3, 4, 5, 6]) {
        expect(installmentAmount(price, n) * n).toBeLessThanOrEqual(price + 1e-9)
      }
    }
  })
})

describe('cn', () => {
  it('resolve conflitos e não confunde tamanho de fonte do design system com cor', () => {
    expect(cn('text-body', 'text-ink')).toBe('text-body text-ink')
    expect(cn('text-h1', 'text-h2')).toBe('text-h2')
    expect(cn('p-2', 'p-4')).toBe('p-4')
  })
})
