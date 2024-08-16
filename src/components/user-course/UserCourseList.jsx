import CourseListBodySkeleton from "../course/CourseListBodySkeleton.jsx";
import UserCourseListBody from "./UserCourseListBody.jsx";
import {useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import ky from "ky";

export default function UserCourseList() {
  const [courses, setCourses] = useState(null); // 유저 코스
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 0;
  useEffect(() => {
    ky("http://localhost:8080/api/course?size=6&page=" + page)
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
      <h2 className="text-xl font-semibold mb-4">유저 코스</h2>
      {loading && <CourseListBodySkeleton/>}
      {!loading && courses && <UserCourseListBody courses={courses}/>}
    </section>
  )
}