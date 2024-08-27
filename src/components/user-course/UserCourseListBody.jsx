import {Link, useNavigate} from "react-router-dom";
import Pagination from "../util/Pagination.jsx";

export default function UserCourseListBody({page, setPage, isFirst, isLast, totalPages, content}) {
  const navigate = useNavigate();
  function handleToCourseShare() {
    navigate("/course-share");
  }

  return (
    <>
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 sm:gap-8 lg:gap-10 xl:gap-12 mb-4">
        {
          content.map((course) => (
            <li key={course.id}>
              <Link to={`/user-course/detail/${course.id}`} className="flex flex-col">
                <img className="rounded-xl w-full mb-2" src={course.image} alt="코스 이미지"/>
                <div className="mb-2 font-bold text-lg">{course.name}</div>
                <div className="flex gap-2">
                  <span className="text-sm">{course.state}</span>
                  <span className="text-sm">{course.time}</span>
                </div>
              </Link>
            </li>
          ))
        }
      </ul>
      <button className="btn btn-sm btn-primary block ml-auto" onClick={handleToCourseShare}>코스 공유</button>
      <Pagination page={page} setPage={setPage} totalPages={totalPages} isFirst={isFirst} isLast={isLast}/>
    </>
  )
}