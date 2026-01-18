import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { CartItem } from '@/app/types/cart'

export async function DELETE(
  _: Request,
  context: { params: Promise<{ index: string }> }
) {
  const { index } = await context.params
  const numericIndex = Number(index)

  const cookie = await cookies()
  const cart: CartItem[] = JSON.parse(cookie.get('cart')?.value ?? '[]')

  const filtered = cart.filter(item => item.index !== numericIndex)

  cookie.set('cart', JSON.stringify(filtered), {
    httpOnly: true,
    path: '/',
  })

  return NextResponse.json({ ok: true })
}
