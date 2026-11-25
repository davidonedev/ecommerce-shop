import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { ProductGrid } from '@/components/catalog/product-grid'
import { SortLinks } from '@/components/catalog/sort-links'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { Skeleton } from '@/components/ui/skeleton'
import { storeButtonClass } from '@/components/ui/store-button'
import { categoryHref, getStoreCategory, storeCategories } from '@/data/categories'
import { getProducts, isProductSort, toProduct, type ProductSort } from '@/lib/catalog-api'

export function generateStaticParams() {
  return storeCategories.map((category) => ({ slug: category.slug }))
}

export async function generateMetadata({ params }: PageProps<'/categorias/[slug]'>): Promise<Metadata> {
  const { slug } = await params
  const category = getStoreCategory(slug)
  return category ? { title: category.name, description: category.description } : {}
}

/** Página de uma categoria: trilha, título, ordenação e todos os produtos dela. Produtos vêm da API. */
export default function CategoryPage({ params, searchParams }: PageProps<'/categorias/[slug]'>) {
  return (
    <Suspense fallback={<Skeleton className="container-page my-10 h-96" />}>
      <CategoryContent params={params} searchParams={searchParams} />
    </Suspense>
  )
}

async function CategoryContent({
  params,
  searchParams,
}: Pick<PageProps<'/categorias/[slug]'>, 'params' | 'searchParams'>) {
  const { slug } = await params
  const category = getStoreCategory(slug)
  if (!category) notFound()

  const { ordenar } = await searchParams
  const sortParam = typeof ordenar === 'string' ? ordenar : undefined
  const sort: ProductSort = isProductSort(sortParam) ? sortParam : 'relevance'
  const { items, totalItems } = await getProducts({ category: category.slug, sort, size: 48 })
  const products = items.map(toProduct)

  return (
    <section className="container-page py-8 md:py-12">
      <Breadcrumb items={[{ label: 'Início', href: '/' }, { label: category.name }]} />

      <header className="mt-4 text-center">
        <h1 className="text-store-hero text-text">{category.name}</h1>
        <p className="mx-auto mt-2 max-w-xl text-store-body text-text-muted">{category.description}</p>
        <span aria-hidden className="mx-auto mt-4 block h-0.75 w-10 bg-text" />
      </header>

      {products.length > 0 ? (
        <>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-store-caption text-text-muted" role="status">
              {totalItems === 1 ? '1 produto' : `${totalItems} produtos`}
            </p>
            <SortLinks basePath={categoryHref(category.slug)} current={sort} />
          </div>
          <div className="mt-6">
            <ProductGrid products={products} label={category.name} priorityCount={4} showQuantity />
          </div>
        </>
      ) : (
        <div className="mx-auto mt-12 max-w-md text-center">
          <p className="text-store-body text-text-muted">Ainda não há produtos nesta categoria.</p>
          <Link href="/produtos" className={storeButtonClass({ className: 'mt-4 px-8' })}>
            Ver todos os produtos
          </Link>
        </div>
      )}
    </section>
  )
}
