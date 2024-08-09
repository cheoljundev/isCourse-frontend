export default function UserCourseSectionItem({course}) {
  return <div className="flex gap-x-4 mb-4">
    <img className="mask mask-squircle flex-shrink-0 self-start" src="https://picsum.photos/100" alt="유저코스 이미지"/>
    <div className="flex flex-col justify-center w-80">
      <small className="font-normal text-sm text-gray-500">Station</small>
      <h3 className="font-semibold text-lg">title</h3>
      <div className="text-gray-700 text-sm">product</div>
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <div className="mb-4">0시간 00분</div>
          <div className="flex flex-wrap gap-2">
            <span className="badge badge-outline border-solid">#공예</span>
            <span className="badge badge-outline border-solid">#식사</span>
            <span className="badge badge-outline border-solid">#식사</span>
            <span className="badge badge-outline border-solid">#식사</span>
          </div>
        </div>
        <div className="text-sm text-nowrap">좋아요 10</div>
      </div>
    </div>
  </div>;
}