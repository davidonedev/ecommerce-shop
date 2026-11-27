import { BadgePercent, CreditCard, MessageCircle, ShieldCheck, Truck, type LucideIcon } from 'lucide-react'
import { brand } from '@/lib/brand'

interface Benefit {
  icon: LucideIcon
  title: string
  description: string
}

const benefits: readonly Benefit[] = [
  { icon: CreditCard, title: 'Parcelamento', description: `Em até ${brand.payment.maxInstallments}x no cartão de crédito` },
  { icon: Truck, title: 'Envios', description: brand.shippingLine },
  { icon: MessageCircle, title: 'Atendimento', description: 'via WhatsApp' },
  { icon: ShieldCheck, title: 'Site 100% Seguro', description: 'Selo de segurança' },
  { icon: BadgePercent, title: `Desconto de ${brand.payment.pixDiscountPercent}%`, description: 'nas compras no Pix' },
]

/** Faixa de 5 benefícios com ícones de linha fina: 2 colunas no celular, 5 no computador. */
export function BenefitsStrip() {
  return (
    <section aria-label="Vantagens da loja" className="bg-bg">
      <ul className="container-page grid grid-cols-2 gap-x-4 gap-y-6 py-8 lg:grid-cols-5">
        {benefits.map(({ icon: Icon, title, description }, index) => (
          <li
            key={title}
            className={`flex flex-col items-center gap-2 text-center ${
              index === benefits.length - 1 ? 'col-span-2 lg:col-span-1' : ''
            }`}
          >
            <Icon aria-hidden strokeWidth={1.25} className="size-9 text-text" />
            <p>
              <span className="block text-store-nav text-text">{title}</span>
              <span className="block text-store-caption text-text-muted">{description}</span>
            </p>
          </li>
        ))}
      </ul>
    </section>
  )
}
