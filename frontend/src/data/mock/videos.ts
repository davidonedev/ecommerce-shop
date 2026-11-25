/**
 * Vídeos verticais de clientes (placeholders até a loja ter os vídeos reais).
 * Troque `poster` pela capa do vídeo e `href` pelo link do vídeo no YouTube.
 */
export interface CustomerVideo {
  id: string
  title: string
  poster: { src: string; alt: string }
  href: string
}

export const customerVideos: CustomerVideo[] = [
  {
    id: 'chinelo-nome',
    title: 'Chinelo personalizado com nome',
    poster: { src: '/mock/produtos/chinelo-nome.jpg', alt: 'Capa do vídeo: chinelo personalizado' },
    href: 'https://youtube.com/',
  },
  {
    id: 'bolsa-tote',
    title: 'Bolsa tote com monograma',
    poster: { src: '/mock/produtos/bolsa-tote.jpg', alt: 'Capa do vídeo: bolsa tote personalizada' },
    href: 'https://youtube.com/',
  },
  {
    id: 'tapete-sala',
    title: 'Tapete de sala com o nome da família',
    poster: { src: '/mock/produtos/tapete-sala.jpg', alt: 'Capa do vídeo: tapete de sala personalizado' },
    href: 'https://youtube.com/',
  },
]
