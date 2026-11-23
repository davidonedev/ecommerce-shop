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
  address: 'Rua Exemplo, 123 · São Paulo, SP · 00000-000',
  hashtag: '#MeuNomeNoTapete',
  social: {
    instagram: 'https://instagram.com/',
    tiktok: 'https://tiktok.com/',
    pinterest: 'https://pinterest.com/',
  },
} as const

export function whatsappLink(message?: string) {
  const text = message ? `?text=${encodeURIComponent(message)}` : ''
  return `https://wa.me/${brand.whatsapp}${text}`
}
