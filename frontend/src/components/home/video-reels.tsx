import { Play } from 'lucide-react'
import Image from 'next/image'
import { SectionHeading } from '@/components/ui/section-heading'
import { customerVideos } from '@/data/mock/videos'

/** Três vídeos verticais lado a lado (estilo Reels/Shorts), com botão play e "Assistir no YouTube". */
export function VideoReels() {
  return (
    <section aria-labelledby="videos-titulo" className="section-gap container-page">
      <SectionHeading id="videos-titulo">Clientes em Vídeo</SectionHeading>
      <ul className="mx-auto mt-8 grid max-w-3xl grid-cols-3 gap-3 sm:gap-5">
        {customerVideos.map((video) => (
          <li key={video.id}>
            <a
              href={video.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-control focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rose-strong"
            >
              <span className="relative block aspect-9/16 overflow-hidden rounded-control bg-surface">
                <Image
                  src={video.poster.src}
                  alt={video.poster.alt}
                  fill
                  unoptimized
                  sizes="(min-width: 768px) 240px, 33vw"
                  className="image-zoom object-cover"
                />
                <span
                  aria-hidden
                  className="absolute left-1/2 top-1/2 inline-flex h-9 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-control bg-soldout text-on-dark sm:h-11 sm:w-16"
                >
                  <Play className="size-4 fill-current sm:size-5" strokeWidth={0} />
                </span>
              </span>
              <span className="mt-2 block text-center text-store-caption text-text group-hover:underline group-hover:underline-offset-4">
                Assistir no YouTube
                <span className="sr-only">: {video.title} (abre em nova aba)</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
