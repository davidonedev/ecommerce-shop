'use client'

import { CircleHelp, Menu, Search, ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import { useId, type ReactNode } from 'react'
import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'
import { cx } from '@/components/ui/variants'
import { mainNav } from '@/data/mock/navigation'
import { brand, whatsappLink } from '@/lib/brand'
import { useCartStore } from '@/store/cartStore'
import { BrandLogo } from './brand-logo'

const focusOnDark = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-on-dark'

/** Menu lateral com todos os departamentos. O gatilho vem de fora (botão do celular ou "Todas Categorias"). */
function CategoryDrawer({ trigger }: { trigger: ReactNode }) {
  const links = [{ label: 'Início', href: '/' }, ...mainNav]
  return (
    <Drawer>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent title="Todas as categorias" side="left">
        <nav aria-label="Categorias">
          <ul>
            {links.map((item) => (
              <li key={item.href}>
                <DrawerClose asChild>
                  <Link
                    href={item.href}
                    className="flex min-h-12 items-center border-b border-border text-store-nav text-text hover:text-rose-strong"
                  >
                    {item.label}
                  </Link>
                </DrawerClose>
              </li>
            ))}
          </ul>
        </nav>
      </DrawerContent>
    </Drawer>
  )
}

/** Busca em pílula clara com lupa rosé. Envia para /produtos?q=... */
function SearchForm({ className }: { className?: string }) {
  const id = useId()
  return (
    <form role="search" action="/produtos" method="get" className={cx('relative', className)}>
      <label htmlFor={id} className="sr-only">
        Buscar produtos
      </label>
      <input
        id={id}
        name="q"
        type="search"
        autoComplete="off"
        placeholder="O que deseja procurar?"
        className="h-11 w-full rounded-full border-0 bg-surface pl-5 pr-12 text-body text-text placeholder:text-text-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-on-dark"
      />
      <button
        type="submit"
        aria-label="Buscar"
        className="absolute right-1 top-1/2 inline-flex size-10 -translate-y-1/2 items-center justify-center rounded-full text-rose-strong focus-visible:outline-2 focus-visible:outline-rose-strong"
      >
        <Search aria-hidden strokeWidth={1.5} className="size-5" />
      </button>
    </form>
  )
}

/**
 * Cabeçalho em 2 níveis, fundo grafite. Nível 1: logo, busca, ajuda e carrinho. Nível 2 (computador):
 * "Todas Categorias" + departamentos. No celular vira barra compacta: menu em drawer, logo, carrinho e busca visível.
 */
export function SiteHeader() {
  const totalItems = useCartStore((s) => s.items.reduce((sum, i) => sum + i.quantity, 0))

  return (
    <>
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-control focus:bg-graphite focus:px-5 focus:py-3 focus:text-on-dark"
      >
        Pular para o conteúdo
      </a>
      <header className="bg-graphite text-on-dark">
        <div className="container-page flex items-center justify-between gap-3 py-3 lg:gap-10 lg:py-5">
          <div className="flex items-center gap-1 lg:hidden">
            <CategoryDrawer
              trigger={
                <button
                  type="button"
                  aria-label="Abrir menu de categorias"
                  className={cx('inline-flex size-11 items-center justify-center rounded-full', focusOnDark)}
                >
                  <Menu aria-hidden strokeWidth={1.5} className="size-6" />
                </button>
              }
            />
          </div>

          <BrandLogo className="[&_span]:text-[1.125rem] lg:[&_span]:text-[1.75rem]" />

          <SearchForm className="hidden max-w-2xl flex-1 lg:block" />

          <div className="flex items-center gap-1 lg:gap-6">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className={cx(
                'hidden min-h-11 items-center gap-2.5 rounded-control lg:inline-flex',
                focusOnDark,
              )}
            >
              <CircleHelp aria-hidden strokeWidth={1.25} className="size-8 text-rose" />
              <span className="text-left text-store-caption leading-tight">
                <span className="block font-normal">Precisa de Ajuda?</span>
                <span className="block text-store-nav">Atendimento</span>
              </span>
              <span className="sr-only"> pelo WhatsApp, {brand.whatsappDisplay} (abre em nova aba)</span>
            </a>

            <Link
              href="/carrinho"
              className={cx('relative inline-flex size-11 items-center justify-center rounded-full', focusOnDark)}
            >
              <ShoppingBag aria-hidden strokeWidth={1.25} className="size-7 text-rose" />
              <span
                aria-hidden
                className="absolute right-0 top-0 inline-flex size-5 items-center justify-center rounded-full bg-rose text-[0.6875rem] font-semibold text-graphite"
              >
                {totalItems}
              </span>
              <span className="sr-only">
                Carrinho: {totalItems === 1 ? '1 item' : `${totalItems} itens`}
              </span>
            </Link>
          </div>
        </div>

        <div className="container-page pb-3 lg:hidden">
          <SearchForm />
        </div>

        <div className="hidden border-t border-on-dark/40 lg:block">
          <nav aria-label="Principal" className="container-page flex min-h-12 items-center justify-between gap-4">
            <CategoryDrawer
              trigger={
                <button
                  type="button"
                  className={cx('inline-flex min-h-11 items-center gap-2 rounded-control text-store-nav', focusOnDark)}
                >
                  <Menu aria-hidden strokeWidth={1.5} className="size-6" />
                  Todas Categorias
                </button>
              }
            />
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cx(
                  'inline-flex min-h-11 items-center rounded-control text-store-nav hover:text-rose',
                  focusOnDark,
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
    </>
  )
}
