import Link from 'next/link'
import { ArchFrame } from '@/components/ui/ornaments'
import { storeButtonClass } from '@/components/ui/store-button'
import { collectionBanners } from '@/data/mock/collections'

/** Dois banners lado a lado: foto em arco à esquerda, "Peças Exclusivas" + coleção + botão à direita. */
export function CollectionBanners() {
  return (
    <section aria-label="Coleções" className="section-gap container-page">
      <ul className="grid gap-4 md:grid-cols-2 md:gap-5">
        {collectionBanners.map((banner) => (
          <li
            key={banner.id}
            className="flex items-center gap-6 bg-linear-to-br from-cream to-bg px-8 py-7 sm:gap-10 sm:px-12"
          >
            <ArchFrame
              src={banner.image.src}
              alt={banner.image.alt}
              sizes="130px"
              className="aspect-3/4 w-28 shrink-0 sm:w-32"
            />
            <div className="flex min-w-0 flex-1 flex-col items-center gap-2 text-center">
              <p className="text-store-eyebrow text-text">{banner.eyebrow}</p>
              <p className="text-store-eyebrow text-rose-strong">{banner.name}</p>
              <Link
                href={banner.href}
                className={storeButtonClass({ className: 'mt-1 min-h-9 px-6 text-store-caption shadow-soft' })}
              >
                Conferir agora
                <span className="sr-only">: {banner.name}</span>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
