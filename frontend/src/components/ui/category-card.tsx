import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import type { Category } from '@/types/product'
import { cardClass, cx } from './variants'

export interface CategoryCardProps {
  category: Category
  /** Proporção da imagem: "wide" para destaques do layout bento, "tall" (padrão) para cards comuns. */
  shape?: 'tall' | 'wide'
  sizes?: string
  className?: string
}

/** Card de categoria: foto em ambiente com nome e quantidade de modelos. O card inteiro é um link. */
export function CategoryCard({
  category,
  shape = 'tall',
  sizes = '(min-width: 1024px) 25vw, 70vw',
  className,
}: CategoryCardProps) {
  return (
    <Link
      href={category.href}
      data-interactive
      className={cx(
        cardClass,
        'group block min-h-44 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
        shape === 'tall' ? 'aspect-[4/5]' : 'aspect-[16/10]',
        className,
      )}
    >
      <Image
        src={category.image.src}
        alt={category.image.alt}
        fill
        sizes={sizes}
        className="object-cover transition-transform duration-(--duration-slow) ease-soft group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
      />
      <div aria-hidden className="absolute inset-0 bg-linear-to-t from-ink/80 via-ink/20 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5 text-surface">
        <div>
          <h3 className="text-h3 font-display">{category.name}</h3>
          <p className="text-small">{category.count}</p>
        </div>
        <ArrowUpRight
          aria-hidden
          className="size-6 shrink-0 transition-transform duration-(--duration-base) group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none"
        />
      </div>
    </Link>
  )
}
