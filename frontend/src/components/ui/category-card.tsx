import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import type { Category } from '@/types/product'
import { cardClass, cx, focusRing } from './variants'

export interface CategoryCardProps {
  category: Category
  /** Proporção da imagem: "wide" para destaques largos, "tall" (padrão) para cards comuns. */
  shape?: 'tall' | 'wide'
  sizes?: string
  className?: string
}

/**
 * Card de categoria com foto em ambiente e nome sobre um degradê grafite. O card inteiro é um link.
 * Para os tiles quadrados da home, use <CategoryTile />.
 */
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
        'group block min-h-44',
        focusRing,
        shape === 'tall' ? 'aspect-[4/5]' : 'aspect-[16/10]',
        className,
      )}
    >
      <Image src={category.image.src} alt={category.image.alt} fill sizes={sizes} className="image-zoom object-cover" />
      <div aria-hidden className="absolute inset-0 bg-linear-to-t from-graphite/85 via-graphite/25 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5 text-on-dark">
        <div>
          <h3 className="text-section-title">{category.name}</h3>
          <p className="text-small">{category.count}</p>
        </div>
        <ArrowUpRight aria-hidden strokeWidth={1.5} className="arrow-slide size-6 shrink-0" />
      </div>
    </Link>
  )
}
