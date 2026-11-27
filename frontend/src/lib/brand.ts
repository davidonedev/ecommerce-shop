/**
 * Dados da marca em um só lugar. Troque aqui para atualizar o site inteiro.
 * Tudo abaixo é placeholder até a loja ter os dados reais.
 */
export const brand = {
  name: '[NOME DA LOJA]',
  tagline: 'Feito para você, com cuidado de ateliê',
  description: 'Tapetes e bolsas personalizados, produzidos um a um e entregues em todo o Brasil.',
  whatsapp: '5511999999999',
  whatsappDisplay: '(11) 99999-9999',
  email: 'contato@exemplo.com.br',
  hours: 'Segunda a sexta, das 9h às 18h',
  cnpj: '00.000.000/0001-00',
  /** Ano do copyright no rodapé (fixo de propósito: ler a data atual impediria o pré-render da página). */
  copyrightYear: 2026,
  address: 'Rua Exemplo, 123 · São Paulo, SP · 00000-000',
  hashtag: '#MeuNomeNoTapete',
  instagramHandle: '@sualoja',
  shippingLine: 'Enviamos para todo o Brasil',
  /** Frete grátis a partir deste valor (placeholder até a loja definir a regra). */
  freeShippingFrom: 299,
  /**
   * Condições de pagamento exibidas na vitrine (placeholders até o gateway de pagamento estar definido).
   * O fator dos juros é uma estimativa: 12x de 1,134 sobre o preço.
   */
  payment: { pixDiscountPercent: 5, maxInstallments: 12, installmentInterestFactor: 1.134 },
  social: {
    instagram: 'https://instagram.com/',
    youtube: 'https://youtube.com/',
    tiktok: 'https://tiktok.com/',
    pinterest: 'https://pinterest.com/',
  },
} as const

export function whatsappLink(message?: string) {
  const text = message ? `?text=${encodeURIComponent(message)}` : ''
  return `https://wa.me/${brand.whatsapp}${text}`
}
