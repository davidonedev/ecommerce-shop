import Image from 'next/image'
import { cx } from './variants'

/** Brilho de 4 pontas (decoração). Só desenho: sem texto, escondido de leitores de tela. */
export function Sparkle({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className={cx('size-4 shrink-0 text-rose', className)} fill="currentColor">
      <path d="M12 0c.7 6.2 5.8 11.3 12 12-6.2.7-11.3 5.8-12 12-.7-6.2-5.8-11.3-12-12C6.2 11.3 11.3 6.2 12 0Z" />
    </svg>
  )
}

/** Filete fino com brilho, usado nos cantos do banner. */
export function SparkleLine({ className }: { className?: string }) {
  return (
    <span aria-hidden className={cx('flex items-center gap-1.5 text-rose', className)}>
      <span className="h-px w-16 bg-current sm:w-28" />
      <Sparkle className="size-3.5" />
    </span>
  )
}

/** Ornamento de linhas curvas em rosé (decoração do banner principal). Desenho próprio. */
export function CurveOrnament({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 320 320"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      className={cx('text-rose', className)}
    >
      <path strokeWidth="14" d="M20 300C20 160 120 60 300 40C250 90 230 150 240 230C190 150 120 170 20 300Z" opacity=".55" />
      <path strokeWidth="2" d="M60 300C80 200 170 110 290 70" opacity=".8" />
      <path strokeWidth="2" d="M110 304C130 230 200 160 300 120" opacity=".6" />
    </svg>
  )
}

export interface ArchFrameProps {
  src: string
  alt: string
  /** Tamanho do quadro e proporção (ex.: "w-52 aspect-[3/4]"). */
  className?: string
  sizes?: string
  priority?: boolean
  /** Brilhos nas laterais do quadro (padrão: ligado). */
  sparkles?: boolean
}

/**
 * Moldura em arco (topo arredondado) com contorno fino rosé deslocado e brilhos nas laterais.
 * A imagem usa `object-cover`; o contorno é só decoração.
 */
export function ArchFrame({ src, alt, className, sizes = '260px', priority = false, sparkles = true }: ArchFrameProps) {
  return (
    <div className={cx('relative', className)}>
      <span aria-hidden className="absolute -inset-2.5 rounded-t-full border border-rose" />
      {sparkles && (
        <>
          <Sparkle className="absolute -left-7 top-1/2 size-3" />
          <Sparkle className="absolute -right-7 top-1/2 size-3" />
        </>
      )}
      <div className="relative size-full overflow-hidden rounded-t-full bg-surface">
        <Image src={src} alt={alt} fill unoptimized priority={priority} sizes={sizes} className="object-cover" />
      </div>
    </div>
  )
}
