import { Product, ProductResponse, RegProduct } from './types/product'
import ProductCard from './components/ProductCard'

const API_URL = 'https://api.zeri.pics'

const parsePrice = (price: string): number => {
  return Number(price.replace(/[^0-9]/g, ''))
}

async function getProducts(): Promise<RegProduct[]> {
  const res = await fetch(API_URL, {
    next: { revalidate: 60 },
  })

  if (res.status !== 200) {
    throw new Error('Failed to fetch products')
  }

  const data: ProductResponse = await res.json()

  // 0~49까지 오름차순으로 표시
  const sorted = [...data.content].sort((a, b) => a.index - b.index)

  // 가격 정규화
  const normalized: RegProduct[] = sorted.map(p => ({
    index: p.index,
    name: p.name,
    price: parsePrice(p.price),
    current: p.current,
    limit: p.limit,
    image: p.image,
  }))
  
  // 품절 필터링
  const available = normalized.filter(p => p.current < p.limit)
  const soldOut = normalized.filter(p => p.current === p.limit)

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
