import { Product, ProductResponse } from './types/product'
import ProductCard from './components/ProductCard'

const API_URL = 'https://api.zeri.pics'

async function getProducts(): Promise<Product[]> {
  const res = await fetch(API_URL, {
    next: { revalidate: 60 },
  })

  if (res.status !== 200) {
    throw new Error('Failed to fetch products')
  }

  const data: ProductResponse = await res.json()

  // 0~49까지 오름차순으로 표시
  const sorted = [...data.content].sort((a, b) => a.index - b.index)

  // 품절 필터링
  const available = sorted.filter(p => p.current < p.limit)
  const soldOut = sorted.filter(p => p.current === p.limit)

  // 품절은 항상 하단
  return [...available, ...soldOut]
}

export default async function Page() {
  const products = await getProducts()

  return (
    <main className="max-w-6xl mx-auto px-4 py-6">

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {products.map(product => (
          <ProductCard key={product.index} product={product} />
        ))}
      </section>
    </main>
  )
}
