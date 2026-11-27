import Link from 'next/link'
import { Suspense } from 'react'
import { BenefitsStrip } from '@/components/home/benefits-strip'
import { CategoriesSection } from '@/components/home/categories-section'
import { CategoryShowcase } from '@/components/home/category-showcase'
import { CollectionBanners } from '@/components/home/collection-banners'
import { HeroCarousel } from '@/components/home/hero-carousel'
import { Reviews } from '@/components/home/reviews'
import { VideoReels } from '@/components/home/video-reels'
import { storeButtonClass } from '@/components/ui/store-button'
import { reviews } from '@/data/mock/reviews'
import { brand } from '@/lib/brand'
import { getBanners, getCategories, getProducts, toProduct } from '@/lib/catalog-api'

/** Quantos produtos cada categoria mostra na home. */
const PRODUCTS_PER_CATEGORY = 4

/**
 * Vitrine da loja: banner principal, benefícios, atalho das categorias e UM RESUMO POR CATEGORIA
 * (4 produtos cada, com link para a página da categoria), depois coleções, vídeos e avaliações.
 * Banners, categorias e produtos vêm da API; se ela estiver fora do ar, a página mostra só o texto de
 * apresentação. Os dados são lidos dentro de Suspense para a casca da página poder ser pré-renderizada.
 */
export default function HomePage() {
  return (
    <Suspense fallback={<div aria-busy="true" className="container-page min-h-[60vh]" />}>
      <HomeContent />
    </Suspense>
  )
}

async function HomeContent() {
  const [banners, categories] = await Promise.all([getBanners(), getCategories()])
  // A API já devolve as categorias na ordem da loja (campo position); uma busca por categoria, em paralelo.
  const showcases = await Promise.all(
    categories.map(async (category) => ({
      category,
      products: (await getProducts({ category: category.slug, size: PRODUCTS_PER_CATEGORY })).items.map(toProduct),
    })),
  )
  const hasBanners = banners.length > 0

  return (
    <>
      {hasBanners ? (
        <HeroCarousel banners={banners} />
      ) : (
        <section className="bg-cream">
          <div className="container-page flex flex-col items-center gap-4 py-16 text-center md:py-24">
            <p className="text-store-eyebrow text-rose-strong">{brand.shippingLine}</p>
            <h1 className="text-store-hero max-w-2xl text-text">Feito para você, do seu jeito.</h1>
            <p className="text-script text-rose-strong">personalize do seu jeito</p>
            <Link href="/personalizar" className={storeButtonClass({ className: 'mt-2 px-10 shadow-soft' })}>
              Personalizar agora
            </Link>
          </div>
        </section>
      )}

      <BenefitsStrip />
      <CategoriesSection categories={categories} />

      {showcases.map(({ category, products }, index) => (
        <CategoryShowcase
          key={category.id}
          slug={category.slug}
          name={category.name}
          products={products}
          priority={index === 0}
        />
      ))}

      <CollectionBanners />
      <VideoReels />
      <Reviews reviews={reviews} />
    </>
  )
}
