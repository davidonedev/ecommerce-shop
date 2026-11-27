import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import { colorHex, colors, contrastPairs, contrastRatio, legacyAliases } from './index'

const css = readFileSync(resolve(process.cwd(), 'src/app/globals.css'), 'utf8')

/** Texto do bloco CSS que começa em `start` até a chave de fechamento correspondente. */
function block(start: string): string {
  const from = css.indexOf(start)
  expect(from, `bloco "${start}" não encontrado em globals.css`).toBeGreaterThan(-1)
  let depth = 0
  for (let i = css.indexOf('{', from); i < css.length; i++) {
    if (css[i] === '{') depth++
    if (css[i] === '}' && --depth === 0) return css.slice(from, i + 1)
  }
  throw new Error(`bloco "${start}" não fecha`)
}

function cssColor(scope: string, name: string): string | undefined {
  return new RegExp(`--color-${name}:\\s*(#[0-9a-fA-F]{6})`).exec(scope)?.[1]?.toUpperCase()
}

describe('tokens: CSS e TypeScript não se afastam', () => {
  const light = block('@theme static')

  it.each(colors.map((c) => [c.name, c.hex] as const))('cor %s (%s) igual no CSS', (name, hex) => {
    expect(cssColor(light, name)).toBe(hex.toUpperCase())
  })

  it('mantém os hex das cores-base (não alterar)', () => {
    const brief: Record<string, string> = {
      rose: '#E6ACA4',
      'rose-strong': '#9C5953',
      'rose-soft': '#F7E4E0',
      graphite: '#3B3B3B',
      'graphite-hover': '#2B2B2B',
      sand: '#F5EBE6',
      bg: '#FFFFFF',
      surface: '#F4F4F5',
      text: '#111827',
      'text-muted': '#5B6170',
      'text-subtle': '#9CA3AF',
      star: '#F5A623',
      border: '#E5E7EB',
      'on-dark': '#FFFFFF',
    }
    for (const [name, hex] of Object.entries(brief)) {
      expect(colorHex[name as keyof typeof colorHex], name).toBe(hex)
    }
  })

  it('todo apelido legado aponta para um token que existe', () => {
    for (const [legacy, target] of Object.entries(legacyAliases)) {
      expect(colorHex[target], `${legacy} -> ${target}`).toBeDefined()
      expect(css).toContain(`--color-${legacy}: var(--color-${target})`)
    }
  })
})

describe('contraste WCAG: a decisão de uso de cada par continua verdadeira', () => {
  const minimum = { text: 4.5, large: 3, ui: 3 } as const

  it.each(contrastPairs.map((p) => [`${p.fg} / ${p.bg} (${p.kind})`, p] as const))('%s', (_label, pair) => {
    const ratio = contrastRatio(colorHex[pair.fg], colorHex[pair.bg])
    if (pair.kind === 'avoid') {
      // Combinação proibida: precisa continuar abaixo do mínimo de texto, senão a regra está desatualizada.
      expect(ratio).toBeLessThan(4.5)
    } else {
      expect(ratio).toBeGreaterThanOrEqual(minimum[pair.kind])
    }
  })

  it('os derivados passam onde substituem a cor original', () => {
    expect(contrastRatio(colorHex['rose-strong'], colorHex.bg)).toBeGreaterThanOrEqual(4.5)
    expect(contrastRatio(colorHex['rose-strong'], colorHex.sand)).toBeGreaterThanOrEqual(4.5)
    expect(contrastRatio(colorHex['field-border'], colorHex.bg)).toBeGreaterThanOrEqual(3)
    expect(contrastRatio(colorHex['field-border'], colorHex.surface)).toBeGreaterThanOrEqual(3)
    expect(contrastRatio(colorHex['on-graphite-muted'], colorHex.graphite)).toBeGreaterThanOrEqual(4.5)
    expect(contrastRatio(colorHex.danger, colorHex.bg)).toBeGreaterThanOrEqual(4.5)
  })

  it('o rosé claro NÃO serve para texto pequeno nem com texto branco por cima', () => {
    expect(contrastRatio(colorHex.rose, colorHex.bg)).toBeLessThan(4.5)
    expect(contrastRatio(colorHex['on-dark'], colorHex.rose)).toBeLessThan(4.5)
    // E o grafite sobre o rosé (painel de oferta, barra de aviso) passa.
    expect(contrastRatio(colorHex.graphite, colorHex.rose)).toBeGreaterThanOrEqual(4.5)
  })
})
