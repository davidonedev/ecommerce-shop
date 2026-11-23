import { motion } from '@/lib/tokens'
import { FadeUpReplay } from './FadeUpReplay'

export function MotionDemo() {
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <FadeUpReplay />

      <div className="space-y-4">
        <ul className="divide-y divide-border rounded-md border border-border bg-surface shadow-soft">
          {Object.entries(motion.durations).map(([name, ms]) => (
            <li key={name} className="flex items-center justify-between px-5 py-3 text-small">
              <span className="font-semibold text-ink">duration-{name}</span>
              <span className="text-ink-muted">{ms}ms</span>
            </li>
          ))}
          <li className="flex items-center justify-between px-5 py-3 text-small">
            <span className="font-semibold text-ink">ease-soft</span>
            <span className="text-ink-muted">{motion.easing.soft}</span>
          </li>
        </ul>
        <p className="text-small text-ink-muted">
          Com <code className="font-semibold text-ink">prefers-reduced-motion</code> ativo, entradas aparecem já no
          estado final, o shimmer para e as transições ficam instantâneas.
        </p>
      </div>
    </div>
  )
}
