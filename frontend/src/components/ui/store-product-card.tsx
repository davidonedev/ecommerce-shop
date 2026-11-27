'use client'

import { ChevronRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { brand, whatsappLink } from '@/lib/brand'
import { installmentWithInterest, pixPrice } from '@/lib/pricing'
import { formatPrice } from '@/lib/utils'
import { useCartStore } from '@/store/cartStore'
import type { Product } from '@/types/product'
import { QuantityStepper } from './quantity-stepper'
import { storeButtonClass } from './store-button'
import { useOptionalToast } from './toast'
import { cx } from './variants'

export interface StoreProductCardProps {
  product: Product
  /** Mostra os selos LANÇAMENTO e DESTAQUE no canto da foto (seção "Recomendados"). */
  showBadges?: boolean
  /** Mostra o seletor de quantidade (− 1 +) ao lado do botão "Comprar". */
  showQuantity?: boolean
  /** Use true nas primeiras imagens da página (acima da dobra). */
  priority?: boolean
  /** Nível do título do card: "h3" dentro de uma seção com h2 (padrão). */
  headingAs?: 'h2' | 'h3'
  className?: string
}

const sizes = '(min-width: 1024px) 25vw, 50vw'
const badgeClass = 'rounded-full bg-rose-strong px-2.5 py-1 text-store-badge text-on-dark uppercase'

/**
 * Card da vitrine: foto vertical 3:4 sem borda, nome e preço centralizados, preço à vista no Pix,
 * parcelamento "com juros" e botão pílula. Esgotado troca o botão por "Avise-me quando chegar".
 */
export function StoreProductCard({
  product,
  showBadges = false,
  showQuantity = false,
  priority = false,
  headingAs: Heading = 'h3',
  className,
}: StoreProductCardProps) {
  const addItem = useCartStore((s) => s.addItem)
  const toast = useOptionalToast()
  const [quantity, setQuantity] = useState(1)
  const [main] = product.images
  const href = `/produtos/${product.slug}`
  const soldOut = product.soldOut === true
  const { maxInstallments } = brand.payment

  const handleBuy = () => {
    addItem(product, quantity)
    toast?.({
      title: 'Adicionado ao carrinho',
      description: quantity > 1 ? `${quantity} × ${product.name}` : product.name,
      tone: 'success',
    })
    setQuantity(1)
  }

  return (
    <article className={cx('group flex flex-col', className)}>
      <div className="relative aspect-3/4 overflow-hidden bg-surface">
        {/* O link da foto repete o do título: fica fora da ordem do teclado e dos leitores de tela. */}
        <Link href={href} className="absolute inset-0 block" tabIndex={-1} aria-hidden>
          <Image
            src={main.src}
            alt={main.alt}
            fill
            unoptimized
            priority={priority}
            sizes={sizes}
            className="image-zoom object-cover"
          />
        </Link>
        {showBadges && !soldOut && (product.badges.includes('new') || product.bestSeller) && (
          <div className="pointer-events-none absolute left-2 top-2 flex flex-col items-start gap-1.5">
            {product.badges.includes('new') && <span className={badgeClass}>Lançamento</span>}
            {product.bestSeller && <span className={badgeClass}>Destaque</span>}
          </div>
        )}
        {soldOut && (
          <span className="absolute right-2 top-2 rounded-control bg-soldout px-2.5 py-1 text-store-badge text-on-dark">
            Esgotado
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col items-center gap-3 pt-4 text-center">
        <Heading className="text-store-product min-h-[2.8em] text-text">
          <Link href={href} className="hover:text-rose-strong hover:underline hover:underline-offset-4">
            {product.name}
          </Link>
        </Heading>

        {soldOut ? (
          <div className="mt-auto flex flex-col items-center gap-1 pb-1">
            <p className="text-store-body text-text">Esgotado :(</p>
            <a
              href={whatsappLink(`Olá! Avise-me quando "${product.name}" chegar.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-1 rounded-control text-store-price-note text-text hover:underline hover:underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-strong"
            >
              Avise-me quando chegar
              <ChevronRight aria-hidden strokeWidth={1.5} className="size-3.5" />
              <span className="sr-only"> ({product.name}, pelo WhatsApp)</span>
            </a>
          </div>
        ) : (
          <>
            <div className="flex flex-col items-center gap-0.5">
              <p className="flex items-baseline gap-2">
                <span className="sr-only">Preço: </span>
                <span className="text-store-price text-rose-strong">{formatPrice(product.price)}</span>
                {product.oldPrice !== undefined && product.oldPrice > product.price && (
                  <>
                    <span className="sr-only">Preço anterior: </span>
                    <s className="text-store-price-note text-text-muted">{formatPrice(product.oldPrice)}</s>
                  </>
                )}
              </p>
              <p className="text-store-price-note text-text">
                <strong className="font-bold">{formatPrice(pixPrice(product.price))}</strong> à vista
              </p>
              <p className="text-store-price-note text-text">
                ou <span className="text-rose-strong">{maxInstallments}x</span> de{' '}
                <span className="text-rose-strong">
                  {formatPrice(installmentWithInterest(product.price))}
                </span>{' '}
                com juros
              </p>
            </div>

            <div className="mt-auto flex w-full items-center gap-2">
              {product.personalizable ? (
                <Link href={`/personalizar?produto=${product.slug}`} className={storeButtonClass({ full: true })}>
                  Personalizar
                  <span className="sr-only">: {product.name}</span>
                </Link>
              ) : (
                <>
                  {showQuantity && (
                    <QuantityStepper value={quantity} onChange={setQuantity} label={product.name} />
                  )}
                  <button type="button" onClick={handleBuy} className={storeButtonClass({ full: true })}>
                    Comprar
                    <span className="sr-only">: {product.name}</span>
                  </button>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </article>
  )
}
