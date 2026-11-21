import { Link } from 'react-router-dom'
import { useCartStore } from '../store/cartStore'

export default function Cart() {
  const items = useCartStore((s) => s.items)

  return (
    <section>
      <h1 className="text-2xl font-bold">Carrinho</h1>
      {items.length === 0 ? (
        <p className="mt-2 text-gray-600">Seu carrinho está vazio.</p>
      ) : (
        <>
          <ul className="mt-4 divide-y divide-gray-200 rounded-lg bg-white shadow-sm">
            {items.map(({ product, quantity }) => (
              <li key={product.id} className="flex justify-between p-4">
                <span>
                  {product.name} × {quantity}
                </span>
                <span>R$ {(product.price * quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <Link to="/checkout" className="mt-6 inline-block rounded-lg bg-indigo-600 px-6 py-3 text-white">
            Finalizar compra
          </Link>
        </>
      )}
    </section>
  )
}
