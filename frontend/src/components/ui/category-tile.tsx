import { LayoutGrid } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import type { ProductImage } from '@/types/product'
import { categoryTileClass, cx } from './variants'

export interface CategoryTileProps {
  name: string
  href: string
  /** Foto do produto (de preferência recortada ou em fundo claro). Ignorada quando `more` é true. */
  image?: ProductImage
  /** Último tile ("Mais categorias"): mostra um ícone de grade no lugar da foto. */
  more?: boolean
  sizes?: string
  /** Use true nos tiles acima da dobra. */
  priority?: boolean
  className?: string
}

/**
 * Tile quadrado de categoria: fundo cinza-claro, raio 8px, imagem centralizada e o nome embaixo, dentro do tile.
 * Hover: sobe 2px e ganha borda marinho. O tile inteiro é um link.
 */
export function CategoryTile({
  name,
  href,
  image,
  more = false,
  sizes = '(min-width: 1024px) 12vw, 25vw',
  priority = false,
  className,
}: CategoryTileProps) {
  return (
    <Link href={href} className={cx(categoryTileClass, className)}>
      <div className="absolute inset-x-3 bottom-10 top-3 flex items-center justify-center">
        {more || !image ? (
          <LayoutGrid aria-hidden strokeWidth={1.25} className="size-9 text-navy" />
        ) : (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes={sizes}
            priority={priority}
            className="image-zoom object-contain mix-blend-multiply"
          />
        )}
      </div>
      <span className="absolute inset-x-2 bottom-2.5 text-center text-tile-name">{name}</span>
    </Link>
  )
}
