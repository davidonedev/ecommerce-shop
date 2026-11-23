import { motion } from '@/lib/tokens'
import { CartBumpDemo, FadeUpReplay, SlideFadeDemo } from './FadeUpReplay'

export function MotionDemo() {
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="space-y-8">
        <FadeUpReplay />
        <SlideFadeDemo />
        <CartBumpDemo />
      </div>

      <div className="space-y-4">
        <ul className="divide-y divide-border rounded-card border border-border bg-bg">
          {Object.entries(motion.durations).map(([name, ms]) => (
            <li key={name} className="flex items-center justify-between px-5 py-3 text-small">
              <span className="font-semibold text-text">duration-{name}</span>
              <span className="text-text-muted">{ms}ms</span>
            </li>
          ))}
          <li className="flex items-center justify-between px-5 py-3 text-small">
            <span className="font-semibold text-text">ease-soft</span>
            <span className="text-text-muted">{motion.easing.soft}</span>
          </li>
        </ul>
        <ul className="list-disc space-y-1 pl-5 text-small text-text-muted">
          <li>
            <code className="font-semibold text-text">fade-slide</code>: crossfade de slide, 400ms.
          </li>
          <li>
            <code className="font-semibold text-text">lift</code> / hover de tile e card: sobe 2px.
          </li>
          <li>
            <code className="font-semibold text-text">image-zoom</code> e{' '}
            <code className="font-semibold text-text">arrow-slide</code>: zoom 1,04 e seta 4px (o pai tem{' '}
            <code className="font-semibold text-text">group</code>).
          </li>
          <li>
            Botão do card: transição de cor em <code className="font-semibold text-text">duration-button</code> (200ms).
          </li>
        </ul>
        <p className="text-small text-text-muted">
          Com <code className="font-semibold text-text">prefers-reduced-motion</code> ativo, entradas aparecem já no
          estado final, o shimmer e o pulo do contador param e as transições ficam instantâneas.
        </p>
      </div>
    </div>
  )
}
