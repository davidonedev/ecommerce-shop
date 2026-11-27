'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { Rating } from '@/components/ui/rating'
import { SectionHeading } from '@/components/ui/section-heading'
import { StoreArrow } from '@/components/ui/store-carousel-controls'
import type { Review } from '@/types/product'

/**
 * "Avaliações dos Clientes": cards brancos de borda fina (nome, 5 estrelas, "Compra verificada" e texto)
 * num carrossel com encaixe (snap). Sem autoplay; setas laterais e rolagem pelo teclado (a faixa recebe foco).
 */
export function Reviews({ reviews }: { reviews: Review[] }) {
  const track = useRef<HTMLDivElement>(null)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

  const update = useCallback(() => {
    const el = track.current
    if (!el) return
    setAtStart(el.scrollLeft <= 1)
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 1)
  }, [])

  useEffect(() => {
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [update])

  const scroll = (direction: 1 | -1) => {
    const el = track.current
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollBy({ left: direction * el.clientWidth, behavior: reduce ? 'auto' : 'smooth' })
  }

  if (reviews.length === 0) return null

  return (
    <section
      aria-roledescription="carrossel"
      aria-labelledby="avaliacoes-titulo"
      className="section-gap container-page"
    >
      <SectionHeading id="avaliacoes-titulo">Avaliações dos Clientes</SectionHeading>

      <div className="relative mt-8">
        <div
          ref={track}
          tabIndex={0}
          role="group"
          aria-label="Avaliações"
          onScroll={update}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto rounded-control pb-1 [scrollbar-width:none] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rose-strong [&::-webkit-scrollbar]:hidden"
        >
          {reviews.map((review) => (
            <article
              key={review.id}
              className="flex min-h-40 shrink-0 basis-full snap-start flex-col gap-1.5 rounded-control border border-border bg-bg p-5 sm:basis-[calc((100%-1rem)/2)] lg:basis-[calc((100%-2rem)/3)]"
            >
              <header className="flex flex-wrap items-center gap-2">
                <h3 className="text-store-nav text-text">{review.author}</h3>
                <Rating value={review.rating} />
              </header>
              <p className="text-store-label text-success">Compra verificada</p>
              <p className="text-store-body mt-1 text-text-muted">{review.text}</p>
            </article>
          ))}
        </div>

        <StoreArrow
          direction="prev"
          label="Avaliações anteriores"
          disabled={atStart}
          onClick={() => scroll(-1)}
          className="absolute -left-3 top-1/2 hidden -translate-y-1/2 lg:inline-flex"
        />
        <StoreArrow
          direction="next"
          label="Próximas avaliações"
          disabled={atEnd}
          onClick={() => scroll(1)}
          className="absolute -right-3 top-1/2 hidden -translate-y-1/2 lg:inline-flex"
        />
      </div>
    </section>
  )
}
