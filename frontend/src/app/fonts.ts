import {
  Allura,
  Archivo_Black,
  Caveat,
  Cormorant_Garamond,
  Fraunces,
  Inter,
  Montserrat,
  Playfair_Display,
  Poppins,
  Raleway,
} from 'next/font/google'

/**
 * Fontes do design system (next/font, display: swap).
 * Cada uma expõe uma variável CSS, mapeada para utilitários Tailwind em globals.css.
 *
 * Interface (carregadas com preload):
 *   font-heading / font-display -> Poppins 600, 700, 800 (títulos, menu, botões, preço)
 *   font-sans                   -> Inter 400, 500 (texto)
 *   font-script                 -> Allura (UMA frase manuscrita por seção de destaque)
 *   font-store-heading          -> Montserrat 400-700 (vitrine rosé: títulos, preços, botões)
 *   font-store-body             -> Raleway 400, 500 (vitrine rosé: texto e banners)
 *   font-wordmark               -> Cormorant Garamond 400, 500 (logotipo)
 *
 * Só para o texto do cliente nas prévias e em /personalizar (sem preload, carregam quando usadas):
 *   font-personalize-classic -> Fraunces
 *   font-personalize-elegant -> Playfair Display itálico
 *   font-personalize-script  -> Caveat
 *   font-personalize-bold    -> Archivo Black
 */

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  display: 'swap',
  variable: '--font-poppins',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-inter',
})

const allura = Allura({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-allura',
})

/** Vitrine rosé: títulos, preços e botões (font-store-heading). */
const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-montserrat',
})

/** Vitrine rosé: texto, nome de produto e banners (font-store-body). */
const raleway = Raleway({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-raleway',
})

/** Wordmark da loja: serifa fina em caixa alta (font-wordmark). */
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-cormorant',
})

/** Variável com o eixo opsz (tamanho óptico). Só renderiza o texto do cliente. */
const fraunces = Fraunces({
  subsets: ['latin'],
  axes: ['opsz'],
  display: 'swap',
  preload: false,
  variable: '--font-fraunces',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  style: ['italic'],
  display: 'swap',
  preload: false,
  variable: '--font-playfair',
})

const caveat = Caveat({
  subsets: ['latin'],
  display: 'swap',
  preload: false,
  variable: '--font-caveat',
})

const archivo = Archivo_Black({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  preload: false,
  variable: '--font-archivo',
})

/**
 * Classes que definem as variáveis das 7 fontes.
 * Aplique no elemento <html> (as variáveis precisam estar acima de qualquer uso).
 */
export const fontClassNames = [
  poppins.variable,
  inter.variable,
  allura.variable,
  montserrat.variable,
  raleway.variable,
  cormorant.variable,
  fraunces.variable,
  playfair.variable,
  caveat.variable,
  archivo.variable,
].join(' ')
