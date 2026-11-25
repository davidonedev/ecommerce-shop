import { Clock, Mail, MessageCircle } from 'lucide-react'
import Link from 'next/link'
import { institutionalLinks, navCategories } from '@/data/mock/navigation'
import { brand, whatsappLink } from '@/lib/brand'
import { BrandLogo } from './brand-logo'
import { Newsletter } from './newsletter'

const linkClass =
  'inline-flex min-h-8 items-center rounded-control text-store-body text-on-graphite-muted hover:text-on-dark hover:underline hover:underline-offset-4 focus-on-dark'
const headingClass = 'text-store-nav text-on-dark'

/** Formas de pagamento aceitas (texto em caixinhas brancas, como placeholder das bandeiras). */
const paymentMethods = ['Pix', 'Visa', 'Mastercard', 'Elo', 'Amex', 'Boleto'] as const

/**
 * Faixa de newsletter rosé + rodapé grafite (logo e Instagram, Categorias, Institucional, Atendimento,
 * Formas de pagamento) + barra branca de copyright.
 * As bandeiras e os selos de segurança são placeholders: troque pelos reais quando existirem.
 */
export function SiteFooter() {
  return (
    <footer>
      <Newsletter />

      <div className="bg-graphite text-on-dark">
        <div className="container-page grid gap-10 py-10 sm:grid-cols-2 lg:grid-cols-[1.1fr_1fr_1fr_1.3fr_1.2fr] lg:gap-8">
          <div className="flex flex-col items-start gap-5">
            <BrandLogo asLink={false} />
            <a
              href={brand.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex size-11 items-center justify-center rounded-full text-on-dark hover:text-rose focus-on-dark"
            >
              {/* O Lucide desta versão não traz ícones de marca: contorno do Instagram desenhado à mão. */}
              <svg
                aria-hidden
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-6"
              >
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.2" cy="6.8" r=".6" fill="currentColor" />
              </svg>
              <span className="sr-only">Instagram {brand.instagramHandle} (abre em nova aba)</span>
            </a>
          </div>

          <nav aria-labelledby="rodape-categorias">
            <h2 id="rodape-categorias" className={headingClass}>
              Categorias
            </h2>
            <ul className="mt-3">
              {navCategories.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="rodape-institucional">
            <h2 id="rodape-institucional" className={headingClass}>
              Institucional
            </h2>
            <ul className="mt-3">
              {institutionalLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className={headingClass}>Atendimento</h2>
            <ul className="mt-3 flex flex-col gap-1">
              <li>
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  <MessageCircle aria-hidden strokeWidth={1.5} className="mr-2 size-5 shrink-0" />
                  {brand.whatsappDisplay}
                  <span className="sr-only"> (WhatsApp, abre em nova aba)</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${brand.email}`} className={linkClass}>
                  <Mail aria-hidden strokeWidth={1.5} className="mr-2 size-5 shrink-0" />
                  {brand.email}
                </a>
              </li>
              <li className="mt-2 border-t border-rose pt-3">
                <p className="flex items-start text-store-body text-on-graphite-muted">
                  <Clock aria-hidden strokeWidth={1.5} className="mr-2 mt-0.5 size-5 shrink-0" />
                  <span>
                    Horário de Atendimento:
                    <br />
                    {brand.hours}
                  </span>
                </p>
              </li>
            </ul>
          </div>

          <div>
            <h2 className={headingClass}>Formas de pagamento</h2>
            <ul aria-label="Formas de pagamento aceitas" className="mt-3 flex flex-wrap gap-2">
              {paymentMethods.map((method) => (
                <li
                  key={method}
                  className="inline-flex h-7 min-w-12 items-center justify-center rounded-control bg-bg px-2 text-store-caption text-text"
                >
                  {method}
                </li>
              ))}
            </ul>
            <h2 className={`${headingClass} mt-6`}>Selos de Segurança</h2>
            <p className="mt-3 text-store-body text-on-graphite-muted">Compra 100% segura</p>
          </div>
        </div>
      </div>

      <div className="bg-bg">
        {/* pb-20 no celular: o botão fixo do WhatsApp não cobre a última linha. */}
        <p className="container-page py-4 pb-20 text-center text-store-caption text-text-muted sm:pb-4">
          © {brand.copyrightYear} {brand.name}. Todos os direitos reservados. CNPJ {brand.cnpj}.
        </p>
      </div>
    </footer>
  )
}
