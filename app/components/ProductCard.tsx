'use client'

import ProgressBar from './ProgressBar'
import { RegProduct } from '../types/product'
import SkeletonCard from './SkeletonCard'
import { useState } from 'react'
interface Props {
  product: RegProduct
}

export default function ProductCard({ product }: Props) {
  const maxPurchasable = product.limit - product.current
  const isSoldOut = maxPurchasable <= 0
  const progress = Math.round((product.current / product.limit) * 100)
  const [qty, setQty] = useState(1)

  // 최대 수량 넘지못하도록
  const increase = () => {
    setQty(q => {
      // 넘기면 alert
      if (q >= maxPurchasable) {
        alert('구매 가능한 최대 수량입니다.')
        return q
      }
      return q + 1
    })
  }

  // 음수 불가
  const decrease = () => {
    setQty(q => Math.max(1, q - 1))
  }

  const addToCart = async () => {
    await fetch('/api/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        index: product.index,
        name: product.name,
        price: product.price,
        quantity: qty,
        limit: product.limit,
        current : product.current
      }),
    })

    // 장바구니 변경 이벤트 추가
    window.dispatchEvent(new Event('cart-updated'))
  }


  return (
    <div
      className={`border rounded-lg p-3 flex flex-col gap-2 bg-emerald-200 
      ${isSoldOut ? 'opacity-50' : ''} text-black`
      }
    >
      <SkeletonCard />

      <h2 className="font-semibold text-l">{product.name}</h2>
      <p className="text-sm">{product.price}원</p>
      <p className="text-sm">공동구매 진행도 {progress}%</p>

      <ProgressBar value={progress} />

      <div className="flex justify-between text-xs text-gray-600">
        <div></div>
        {isSoldOut ?
          (<span className="text-red-500 font-bold">품절</span>)
          :
          (
            <>
              <div className="flex items-center gap-2">
                <button
                  onClick={decrease}
                  disabled={isSoldOut}
                  className="px-2 border rounded disabled:opacity-40"
                >
                  -
                </button>

                <span>{qty}</span>

                <button
                  onClick={increase}
                  disabled={qty >= maxPurchasable}
                  className="px-2 border rounded disabled:opacity-40"
                >
                  +
                </button>
              <button
                disabled={isSoldOut}
                onClick={addToCart}
                className="px-2 rounded bg-emerald-600 text-white py-1
             hover:bg-emerald-700 disabled:opacity-40 items-center"
              >
                담기
              </button>
              </div>
            </>
          )}
      </div>
    </div>
  )
}
