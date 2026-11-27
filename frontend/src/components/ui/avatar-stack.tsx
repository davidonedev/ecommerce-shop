import Image from 'next/image'
import type { ProductImage } from '@/types/product'
import { cx } from './variants'

export interface AvatarStackProps {
  /** Fotos dos clientes (4 ficam bem). O `alt` da imagem é ignorado: o conjunto é decorativo. */
  avatars: readonly ProductImage[]
  className?: string
}

/**
 * Avatares circulares sobrepostos com anel branco (bloco de confiança).
 * É decorativo (aria-hidden): a nota e o nº de avaliações vão em texto ao lado, ver <Rating showValue />.
 */
export function AvatarStack({ avatars, className }: AvatarStackProps) {
  return (
    <div aria-hidden className={cx('flex -space-x-3', className)}>
      {avatars.map((avatar, index) => (
        <span
          key={`${avatar.src}-${index}`}
          className="relative size-11 overflow-hidden rounded-full bg-surface ring-2 ring-bg"
        >
          <Image src={avatar.src} alt="" fill sizes="44px" className="object-cover" />
        </span>
      ))}
    </div>
  )
}
