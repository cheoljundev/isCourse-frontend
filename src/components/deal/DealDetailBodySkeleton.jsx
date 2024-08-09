export default function DealDetailBodySkeleton() {
  return (
    <div>
      <div className="skeleton h-52 w-full sm:w-96 mb-4"></div>
      <div className="skeleton h-4 w-32 mb-2"></div>
      <div className="skeleton h-4 w-32 mb-4"></div>
      <div className="flex justify-between items-center mb-6">
        <div className="skeleton h-4 w-36"></div>
        <div className="flex flex-col items-end gap-y-2">
          <div className="skeleton h-4 w-20"></div>
          <div className="flex gap-x-2">
            <div className="skeleton h-4 w-10"></div>
            <div className="skeleton h-4 w-16"></div>
          </div>
        </div>
      </div>
      <div className="skeleton h-4 w-44 mb-2 mx-auto"></div>
      <div className="skeleton h-4 w-44 mb-6 mx-auto"></div>
      <div className="flex justify-between mb-8">
        <div className="skeleton h-4 w-24 mb-2"></div>
        <div className="skeleton h-4 w-32 mb-2"></div>
      </div>
      <div className="skeleton h-4 w-20 mb-4"></div>
      <div className="flex gap-x-2">
        <div className="skeleton h-4 w-10 mb-2"></div>
        <div className="skeleton h-4 w-52 mb-2"></div>
      </div>
      <div className="flex gap-x-2">
        <div className="skeleton h-4 w-10 mb-2"></div>
        <div className="skeleton h-4 w-52 mb-2"></div>
      </div>
      <div className="flex gap-x-2">
        <div className="skeleton h-4 w-10 mb-2"></div>
        <div className="skeleton h-4 w-52 mb-2"></div>
      </div>
    </div>
  )
}