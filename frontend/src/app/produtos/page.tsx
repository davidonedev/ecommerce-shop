import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'
import { ProductGrid } from '@/components/catalog/product-grid'
import { SortLinks } from '@/components/catalog/sort-links'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { Skeleton } from '@/components/ui/skeleton'
import { storeButtonClass } from '@/components/ui/store-button'
import { categoryHref, storeCategories } from '@/data/categories'
import { getProducts, isProductSort, toProduct, type ProductSort } from '@/lib/catalog-api'

export const metadata: Metadata = {
  title: 'Todos os produtos',
  description: 'Chinelos, bolsas e tapetes personalizados.',
}

/**
 * Todos os produtos da loja (e o resultado da busca do topo: /produtos?q=...).
 * Endereços antigos com `?category=` levam para a página da categoria.
 */
export default function ProductListPage({ searchParams }: PageProps<'/produtos'>) {
  return (
    <section className="container-page py-8 md:py-12">
      <Breadcrumb items={[{ label: 'Início', href: '/' }, { label: 'Todos os produtos' }]} />
      <Suspense fallback={<Skeleton className="mt-8 h-96" />}>
        <ProductListContent searchParams={searchParams} />
      </Suspense>
    </section>
  )
}

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value
}

async function ProductListContent({ searchParams }: Pick<PageProps<'/produtos'>, 'searchParams'>) {
  const params = await searchParams
  const category = first(params.category)
  if (category) redirect(categoryHref(category))

  const q = first(params.q)?.trim() || undefined
  const sortParam = first(params.ordenar)
  const sort: ProductSort = isProductSort(sortParam) ? sortParam : 'relevance'
  const { items, totalItems } = await getProducts({ q, sort, size: 48 })
  const products = items.map(toProduct)

  return (
    <>
      <header className="mt-4 text-center">
        <h1 className="text-store-hero text-text">{q ? `Resultados para "${q}"` : 'Todos os produtos'}</h1>
        <span aria-hidden className="mx-auto mt-4 block h-0.75 w-10 bg-text" />
      </header>

      <nav aria-label="Categorias" className="mt-6">
        <ul className="flex flex-wrap justify-center gap-2">
          {storeCategories.map((category) => (
            <li key={category.slug}>
              <Link
                href={categoryHref(category.slug)}
                className="inline-flex min-h-9 items-center rounded-full border border-field-border bg-bg px-4 text-store-caption text-text hover:border-rose-strong hover:text-rose-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-strong"
              >
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {products.length > 0 ? (
        <>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-store-caption text-text-muted" role="status">
              {totalItems === 1 ? '1 produto' : `${totalItems} produtos`}
            </p>
            <SortLinks basePath="/produtos" current={sort} keep={{ q }} />
          </div>
          <div className="mt-6">
            <ProductGrid products={products} label="Produtos" priorityCount={4} showQuantity />
          </div>
        </>
      ) : (
        <div className="mx-auto mt-12 max-w-md text-center">
          <p className="text-store-body text-text-muted">
            {q ? 'Não encontramos produtos para essa busca.' : 'Ainda não há produtos cadastrados.'}
          </p>
          {q && (
            <Link href="/produtos" className={storeButtonClass({ className: 'mt-4 px-8' })}>
              Ver todos os produtos
            </Link>
          )}
        </div>
      )}
    </>
  )
}
