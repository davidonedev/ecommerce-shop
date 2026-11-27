import { describe, expect, it } from 'vitest'
import { installmentWithInterest, pixPrice } from './pricing'

describe('pixPrice', () => {
  it('aplica 5% de desconto e arredonda ao centavo', () => {
    expect(pixPrice(189.9)).toBe(180.41)
    expect(pixPrice(79.99)).toBe(75.99)
    expect(pixPrice(139.9)).toBe(132.91)
  })

  it('aceita outro percentual', () => {
    expect(pixPrice(100, 10)).toBe(90)
  })
})

describe('installmentWithInterest', () => {
  it('divide o preço com juros em 12 parcelas', () => {
    expect(installmentWithInterest(79.99)).toBe(7.56)
    expect(installmentWithInterest(139.9)).toBe(13.22)
  })

  it('nunca divide por zero', () => {
    expect(installmentWithInterest(100, 0, 1)).toBe(100)
  })
})
