import { cookies } from 'next/headers'
import CartClient from './CartClient'
import { CartItem } from '../types/cart'

export default async function CartPage() {
  const cookie = await cookies()
  const cart: CartItem[] = JSON.parse(cookie.get('cart')?.value ?? '[]')

  return (
    <main>
      <CartClient init={cart} />
    </main>
  )
}
