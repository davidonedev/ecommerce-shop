'use client'

import { Heart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { formatPrice, installmentAmount } from '@/lib/utils'
import type { Product } from '@/types/product'
import { Badge } from './badge'
import { Button } from './button'
import { IconButton } from './icon-button'
import { Rating } from './rating'
import { cardClass, cx } from './variants'

export interface ProductCardProps {
  product: Product
  /** Use true nas primeiras imagens da página (acima da dobra) para carregar com prioridade. */
  priority?: boolean
  /** Nível do título do card: "h2" logo abaixo do h1 da página, "h3" dentro de uma seção com h2 (padrão). */
  headingAs?: 'h2' | 'h3'
  className?: string
}

const imageSizes = '(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 70vw'

export function ProductCard({ product, priority = false, headingAs: Heading = 'h3', className }: ProductCardProps) {
  const [favorite, setFavorite] = useState(false)
  const [main, hover] = product.images
  const href = `/produtos/${product.slug}`
  const installment = installmentAmount(product.price, product.installments)

  return (
    <article data-interactive className={cx(cardClass, 'group flex flex-col', className)}>
      <div className="relative aspect-[4/5] overflow-hidden bg-sand">
        {/* O link da foto repete o do título: fica fora da ordem do teclado e dos leitores de tela. */}
        <Link href={href} className="absolute inset-0 block" tabIndex={-1} aria-hidden>
          <Image src={main.src} alt={main.alt} fill sizes={imageSizes} priority={priority} className="object-cover" />
          {/* 2ª imagem (produto em ambiente): aparece ao passar o mouse ou focar o cartão. */}
          <Image
            src={hover.src}
            alt=""
            fill
            sizes={imageSizes}
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
          className="absolute right-2 top-2 bg-surface/90 hover:bg-surface"
        >
          <Heart aria-hidden className={cx('size-5', favorite && 'fill-accent text-accent')} />
        </IconButton>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <Heading className="font-sans text-body font-medium">
          <Link href={href} className="hover:text-accent-hover">
            {product.name}
          </Link>
        </Heading>

        <Rating value={product.rating} count={product.reviewCount} />

        <div>
          <p className="text-body">
            <span className="text-small text-ink-muted">a partir de </span>
            <span className="font-semibold">{formatPrice(product.price)}</span>
          </p>
          <p className="text-small text-ink-muted">
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
                  className="block size-5 rounded-full border border-ink-muted/40"
                  style={{ backgroundColor: swatch.hex }}
                />
              </li>
            ))}
          </ul>
        )}

        <Button asChild variant="secondary" size="sm" className="mt-auto w-full">
          <Link href={`/personalizar?produto=${product.slug}`}>Personalizar</Link>
        </Button>
      </div>
    </article>
  )
}
