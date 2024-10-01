export default function CourseItem({course, onClick}) {
  return (
    <button className="flex justify-between btn btn-outline h-auto" onClick={()=>{onClick(course.id)}}>
      <div className="flex gap-x-3 items-center">
        <img className="h-8 rounded-lg" src={course.image} alt="코스 썸네일"/>
        <span>{course.name}</span>
      </div>
      <span className="text-xs">
        {course.courseType === 'ROLE_ADMIN' ? '관리자' :
          course.courseType === 'ROLE_MANAGER' ? '매니저' : '유저'}
      </span>
    </button>
  )
}