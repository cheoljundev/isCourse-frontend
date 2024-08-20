import {Link, useNavigate} from "react-router-dom";

export default function CourseSharedListBody({courses}) {
  const navigate = useNavigate();
  const content = courses.content;
  const page = courses.pageable.pageNumber;
  const totalPages = courses.totalPages;
  const isFirst = courses.first;
  const isLast = courses.last;

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
      navigate(`/user-course/list?size=6&page=${page - 1}`);
    }
  }

  function handleNext() {
    if (!isLast) {
      navigate(`/user-course/list?size=6&page=${page + 1}`);
    }
  }

  function handlePage() {
    navigate(`/user-course/list?size=6&page=${page}`);
  }

  function handleLastPage() {
    navigate(`/user-course/list?size=6&page=${totalPages - 1}`);
  }

  return (
    <>
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 sm:gap-8 lg:gap-10 xl:gap-12 mb-4">
        {
          courses.content.map((course) => (
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