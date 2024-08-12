export default function CourseItem() {
  return (
    <button className="flex justify-between btn btn-outline h-auto">
      <div className="flex gap-x-3 items-center">
        <img className="h-8 rounded-lg" src="https://picsum.photos/50" alt="코스 썸네일"/>
        <span>장소 이름</span>
      </div>
      <span className="text-xs">관리자</span>
    </button>
  )
}