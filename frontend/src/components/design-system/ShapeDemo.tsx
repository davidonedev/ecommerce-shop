import { radii, shadows, spacing } from '@/lib/tokens'

const radiusClass: Record<(typeof radii)[number]['name'], string> = {
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full',
}

const shadowClass: Record<(typeof shadows)[number]['name'], string> = {
  soft: 'shadow-soft',
  lift: 'shadow-lift',
}

/** Espaçamento, raios, sombras e grão. */
export function SpacingDemo() {
  return (
    <ul className="space-y-3 rounded-md border border-border bg-surface p-5 shadow-soft">
      {spacing.map((s) => (
        <li key={s.step} className="grid grid-cols-[5rem_1fr] items-center gap-4">
          <span className="text-small text-ink-muted">
            {s.step} · {s.px}px
          </span>
          <span
            className="block h-3 rounded-full bg-accent"
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
            className={`flex h-20 w-28 items-center justify-center border border-ink-muted bg-sand text-small text-ink ${radiusClass[r.name]}`}
          >
            {r.name}
          </span>
          <span className="text-small text-ink-muted">
            {r.name === 'full' ? 'pill' : `${r.px}px`} · {r.usage}
          </span>
        </li>
      ))}
    </ul>
  )
}

export function ShadowsDemo() {
  return (
    <ul className="grid gap-6 sm:grid-cols-2">
      {shadows.map((s) => (
        <li key={s.name} className={`rounded-md bg-surface p-6 ${shadowClass[s.name]}`}>
          <p className="font-sans text-small font-semibold text-ink">shadow-{s.name}</p>
          <p className="mt-1 text-small text-ink-muted">{s.usage}</p>
        </li>
      ))}
    </ul>
  )
}

export function GrainDemo() {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <div className="bg-grain flex h-40 items-center justify-center rounded-md bg-sand text-small text-ink">
        bg-grain (3,5%)
      </div>
      <div className="flex h-40 items-center justify-center rounded-md bg-sand text-small text-ink">sem textura</div>
    </div>
  )
}
