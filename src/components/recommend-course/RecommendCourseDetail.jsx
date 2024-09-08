import CourseDetail from "../course/CourseDetail.jsx";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import ky from "ky";
import CourseDetailSkeleton from "../course/CourseDetailSkeleton.jsx";
export default function RecommendCourseDetail() {
  const {id} = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true); // 로딩 상태
  useEffect(() => {
    ky.get(`http://localhost:8080/api/course/${id}`)
      .json()
      .then((data) => {
        setCourse(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch course", error);
        setLoading(false);
      });
  }, []);
  return (
    <section>
      {loading && <CourseDetailSkeleton/>}
      {!loading && course && <CourseDetail course={course} id={id}/>}
    </section>
  )
}