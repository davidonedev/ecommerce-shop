'use client'

import { Heart, Plus, ShoppingBag } from 'lucide-react'
import { useState, type ReactNode } from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CategoryCard } from '@/components/ui/category-card'
import { Chip } from '@/components/ui/chip'
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'
import { Field } from '@/components/ui/field'
import { IconButton } from '@/components/ui/icon-button'
import { Input } from '@/components/ui/input'
import { Modal, ModalClose, ModalContent, ModalTrigger } from '@/components/ui/modal'
import { ProductCard } from '@/components/ui/product-card'
import { Rating } from '@/components/ui/rating'
import { Select } from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { useToast } from '@/components/ui/toast'
import { Tooltip } from '@/components/ui/tooltip'
import { categories } from '@/data/mock/categories'
import { products } from '@/data/mock/products'

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
      <h3 id={`${id}-title`} className="text-h3">
        {title}
      </h3>
      {description ? <p className="mt-1 max-w-2xl text-ink-muted">{description}</p> : null}
      <div className="mt-6">{children}</div>
    </section>
  )
}

const fontChips = ['Clássica', 'Elegante', 'Manuscrita', 'Moderna']

export function ComponentsShowcase() {
  const { toast } = useToast()
  const [chip, setChip] = useState('Clássica')
  const [loading, setLoading] = useState(false)

  return (
    <div className="divide-y divide-border">
      <Block
        id="botoes"
        title="Botões"
        description="Cinco variantes, três tamanhos. Todos com área de toque de pelo menos 44px."
      >
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="primary">Primário</Button>
            <Button variant="accent">Destaque</Button>
            <Button variant="secondary">Secundário</Button>
            <Button variant="ghost">Fantasma</Button>
            <Button variant="link">Link</Button>
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
              <ShoppingBag aria-hidden className="size-5" />
              Com ícone
            </Button>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <IconButton label="Adicionar">
              <Plus aria-hidden className="size-5" />
            </IconButton>
            <IconButton label="Favoritar" pressed>
              <Heart aria-hidden className="size-5 fill-accent text-accent" />
            </IconButton>
            <IconButton label="Carregando" loading>
              <Plus aria-hidden className="size-5" />
            </IconButton>
          </div>
        </div>
      </Block>

      <Block id="selos" title="Selos e chips" description="Selos informam; chips são escolhas que você liga e desliga.">
        <div className="space-y-6">
          <div className="flex flex-wrap gap-2">
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
        </div>
      </Block>

      <Block
        id="campos"
        title="Campos"
        description="Rótulo, dica e erro ligados ao campo para leitores de tela. O select é o nativo, estilizado."
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
        description="Preenchimento proporcional à nota; leitores de tela ouvem “Nota 4,9 de 5”."
      >
        <div className="flex flex-wrap items-center gap-8">
          <Rating value={5} count={64} />
          <Rating value={4.9} count={2300} />
          <Rating value={3.5} />
          <Rating value={0} />
        </div>
      </Block>

      <Block
        id="cards"
        title="Cards"
        description="Passe o mouse (ou foque com o teclado) no card de produto para ver a foto em ambiente."
      >
        <div className="space-y-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.slice(0, 4).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {categories.slice(0, 3).map((c) => (
              <CategoryCard key={c.slug} category={c} />
            ))}
            <CategoryCard category={categories[7]} shape="wide" />
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
              <Button variant="secondary">Abrir modal</Button>
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
                  <Button variant="accent">Aprovar prévia</Button>
                </ModalClose>
              </div>
            </ModalContent>
          </Modal>

          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="secondary">Drawer à direita</Button>
            </DrawerTrigger>
            <DrawerContent title="Seu carrinho" description="Mini-carrinho lateral.">
              <p className="text-ink-muted">O conteúdo do carrinho aparece aqui.</p>
            </DrawerContent>
          </Drawer>

          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="secondary">Drawer à esquerda</Button>
            </DrawerTrigger>
            <DrawerContent title="Menu" side="left">
              <p className="text-ink-muted">A navegação do menu mobile aparece aqui.</p>
            </DrawerContent>
          </Drawer>

          <Button
            variant="secondary"
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
            variant="secondary"
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
          <Skeleton className="aspect-[4/5]" />
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-5 w-1/2" />
        </div>
      </Block>
    </div>
  )
}
