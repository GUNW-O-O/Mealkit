'use client'

import { useEffect, useState } from 'react'

export default function Header() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  return (
    <header className="sticky top-0 z-10 bg-green-600 text-white">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <h1 className="text-base font-bold">척척밥상</h1>

        <button
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          className="text-sm border border-white/50 rounded px-3 py-1 hover:bg-white/10"
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
    </header>
  )
}
