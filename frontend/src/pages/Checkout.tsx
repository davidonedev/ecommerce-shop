import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const checkoutSchema = z.object({
  name: z.string().min(3, 'Informe seu nome completo'),
  email: z.email('E-mail inválido'),
  zipCode: z.string().regex(/^\d{5}-?\d{3}$/, 'CEP inválido'),
})

type CheckoutForm = z.infer<typeof checkoutSchema>

export default function Checkout() {
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
    <section className="max-w-md">
      <h1 className="text-2xl font-bold">Checkout</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4" noValidate>
        <div>
          <label htmlFor="name" className="block text-sm font-medium">
            Nome
          </label>
          <input id="name" className="mt-1 w-full rounded border border-gray-300 p-2" {...register('name')} />
          {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium">
            E-mail
          </label>
          <input
            id="email"
            type="email"
            className="mt-1 w-full rounded border border-gray-300 p-2"
            {...register('email')}
          />
          {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="zipCode" className="block text-sm font-medium">
            CEP
          </label>
          <input id="zipCode" className="mt-1 w-full rounded border border-gray-300 p-2" {...register('zipCode')} />
          {errors.zipCode && <p className="text-sm text-red-600">{errors.zipCode.message}</p>}
        </div>
        <button type="submit" className="rounded-lg bg-indigo-600 px-6 py-3 text-white hover:bg-indigo-700">
          Continuar
        </button>
      </form>
    </section>
  )
}
