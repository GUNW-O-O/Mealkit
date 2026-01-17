import { CartItem } from "@/app/types/cart"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const item: CartItem = await req.json()
  const cookie = await cookies()

  const cart: CartItem[] = JSON.parse(cookie.get('cart')?.value ?? '[]')

  // 장바구니에 존재하는지 확인
  const isExist = cart.find((c: any) => c.index === item.index)

  if(isExist) {
    // 장바구니에 추가할때 재고수량보다 높을수 없도록
    isExist.quantity = Math.min(isExist.quantity + item.quantity, item.limit)
  } else {
    cart.push(item)
  }

  cookie.set('cart', JSON.stringify(cart), {
    httpOnly : true,
    path : '/',
  })

  return NextResponse.json({ok: true})
}
