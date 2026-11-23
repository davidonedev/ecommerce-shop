import { Archivo_Black, Caveat, Fraunces, Inter, Playfair_Display } from 'next/font/google'

/**
 * Fontes do design system (next/font, display: swap).
 * Cada uma expõe uma variável CSS, mapeada para utilitários Tailwind em globals.css:
 *   font-display            -> Fraunces (títulos)
 *   font-sans               -> Inter (texto e UI)
 *   font-personalize-classic -> Fraunces
 *   font-personalize-elegant -> Playfair Display itálico
 *   font-personalize-script  -> Caveat
 *   font-personalize-bold    -> Archivo Black
 */

/** Variável com os eixos opsz (tamanho óptico) e wght. Títulos grandes usam opsz alto automaticamente. */
const fraunces = Fraunces({
  subsets: ['latin'],
  axes: ['opsz'],
  display: 'swap',
  variable: '--font-fraunces',
})

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  style: ['italic'],
  display: 'swap',
  variable: '--font-playfair',
})

const caveat = Caveat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-caveat',
})

const archivo = Archivo_Black({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-archivo',
})

/**
 * Classes que definem as variáveis das 5 fontes.
 * Aplique no elemento <html> (as variáveis precisam estar acima de qualquer uso).
 */
export const fontClassNames = [
  fraunces.variable,
  inter.variable,
  playfair.variable,
  caveat.variable,
  archivo.variable,
].join(' ')
