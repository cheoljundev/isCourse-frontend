import UserCourseSectionItemSkeleton from "./UserCourseSectionItemSkeleton.jsx";
import UserCourseSectionItem from "./UserCourseSectionItem.jsx";
import {useEffect, useState} from "react";
import ky from "ky";
import {Link} from "react-router-dom";
export default function UserCourseSection() {
  const [courses, setCourses] = useState(null); // 유저 코스
  const [loading, setLoading] = useState(true); // 로딩 상태

  useEffect(() => {
    // 데이터 가져오기
    ky.get("http://localhost:8080/api/course?size=5")
      .json()
      .then((data) => {
        setCourses(data.content); // 데이터 저장
        setLoading(false); // 로딩 완료
      })
      .catch((error) => {
        console.error("Failed to fetch user courses", error);
        setLoading(false); // 실패 시에도 로딩 완료
      });
  }, []);

  return (
    <section>
      <header className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">유저 추천 코스</h2>
        <Link to="/user-course/list">더보기</Link>
      </header>
      {loading && <UserCourseSectionItemSkeleton/>}
      {!loading && courses && courses.map((course) => <UserCourseSectionItem key={course.id} course={course}/>)}
    </section>
  );
}