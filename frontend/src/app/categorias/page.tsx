import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { Skeleton } from '@/components/ui/skeleton'
import { categoryHref, storeCategories } from '@/data/categories'
import { getCategories } from '@/lib/catalog-api'

export const metadata: Metadata = {
  title: 'Categorias',
  description: 'Chinelos Personalizados, Bolsas Personalizadas e Tapetes.',
}

/** Todas as categorias da loja, com a foto vinda da API e o texto de apoio. */
export default function CategoriesPage() {
  return (
    <section className="container-page py-8 md:py-12">
      <Breadcrumb items={[{ label: 'Início', href: '/' }, { label: 'Categorias' }]} />
      <header className="mt-4 text-center">
        <h1 className="text-store-hero text-text">Categorias</h1>
        <span aria-hidden className="mx-auto mt-4 block h-0.75 w-10 bg-text" />
      </header>
      <Suspense fallback={<Skeleton className="mt-10 h-80" />}>
        <CategoryTiles />
      </Suspense>
    </section>
  )
}

async function CategoryTiles() {
  const apiCategories = await getCategories()
  return (
    <ul className="mt-10 grid gap-6 md:grid-cols-3">
      {storeCategories.map((category) => {
        const image = apiCategories.find((c) => c.slug === category.slug)?.imageUrl
        return (
          <li key={category.slug}>
            <Link
              href={categoryHref(category.slug)}
              className="group flex flex-col items-center gap-4 text-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rose-strong"
            >
              <span className="relative block aspect-square w-full max-w-xs overflow-hidden rounded-full bg-surface">
                {image && (
                  <Image
                    src={image}
                    alt=""
                    fill
                    unoptimized
                    sizes="(min-width: 768px) 320px, 70vw"
                    className="image-zoom object-cover"
                  />
                )}
              </span>
              <span>
                <span className="block text-store-title text-text group-hover:text-rose-strong">{category.name}</span>
                <span className="mt-1 block text-store-body text-text-muted">{category.description}</span>
              </span>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
