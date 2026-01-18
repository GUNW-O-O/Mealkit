import './globals.css'
import type { Metadata } from 'next'
import Header from './header'

export const metadata: Metadata = {
  title: '척척밥상',
  description: '공동구매 상품들을 확인하실수 있습니다.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className="min-h-screen flex flex-col bg-background text-foreground transition-colors">
        <Header />
        <main className="flex-1">{children}</main>

        <footer className="bg-emerald-400 text-gray-900">
          <div className="max-w-6xl mx-auto px-4 py-4 text-xs">
            척척밥상
          </div>
        </footer>
      </body>
    </html>
  )
}
