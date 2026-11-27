'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { formatPrice } from '@/lib/utils'
import { useCartStore } from '@/store/cartStore'

export default function CartPage() {
  const items = useCartStore((s) => s.items)
  const removeItem = useCartStore((s) => s.removeItem)
  const total = useCartStore((s) => s.items.reduce((sum, i) => sum + i.quantity * i.product.price, 0))

  return (
    <section className="container-page py-10 md:py-14">
      <h1 className="text-h1">Carrinho</h1>
      {items.length === 0 ? (
        <div className="mt-6">
          <p className="text-ink-muted">Seu carrinho está vazio.</p>
          <Button asChild variant="secondary" className="mt-6">
            <Link href="/produtos">Ver produtos</Link>
          </Button>
        </div>
      ) : (
        <>
          <ul className="mt-6 divide-y divide-border rounded-md border border-border bg-surface shadow-soft">
            {items.map(({ product, quantity }) => (
              <li key={product.id} className="flex flex-wrap items-center justify-between gap-4 p-4">
                <span>
                  {product.name} × {quantity}
                </span>
                <span className="flex items-center gap-4">
                  <span className="font-semibold">{formatPrice(product.price * quantity)}</span>
                  <Button variant="ghost" size="sm" onClick={() => removeItem(product.id)}>
                    Remover
                  </Button>
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-right text-h3 font-display">Total: {formatPrice(total)}</p>
          <div className="mt-6 flex justify-end">
            <Button asChild variant="accent" size="lg">
              <Link href="/checkout">Finalizar compra</Link>
            </Button>
          </div>
        </>
      )}
    </section>
  )
}
