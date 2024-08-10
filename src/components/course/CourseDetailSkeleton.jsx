export default function CourseDetailSkeleton() {
  return (
    <>
      <div className="skeleton h-52 w-full mb-4"></div>
      <div className="px-4">
        <div className="flex gap-x-2 mb-4">
          <div className="skeleton h-4 w-10"></div>
          <div className="skeleton h-4 w-10"></div>
        </div>
        <div className="flex flex-col gap-2 mb-8">
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-2/3"></div>
          <div className="skeleton h-4 w-1/3"></div>
        </div>
        <div>
          <div className="skeleton h-4 w-20 mb-6"></div>
          <ul>
            <li className="flex gap-x-4 mb-4">
              <div className="skeleton h-32 w-32 flex-shrink-0"></div>
              <div className="flex flex-col justify-center gap-y-3 w-64">
                <div className="skeleton h-4 w-20"></div>
                <div className="skeleton h-4 w-24"></div>
                <div className="skeleton h-4 w-36 mb-4"></div>
                <div className="skeleton h-4 w-16"></div>
              </div>
            </li>
            <li className="flex gap-x-4 mb-4">
              <div className="skeleton h-32 w-32 flex-shrink-0"></div>
              <div className="flex flex-col justify-center gap-y-3 w-64">
                <div className="skeleton h-4 w-20"></div>
                <div className="skeleton h-4 w-24"></div>
                <div className="skeleton h-4 w-36 mb-4"></div>
                <div className="skeleton h-4 w-16"></div>
              </div>
            </li>
            <li className="flex gap-x-4 mb-4">
              <div className="skeleton h-32 w-32 flex-shrink-0"></div>
              <div className="flex flex-col justify-center gap-y-3 w-64">
                <div className="skeleton h-4 w-20"></div>
                <div className="skeleton h-4 w-24"></div>
                <div className="skeleton h-4 w-36 mb-4"></div>
                <div className="skeleton h-4 w-16"></div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}