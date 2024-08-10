import CourseDetailSkeleton from "../course/CourseDetailSkeleton.jsx";
import CourseDetail from "../course/CourseDetail.jsx";
import CourseConfirmModal from "../course/CourseConfirmModal.jsx";
export default function RecommendCourseDetail({modal}) {
  return (
    <section>
      {/*<CourseDetailSkeleton/>*/}
      <CourseDetail modal={modal}/>
      <CourseConfirmModal ref={modal}/>
    </section>
  )
}