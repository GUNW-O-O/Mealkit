import { cookies } from "next/headers"
import { CartItem } from "../types/cart"

export default async function CartPage() {

  const cookie = await cookies()
  const cart: CartItem[] = JSON.parse(cookie.get('cart')?.value ?? '[]')

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  return (
    <main className="max-w-4xl mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">장바구니</h1>

      {cart.length === 0 ? (
        <p className="text-gray-500">장바구니가 비어 있습니다.</p>
      ) : (
        <>
          <div className="overflow-x-auto overflow-hidden rounded-2xl border border-emerald-300">
            <table className="w-full border-collapse">
              <thead className="bg-emerald-500 text-white">
                <tr>
                  <th className="px-4 py-3 text-left">상품명</th>
                  <th className="px-4 py-3 text-right">단가</th>
                  <th className="px-4 py-3 text-center">수량</th>
                  <th className="px-4 py-3 text-right">합계</th>
                </tr>
              </thead>

              <tbody>
                {cart.map(item => (
                  <tr
                    key={item.index}
                    className="border-b border-emerald-200 last:border-b-0 hover:bg-emerald-300/30"
                  >
                    <td className="px-4 py-3">
                      {item.name}
                    </td>
                    <td className="px-4 py-3 text-right">
                      {item.price}원
                    </td>
                    <td className="px-4 py-3 text-center">
                      {item.quantity}
                    </td>
                    <td className="px-4 py-3 text-right font-medium">
                      {item.price * item.quantity}원
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
