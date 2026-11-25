import type { Metadata } from 'next'
import { ProductCard } from '@/components/ui/product-card'
import { products } from '@/data/mock/products'

export const metadata: Metadata = { title: 'Produtos' }

export default function ProductListPage() {
  return (
    <section className="container-page py-10 md:py-14">
      <h1 className="text-h1">Produtos</h1>
      <p className="mt-2 text-ink-muted">
        Tapetes, bolsas e presentes feitos com o seu nome, a sua foto ou a sua arte.
      </p>
      <ul className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product, index) => (
          <li key={product.id} className="flex">
            <ProductCard product={product} priority={index < 4} headingAs="h2" className="w-full" />
          </li>
        ))}
      </ul>
    </section>
  )
}
