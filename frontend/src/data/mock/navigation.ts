import { categoryHref, storeCategories } from '@/data/categories'

/**
 * Itens do menu do header e do rodapé: as 3 categorias da loja (data/categories.ts) e atalhos.
 */
export interface NavItem {
  label: string
  href: string
}

/** Categorias da loja como itens de menu. */
export const navCategories: readonly NavItem[] = storeCategories.map((category) => ({
  label: category.menuLabel,
  href: categoryHref(category.slug),
}))

/** Menu do computador: categorias + atalhos. */
export const mainNav: readonly NavItem[] = [
  ...navCategories,
  { label: 'Todos os Produtos', href: '/produtos' },
  { label: 'Personalizar', href: '/personalizar' },
]

/** Links institucionais do rodapé. ATENÇÃO: essas páginas ainda não existem (abrem a página 404 até serem criadas). */
export const institutionalLinks = [
  { label: 'Termos de serviço', href: '/termos-de-servico' },
  { label: 'Política de reembolso', href: '/politica-de-reembolso' },
  { label: 'Política de frete', href: '/politica-de-frete' },
  { label: 'Fale conosco', href: '/fale-conosco' },
] as const
