import type { ProductImage } from '@/types/product'

/**
 * Fotos de apoio do Unsplash (placeholders até a loja ter as fotos reais dos produtos).
 * Para trocar por fotos próprias, altere apenas os valores de `photos` ou a função `photo`.
 */
const photos = {
  tapeteEnrolado: '1600166898405-da9535204843',
  salaAmarela: '1586023492125-27b2c045efd7',
  salaSofaVerde: '1555041469-a586c61ea9bc',
  salaSofaCinza: '1493663284031-b7e3aefcae8e',
  quartoLuminaria: '1522771739844-6a9f6d5f14af',
  quartoAconchegante: '1540518614846-7eded433c457',
  banheiro: '1507652313519-d4e9174996dd',
  salaClara: '1513694203232-719a280e022f',
  salaTapeteLaranja: '1618220179428-22790b461013',
  salaPlantas: '1583847268964-b28dc8f51f92',
  salaJanelas: '1505691938895-1758d7feb511',
  salaSofaAzul: '1484101403633-562f891dc89a',
  ambienteBranco: '1519710164239-da123dc03ef4',
  infantil: '1596461404969-9ae70f2830c1',
  mochila: '1553062407-98eeb64c6a62',
  tote: '1544816155-12df9643f363',
  bolsaFloral: '1591561954557-26941169b49e',
  bolsaLaranja: '1590874103328-eac38a683ce7',
  praia: '1507525428034-b723cf961d3e',
  cachorro: '1587300003388-59208cc962cb',
  cachorro2: '1543466835-00a7907e9de1',
  presenteVermelho: '1513885535751-8b9238bd345a',
  presenteRosa: '1549465220-1a8b9238cd48',
  bebe: '1519689680058-324335c77eba',
  escritorio: '1556761175-5973dc0f32e7',
  corredor: '1497366216548-37526070297c',
  mulher1: '1494790108377-be9c29b29330',
  homem1: '1507003211169-0a1dd7228f2d',
  mulher2: '1438761681033-6461ffad8d80',
  mulher3: '1544005313-94ddf0286df2',
  homem2: '1500648767791-00dcc994a43e',
} as const

export type PhotoKey = keyof typeof photos

export function photoUrl(key: PhotoKey, width = 900) {
  return `https://images.unsplash.com/photo-${photos[key]}?auto=format&fit=crop&w=${width}&q=80`
}

export function photo(key: PhotoKey, alt: string, width = 900): ProductImage {
  return { src: photoUrl(key, width), alt }
}
