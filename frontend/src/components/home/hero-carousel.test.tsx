import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { HeroCarousel } from './hero-carousel'
import type { ApiBanner } from '@/lib/catalog-api'

const banners: ApiBanner[] = [
  {
    id: 1,
    title: 'Primeiro banner',
    subtitle: 'Sub 1',
    imageUrl: '/mock/banners/banner-1.jpg',
    mobileImageUrl: null,
    linkUrl: '/personalizar',
    ctaLabel: 'Personalizar',
    position: 1,
  },
  {
    id: 2,
    title: 'Segundo banner',
    subtitle: null,
    imageUrl: '/mock/banners/banner-2.jpg',
    mobileImageUrl: null,
    linkUrl: '/produtos',
    ctaLabel: 'Ver',
    position: 2,
  },
  {
    id: 3,
    title: 'Terceiro banner',
    subtitle: null,
    imageUrl: '/mock/banners/banner-3.jpg',
    mobileImageUrl: null,
    linkUrl: null,
    ctaLabel: null,
    position: 3,
  },
]

const slide = (n: string) => document.querySelector<HTMLElement>('[aria-label="' + n + ' de 3"]')!

describe('HeroCarousel', () => {
  it('não renderiza nada sem banners', () => {
    const { container } = render(<HeroCarousel banners={[]} />)
    expect(container).toBeEmptyDOMElement()
  })

  it('tem um único h1 (primeiro slide) e os demais são h2', () => {
    render(<HeroCarousel banners={banners} />)
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
    expect(screen.getByRole('heading', { level: 1, name: 'Primeiro banner' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 2, name: 'Segundo banner', hidden: true })).toBeInTheDocument()
  })

  it('troca de slide pelas setas e esconde os inativos', () => {
    render(<HeroCarousel banners={banners} />)
    fireEvent.click(screen.getByRole('button', { name: 'Próximo slide' }))
    expect(slide('2')).not.toHaveAttribute('aria-hidden', 'true')
    expect(slide('1')).toHaveAttribute('aria-hidden', 'true')
  })

  it('volta ao último slide ao voltar do primeiro', () => {
    render(<HeroCarousel banners={banners} />)
    fireEvent.click(screen.getByRole('button', { name: 'Slide anterior' }))
    expect(slide('3')).toHaveAttribute('data-active')
  })

  it('navega pelo teclado com as setas', () => {
    render(<HeroCarousel banners={banners} />)
    fireEvent.keyDown(screen.getByRole('region', { name: 'Destaques da loja' }), { key: 'ArrowRight' })
    expect(slide('2')).toHaveAttribute('data-active')
  })

  it('links externos abrem em nova aba com rel seguro', () => {
    const external: ApiBanner[] = [{ ...banners[0], linkUrl: 'https://exemplo.com.br', ctaLabel: 'Abrir' }]
    render(<HeroCarousel banners={external} />)
    const link = screen.getByRole('link', { name: /Abrir/ })
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })
})
