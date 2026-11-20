import { Link, NavLink, Outlet } from 'react-router-dom'
import { useCartStore } from '../store/cartStore'

const linkClass = ({ isActive }: { isActive: boolean }) =>
  isActive ? 'font-semibold text-indigo-600' : 'text-gray-600 hover:text-gray-900'

export default function Layout() {
  const totalItems = useCartStore((s) => s.items.reduce((sum, i) => sum + i.quantity, 0))

  return (
    <div className="min-h-screen">
      <header className="border-b border-gray-200 bg-white">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link to="/" className="text-xl font-bold text-indigo-600">
            Ecommerce Shop
          </Link>
          <div className="flex items-center gap-6">
            <NavLink to="/produtos" className={linkClass}>
              Produtos
            </NavLink>
            <NavLink to="/carrinho" className={linkClass}>
              Carrinho ({totalItems})
            </NavLink>
          </div>
        </nav>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8">
        <Outlet />
      </main>
    </div>
  )
}
