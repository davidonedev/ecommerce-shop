'use client'

import { ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/toast'
import { useCartStore } from '@/store/cartStore'
import type { Product } from '@/types/product'

export function AddToCartButton({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem)
  const { toast } = useToast()

  return (
    <Button
      variant="primary"
      size="lg"
      onClick={() => {
        addItem(product)
        toast({ title: 'Adicionado ao carrinho', description: product.name, tone: 'success' })
      }}
    >
      <ShoppingBag aria-hidden className="size-5" />
      Adicionar ao carrinho
    </Button>
  )
}
