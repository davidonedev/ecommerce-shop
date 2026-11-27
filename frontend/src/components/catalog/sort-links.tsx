import Link from 'next/link'
import { productSorts, type ProductSort } from '@/lib/catalog-api'
import { cx } from '@/components/ui/variants'

export interface SortLinksProps {
  /** Caminho da página (ex.: "/categorias/tapetes"). */
  basePath: string
  current: ProductSort
  /** Outros parâmetros da página que devem ser mantidos ao trocar a ordem (ex.: a busca "q"). */
  keep?: Record<string, string | undefined>
}

/**
 * Ordenação por links (funciona sem JavaScript): cada opção recarrega a página com `?ordenar=...`.
 * A opção atual leva aria-current.
 */
export function SortLinks({ basePath, current, keep = {} }: SortLinksProps) {
  return (
    <nav aria-label="Ordenar produtos" className="flex flex-wrap items-center gap-2">
      <span className="text-store-caption text-text-muted">Ordenar por:</span>
      <ul className="flex flex-wrap gap-2">
        {productSorts.map((sort) => {
          const params = new URLSearchParams()
          for (const [key, value] of Object.entries(keep)) if (value) params.set(key, value)
          if (sort.value !== 'relevance') params.set('ordenar', sort.value)
          const query = params.toString()
          const active = sort.value === current
          return (
            <li key={sort.value}>
              <Link
                href={query ? `${basePath}?${query}` : basePath}
                aria-current={active ? 'true' : undefined}
                className={cx(
                  'inline-flex min-h-9 items-center rounded-full border px-4 text-store-caption',
                  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-strong',
                  active
                    ? 'border-rose-strong bg-rose-strong text-on-dark'
                    : 'border-field-border bg-bg text-text hover:border-rose-strong hover:text-rose-strong',
                )}
              >
                {sort.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
