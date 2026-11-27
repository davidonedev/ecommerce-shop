'use client'

import {
  Eye,
  Gift,
  Heart,
  Mail,
  Package,
  Percent,
  Plus,
  Search,
  Share2,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  Truck,
  User,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState, type ReactNode } from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { AvatarStack } from '@/components/ui/avatar-stack'
import { Badge } from '@/components/ui/badge'
import { BenefitRow } from '@/components/ui/benefit-row'
import { Button, ButtonArrow } from '@/components/ui/button'
import { CarouselArrow, CarouselDots } from '@/components/ui/carousel-controls'
import { CategoryCard } from '@/components/ui/category-card'
import { CategoryTile } from '@/components/ui/category-tile'
import { Chip } from '@/components/ui/chip'
import { CountBadge } from '@/components/ui/count-badge'
import { DiscountSeal } from '@/components/ui/discount-seal'
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'
import { Field } from '@/components/ui/field'
import { IconButton } from '@/components/ui/icon-button'
import { Input } from '@/components/ui/input'
import { Modal, ModalClose, ModalContent, ModalTrigger } from '@/components/ui/modal'
import { ProductCard } from '@/components/ui/product-card'
import { PromoPanel, PromoPanels } from '@/components/ui/promo-panel'
import { Rating } from '@/components/ui/rating'
import { SectionLink } from '@/components/ui/section-link'
import { Select } from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { useToast } from '@/components/ui/toast'
import { Tooltip } from '@/components/ui/tooltip'
import {
  buttonJoinedClass,
  cx,
  footerLinkClass,
  inputJoinedClass,
  paymentBadgeClass,
  socialButtonClass,
} from '@/components/ui/variants'
import { categories } from '@/data/mock/categories'
import { products } from '@/data/mock/products'
import { reviews } from '@/data/mock/reviews'

function Block({
  id,
  title,
  description,
  children,
}: {
  id: string
  title: string
  description?: string
  children: ReactNode
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-24 py-10">
      <h3 id={`${id}-title`} className="text-section-title text-graphite">
        {title}
      </h3>
      {description ? <p className="mt-1 max-w-2xl text-text-muted">{description}</p> : null}
      <div className="mt-6">{children}</div>
    </section>
  )
}

const fontChips = ['Clássica', 'Elegante', 'Manuscrita', 'Moderna']

const menu = ['Início', 'Tapetes', 'Bolsas', 'Coleções', 'Presentes', 'Sobre nós', 'Contato']

const heroBenefits = [
  { icon: Truck, title: 'Frete grátis', description: 'Acima de R$ 299' },
  { icon: Eye, title: 'Prévia grátis', description: 'Aprove antes de produzir' },
  { icon: ShieldCheck, title: 'Pagamento seguro', description: 'Pix, cartão e boleto' },
] as const

/** Topo montado como na referência: barra, header e hero (só a vitrine; a home real usa os mesmos componentes). */
function TopSample() {
  const [slide, setSlide] = useState(0)

  return (
    <div className="overflow-hidden rounded-card border border-border">
      {/* Barra superior */}
      <div className="bg-graphite">
        <div className="container-page flex min-h-11 items-center justify-between gap-4 py-2">
          <p className="flex-1 text-center text-topbar text-on-dark md:pl-32">
            Personalize o seu tapete com <span className="text-rose">frete grátis acima de R$ 299!</span>
          </p>
          <Button asChild variant="rose" size="xs" className="hidden md:inline-flex">
            <Link href="/produtos">
              Fale conosco
              <ButtonArrow />
            </Link>
          </Button>
        </div>
      </div>

      {/* Header */}
      <div className="border-b border-border bg-bg">
        <div className="container-page flex min-h-20 items-center justify-between gap-6">
          <div className="flex items-center gap-2.5 text-graphite">
            <ShoppingBag aria-hidden strokeWidth={1.5} className="size-8" />
            <div>
              <p className="text-price tracking-wide uppercase">[Nome da loja]</p>
              <p className="text-badge-xs text-text-muted">Acessórios personalizados</p>
            </div>
          </div>
          <nav aria-label="Menu de exemplo" className="hidden lg:block">
            <ul className="flex items-center gap-7">
              {menu.map((item, index) => (
                <li key={item}>
                  <a
                    href="#topo"
                    aria-current={index === 0 ? 'page' : undefined}
                    className={cx(
                      'inline-flex min-h-11 items-center border-b-2 text-nav text-graphite',
                      index === 0 ? 'border-graphite' : 'border-transparent hover:border-field-border',
                    )}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center gap-1">
            <IconButton label="Buscar" size="sm">
              <Search aria-hidden strokeWidth={1.5} className="size-5" />
            </IconButton>
            <IconButton label="Minha conta" size="sm">
              <User aria-hidden strokeWidth={1.5} className="size-5" />
            </IconButton>
            <a
              href="#topo"
              aria-label="Carrinho: 2 itens, total R$ 189,90"
              className="inline-flex min-h-11 items-center gap-2 rounded-control px-2 text-graphite"
            >
              <span className="relative inline-flex">
                <ShoppingCart aria-hidden strokeWidth={1.5} className="size-6" />
                <CountBadge count={2} className="absolute -right-2 -top-2" />
              </span>
              <span className="hidden text-cart-total sm:inline">R$ 189,90</span>
            </a>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div id="topo" className="relative isolate overflow-hidden bg-bg">
        {/*
          Bloco areia com a borda esquerda inclinada (topo mais à direita que a base). Na home real o bloco
          fica ~48% da largura; com o texto em português a coluna do título precisa de ~640px a 1440px
          para fechar "FEITO PARA VOCÊ." em uma linha (Poppins 800, 56px, caixa alta).
        */}
        <div
          aria-hidden
          className="clip-diagonal-left absolute inset-y-0 right-0 -z-10 hidden w-[47%] bg-sand [--diagonal-inset:12%] md:block"
        />
        <div className="container-page grid items-center gap-8 py-10 md:grid-cols-[54fr_46fr] md:py-14">
          <div className="relative z-10 min-w-0 md:pl-8">
            <p className="text-overline text-rose-strong">Bem-vindo à [nome da loja]</p>
            <p className="mt-3 text-display-hero text-graphite">
              Feito para você.
              <br />
              Do seu jeito.
            </p>
            <p className="text-script mt-2 text-rose-strong">Personalizado com carinho!</p>
            <p className="mt-3 max-w-sm text-body text-text-muted">
              Tapetes, bolsas e acessórios com o seu nome, sua foto ou sua arte, produzidos um a um.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button arrow>Personalizar agora</Button>
              <Button variant="outline">Ver coleções</Button>
            </div>
            <BenefitRow items={heroBenefits} className="mt-7" label="Benefícios do hero" />
          </div>

          <div className="relative -mx-4 bg-sand px-4 py-6 md:mx-0 md:bg-transparent md:p-0">
            <div className="relative aspect-4/3 overflow-hidden rounded-card md:rounded-none">
              {/* priority: é a imagem do 1º slide (LCP), então carrega sem esperar o scroll */}
              <Image
                src={products[0].images[1].src}
                alt={products[0].images[1].alt}
                fill
                priority
                sizes="(min-width: 768px) 46vw, 100vw"
                className="object-cover mix-blend-multiply"
              />
            </div>
            <DiscountSeal className="absolute left-4 top-2 md:-left-8 md:top-0" />
          </div>
        </div>

        <CarouselArrow
          direction="prev"
          appearance="chevron"
          onClick={() => setSlide((s) => (s + 2) % 3)}
          className="absolute left-1 top-1/2 hidden -translate-y-1/2 md:inline-flex"
        />
        <CarouselArrow
          direction="next"
          appearance="circle"
          onClick={() => setSlide((s) => (s + 1) % 3)}
          className="absolute right-3 top-1/2 hidden -translate-y-1/2 md:inline-flex"
        />
        <CarouselDots count={3} active={slide} onSelect={setSlide} label="Escolher slide do hero" className="pb-2" />
      </div>
    </div>
  )
}

/** Parte de baixo montada como na referência: tiles, cards, faixa de 3 painéis, confiança, newsletter e footer. */
function BottomSample() {
  const [email, setEmail] = useState('')
  const shopProducts = products.slice(0, 5).map((p, index) => ({
    ...p,
    // Os 2 primeiros viram produto pronto (botão ADICIONAR AO CARRINHO); os demais seguem personalizáveis (PERSONALIZAR).
    personalizable: index > 1 ? p.personalizable : false,
    oldPrice: index < 3 ? Math.round((p.price / (index === 0 ? 0.8 : 0.85)) * 100) / 100 : undefined,
  }))
  const avatars = reviews.slice(0, 4).map((r) => r.avatar)

  return (
    <div className="space-y-12">
      {/* Compre por categoria */}
      <div>
        <h4 className="text-center text-section-title text-graphite">Compre por categoria</h4>
        <ul className="mt-6 grid grid-cols-4 gap-3 lg:grid-cols-8">
          {categories.slice(0, 7).map((c) => (
            <li key={c.slug}>
              <CategoryTile name={c.name} href={c.href} image={c.image} />
            </li>
          ))}
          <li>
            <CategoryTile name="Mais categorias" href="/produtos" more />
          </li>
        </ul>
      </div>

      {/* Mais vendidos */}
      <div>
        <div className="section-head">
          <h4 className="text-section-title text-graphite">Mais vendidos</h4>
          <SectionLink href="/produtos">Ver todos os produtos</SectionLink>
        </div>
        <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {shopProducts.map((p) => (
            <li key={p.id}>
              <ProductCard product={p} variant="shop" className="h-full" />
            </li>
          ))}
        </ul>
      </div>

      {/* Faixa de 3 painéis */}
      <PromoPanels>
        <PromoPanel tone="graphite" icon={Package} title="Frete grátis" href="/produtos" linkLabel="Comprar agora">
          Em compras acima de R$ 299
        </PromoPanel>
        <PromoPanel tone="rose" icon={Percent} title="Oferta especial" href="/produtos" linkLabel="Ver ofertas">
          Até 50% off em tapetes selecionados
        </PromoPanel>
        <PromoPanel tone="light" icon={Gift} title="Clube de vantagens" href="/produtos" linkLabel="Cadastrar grátis">
          Cadastre-se e ganhe 10% off na 1ª compra
        </PromoPanel>
      </PromoPanels>

      {/* Confiança + newsletter */}
      <div className="grid gap-6 rounded-card border border-border p-6 lg:grid-cols-2 lg:items-center">
        <div className="flex flex-wrap items-center gap-5">
          <div className="flex items-center gap-3">
            <ShieldCheck aria-hidden strokeWidth={1.25} className="size-10 text-graphite" />
            <div>
              <p className="text-panel-title text-graphite">Milhares de clientes felizes</p>
              <p className="text-small text-text-muted">Peças únicas, clientes satisfeitos.</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <AvatarStack avatars={avatars} />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-section-title text-graphite">4,9/5</span>
                <Rating value={4.9} />
              </div>
              <p className="text-caption text-text-muted">Baseado em 2.500+ avaliações</p>
            </div>
          </div>
        </div>
        <form
          className="lg:border-l lg:border-border lg:pl-6"
          onSubmit={(event) => {
            event.preventDefault()
          }}
        >
          <p className="text-panel-title text-graphite">Assine nossa newsletter</p>
          <p className="mb-3 text-small text-text-muted">Novidades e lançamentos, direto no seu e-mail.</p>
          <div className="flex">
            <label htmlFor="ds-newsletter" className="sr-only">
              Seu e-mail
            </label>
            <Input
              id="ds-newsletter"
              type="email"
              placeholder="Seu e-mail"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className={inputJoinedClass}
            />
            <Button type="submit" className={buttonJoinedClass}>
              Inscrever
            </Button>
          </div>
        </form>
      </div>

      {/* Footer */}
      <div className="rounded-card bg-graphite p-8 text-on-dark">
        <div className="grid gap-8 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <ShoppingBag aria-hidden strokeWidth={1.5} className="size-8" />
              <p className="text-price tracking-wide uppercase">[Nome da loja]</p>
            </div>
            <p className="mt-3 max-w-xs text-small text-on-graphite-muted">
              Acessórios personalizados com o seu nome, sua foto ou sua arte.
            </p>
            <div className="mt-4 flex gap-2">
              {['Instagram', 'Facebook', 'TikTok', 'Pinterest'].map((network) => (
                <a key={network} href="#topo" aria-label={network} className={socialButtonClass}>
                  <Share2 aria-hidden strokeWidth={1.5} className="size-5" />
                </a>
              ))}
            </div>
          </div>
          {[
            ['Links rápidos', ['Início', 'Loja', 'Coleções', 'Sobre nós', 'Contato']],
            ['Atendimento', ['Dúvidas frequentes', 'Prazos e entregas', 'Trocas e devoluções']],
            ['Minha conta', ['Minha conta', 'Meus pedidos', 'Rastrear pedido']],
          ].map(([title, links]) => (
            <div key={title as string}>
              <p className="text-nav text-on-dark">{title as string}</p>
              <ul className="mt-3 space-y-1">
                {(links as string[]).map((link) => (
                  <li key={link}>
                    <a href="#topo" className={footerLinkClass}>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-on-graphite-muted/30 pt-5">
          <p className="text-small text-on-graphite-muted">© 2026 [Nome da loja]. Todos os direitos reservados.</p>
          <ul aria-label="Formas de pagamento" className="flex flex-wrap gap-2">
            {['Pix', 'Visa', 'Mastercard', 'Elo', 'Amex', 'Boleto'].map((method) => (
              <li key={method} className={paymentBadgeClass}>
                {method}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export function ComponentsShowcase() {
  const { toast } = useToast()
  const [chip, setChip] = useState('Clássica')
  const [loading, setLoading] = useState(false)

  return (
    <div className="divide-y divide-border">
      <Block
        id="topo-referencia"
        title="Topo da home"
        description="Barra superior, header e hero compostos só com componentes do sistema: texto grande e pesado, bloco areia com borda inclinada, selo circular, setas (chevron à esquerda e círculo à direita), pontos e linha de benefícios."
      >
        <TopSample />
      </Block>

      <Block
        id="botoes"
        title="Botões"
        description="Grafite cheio, contorno, rosé (sobre fundo grafite), fantasma, link e o botão do card. Todos com área de toque de 44px."
      >
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="primary">Primário</Button>
            <Button variant="primary" arrow>
              Com seta
            </Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Fantasma</Button>
            <Button variant="link">Link</Button>
          </div>
          <div className="flex flex-wrap items-center gap-3 rounded-card bg-graphite p-4">
            <Button variant="rose" size="xs" arrow>
              Fale conosco
            </Button>
            <Button variant="rose" arrow>
              Ver ofertas
            </Button>
          </div>
          <div className="max-w-52">
            <Button variant="cart">
              <ShoppingCart aria-hidden strokeWidth={1.5} className="size-4 shrink-0" />
              Adicionar ao carrinho
            </Button>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button size="sm">Pequeno</Button>
            <Button size="md">Médio</Button>
            <Button size="lg">Grande</Button>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button disabled>Desabilitado</Button>
            <Button
              loading={loading}
              onClick={() => {
                setLoading(true)
                setTimeout(() => setLoading(false), 1800)
              }}
            >
              {loading ? 'Enviando' : 'Clique para carregar'}
            </Button>
            <Button variant="accent">
              <ShoppingBag aria-hidden strokeWidth={1.5} className="size-5" />
              Legado: accent
            </Button>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <IconButton label="Adicionar">
              <Plus aria-hidden strokeWidth={1.5} className="size-5" />
            </IconButton>
            <IconButton label="Favoritar" pressed>
              <Heart aria-hidden strokeWidth={1.5} className="size-5 fill-graphite text-graphite" />
            </IconButton>
            <IconButton label="Carregando" loading>
              <Plus aria-hidden className="size-5" />
            </IconButton>
          </div>
        </div>
      </Block>

      <Block
        id="selos"
        title="Selos, chips e carrossel"
        description="Selo circular de desconto, badges (-20% grafite, PERSONALIZÁVEL com contorno rosé), chips e os controles do carrossel."
      >
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-6">
            <DiscountSeal />
            <DiscountSeal prefix="Só hoje" value="30%" suffix="OFF" label="30% de desconto só hoje" />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="discount">-20%</Badge>
            <Badge tone="customizable" />
            <Badge tone="bestseller" />
            <Badge tone="new" />
            <Badge tone="ready" />
          </div>
          <div role="group" aria-label="Fonte da personalização" className="flex flex-wrap gap-2">
            {fontChips.map((name) => (
              <Chip key={name} selected={chip === name} onClick={() => setChip(name)}>
                {name}
              </Chip>
            ))}
            <Chip disabled>Indisponível</Chip>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <CarouselArrow direction="prev" appearance="chevron" />
            <CarouselArrow direction="prev" appearance="circle" />
            <CarouselArrow direction="next" appearance="circle" />
            <CarouselDots count={3} active={0} onSelect={() => {}} label="Exemplo de pontos" />
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <span className="relative inline-flex">
              <ShoppingCart aria-hidden strokeWidth={1.5} className="size-7 text-graphite" />
              <CountBadge count={3} className="absolute -right-2 -top-2" />
            </span>
            <SectionLink href="/produtos">Ver todos os produtos</SectionLink>
          </div>
        </div>
      </Block>

      <Block
        id="campos"
        title="Campos"
        description="Rótulo, dica e erro ligados ao campo para leitores de tela. O select é o nativo, estilizado. Borda de campo de 3:1."
      >
        <div className="grid max-w-3xl gap-5 md:grid-cols-2">
          <Field label="Nome" hint="Máximo de 14 caracteres.">
            <Input placeholder="Casa da Ana" maxLength={14} />
          </Field>
          <Field label="E-mail" error="E-mail inválido">
            <Input type="email" defaultValue="ana@" />
          </Field>
          <Field label="Tamanho">
            <Select defaultValue="m">
              <option value="p">Pequeno (60 × 40 cm)</option>
              <option value="m">Médio (90 × 60 cm)</option>
              <option value="g">Grande (150 × 100 cm)</option>
            </Select>
          </Field>
          <Field label="Desabilitado">
            <Input disabled defaultValue="Somente leitura" />
          </Field>
        </div>
      </Block>

      <Block
        id="avaliacao"
        title="Avaliação"
        description="Estrelas amarelas de 12px e o nº de avaliações. Com showValue, a nota também sai em texto (o amarelo não atinge 3:1 sobre branco)."
      >
        <div className="flex flex-wrap items-center gap-8">
          <Rating value={5} count={64} />
          <Rating value={4.9} count={2300} showValue />
          <Rating value={3.5} />
          <Rating value={0} />
        </div>
      </Block>

      <Block
        id="cards"
        title="Cards e tiles"
        description="O card da vitrine tem selo -N% calculado do preço anterior, estrelas, preço com o antigo riscado e botão de largura total. Os tiles são quadrados, com o nome dentro."
      >
        <BottomSample />
        <div className="mt-12 space-y-4">
          <p className="text-small font-semibold text-text">
            Card detalhado (usado em /produtos) e card de categoria com foto
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.slice(0, 2).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
            {categories.slice(0, 2).map((c) => (
              <CategoryCard key={c.slug} category={c} />
            ))}
          </div>
        </div>
      </Block>

      <Block
        id="sobreposicoes"
        title="Modal, drawer, toast e tooltip"
        description="Foco preso dentro, Esc fecha e o foco volta ao botão de origem."
      >
        <div className="flex flex-wrap items-center gap-3">
          <Modal>
            <ModalTrigger asChild>
              <Button variant="outline">Abrir modal</Button>
            </ModalTrigger>
            <ModalContent
              title="Prévia da sua personalização"
              description="Confira como o seu nome vai ficar antes de produzirmos."
            >
              <div className="flex justify-end gap-3">
                <ModalClose asChild>
                  <Button variant="ghost">Voltar</Button>
                </ModalClose>
                <ModalClose asChild>
                  <Button>Aprovar prévia</Button>
                </ModalClose>
              </div>
            </ModalContent>
          </Modal>

          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="outline">Drawer à direita</Button>
            </DrawerTrigger>
            <DrawerContent title="Seu carrinho" description="Mini-carrinho lateral.">
              <p className="text-text-muted">O conteúdo do carrinho aparece aqui.</p>
            </DrawerContent>
          </Drawer>

          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="outline">Drawer à esquerda</Button>
            </DrawerTrigger>
            <DrawerContent title="Menu" side="left">
              <p className="text-text-muted">A navegação do menu mobile aparece aqui.</p>
            </DrawerContent>
          </Drawer>

          <Button
            variant="outline"
            onClick={() =>
              toast({
                title: 'Adicionado ao carrinho',
                description: 'Tapete de sala com o nome da família',
                tone: 'success',
              })
            }
          >
            Toast de sucesso
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              toast({ title: 'Não foi possível salvar', description: 'Tente novamente em instantes.', tone: 'error' })
            }
          >
            Toast de erro
          </Button>

          <Tooltip content="Prévia grátis antes da produção">
            <Button variant="ghost">Passe o mouse aqui</Button>
          </Tooltip>
        </div>
      </Block>

      <Block
        id="acordeao"
        title="Acordeão"
        description="Setas, Home e End navegam entre os itens; Enter e Espaço abrem."
      >
        <Accordion type="single" collapsible className="max-w-2xl">
          <AccordionItem value="prazo">
            <AccordionTrigger>Qual o prazo de produção?</AccordionTrigger>
            <AccordionContent>
              Produzimos cada peça sob encomenda, em até 7 dias úteis após a aprovação da prévia.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="lavagem">
            <AccordionTrigger>Posso lavar na máquina?</AccordionTrigger>
            <AccordionContent>
              Sim. Recomendamos ciclo delicado e secagem à sombra para preservar a estampa.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="troca">
            <AccordionTrigger>Como funcionam as trocas?</AccordionTrigger>
            <AccordionContent>
              Peças personalizadas só podem ser trocadas em caso de defeito de fabricação.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Block>

      <Block
        id="carregamento"
        title="Skeleton"
        description="Aparece enquanto o conteúdo carrega; é ignorado por leitores de tela."
      >
        <div className="grid max-w-sm gap-3">
          <Skeleton className="aspect-square" />
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-5 w-1/2" />
        </div>
      </Block>

      <p className="pt-8 text-small text-text-muted">
        <Mail aria-hidden strokeWidth={1.5} className="mr-1 inline size-4 align-text-bottom" />
        Os itens acima são a base de toda a home; nenhum usa cor ou tamanho fora dos tokens.
      </p>
    </div>
  )
}
