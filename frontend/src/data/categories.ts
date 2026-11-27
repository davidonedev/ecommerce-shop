/**
 * As 3 categorias da loja, na ordem em que aparecem no menu e na home.
 * Os slugs precisam ser os mesmos do catálogo da API (/api/categories). Para criar, renomear ou remover
 * uma categoria: ajuste aqui e no cadastro do catálogo (o painel administrativo ou o seed do backend).
 */
export interface StoreCategory {
  slug: string
  /** Nome completo, usado nos títulos. */
  name: string
  /** Nome curto do menu do computador. */
  menuLabel: string
  /** Texto de apoio no topo da página da categoria. */
  description: string
}

export const storeCategories: readonly StoreCategory[] = [
  {
    slug: 'chinelos-personalizados',
    name: 'Chinelos Personalizados',
    menuLabel: 'Chinelos Personalizados',
    description: 'Chinelos e rasteirinhas com o seu nome, estampa ou cor favorita.',
  },
  {
    slug: 'bolsas-personalizadas',
    name: 'Bolsas Personalizadas',
    menuLabel: 'Bolsas Personalizadas',
    description: 'Bolsas, totes e necessaires com as suas iniciais, feitos um a um.',
  },
  {
    slug: 'tapetes',
    name: 'Tapetes',
    menuLabel: 'Tapetes',
    description: 'Tapetes e capachos com o nome da família, do pet ou da criança.',
  },
]

export function getStoreCategory(slug: string): StoreCategory | undefined {
  return storeCategories.find((category) => category.slug === slug)
}

/** Endereço da página de uma categoria. */
export function categoryHref(slug: string): string {
  return `/categorias/${slug}`
}
