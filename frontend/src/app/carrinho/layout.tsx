import type { Metadata } from 'next'

// A página é de cliente ('use client') e não pode exportar metadados; o layout cuida do título.
// Carrinho é conteúdo pessoal: fora dos buscadores.
export const metadata: Metadata = { title: 'Carrinho', robots: { index: false } }

export default function CartLayout({ children }: LayoutProps<'/carrinho'>) {
  return children
}
