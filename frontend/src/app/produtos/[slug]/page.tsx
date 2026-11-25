import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { AddToCartButton } from '@/components/add-to-cart-button'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Rating } from '@/components/ui/rating'
import { getProductBySlug, products } from '@/data/mock/products'
import { formatPrice, installmentAmount } from '@/lib/utils'

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }))
}

export async function generateMetadata({ params }: PageProps<'/produtos/[slug]'>): Promise<Metadata> {
  const { slug } = await params
  const product = getProductBySlug(slug)
  return product ? { title: product.name, description: product.description } : {}
}

export default async function ProductDetailPage({ params }: PageProps<'/produtos/[slug]'>) {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) notFound()

  const [main, ambient] = product.images

  return (
    <section className="container-page grid gap-8 py-10 md:grid-cols-2 md:gap-12 md:py-14">
      <div className="grid gap-4">
        <div className="relative aspect-[4/5] overflow-hidden rounded-md bg-sand">
          <Image
            src={main.src}
            alt={main.alt}
            fill
            priority
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="relative aspect-[16/10] overflow-hidden rounded-md bg-sand">
          <Image
            src={ambient.src}
            alt={ambient.alt}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>

      <div className="flex flex-col gap-5 md:py-4">
        <div className="flex flex-wrap gap-2">
          {product.badges.map((tone) => (
            <Badge key={tone} tone={tone} />
          ))}
        </div>
        <h1 className="text-h1">{product.name}</h1>
        <Rating value={product.rating} count={product.reviewCount} />
        <p className="text-body text-ink-muted">{product.description}</p>
        <div>
          <p className="text-h3 font-display">
            <span className="text-small font-sans font-normal text-ink-muted">a partir de </span>
            {formatPrice(product.price)}
          </p>
          <p className="text-small text-ink-muted">
            ou {product.installments}x de {formatPrice(installmentAmount(product.price, product.installments))} sem
            juros
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button asChild variant="accent" size="lg">
            <Link href={`/personalizar?produto=${product.slug}`}>Personalizar</Link>
          </Button>
          <AddToCartButton product={product} />
        </div>
      </div>
    </section>
  )
}
