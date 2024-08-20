import {Link, useNavigate} from "react-router-dom";

export default function RecommendCourseListBody({courses}) {
  const navigate = useNavigate();
  const content = courses.content || [];
  const page = courses.pageable?.pageNumber ?? 0;
  const totalPages = courses.totalPages ?? 0;
  const isFirst = courses.first ?? true;
  const isLast = courses.last ?? true;

  let prevClass = "join-item btn";
  let nextClass = "join-item btn";
  if (isFirst) {
    prevClass += " btn-disabled";
  }
  if (isLast) {
    nextClass += " btn-disabled";
  }

  function handlePrev() {
    if (!isFirst) {
      navigate(`/recommend-course/list?size=6&page=${page - 1}`);
    }
  }

  function handleNext() {
    if (!isLast) {
      navigate(`/recommend-course/list?size=6&page=${page + 1}`);
    }
  }

  function handlePage() {
    navigate(`/recommend-course/list?size=6&page=${page}`);
  }

  function handleLastPage() {
    navigate(`/recommend-course/list?size=6&page=${totalPages - 1}`);
  }
  return (
    <>
      <ul
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 sm:gap-8 lg:gap-10 xl:gap-12 mb-4">
        {
          content.map((course) => {
            const courseType = course.courseType === "ROLE_USER" ? "user-course" : "recommend-course";
            return (
              <li key={course.id}>
                <Link to={`/${courseType}/detail/${course.id}`} className="flex flex-col">
                  <img className="rounded-xl w-full mb-2" src={course.image} alt="코스 이미지"/>
                  <div className="mb-2 font-bold text-lg">{course.name}</div>
                  <div className="flex gap-2">
                    <span className="text-sm">{course.state}</span>
                    <span className="text-sm">{course.time}</span>
                  </div>
                </Link>
              </li>
            )
          })
        }
      </ul>
      <div className="join m-4 mx-auto flex justify-center">
        <button onClick={handlePrev} className={prevClass}>«</button>
        <button onClick={handlePage} className="join-item btn">{page + 1}</button>
        <button className="join-item btn btn-disabled">...</button>
        <button onClick={handleLastPage} className="join-item btn">{totalPages}</button>
        <button onClick={handleNext} className={nextClass}>»</button>
      </div>
    </>
  )
}