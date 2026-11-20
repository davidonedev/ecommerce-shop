import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <section className="py-12 text-center">
      <h1 className="text-4xl font-bold">Bem-vindo à Ecommerce Shop</h1>
      <p className="mt-4 text-gray-600">Encontre os melhores produtos com entrega para todo o Brasil.</p>
      <Link
        to="/produtos"
        className="mt-8 inline-block rounded-lg bg-indigo-600 px-6 py-3 font-medium text-white hover:bg-indigo-700"
      >
        Ver produtos
      </Link>
    </section>
  )
}
