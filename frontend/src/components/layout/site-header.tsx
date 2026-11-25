'use client'

import { ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import { brand } from '@/lib/brand'
import { useCartStore } from '@/store/cartStore'

/**
 * Cabeçalho PROVISÓRIO da base (PR 1): só garante navegação entre as páginas.
 * O cabeçalho definitivo (anúncios, mega-menu, busca, drawer mobile) chega no PR 2.
 */
export function SiteHeader() {
  const totalItems = useCartStore((s) => s.items.reduce((sum, i) => sum + i.quantity, 0))

  return (
    <>
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-surface"
      >
        Pular para o conteúdo
      </a>
      <header className="border-b border-border bg-surface">
        {/* flex-wrap: em telas estreitas (360px) o menu desce para a linha de baixo em vez de estourar a largura. */}
        <nav
          aria-label="Principal"
          className="container-page flex min-h-16 flex-wrap items-center justify-between gap-x-4 gap-y-1 py-1"
        >
          <Link href="/" className="inline-flex min-h-11 items-center font-display text-h3">
            {brand.name}
          </Link>
          <ul className="flex flex-wrap items-center gap-x-5 text-small font-medium sm:gap-x-6">
            <li>
              <Link href="/produtos" className="inline-flex min-h-11 items-center hover:text-accent-hover">
                Produtos
              </Link>
            </li>
            <li>
              <Link href="/personalizar" className="inline-flex min-h-11 items-center hover:text-accent-hover">
                Personalizar
              </Link>
            </li>
            <li>
              <Link href="/carrinho" className="inline-flex min-h-11 items-center gap-2 hover:text-accent-hover">
                <ShoppingBag aria-hidden className="size-5" />
                Carrinho
                <span aria-hidden>({totalItems})</span>
                <span className="sr-only">{totalItems === 1 ? '1 item' : `${totalItems} itens`}</span>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  )
}
