import { clsx, type ClassValue } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

/**
 * twMerge que conhece os tamanhos de fonte do design system (text-h1, text-body...),
 * para não confundi-los com cores (text-ink) ao resolver conflitos.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        {
          text: [
            // legados
            'display-xl',
            'h1',
            'h2',
            'h3',
            'body',
            'small',
            'caption',
            // estilos tipográficos do design system (globals.css)
            'overline',
            'display-hero',
            'script',
            'section-title',
            'nav',
            'button',
            'button-sm',
            'product-name',
            'tile-name',
            'price',
            'badge',
            'badge-xs',
            'seal',
            'topbar',
            'cart-total',
            'benefit-title',
            'benefit-text',
            'panel-title',
            // vitrine rosé
            'store-title',
            'store-hero',
            'store-eyebrow',
            'store-product',
            'store-price',
            'store-price-note',
            'store-button',
            'store-nav',
            'store-body',
            'store-caption',
            'store-badge',
            'store-label',
          ],
        },
      ],
    },
  },
})

/** Junta classes condicionais e resolve conflitos do Tailwind (a última vence). */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const brl = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })

/**
 * Formata em reais no padrão brasileiro: R$ 189,90.
 * O espaço entre "R$" e o valor é inseparável (U+00A0), para o preço nunca quebrar em duas linhas.
 */
export function formatPrice(value: number) {
  return brl.format(value)
}

/**
 * Valor de cada parcela sem juros, arredondado para BAIXO ao centavo: assim "6x de R$ X"
 * nunca soma mais que o preço (arredondar para o centavo mais próximo faria 4x R$ 32,48 = R$ 129,92 > R$ 129,90).
 */
export function installmentAmount(price: number, installments: number) {
  const cents = Math.round(price * 100)
  return Math.floor(cents / Math.max(1, installments)) / 100
}
