import { radii, shadows, spacing } from '@/lib/tokens'

const radiusClass: Record<(typeof radii)[number]['name'], string> = {
  control: 'rounded-control',
  card: 'rounded-card',
  full: 'rounded-full',
}

const shadowClass: Record<(typeof shadows)[number]['name'], string> = {
  soft: 'shadow-soft',
  hover: 'shadow-hover',
  lift: 'shadow-lift',
}

/** Espaçamento, raios e sombras. */
export function SpacingDemo() {
  return (
    <ul className="space-y-3 rounded-card border border-border bg-bg p-5">
      {spacing.map((s) => (
        <li key={s.step} className="grid grid-cols-[5rem_1fr] items-center gap-4">
          <span className="text-small text-text-muted">
            {s.step} · {s.px}px
          </span>
          <span
            className="block h-3 rounded-full bg-caramel"
            style={{ width: `calc(var(--spacing) * ${s.step})` }}
            aria-hidden="true"
          />
        </li>
      ))}
    </ul>
  )
}

export function RadiiDemo() {
  return (
    <ul className="flex flex-wrap gap-6">
      {radii.map((r) => (
        <li key={r.name} className="flex flex-col items-start gap-2">
          <span
            className={`flex h-20 w-28 items-center justify-center border border-field-border bg-surface text-small text-text ${radiusClass[r.name]}`}
          >
            {r.name}
          </span>
          <span className="max-w-44 text-small text-text-muted">
            {r.name === 'full' ? 'círculo' : `${r.px}px`} · {r.usage}
          </span>
        </li>
      ))}
    </ul>
  )
}

export function ShadowsDemo() {
  return (
    <ul className="grid gap-6 sm:grid-cols-3">
      {shadows.map((s) => (
        <li key={s.name} className={`rounded-card border border-border bg-bg p-6 ${shadowClass[s.name]}`}>
          <p className="text-small font-semibold text-text">shadow-{s.name}</p>
          <p className="mt-1 text-small text-text-muted">{s.usage}</p>
        </li>
      ))}
    </ul>
  )
}
