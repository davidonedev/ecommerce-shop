export type ProductCategory = 'chinelos' | 'bolsas' | 'tapetes' | 'presentes'

export type ProductBadge = 'customizable' | 'bestseller' | 'new' | 'ready'

export interface Swatch {
  name: string
  hex: string
}

export interface ProductImage {
  src: string
  alt: string
}

export interface Product {
  id: number
  slug: string
  name: string
  category: ProductCategory
  description: string
  /** Preço atual (ou "a partir de"), em reais. */
  price: number
  /** Preço anterior, riscado ao lado do atual. Quando maior que `price`, o card mostra o selo "-N%". */
  oldPrice?: number
  /** Número de parcelas sem juros exibido no card. */
  installments: number
  rating: number
  reviewCount: number
  badges: ProductBadge[]
  personalizable: boolean
  /** Sem estoque: a vitrine mostra o selo "Esgotado" e o link "Avise-me quando chegar". */
  soldOut?: boolean
  /** Produto em destaque (mais vendido): a vitrine mostra o selo "DESTAQUE". */
  bestSeller?: boolean
  /** [principal, em ambiente (aparece no hover)] */
  images: [ProductImage, ProductImage]
  swatches: Swatch[]
}

export interface Category {
  slug: string
  name: string
  /** Texto curto exibido no card, ex.: "24 modelos". */
  count: string
  href: string
  image: ProductImage
}

export interface Review {
  id: number
  author: string
  city: string
  product: string
  rating: number
  text: string
  avatar: ProductImage
}

export interface UgcPhoto {
  id: number
  handle: string
  image: ProductImage
}
