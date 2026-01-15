'use client'

interface Props {
  value: number
}

export default function ProgressBar({ value }: Props) {
  return (
    <div className="w-full h-2 bg-gray-200 rounded">
      <div
        className="h-2 bg-green-500 rounded transition-all"
        style={{ width: `${value}%` }}
      />
    </div>
  )
}
