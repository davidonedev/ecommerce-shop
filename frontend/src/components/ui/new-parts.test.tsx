import { fireEvent, render, screen } from '@testing-library/react'
import { Gift, Percent, Truck } from 'lucide-react'
import { describe, expect, it } from 'vitest'
import { categories } from '@/data/mock/categories'
import { AvatarStack } from './avatar-stack'
import { BenefitRow } from './benefit-row'
import { CategoryTile } from './category-tile'
import { CountBadge } from './count-badge'
import { PromoPanel, PromoPanels } from './promo-panel'
import { SectionLink } from './section-link'

describe('BenefitRow', () => {
  it('lista os benefícios com ícone decorativo, título em caixa alta de 11px e apoio', () => {
    render(
      <BenefitRow
        label="Benefícios do hero"
        items={[
          { icon: Truck, title: 'Frete grátis', description: 'Acima de R$ 299' },
          { icon: Gift, title: 'Prévia grátis', description: 'Aprove antes de produzir' },
        ]}
      />,
    )

    const list = screen.getByRole('list', { name: 'Benefícios do hero' })
    expect(list.querySelectorAll('li')).toHaveLength(2)
    expect(screen.getByText('Frete grátis').className).toContain('text-benefit-title')
    expect(screen.getByText('Acima de R$ 299').className).toContain('text-benefit-text')
    for (const svg of list.querySelectorAll('svg')) expect(svg).toHaveAttribute('aria-hidden', 'true')
  })

  it('separa os itens por divisor vertical fino (menos o primeiro) e rola na horizontal no celular', () => {
    render(
      <BenefitRow
        items={[
          { icon: Truck, title: 'A', description: 'a' },
          { icon: Gift, title: 'B', description: 'b' },
        ]}
      />,
    )

    const items = screen.getAllByRole('listitem')
    expect(items[0].className).toContain('first:border-l-0')
    expect(items[1].className).toContain('border-l')
    expect(screen.getByRole('list').className).toContain('overflow-x-auto')
  })
})

describe('PromoPanel', () => {
  it('painel de oferta (caramelo) usa texto MARINHO, nunca branco (branco sobre caramelo reprova)', () => {
    render(
      <PromoPanels>
        <PromoPanel tone="caramel" icon={Percent} title="Oferta especial" href="/produtos" linkLabel="Ver ofertas">
          Até 50% off em tapetes selecionados
        </PromoPanel>
      </PromoPanels>,
    )

    const panel = screen.getByRole('heading', { name: 'Oferta especial' }).parentElement?.parentElement as HTMLElement
    expect(panel.className).toContain('bg-caramel')
    expect(panel.className).toContain('text-navy')
    expect(panel.className).not.toContain('text-on-dark')
    expect(screen.getByText('Até 50% off em tapetes selecionados').className).toContain('text-navy')
  })

  it('painel marinho tem texto claro e anel de foco claro; o cinza-claro usa texto marinho', () => {
    render(
      <>
        <PromoPanel tone="navy" icon={Truck} title="Frete grátis" href="/produtos" linkLabel="Comprar agora">
          Acima de R$ 299
        </PromoPanel>
        <PromoPanel tone="light" icon={Gift} title="Clube" href="/em-breve" linkLabel="Cadastrar grátis">
          10% off
        </PromoPanel>
      </>,
    )

    const navyLink = screen.getByRole('link', { name: 'Comprar agora' })
    expect(navyLink.className).toContain('focus-visible:outline-caramel-light')
    expect(navyLink).toHaveAttribute('href', '/produtos')
    expect(screen.getByText('Acima de R$ 299').className).toContain('text-on-dark-muted')
    expect(screen.getByRole('link', { name: 'Cadastrar grátis' }).className).toContain('text-navy')
  })
})

describe('CategoryTile', () => {
  it('é um link quadrado cinza-claro com a imagem e o nome dentro do tile', () => {
    const c = categories[0]
    render(<CategoryTile name={c.name} href={c.href} image={c.image} />)

    const link = screen.getByRole('link', { name: new RegExp(c.name) })
    expect(link).toHaveAttribute('href', c.href)
    expect(link.className).toContain('aspect-square')
    expect(link.className).toContain('bg-surface')
    expect(link.className).toContain('rounded-card')
    expect(link.className).toContain('hover:border-navy')
    expect(screen.getByText(c.name).className).toContain('text-tile-name')
  })

  it('o tile "mais categorias" mostra um ícone de grade em vez de foto', () => {
    const { container } = render(<CategoryTile name="Mais categorias" href="/produtos" more />)

    expect(container.querySelector('img')).toBeNull()
    expect(container.querySelector('svg')).toHaveAttribute('aria-hidden', 'true')
  })
})

describe('CountBadge', () => {
  it('não aparece com 0, mostra o número e "99+" acima de 99', () => {
    const { container, rerender } = render(<CountBadge count={0} />)
    expect(container).toBeEmptyDOMElement()

    rerender(<CountBadge count={3} />)
    expect(container).toHaveTextContent('3')

    rerender(<CountBadge count={120} />)
    expect(container).toHaveTextContent('99+')
  })

  it('"pula" só quando o número muda (não na primeira exibição) e para ao fim da animação', () => {
    const { container, rerender } = render(<CountBadge count={1} />)
    const badge = () => container.firstElementChild as HTMLElement
    expect(badge().className).not.toContain('animate-cart-bump')

    rerender(<CountBadge count={2} />)
    expect(badge().className).toContain('animate-cart-bump')

    // O jsdom não tem AnimationEvent, então o React escuta o nome com prefixo; no navegador é 'animationend'.
    fireEvent(badge(), new Event('animationend', { bubbles: true }))
    fireEvent(badge(), new Event('webkitAnimationEnd', { bubbles: true }))
    expect(badge().className).not.toContain('animate-cart-bump')
  })

  it('é um círculo marinho decorativo (o rótulo do carrinho é quem informa a quantidade)', () => {
    const { container } = render(<CountBadge count={2} />)

    const badge = container.firstElementChild as HTMLElement
    expect(badge).toHaveAttribute('aria-hidden', 'true')
    expect(badge.className).toContain('rounded-full')
    expect(badge.className).toContain('bg-navy')
  })
})

describe('AvatarStack e SectionLink', () => {
  it('avatares sobrepostos são decorativos (a nota vai em texto ao lado)', () => {
    const { container } = render(
      <AvatarStack
        avatars={[
          { src: 'https://images.unsplash.com/photo-1', alt: 'A' },
          { src: 'https://images.unsplash.com/photo-2', alt: 'B' },
        ]}
      />,
    )

    expect(container.firstElementChild).toHaveAttribute('aria-hidden', 'true')
    expect(container.firstElementChild?.className).toContain('-space-x-3')
    expect(container.querySelectorAll('img')).toHaveLength(2)
  })

  it('SectionLink mostra a seta que desliza e a área de toque de 44px', () => {
    render(<SectionLink href="/produtos">Ver todos os produtos</SectionLink>)

    const link = screen.getByRole('link', { name: 'Ver todos os produtos' })
    expect(link).toHaveAttribute('href', '/produtos')
    expect(link.className).toContain('min-h-11')
    expect(link.className).toContain('text-button-sm')
    expect(link.querySelector('svg')?.getAttribute('class')).toContain('arrow-slide')
  })
})
