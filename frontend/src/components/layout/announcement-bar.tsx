import { brand } from '@/lib/brand'

/** Barra de aviso no topo: faixa rosé fina com a promoção do Pix. Texto grafite (contraste AA sobre o rosé claro). */
export function AnnouncementBar() {
  return (
    <div className="bg-rose text-graphite">
      <p className="container-page flex min-h-10 items-center justify-center py-2 text-center text-store-caption">
        Compre via PIX e tenha {brand.payment.pixDiscountPercent}% de desconto
      </p>
    </div>
  )
}
