import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function GET() {
  const cookie = await cookies()
  const cart = JSON.parse(cookie.get('cart')?.value ?? '[]')
  console.log(cart)
  return NextResponse.json({
    count: cart.length,
  })
}