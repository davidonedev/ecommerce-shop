import type { Category } from '@/types/product'
import { photo } from './images'

export const categories: Category[] = [
  {
    slug: 'tapetes-sala',
    name: 'Tapetes de sala',
    count: '32 modelos',
    href: '/produtos?categoria=tapetes-sala',
    image: photo('salaTapeteLaranja', 'Sala clara com tapete, plantas e poltrona laranja', 1000),
  },
  {
    slug: 'tapetes-entrada',
    name: 'Capachos de entrada',
    count: '24 modelos',
    href: '/produtos?categoria=tapetes-entrada',
    image: photo('corredor', 'Corredor de entrada com piso claro', 800),
  },
  {
    slug: 'tapetes-quarto',
    name: 'Tapetes de quarto',
    count: '18 modelos',
    href: '/produtos?categoria=tapetes-quarto',
    image: photo('quartoAconchegante', 'Quarto aconchegante com cama de casal', 800),
  },
  {
    slug: 'bolsas-tote',
    name: 'Bolsas tote',
    count: '16 modelos',
    href: '/produtos?categoria=bolsas-tote',
    image: photo('tote', 'Bolsa tote de lona cor areia', 800),
  },
  {
    slug: 'necessaires',
    name: 'Necessaires',
    count: '12 modelos',
    href: '/produtos?categoria=necessaires',
    image: photo('bolsaFloral', 'Bolsa estampada em tons florais', 800),
  },
  {
    slug: 'pet',
    name: 'Para o seu pet',
    count: '9 modelos',
    href: '/produtos?categoria=pet',
    image: photo('cachorro', 'Cachorro branco e marrom sorrindo', 800),
  },
  {
    slug: 'infantil',
    name: 'Infantil',
    count: '14 modelos',
    href: '/produtos?categoria=infantil',
    image: photo('infantil', 'Trenzinho de madeira sobre tapete infantil', 800),
  },
  {
    slug: 'empresas',
    name: 'Com logotipo',
    count: 'Sob encomenda',
    href: '/produtos?categoria=empresas',
    image: photo('escritorio', 'Escritório moderno com paredes de tijolo', 1000),
  },
]
