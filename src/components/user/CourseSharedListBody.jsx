import {Link} from "react-router-dom";
import Pagination from "../util/Pagination.jsx";

export default function CourseSharedListBody({page, setPage, isFirst, isLast, totalPages, content}) {

  return (
    <>
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 sm:gap-8 lg:gap-10 xl:gap-12 mb-4">
        {
          content.map((course) => (
            <li key={course.id}>
              <Link to={`/user-course/detail/${course.id}`} className="flex flex-col mb-2">
                <img className="rounded-xl w-full mb-2" src={course.image} alt={course.name}/>
                <div className="mb-2 font-bold text-lg">{course.name}</div>
                <div className="flex gap-2">
                  <span className="text-sm">{course.place}</span>
                  <span className="text-sm">{course.time}</span>
                </div>
              </Link>
              {/*<button className="btn btn-error btn-sm">삭제</button>*/}
            </li>
          ))
        }
      </ul>
      <Pagination page={page} setPage={setPage} totalPages={totalPages} isFirst={isFirst} isLast={isLast}/>
    </>
  )
}