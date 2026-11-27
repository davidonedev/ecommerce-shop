'use client'

import { ChevronRight, Mail } from 'lucide-react'
import { useId, useState, type FormEvent } from 'react'
import { storeButtonClass } from '@/components/ui/store-button'

const fieldClass =
  'h-11 w-full rounded-full border-0 bg-bg px-5 text-store-caption text-text placeholder:text-text-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-graphite'

/**
 * Faixa rosé de cadastro na newsletter, acima do rodapé. Texto grafite sobre o rosé claro (contraste AA).
 * ATENÇÃO: ainda não há API de newsletter. O envio só valida os campos e confirma na tela;
 * ligue `onSubmit` ao serviço de e-mail quando ele existir.
 */
export function Newsletter() {
  const id = useId()
  const [status, setStatus] = useState<'idle' | 'sent' | 'error'>('idle')

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const email = String(form.get('email') ?? '').trim()
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setStatus('error')
      return
    }
    setStatus('sent')
    event.currentTarget.reset()
  }

  return (
    <section aria-labelledby={`${id}-titulo`} className="section-gap bg-rose">
      <div className="container-page flex flex-col gap-4 py-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
        <div className="flex items-center gap-4">
          <Mail aria-hidden strokeWidth={1.25} className="size-10 shrink-0 text-graphite" />
          <div>
            <h2 id={`${id}-titulo`} className="text-store-nav text-graphite">
              Cadastre-se em nossa newsletter
            </h2>
            <p className="text-store-caption text-graphite">e receba novidades e promoções</p>
          </div>
        </div>

        <form onSubmit={onSubmit} noValidate className="flex flex-col gap-3 sm:flex-row lg:flex-1 lg:max-w-2xl">
          <label className="sr-only" htmlFor={`${id}-nome`}>
            Seu nome
          </label>
          <input id={`${id}-nome`} name="name" type="text" autoComplete="name" placeholder="Digite o seu nome" className={fieldClass} />
          <label className="sr-only" htmlFor={`${id}-email`}>
            Seu e-mail
          </label>
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-invalid={status === 'error' || undefined}
            aria-describedby={`${id}-status`}
            placeholder="Digite seu e-mail"
            className={fieldClass}
          />
          <button type="submit" className={storeButtonClass({ tone: 'graphite', className: 'uppercase sm:shrink-0' })}>
            Cadastre-se
            <ChevronRight aria-hidden strokeWidth={2} className="size-4" />
          </button>
        </form>
      </div>
      <p
        id={`${id}-status`}
        role="status"
        className="container-page pb-4 text-center text-store-caption text-graphite empty:hidden"
      >
        {status === 'sent' && 'Obrigado! Você receberá nossas novidades e promoções.'}
        {status === 'error' && 'Digite um e-mail válido para se cadastrar.'}
      </p>
    </section>
  )
}
