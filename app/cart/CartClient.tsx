'use client'

import { useState } from 'react'
import { CartItem } from '../types/cart'

interface Props {
  init: CartItem[]
}

export default function CartClient({ init }: Props) {
  const [cart, setCart] = useState<CartItem[]>(init)

  const increaseQuantity = async (index: number) => {
    updateQuantity(index, 1)
  }

  const decreaseQuantity = async (index: number) => {
    updateQuantity(index, -1)
  }

  const updateQuantity = async (index: number, delta: number) => {
    setCart(prev =>
      prev.map(item =>
        item.index === index
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    )

    await fetch('/api/cart', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        index,
        quantityDelta: delta,
      }),
    })

    window.dispatchEvent(new Event('cart-updated'))
  }


  const removeItem = async (index: number) => {
    setCart(prev => prev.filter(item => item.index !== index))

    await fetch(`/api/cart/${index}`, {
      method: 'DELETE',
    })

    window.dispatchEvent(new Event('cart-updated'))
  }


  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )


  return (
    <main className="max-w-4xl mx-auto p-4">
      <h1 className="text-xl font-bold mb-3">장바구니</h1>

      {cart.length === 0 ? (
        <p className="text-gray-500">장바구니가 비어 있습니다.</p>
      ) : (
        <>
          <div className="overflow-hidden rounded-2xl border border-emerald-300">
            <table className="w-full">
              <thead className="bg-emerald-500 text-white">
                <tr>
                  <th className="px-4 py-3 text-left">상품명</th>
                  <th className="px-4 py-3 text-right">단가</th>
                  <th className="px-4 py-3 text-center">수량</th>
                  <th className="px-4 py-3 text-right">합계</th>
                  <th className="px-4 py-3 text-center">🗑️</th>
                </tr>
              </thead>

              <tbody>
                {cart.map(item => (
                  <tr
                    key={item.index}
                    className="border-b border-emerald-200"
                  >
                    <td className="px-4 py-3">{item.name}</td>
                    <td className="px-4 py-3 text-right">{item.price}원</td>

                    <td className="px-4 py-3 text-center">
                      <div className="inline-flex items-center gap-2">
                        <button
                          onClick={() => decreaseQuantity(item.index)}
                          className="px-2 border rounded"
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => increaseQuantity(item.index)}
                          className="px-2 border rounded"
                        >
                          +
                        </button>
                      </div>
                    </td>

                    <td className="px-4 py-3 text-right font-medium">
                      {item.price * item.quantity}원
                    </td>

                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => removeItem(item.index)}
                        className="text-red-500 hover:underline"
                      >
                        삭제
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex justify-end">
            <div className="bg-emerald-400/50 px-6 py-3 rounded-xl font-bold">
              총 결제 금액: {totalPrice}원
            </div>
          </div>
        </>
      )}
    </main>
  )
}
