import { brand } from '@/lib/brand'

/**
 * Preço à vista no Pix: preço com o desconto da loja (5%), arredondado ao centavo mais próximo.
 * Ex.: R$ 189,90 → R$ 180,41.
 */
export function pixPrice(price: number, discountPercent: number = brand.payment.pixDiscountPercent): number {
  return Math.round(price * (100 - discountPercent)) / 100
}

/**
 * Valor de cada parcela no cartão em até `installments` vezes COM juros (fator único, ver `brand.payment`).
 * Ex.: R$ 79,99 em 12x → R$ 7,56.
 */
export function installmentWithInterest(
  price: number,
  installments: number = brand.payment.maxInstallments,
  factor: number = brand.payment.installmentInterestFactor,
): number {
  return Math.round((price * factor * 100) / Math.max(1, installments)) / 100
}
