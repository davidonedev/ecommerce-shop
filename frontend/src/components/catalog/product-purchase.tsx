'use client'

import Link from 'next/link'
import { useState } from 'react'
import { QuantityStepper } from '@/components/ui/quantity-stepper'
import { storeButtonClass } from '@/components/ui/store-button'
import { useOptionalToast } from '@/components/ui/toast'
import { whatsappLink } from '@/lib/brand'
import { useCartStore } from '@/store/cartStore'
import type { Product } from '@/types/product'

/**
 * Ações da página do produto: quantidade + "Comprar" (ou só "Personalizar" nos produtos personalizáveis).
 * Esgotado mostra o aviso e o link para o WhatsApp no lugar dos botões.
 */
export function ProductPurchase({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem)
  const toast = useOptionalToast()
  const [quantity, setQuantity] = useState(1)

  if (product.soldOut) {
    return (
      <div className="flex flex-col items-start gap-1">
        <p className="text-store-body text-text">Esgotado :(</p>
        <a
          href={whatsappLink(`Olá! Avise-me quando "${product.name}" chegar.`)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center rounded-control text-store-body text-rose-strong underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-strong"
        >
          Avise-me quando chegar
          <span className="sr-only"> (pelo WhatsApp, abre em nova aba)</span>
        </a>
      </div>
    )
  }

  if (product.personalizable) {
    return (
      <div className="flex flex-wrap gap-3">
        <Link href={`/personalizar?produto=${product.slug}`} className={storeButtonClass({ className: 'px-10' })}>
          Personalizar
        </Link>
      </div>
    )
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <QuantityStepper value={quantity} onChange={setQuantity} label={product.name} />
      <button
        type="button"
        onClick={() => {
          addItem(product, quantity)
          toast?.({
            title: 'Adicionado ao carrinho',
            description: quantity > 1 ? `${quantity} × ${product.name}` : product.name,
            tone: 'success',
          })
          setQuantity(1)
        }}
        className={storeButtonClass({ className: 'px-10' })}
      >
        Comprar
      </button>
    </div>
  )
}
