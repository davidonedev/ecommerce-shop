'use client'

import * as ToastPrimitive from '@radix-ui/react-toast'
import { CheckCircle2, Info, TriangleAlert, X } from 'lucide-react'
import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import { IconButton } from './icon-button'
import { toastClass } from './variants'

export type ToastTone = 'success' | 'info' | 'error'

export interface ToastInput {
  title: string
  description?: string
  tone?: ToastTone
}

interface ToastItem extends ToastInput {
  id: number
}

const ToastContext = createContext<((toast: ToastInput) => void) | null>(null)

const toneIcon = {
  success: <CheckCircle2 aria-hidden className="mt-0.5 size-5 shrink-0 text-graphite" />,
  info: <Info aria-hidden className="mt-0.5 size-5 shrink-0 text-text-muted" />,
  error: <TriangleAlert aria-hidden className="mt-0.5 size-5 shrink-0 text-danger" />,
} as const

let nextId = 1

/** Provedor de avisos (toasts). Já incluído no layout raiz; use o hook useToast() para disparar. */
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const toast = useCallback((input: ToastInput) => {
    setToasts((current) => [...current, { ...input, id: nextId++ }])
  }, [])

  const remove = useCallback((id: number) => {
    setToasts((current) => current.filter((t) => t.id !== id))
  }, [])

  const value = useMemo(() => toast, [toast])

  return (
    <ToastContext.Provider value={value}>
      <ToastPrimitive.Provider swipeDirection="down" duration={5000} label="Avisos">
        {children}
        {toasts.map((t) => (
          <ToastPrimitive.Root
            key={t.id}
            className={toastClass}
            onOpenChange={(open) => {
              if (!open) remove(t.id)
            }}
          >
            {toneIcon[t.tone ?? 'info']}
            <div className="flex-1">
              <ToastPrimitive.Title className="text-body font-medium">{t.title}</ToastPrimitive.Title>
              {t.description ? (
                <ToastPrimitive.Description className="mt-0.5 text-small text-text-muted">
                  {t.description}
                </ToastPrimitive.Description>
              ) : null}
            </div>
            <ToastPrimitive.Close asChild>
              <IconButton label="Fechar aviso" size="sm" className="-mr-2 -mt-2">
                <X aria-hidden className="size-4" />
              </IconButton>
            </ToastPrimitive.Close>
          </ToastPrimitive.Root>
        ))}
        <ToastPrimitive.Viewport className="fixed inset-x-0 bottom-0 z-50 flex flex-col gap-2 p-4 outline-none md:inset-x-auto md:right-0 md:w-[26rem]" />
      </ToastPrimitive.Provider>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const toast = useContext(ToastContext)
  if (!toast) throw new Error('useToast precisa estar dentro de <ToastProvider>.')
  return { toast }
}

/** Igual a useToast, mas devolve `null` fora do provedor (para componentes que funcionam com ou sem aviso). */
export function useOptionalToast() {
  return useContext(ToastContext)
}
