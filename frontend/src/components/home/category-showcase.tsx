import Link from 'next/link'
import { ProductGrid } from '@/components/catalog/product-grid'
import { SectionHeading } from '@/components/ui/section-heading'
import { storeButtonClass } from '@/components/ui/store-button'
import { categoryHref } from '@/data/categories'
import type { Product } from '@/types/product'

export interface CategoryShowcaseProps {
  /** Slug da categoria (para o link "Ver todos"). */
  slug: string
  name: string
  /** Os produtos da categoria (a home passa 4). */
  products: Product[]
  /** Use true na primeira seção da página para carregar as fotos com prioridade. */
  priority?: boolean
}

/**
 * Resumo de uma categoria na home: título, 4 produtos e o botão que leva à página da categoria.
 * Não renderiza nada se a categoria não tem produtos.
 */
export function CategoryShowcase({ slug, name, products, priority = false }: CategoryShowcaseProps) {
  if (products.length === 0) return null
  const headingId = `categoria-${slug}-titulo`

  return (
    <section aria-labelledby={headingId} className="section-gap container-page">
      <SectionHeading id={headingId}>{name}</SectionHeading>
      <div className="mt-8">
        <ProductGrid products={products} label={name} priorityCount={priority ? 4 : 0} />
      </div>
      <div className="mt-8 flex justify-center">
        <Link href={categoryHref(slug)} className={storeButtonClass({ tone: 'outline', className: 'px-8' })}>
          Ver todos
          <span className="sr-only"> os produtos de {name}</span>
        </Link>
      </div>
    </section>
  )
}
