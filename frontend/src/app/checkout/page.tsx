'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Field } from '@/components/ui/field'
import { Input } from '@/components/ui/input'

const checkoutSchema = z.object({
  name: z.string().min(3, 'Informe seu nome completo'),
  email: z.email('E-mail inválido'),
  zipCode: z.string().regex(/^\d{5}-?\d{3}$/, 'CEP inválido'),
})

type CheckoutForm = z.infer<typeof checkoutSchema>

export default function CheckoutPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutForm>({ resolver: zodResolver(checkoutSchema) })

  const onSubmit = (data: CheckoutForm) => {
    // TODO: enviar o pedido para a API de pedidos/pagamentos
    console.log('checkout', data)
  }

  return (
    <section className="container-page max-w-lg py-10 md:py-14">
      <h1 className="text-h1">Checkout</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 flex flex-col gap-5" noValidate>
        <Field label="Nome" error={errors.name?.message}>
          <Input autoComplete="name" {...register('name')} />
        </Field>
        <Field label="E-mail" error={errors.email?.message}>
          <Input type="email" autoComplete="email" {...register('email')} />
        </Field>
        <Field label="CEP" error={errors.zipCode?.message} hint="Somente números, com ou sem hífen.">
          <Input inputMode="numeric" autoComplete="postal-code" {...register('zipCode')} />
        </Field>
        <Button type="submit" variant="accent" size="lg" className="self-start">
          Continuar
        </Button>
      </form>
    </section>
  )
}
