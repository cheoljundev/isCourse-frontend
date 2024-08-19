import CourseDetailSkeleton from "../course/CourseDetailSkeleton.jsx";
import CourseDetail from "../course/CourseDetail.jsx";
import CourseConfirmModal from "../course/CourseConfirmModal.jsx";
import {useEffect, useRef, useState} from "react";
import ky from "ky";
import {useParams} from "react-router-dom";
import {useModal} from "../../store/ModalContext.jsx";
export default function UserCourseDetail() {
  const {id} = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true); // 로딩 상태
  const {courseConfirmModal} = useModal();
  const [error, setError] = useState({status: false, message: ""});
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
      {!loading && course && <CourseDetail course={course} id={id} setError={setError}/>}
      <CourseConfirmModal error={error} ref={courseConfirmModal}/>
    </section>
  )
}