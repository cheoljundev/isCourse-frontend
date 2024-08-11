import CourseDetailSkeleton from "../course/CourseDetailSkeleton.jsx";
import CourseDetail from "../course/CourseDetail.jsx";
import CourseConfirmModal from "../course/CourseConfirmModal.jsx";
import {useRef} from "react";
export default function UserCourseDetail() {
  const modal = useRef();
  return (
    <section>
      {/*<CourseDetailSkeleton/>*/}
      <CourseDetail modal={modal}/>
      <CourseConfirmModal ref={modal}/>
    </section>
  )
}