import CourseListBodySkeleton from "../course/CourseListBodySkeleton.jsx";
import UserCourseListBody from "./UserCourseListBody.jsx";
import {useEffect, useState} from "react";
import ky from "ky";

export default function UserCourseList() {
  const [courses, setCourses] = useState(null); // 유저 코스
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [page , setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isFirst, setIsFirst] = useState(false);
  const [isLast, setIsLast] = useState(false);
  const [content, setContent] = useState(null);
  function getList(page = 0) {
    setPage(page); // 페이지 저장
    ky("http://localhost:8080/api/course?size=6&page=" + page)
      .json()
      .then((data) => {
        setCourses(data); // 데이터 저장
        setIsFirst(data.first);
        setIsLast(data.last);
        setTotalPages(data.totalPages); // 총 페이지 수
        setContent(data.content);
        setLoading(false); // 로딩 완료
      })
      .catch((error) => {
        console.error("Failed to fetch user courses", error);
        setLoading(false); // 실패 시에도 로딩 완료
      });
  }
  useEffect(() => {
    getList(page);
  }, [page]);
  return (
    <section className="px-4">
      <h2 className="text-xl font-semibold mb-4">유저 코스</h2>
      {loading && <CourseListBodySkeleton/>}
      {!loading && courses && <UserCourseListBody
        page={page} setPage={setPage}
        isFirst={isFirst}
        isLast={isLast}
        totalPages={totalPages}
        content={content}
      />}
    </section>
  )
}