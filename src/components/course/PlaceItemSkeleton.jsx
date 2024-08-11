export default function PlaceItemSkeleton() {
  return (
    <div>
      <div className="flex gap-x-2 items-center mb-4">
        <div className="skeleton w-10 h-10 rounded-full flex-shrink-0"></div>
        <div className="skeleton w-full h-8"></div>
      </div>
      <div className="flex gap-x-2 items-center mb-4">
        <div className="skeleton w-10 h-10 rounded-full flex-shrink-0"></div>
        <div className="skeleton w-full h-8"></div>
      </div>
      <div className="flex gap-x-2 items-center">
        <div className="skeleton w-10 h-10 rounded-full flex-shrink-0"></div>
        <div className="skeleton w-full h-8"></div>
      </div>
    </div>
  )
}