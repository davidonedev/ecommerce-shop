import { MessageCircle } from 'lucide-react'
import { brand, whatsappLink } from '@/lib/brand'

/** Botão redondo de WhatsApp fixo no canto inferior direito (padrão de conversão no Brasil). */
export function WhatsappFab() {
  return (
    <a
      href={whatsappLink('Olá! Vim pelo site e gostaria de ajuda.')}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 z-40 inline-flex size-14 items-center justify-center rounded-full bg-success text-on-dark shadow-lift transition duration-(--duration-button) ease-soft hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-success motion-reduce:hover:scale-100"
    >
      <MessageCircle aria-hidden strokeWidth={1.5} className="size-7" />
      <span className="sr-only">Falar no WhatsApp, {brand.whatsappDisplay} (abre em nova aba)</span>
    </a>
  )
}
