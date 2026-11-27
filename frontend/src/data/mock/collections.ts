import { categoryHref } from '@/data/categories'

/**
 * Banners duplos de coleção da home (conteúdo de exemplo até a loja definir as coleções reais).
 * As imagens são fotos de exemplo em /public/mock (ver CREDITS.md); troque por fotos próprias.
 */
export interface CollectionBanner {
  id: string
  /** Linha cinza acima do nome. */
  eyebrow: string
  /** Nome da coleção, em rosé. */
  name: string
  href: string
  image: { src: string; alt: string }
}

export const collectionBanners: CollectionBanner[] = [
  {
    id: 'chinelos-com-nome',
    eyebrow: 'Peças Exclusivas',
    name: 'Chinelos com Nome',
    href: categoryHref('chinelos-personalizados'),
    image: { src: '/mock/produtos/chinelo-pompons.jpg', alt: 'Rasteirinha personalizada com pompons coloridos' },
  },
  {
    id: 'bolsas-com-iniciais',
    eyebrow: 'Peças Exclusivas',
    name: 'Bolsas com Iniciais',
    href: categoryHref('bolsas-personalizadas'),
    image: { src: '/mock/produtos/bolsa-palha.jpg', alt: 'Bolsa de palha laranja com alça de mão' },
  },
]
