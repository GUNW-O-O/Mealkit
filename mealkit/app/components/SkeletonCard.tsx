export default function SkeletonCard() {
  return (
    <div className="relative w-full aspect-square overflow-hidden rounded bg-gray-200">
      <div className="absolute inset-0 skeleton-shimmer" />
    </div>
  )
}
