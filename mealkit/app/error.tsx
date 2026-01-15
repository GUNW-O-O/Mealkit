'use client'

import { useEffect } from 'react'

interface Props {
  error: Error
  reset: () => void
}

export default function Error({ error, reset }: Props) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-lg font-bold mb-2">
        상품 정보를 불러오지 못했습니다
      </h1>

      <p className="text-sm text-gray-600 mb-4">
        일시적인 문제일 수 있습니다. 잠시 후 다시 시도해주세요.
      </p>

      <button
        onClick={reset}
        className="px-4 py-2 text-sm rounded bg-black text-white"
      >
        다시 시도
      </button>
    </main>
  )
}
