export default function DealItemSkeleton() {
  return (
    <div>
      <div className="flex gap-x-2 items-center mb-4">
        <div className="skeleton w-full h-8"></div>
      </div>
      <div className="flex gap-x-2 items-center mb-4">
        <div className="skeleton w-full h-8"></div>
      </div>
      <div className="flex gap-x-2 items-center">
        <div className="skeleton w-full h-8"></div>
      </div>
    </div>
  )
}