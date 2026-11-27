import type { Metadata, Viewport } from 'next'
import { AnnouncementBar } from '@/components/layout/announcement-bar'
import { SiteFooter } from '@/components/layout/site-footer'
import { SiteHeader } from '@/components/layout/site-header'
import { WhatsappFab } from '@/components/layout/whatsapp-fab'
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
          <AnnouncementBar />
          <SiteHeader />
          <main id="conteudo" className="flex-1">
            {children}
          </main>
          <SiteFooter />
          <WhatsappFab />
        </Providers>
      </body>
    </html>
  )
}
