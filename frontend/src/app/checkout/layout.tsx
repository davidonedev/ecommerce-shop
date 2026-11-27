import type { Metadata } from 'next'

// A página é de cliente ('use client') e não pode exportar metadados; o layout cuida do título.
// Checkout é conteúdo pessoal: fora dos buscadores.
export const metadata: Metadata = { title: 'Checkout', robots: { index: false } }

export default function CheckoutLayout({ children }: LayoutProps<'/checkout'>) {
  return children
}
