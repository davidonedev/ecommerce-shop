'use client'

import Link from 'next/link'
import { useCallback, useState, type KeyboardEvent } from 'react'
import { ArchFrame, CurveOrnament, SparkleLine } from '@/components/ui/ornaments'
import { storeButtonClass } from '@/components/ui/store-button'
import { StoreArrow, StoreDots } from '@/components/ui/store-carousel-controls'
import type { ApiBanner } from '@/lib/catalog-api'
import { brand } from '@/lib/brand'

interface HeroCarouselProps {
  banners: ApiBanner[]
}

/**
 * Banner principal: fundo creme, texto à esquerda e foto numa moldura em arco à direita.
 * Banners vindos da API. Sem autoplay: o visitante escolhe o slide por setas, pontos ou teclado.
 * O primeiro slide traz o único h1 da página; os demais usam h2.
 */
export function HeroCarousel({ banners }: HeroCarouselProps) {
  const [active, setActive] = useState(0)
  const count = banners.length

  const go = useCallback((index: number) => setActive((index + count) % count), [count])

  if (count === 0) return null

  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'ArrowRight') go(active + 1)
    if (event.key === 'ArrowLeft') go(active - 1)
  }

  return (
    <section
      aria-roledescription="carrossel"
      aria-label="Destaques da loja"
      onKeyDown={onKeyDown}
      className="relative overflow-hidden bg-cream"
    >
      {banners.map((banner, index) => {
        const isActive = index === active
        const Heading = index === 0 ? 'h1' : 'h2'
        const external = banner.linkUrl?.startsWith('https://')
        const cta = banner.linkUrl && banner.ctaLabel ? banner.ctaLabel : null
        return (
          <div
            key={banner.id}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} de ${count}`}
            aria-hidden={!isActive}
            inert={!isActive}
            data-active={isActive || undefined}
            className={`${isActive ? 'relative' : 'hidden'} fade-slide`}
          >
            <div className="container-page grid items-center gap-8 py-10 md:min-h-90 md:grid-cols-2 md:py-12 lg:min-h-105">
              <div className="order-2 flex flex-col items-center gap-3 text-center md:order-1">
                <p className="text-store-eyebrow text-rose-strong">{brand.shippingLine}</p>
                <Heading className="text-store-hero max-w-md text-text">{banner.title}</Heading>
                {banner.subtitle && <p className="text-script max-w-md text-rose-strong">{banner.subtitle}</p>}
                {cta && banner.linkUrl && (
                  <div className="mt-1">
                    {external ? (
                      <a
                        href={banner.linkUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={storeButtonClass({ className: 'px-10 shadow-soft' })}
                      >
                        {cta}
                      </a>
                    ) : (
                      <Link href={banner.linkUrl} className={storeButtonClass({ className: 'px-10 shadow-soft' })}>
                        {cta}
                      </Link>
                    )}
                  </div>
                )}
                <p className="mt-4 text-store-caption text-rose-strong">{brand.instagramHandle}</p>
              </div>

              <div className="relative order-1 flex justify-center md:order-2">
                <CurveOrnament className="pointer-events-none absolute left-1/2 top-1/2 hidden size-105 translate-x-[-62%] -translate-y-1/2 md:block" />
                <ArchFrame
                  src={banner.imageUrl}
                  alt={banner.title}
                  priority={index === 0}
                  sizes="(min-width: 768px) 280px, 224px"
                  className="relative aspect-3/4 w-56 md:w-64 lg:w-72"
                />
              </div>
            </div>
          </div>
        )
      })}

      <SparkleLine className="pointer-events-none absolute bottom-6 left-0 hidden md:flex" />
      <SparkleLine className="pointer-events-none absolute bottom-6 right-0 hidden flex-row-reverse md:flex" />

      {count > 1 && (
        <>
          <StoreArrow
            direction="prev"
            onClick={() => go(active - 1)}
            className="absolute left-4 top-1/2 hidden -translate-y-1/2 md:inline-flex"
          />
          <StoreArrow
            direction="next"
            onClick={() => go(active + 1)}
            className="absolute right-4 top-1/2 hidden -translate-y-1/2 md:inline-flex"
          />
          <StoreDots
            count={count}
            active={active}
            onSelect={go}
            label="Escolher banner"
            className="absolute inset-x-0 bottom-1 md:bottom-3"
          />
        </>
      )}
    </section>
  )
}
