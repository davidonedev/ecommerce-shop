import type { Review, UgcPhoto } from '@/types/product'
import { photo } from './images'

export const reviewSummary = { average: 4.9, total: 2300 }

export const reviews: Review[] = [
  {
    id: 1,
    author: 'Mariana Souza',
    city: 'Belo Horizonte, MG',
    product: 'Tapete de sala com o nome da família',
    rating: 5,
    text: 'Ficou lindo na sala e a prévia que recebi antes de produzir era idêntica ao tapete que chegou. Já pedi outro de presente.',
    avatar: photo('mulher1', 'Retrato de Mariana sorrindo', 160),
  },
  {
    id: 2,
    author: 'Rafael Lima',
    city: 'Curitiba, PR',
    product: 'Capacho de entrada com o seu sobrenome',
    rating: 5,
    text: 'Entrega rápida e o acabamento é muito melhor do que eu esperava. Os vizinhos já perguntaram onde comprei.',
    avatar: photo('homem1', 'Retrato de Rafael sorrindo', 160),
  },
  {
    id: 3,
    author: 'Camila Duarte',
    city: 'Recife, PE',
    product: 'Kit presente para mamães',
    rating: 5,
    text: 'Presenteei minha mãe e ela chorou de emoção. A embalagem veio caprichada e com o nome dela bordado certinho.',
    avatar: photo('mulher2', 'Retrato de Camila', 160),
  },
  {
    id: 4,
    author: 'Juliana Prado',
    city: 'Porto Alegre, RS',
    product: 'Tapete pet com o nome do seu bichinho',
    rating: 5,
    text: 'O cachorro adotou o tapete no mesmo dia. Lava fácil e a cor não desbotou.',
    avatar: photo('mulher3', 'Retrato de Juliana', 160),
  },
]

export const ugcPhotos: UgcPhoto[] = [
  { id: 1, handle: '@mari.souza', image: photo('salaTapeteLaranja', 'Sala decorada com tapete personalizado', 600) },
  { id: 2, handle: '@rafa.lima', image: photo('tote', 'Bolsa tote personalizada', 600) },
  { id: 3, handle: '@cami.duarte', image: photo('presenteRosa', 'Presente personalizado embrulhado', 600) },
  { id: 4, handle: '@ju.prado', image: photo('cachorro2', 'Cachorro sorrindo ao lado do tapete pet', 600) },
  { id: 5, handle: '@casa.da.ana', image: photo('salaSofaCinza', 'Sala com sofá cinza e tapete', 600) },
  { id: 6, handle: '@lu.viaja', image: photo('praia', 'Praia com bolsa personalizada', 600) },
  { id: 7, handle: '@bia.e.theo', image: photo('infantil', 'Brincadeira sobre tapete infantil', 600) },
  { id: 8, handle: '@studio.nove', image: photo('escritorio', 'Escritório com capacho personalizado', 600) },
]
