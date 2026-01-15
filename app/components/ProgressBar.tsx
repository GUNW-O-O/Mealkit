'use client'

interface Props {
  value: number
}

export default function ProgressBar({ value }: Props) {
  return (
    <div className="w-full h-2 bg-gray-200 rounded outline outline-black">
      <div
        className="h-2 bg-green-600 rounded transition-all"
        style={{ width: `${value}%` }}
      />
    </div>
  )
}
