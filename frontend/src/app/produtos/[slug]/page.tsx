import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { ProductPurchase } from '@/components/catalog/product-purchase'
import { Breadcrumb, type BreadcrumbItem } from '@/components/ui/breadcrumb'
import { Rating } from '@/components/ui/rating'
import { Skeleton } from '@/components/ui/skeleton'
import { categoryHref } from '@/data/categories'
import { brand } from '@/lib/brand'
import { getProduct, toProduct } from '@/lib/catalog-api'
import { installmentWithInterest, pixPrice } from '@/lib/pricing'
import { formatPrice } from '@/lib/utils'

/** Página de um produto, lido da API pelo slug. Slug que não existe abre a página 404. */
export default function ProductDetailPage({ params }: PageProps<'/produtos/[slug]'>) {
  return (
    <Suspense fallback={<Skeleton className="container-page my-10 h-96" />}>
      <ProductDetailContent params={params} />
    </Suspense>
  )
}

async function ProductDetailContent({ params }: Pick<PageProps<'/produtos/[slug]'>, 'params'>) {
  const { slug } = await params
  const api = await getProduct(slug)
  if (!api) notFound()

  const product = toProduct(api)
  const [main, ambient] = product.images
  const crumbs: BreadcrumbItem[] = [{ label: 'Início', href: '/' }]
  if (api.categoryName && api.categorySlug) crumbs.push({ label: api.categoryName, href: categoryHref(api.categorySlug) })
  crumbs.push({ label: product.name })

  return (
    <section className="container-page py-8 md:py-12">
      <title>{`${product.name} | ${brand.name}`}</title>
      <Breadcrumb items={crumbs} />

      <div className="mt-6 grid gap-8 md:grid-cols-2 md:gap-12">
        <div className="grid gap-4">
          <div className="relative aspect-3/4 overflow-hidden bg-surface">
            <Image
              src={main.src}
              alt={main.alt}
              fill
              unoptimized
              priority
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          {ambient.src !== main.src && (
            <div className="relative aspect-16/10 overflow-hidden bg-surface">
              <Image
                src={ambient.src}
                alt={ambient.alt}
                fill
                unoptimized
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          )}
        </div>

        <div className="flex flex-col gap-5 md:py-4">
          <h1 className="text-store-hero text-text">{product.name}</h1>
          <Rating value={product.rating} count={product.reviewCount} showValue />
          {product.description && <p className="text-store-body text-text-muted">{product.description}</p>}

          <div className="flex flex-col gap-1">
            <p className="flex items-baseline gap-3">
              <span className="sr-only">Preço: </span>
              <span className="text-store-title text-rose-strong">{formatPrice(product.price)}</span>
              {product.oldPrice !== undefined && product.oldPrice > product.price && (
                <>
                  <span className="sr-only">Preço anterior: </span>
                  <s className="text-store-body text-text-muted">{formatPrice(product.oldPrice)}</s>
                </>
              )}
            </p>
            <p className="text-store-body text-text">
              <strong className="font-bold">{formatPrice(pixPrice(product.price))}</strong> à vista no Pix
            </p>
            <p className="text-store-body text-text">
              ou <span className="text-rose-strong">{brand.payment.maxInstallments}x</span> de{' '}
              <span className="text-rose-strong">{formatPrice(installmentWithInterest(product.price))}</span> com juros
            </p>
          </div>

          <ProductPurchase product={product} />
        </div>
      </div>
    </section>
  )
}
