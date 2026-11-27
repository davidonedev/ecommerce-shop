import { StoreProductCard } from '@/components/ui/store-product-card'
import type { Product } from '@/types/product'

export interface ProductGridProps {
  products: Product[]
  /** Quantos cards (do começo) carregam com prioridade (os que ficam acima da dobra). */
  priorityCount?: number
  /** Nome da lista para leitores de tela. */
  label: string
  /** Mostra o seletor de quantidade (− 1 +) ao lado do botão "Comprar". */
  showQuantity?: boolean
}

/** Grade de produtos da vitrine: 4 colunas no computador, 2 no celular. */
export function ProductGrid({ products, priorityCount = 0, label, showQuantity = false }: ProductGridProps) {
  return (
    <ul aria-label={label} className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4 lg:gap-x-6">
      {products.map((product, index) => (
        <li key={product.id} className="flex">
          <StoreProductCard
            product={product}
            priority={index < priorityCount}
            showQuantity={showQuantity}
            className="w-full"
          />
        </li>
      ))}
    </ul>
  )
}
