import Image from 'next/image'
import Link from 'next/link'
import { SectionHeading } from '@/components/ui/section-heading'
import { categoryHref } from '@/data/categories'
import type { ApiCategory } from '@/lib/catalog-api'

/** Quantos círculos aparecem no máximo (a loja tem 3 categorias). */
const MAX_CATEGORIES = 6

/**
 * "Navegue por Categorias": círculos com foto e o nome embaixo, vindos da API.
 * No celular a fileira rola na horizontal com encaixe (snap); no computador fica centralizada.
 */
export function CategoriesSection({ categories }: { categories: ApiCategory[] }) {
  if (categories.length === 0) return null

  return (
    <section aria-labelledby="categorias-titulo" className="section-gap container-page">
      <SectionHeading id="categorias-titulo">Navegue por Categorias</SectionHeading>
      <ul className="mt-8 flex snap-x gap-4 overflow-x-auto pb-2 [scrollbar-width:none] sm:justify-center lg:gap-10 [&::-webkit-scrollbar]:hidden">
        {categories.slice(0, MAX_CATEGORIES).map((category, index) => (
          <li key={category.id} className="shrink-0 snap-start">
            <Link
              href={categoryHref(category.slug)}
              className="group flex w-28 flex-col items-center gap-3 rounded-control sm:w-40 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rose-strong"
            >
              <span className="relative block size-28 overflow-hidden rounded-full bg-surface sm:size-40">
                {category.imageUrl && (
                  <Image
                    src={category.imageUrl}
                    alt=""
                    fill
                    unoptimized
                    priority={index < 4}
                    sizes="160px"
                    className="image-zoom object-cover"
                  />
                )}
              </span>
              <span className="text-center text-store-label text-text group-hover:text-rose-strong">
                {category.name}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
