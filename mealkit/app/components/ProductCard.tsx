import ProgressBar from './ProgressBar'
import { Product } from '../types/product'
import SkeletonCard from './SkeletonCard'
interface Props {
  product: Product
}

export default function ProductCard({ product }: Props) {
  const isSoldOut = product.current === product.limit
  const progress = Math.round((product.current / product.limit) * 100)

  return (
    <div
      className={`border rounded-lg p-3 flex flex-col gap-2 bg-emerald-600 
      ${isSoldOut ? 'opacity-50' : ''} text-white`
    }
    >
      <SkeletonCard />

      <h2 className="font-semibold text-sm">{product.name}</h2>
      <p className="text-sm">{product.price}</p>

      <ProgressBar value={progress} />

      <div className="flex justify-between text-xs text-gray-600">
        <span>
          {product.current} / {product.limit}
        </span>
        {isSoldOut && <span className="text-red-500 font-bold">품절</span>}
      </div>
    </div>
  )
}
