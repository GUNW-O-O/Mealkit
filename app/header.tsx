'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Header() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [count, setCount] = useState(0)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  useEffect(() => {
    const fetchCount = () => {
      fetch('/api/cart/count')
        .then(res => res.json())
        .then(data => setCount(data.count))
    }

    // 마운트시
    fetchCount()

    window.addEventListener('cart-updated', fetchCount)
    return () => window.removeEventListener('cart-updated', fetchCount)
  }, [])


  return (
    <header className="sticky top-0 z-10 bg-emerald-400 text-gray-900">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="text-base font-bold">척척밥상</Link>

        <div className='flex'>
          <Link href="/cart">
            <button className="text-sm mr-3 bg-white/80 border border-white/50 rounded px-3 py-1 hover:bg-white/70">
              🛒 {count}
            </button>
          </Link>
          <button
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className="text-sm border border-white/50 rounded px-3 py-1 hover:bg-white/10"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      </div>
    </header>
  )
}
