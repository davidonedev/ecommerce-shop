import Link from 'next/link'
import { brand } from '@/lib/brand'
import { cx } from '@/components/ui/variants'

/** Marca de linhas curvas (desenho próprio) que acompanha o wordmark. */
function Mark({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 40 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      className={cx('size-9 shrink-0', className)}
    >
      <path d="M6 32C6 18 14 8 34 5C28 11 26 17 27 24C22 18 14 19 6 32Z" />
      <path d="M12 30C16 22 22 15 31 9" />
      <path d="M17 33C20 28 25 24 33 20" />
    </svg>
  )
}

/**
 * Wordmark da loja: marca em curvas + nome em serifa fina, caixa alta e espaçamento largo.
 * Troque o nome em `brand.name` (src/lib/brand.ts).
 */
export function BrandLogo({ className, asLink = true }: { className?: string; asLink?: boolean }) {
  const content = (
    <>
      <Mark />
      <span className="font-wordmark text-[1.5rem] font-normal uppercase leading-none tracking-[0.18em]">
        {brand.name}
      </span>
    </>
  )
  const classes = cx('inline-flex min-h-11 items-center gap-2 text-rose', className)
  return asLink ? (
    <Link
      href="/"
      aria-label={`${brand.name}, página inicial`}
      className={cx(classes, 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-on-dark')}
    >
      {content}
    </Link>
  ) : (
    <span className={classes}>{content}</span>
  )
}
