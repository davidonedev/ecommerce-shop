'use client'

import { Heart, Palette, ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { formatPrice, installmentAmount } from '@/lib/utils'
import { useCartStore } from '@/store/cartStore'
import type { Product } from '@/types/product'
import { Badge } from './badge'
import { Button } from './button'
import { IconButton } from './icon-button'
import { Rating } from './rating'
import { useOptionalToast } from './toast'
import { cardClass, cx } from './variants'

export interface ProductCardProps {
  product: Product
  /**
   * "shop" (vitrine da home, 5 por linha): selo -N%, nome, estrelas, preço + preço riscado e botão de largura total.
   * "detailed" (padrão, usado em /produtos): foto 4:5 com troca no hover, favoritar, parcelas e cores.
   */
  variant?: 'shop' | 'detailed'
  /** Só na variante "shop": ação do botão "ADICIONAR AO CARRINHO". Sem ela, o card adiciona ao carrinho e avisa. */
  onAddToCart?: (product: Product) => void
  /** Use true nas primeiras imagens da página (acima da dobra) para carregar com prioridade. */
  priority?: boolean
  /** Nível do título do card: "h2" logo abaixo do h1 da página, "h3" dentro de uma seção com h2 (padrão). */
  headingAs?: 'h2' | 'h3'
  className?: string
}

const detailedSizes = '(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 70vw'
const shopSizes = '(min-width: 1024px) 20vw, 45vw'

/** Percentual de desconto inteiro ("20" para 20%) quando há preço anterior maior que o atual; senão 0. */
export function discountPercent(price: number, oldPrice?: number): number {
  if (!oldPrice || oldPrice <= price) return 0
  return Math.round((1 - price / oldPrice) * 100)
}

export function ProductCard({
  product,
  variant = 'detailed',
  onAddToCart,
  priority = false,
  headingAs: Heading = 'h3',
  className,
}: ProductCardProps) {
  return variant === 'shop' ? (
    <ShopCard product={product} onAddToCart={onAddToCart} priority={priority} Heading={Heading} className={className} />
  ) : (
    <DetailedCard product={product} priority={priority} Heading={Heading} className={className} />
  )
}

type InnerProps = {
  product: Product
  priority: boolean
  Heading: 'h2' | 'h3'
  className?: string
}

function ShopCard({
  product,
  onAddToCart,
  priority,
  Heading,
  className,
}: InnerProps & Pick<ProductCardProps, 'onAddToCart'>) {
  const addItem = useCartStore((s) => s.addItem)
  const toast = useOptionalToast()
  const [main] = product.images
  const href = `/produtos/${product.slug}`
  const percent = discountPercent(product.price, product.oldPrice)
  const showCustomizable = product.badges.includes('customizable')

  const handleAdd = () => {
    if (onAddToCart) {
      onAddToCart(product)
      return
    }
    addItem(product)
    toast?.({ title: 'Adicionado ao carrinho', description: product.name, tone: 'success' })
  }

  return (
    <article data-interactive className={cx(cardClass, 'group flex flex-col', className)}>
      <div className="relative aspect-square overflow-hidden bg-surface">
        {/* O link da foto repete o do título: fica fora da ordem do teclado e dos leitores de tela. */}
        <Link href={href} className="absolute inset-0 block" tabIndex={-1} aria-hidden>
          <Image
            src={main.src}
            alt={main.alt}
            fill
            sizes={shopSizes}
            priority={priority}
            className="image-zoom object-cover"
          />
        </Link>
        {showCustomizable && <Badge tone="customizable" className="absolute left-2 top-2" />}
        {percent > 0 && (
          <Badge tone="discount" className="absolute right-2 top-2">
            -{percent}%<span className="sr-only"> de desconto</span>
          </Badge>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-3">
        <Heading className="text-product-name text-text">
          <Link href={href} className="hover:text-navy-hover hover:underline hover:underline-offset-4">
            {product.name}
          </Link>
        </Heading>

        <Rating value={product.rating} count={product.reviewCount} />

        <p className="flex flex-wrap items-baseline gap-x-2">
          <span className="sr-only">Preço atual: </span>
          <span className="text-price text-text">{formatPrice(product.price)}</span>
          {percent > 0 && product.oldPrice !== undefined && (
            <>
              <span className="sr-only">Preço anterior: </span>
              {/* text-subtle (2,5:1) só é aceitável aqui: é decoração, o preço anterior também sai em texto para leitores de tela. */}
              <s className="text-small text-text-subtle">{formatPrice(product.oldPrice)}</s>
            </>
          )}
        </p>

        {product.personalizable ? (
          <Button asChild variant="cart" className="mt-auto">
            <Link href={`/personalizar?produto=${product.slug}`}>
              <Palette aria-hidden strokeWidth={1.5} className="size-4 shrink-0" />
              Personalizar
              <span className="sr-only">: {product.name}</span>
            </Link>
          </Button>
        ) : (
          <Button variant="cart" className="mt-auto" onClick={handleAdd}>
            <ShoppingCart aria-hidden strokeWidth={1.5} className="size-4 shrink-0" />
            Adicionar ao carrinho
            <span className="sr-only">: {product.name}</span>
          </Button>
        )}
      </div>
    </article>
  )
}

function DetailedCard({ product, priority, Heading, className }: InnerProps) {
  const [favorite, setFavorite] = useState(false)
  const [main, hover] = product.images
  const href = `/produtos/${product.slug}`
  const installment = installmentAmount(product.price, product.installments)

  return (
    <article data-interactive className={cx(cardClass, 'group flex flex-col', className)}>
      <div className="relative aspect-[4/5] overflow-hidden bg-surface">
        {/* O link da foto repete o do título: fica fora da ordem do teclado e dos leitores de tela. */}
        <Link href={href} className="absolute inset-0 block" tabIndex={-1} aria-hidden>
          <Image
            src={main.src}
            alt={main.alt}
            fill
            sizes={detailedSizes}
            priority={priority}
            className="object-cover"
          />
          {/* 2ª imagem (produto em ambiente): aparece ao passar o mouse ou focar o cartão. */}
          <Image
            src={hover.src}
            alt=""
            fill
            sizes={detailedSizes}
            className="object-cover opacity-0 transition-opacity duration-(--duration-slow) ease-soft group-hover:opacity-100 group-focus-within:opacity-100 motion-reduce:transition-none"
          />
        </Link>

        {product.badges.length > 0 && (
          // right-16 reserva o espaço do botão de favoritar (44px + margem): os selos quebram de linha em vez de ficar por baixo dele.
          <div className="pointer-events-none absolute left-3 right-16 top-3 flex flex-wrap gap-1.5">
            {product.badges.map((tone) => (
              <Badge key={tone} tone={tone} />
            ))}
          </div>
        )}

        <IconButton
          label={favorite ? `Remover ${product.name} dos favoritos` : `Favoritar ${product.name}`}
          size="sm"
          pressed={favorite}
          onClick={() => setFavorite((v) => !v)}
          className="absolute right-2 top-2 bg-bg/90 hover:bg-bg"
        >
          <Heart aria-hidden strokeWidth={1.5} className={cx('size-5', favorite && 'fill-navy text-navy')} />
        </IconButton>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <Heading className="text-product-name text-text">
          <Link href={href} className="hover:text-navy-hover hover:underline hover:underline-offset-4">
            {product.name}
          </Link>
        </Heading>

        <Rating value={product.rating} count={product.reviewCount} />

        <div>
          <p>
            <span className="text-small text-text-muted">a partir de </span>
            <span className="text-price text-text">{formatPrice(product.price)}</span>
          </p>
          <p className="text-small text-text-muted">
            ou {product.installments}x de {formatPrice(installment)}
          </p>
        </div>

        {product.swatches.length > 0 && (
          <ul className="flex items-center gap-2" aria-label="Cores disponíveis">
            {product.swatches.map((swatch) => (
              <li key={swatch.name}>
                <span
                  role="img"
                  aria-label={swatch.name}
                  title={swatch.name}
                  className="block size-5 rounded-full border border-field-border/40"
                  style={{ backgroundColor: swatch.hex }}
                />
              </li>
            ))}
          </ul>
        )}

        <Button asChild variant="outline" size="sm" className="mt-auto w-full">
          <Link href={`/personalizar?produto=${product.slug}`}>Personalizar</Link>
        </Button>
      </div>
    </article>
  )
}
