export default function UserCourseSectionItem({course}) {
  return <div className="flex gap-x-4 mb-4">
    <img className="mask mask-squircle flex-shrink-0" src="https://via.placeholder.com/100" alt="유저코스 이미지"/>
    <div className="flex flex-col justify-center w-64">
      <small className="font-normal text-sm text-gray-500">Station</small>
      <h3 className="font-semibold text-lg">title</h3>
      <div className="text-gray-700 text-sm">product</div>
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <div className="">0시간 00분</div>
          <div className="flex gap-x-2">
            <span>#공예</span>
            <span>#식사</span>
          </div>
        </div>
        <button className="btn btn-xs btn-outline">좋아요 10</button>
      </div>
    </div>
  </div>;
}