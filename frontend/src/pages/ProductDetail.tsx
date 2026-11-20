import { useParams } from 'react-router-dom'

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>()

  return (
    <section>
      <h1 className="text-2xl font-bold">Produto</h1>
      <p className="mt-2 text-gray-600">Detalhes de: {slug}</p>
    </section>
  )
}
