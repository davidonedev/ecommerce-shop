import type { Metadata, Viewport } from 'next'
import { SiteHeader } from '@/components/layout/site-header'
import { brand } from '@/lib/brand'
import { fontClassNames } from './fonts'
import './globals.css'
import { Providers } from './providers'

export const metadata: Metadata = {
  title: { default: `${brand.name} | Tapetes e bolsas personalizados`, template: `%s | ${brand.name}` },
  description: brand.description,
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="pt-BR" className={fontClassNames}>
      <body className="flex min-h-dvh flex-col">
        <Providers>
          <SiteHeader />
          <main id="conteudo" className="flex-1">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  )
}
