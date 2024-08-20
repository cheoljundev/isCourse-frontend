import CourseListBodySkeleton from "../course/CourseListBodySkeleton.jsx";
import CourseSharedListBody from "./CourseSharedListBody.jsx";
import {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import ky from "ky";

export default function CourseSharedList() {
  const [courses, setCourses] = useState(null); // 코스 목록
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 0;
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
      {!loading && courses && <CourseSharedListBody courses={courses}/>}
    </section>
  )
}