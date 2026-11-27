import { connection } from 'next/server'
import type { Product, ProductCategory } from '@/types/product'

/**
 * Leitura do catálogo na API Spring Boot, feita no servidor.
 * Se a API estiver fora do ar, devolve listas vazias (nunca dados inventados).
 */

const API_BASE = process.env.API_PROXY_TARGET ?? 'http://localhost:8080'

export interface ApiCategory {
  id: number
  name: string
  slug: string
  imageUrl: string | null
  position: number
}

export interface ApiBanner {
  id: number
  title: string
  subtitle: string | null
  imageUrl: string
  mobileImageUrl: string | null
  linkUrl: string | null
  ctaLabel: string | null
  position: number
}

export interface ApiProduct {
  id: number
  name: string
  slug: string
  description: string | null
  categoryName: string | null
  categorySlug: string | null
  price: number
  oldPrice: number | null
  inStock: boolean
  imageUrl: string | null
  hoverImageUrl: string | null
  rating: number
  reviewCount: number
  personalizable: boolean
  bestSeller: boolean
}

async function getList<T>(path: string): Promise<T[]> {
  // Requisição dinâmica (sem cache de build): a vitrine sempre mostra o catálogo atual.
  await connection()
  try {
    const response = await fetch(`${API_BASE}${path}`, { cache: 'no-store' })
    if (!response.ok) return []
    const data: unknown = await response.json()
    return Array.isArray(data) ? (data as T[]) : []
  } catch {
    return []
  }
}

export function getBanners() {
  return getList<ApiBanner>('/api/banners')
}

export function getCategories() {
  return getList<ApiCategory>('/api/categories')
}

export function getBestSellers() {
  return getList<ApiProduct>('/api/products/best-sellers')
}

/** Ordenações aceitas pela API (/api/products?sort=). */
export const productSorts = [
  { value: 'relevance', label: 'Mais relevantes' },
  { value: 'price_asc', label: 'Menor preço' },
  { value: 'price_desc', label: 'Maior preço' },
  { value: 'rating', label: 'Melhor avaliados' },
  { value: 'name', label: 'Nome (A a Z)' },
] as const

export type ProductSort = (typeof productSorts)[number]['value']

export function isProductSort(value: string | undefined): value is ProductSort {
  return productSorts.some((sort) => sort.value === value)
}

export interface ApiProductPage {
  items: ApiProduct[]
  totalItems: number
}

export interface ProductQuery {
  /** Slug da categoria (ex.: "tapetes"). */
  category?: string
  /** Texto da busca. */
  q?: string
  sort?: ProductSort
  /** Quantidade de produtos (a API aceita no máximo 100). */
  size?: number
}

/** Página de produtos do catálogo (a API devolve `{ items, totalItems, ... }`); vazia se a API estiver fora do ar. */
export async function getProducts({ category, q, sort, size = 12 }: ProductQuery = {}): Promise<ApiProductPage> {
  await connection()
  const empty: ApiProductPage = { items: [], totalItems: 0 }
  const params = new URLSearchParams({ size: String(size) })
  if (category) params.set('category', category)
  if (q) params.set('q', q)
  if (sort) params.set('sort', sort)
  try {
    const response = await fetch(`${API_BASE}/api/products?${params}`, { cache: 'no-store' })
    if (!response.ok) return empty
    const data = (await response.json()) as { items?: unknown; totalItems?: unknown } | null
    if (!data || !Array.isArray(data.items)) return empty
    return { items: data.items as ApiProduct[], totalItems: Number(data.totalItems ?? data.items.length) }
  } catch {
    return empty
  }
}

/** Um produto pelo slug, ou null se não existir (ou se a API estiver fora do ar). */
export async function getProduct(slug: string): Promise<ApiProduct | null> {
  await connection()
  try {
    const response = await fetch(`${API_BASE}/api/products/${encodeURIComponent(slug)}`, { cache: 'no-store' })
    if (!response.ok) return null
    return (await response.json()) as ApiProduct
  } catch {
    return null
  }
}

/** Converte o produto da API para o formato usado pelo carrinho e pelos componentes de exibição. */
export function toProduct(api: ApiProduct): Product {
  const slugText = `${api.categorySlug ?? ''} ${api.slug}`
  const category: ProductCategory = /chinelo|rasteira|babucha/.test(slugText)
    ? 'chinelos'
    : /bolsa|necessaire/.test(slugText)
      ? 'bolsas'
      : /presente/.test(slugText)
        ? 'presentes'
        : 'tapetes'
  const main = api.imageUrl ?? '/mock/placeholder.svg'
  return {
    id: api.id,
    slug: api.slug,
    name: api.name,
    category,
    description: api.description ?? '',
    price: Number(api.price),
    oldPrice: api.oldPrice == null ? undefined : Number(api.oldPrice),
    // A API ainda não informa parcelamento: 1x evita exibir uma condição que não foi cadastrada.
    installments: 1,
    rating: Number(api.rating),
    reviewCount: api.reviewCount,
    badges: api.personalizable ? ['customizable'] : [],
    personalizable: api.personalizable,
    soldOut: !api.inStock,
    bestSeller: api.bestSeller,
    images: [
      { src: main, alt: api.name },
      { src: api.hoverImageUrl ?? main, alt: `${api.name}, em ambiente` },
    ],
    swatches: [],
  }
}
