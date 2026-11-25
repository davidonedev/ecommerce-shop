import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { Fragment } from 'react'

export interface BreadcrumbItem {
  label: string
  /** Sem href = página atual. */
  href?: string
}

/** Trilha de navegação ("Início › Tapetes"). O último item é a página atual. */
export function Breadcrumb({ items }: { items: readonly BreadcrumbItem[] }) {
  return (
    <nav aria-label="Você está em">
      <ol className="flex flex-wrap items-center gap-1 text-store-caption text-text-muted">
        {items.map((item, index) => (
          <Fragment key={item.label}>
            {index > 0 && <ChevronRight aria-hidden strokeWidth={1.5} className="size-3.5" />}
            <li>
              {item.href ? (
                <Link
                  href={item.href}
                  className="inline-flex min-h-8 items-center rounded-control hover:text-rose-strong hover:underline hover:underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-strong"
                >
                  {item.label}
                </Link>
              ) : (
                <span aria-current="page" className="text-text">
                  {item.label}
                </span>
              )}
            </li>
          </Fragment>
        ))}
      </ol>
    </nav>
  )
}
