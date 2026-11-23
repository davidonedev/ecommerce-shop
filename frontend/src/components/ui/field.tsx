import { cloneElement, useId, type ReactElement, type ReactNode } from 'react'
import { cx } from './variants'

export interface FieldProps {
  label: string
  /** Texto de ajuda abaixo do campo. */
  hint?: ReactNode
  /** Mensagem de erro; quando presente, o campo é marcado como inválido. */
  error?: string
  className?: string
  /** O campo (Input ou Select). Recebe id, aria-describedby e invalid automaticamente. */
  children: ReactElement<{ id?: string; 'aria-describedby'?: string; invalid?: boolean }>
}

/** Rótulo + campo + dica/erro, com os vínculos de acessibilidade já feitos. */
export function Field({ label, hint, error, className, children }: FieldProps) {
  const id = useId()
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined

  return (
    <div className={cx('flex flex-col gap-1.5', className)}>
      <label htmlFor={id} className="text-small font-medium text-text">
        {label}
      </label>
      {cloneElement(children, { id, 'aria-describedby': describedBy, invalid: Boolean(error) || undefined })}
      {error ? (
        <p id={`${id}-error`} role="alert" className="text-small text-danger">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="text-small text-text-muted">
          {hint}
        </p>
      ) : null}
    </div>
  )
}
