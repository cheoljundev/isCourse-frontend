import CourseListBodySkeleton from "../course/CourseListBodySkeleton.jsx";
import CourseSharedListBody from "./CourseSharedListBody.jsx";
import {useEffect, useState} from "react";
import ky from "ky";

export default function CourseSharedList() {
  const [courses, setCourses] = useState(null); // 코스 목록
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isFirst, setIsFirst] = useState(false);
  const [isLast, setIsLast] = useState(false);
  const [content, setContent] = useState(null);
  useEffect(() => {
    ky.get("http://localhost:8080/api/user/shared-course?size=6&page=" + page,
      {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token")
        }
      })
      .json()
      .then((data) => {
        setCourses(data); // 데이터 저장
        setIsFirst(data.first);
        setIsLast(data.last);
        setTotalPages(data.totalPages); // 총 페이지 수
        setContent(data.content);
        setCourses(data); // 데이터 저장
        setLoading(false); // 로딩 완료
      })
      .catch((error) => {
        console.error("Failed to fetch user courses", error);
        setLoading(false); // 실패 시에도 로딩 완료
      });
  }, []);
  return (
    <section className="px-4">
      <h2 className="text-xl font-semibold mb-4">공유 코스 확인</h2>
      {loading && <CourseListBodySkeleton/>}
      {!loading && courses && <CourseSharedListBody
        courses={courses}
        page={page}
        setPage={setPage}
        isFirst={isFirst}
        isLast={isLast}
        totalPages={totalPages}
        content={content}
      />}
    </section>
  )
}