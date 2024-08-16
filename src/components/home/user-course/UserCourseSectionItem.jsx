export default function UserCourseSectionItem({course}) {
  return <div className="flex gap-x-4 mb-4">
    <img className="rounded-xl flex-shrink-0 self-start" src={course.image} alt="유저코스 이미지"/>
    <div className="flex flex-col justify-center w-80">
      <small className="font-normal text-sm text-gray-500">{course.state}</small>
      <h3 className="font-semibold text-lg">{course.name}</h3>
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <div className="mb-4">{course.time}</div>
          <div className="flex flex-wrap gap-2">
            {
              course.tags.map((tag, index) => {
                return <span key={index} className="badge badge-outline border-solid">#{tag}</span>;
              })
            }
          </div>
        </div>
        <div className="text-sm text-nowrap">좋아요 {course.likes}</div>
      </div>
    </div>
  </div>;
}