import CourseDetail from "../course/CourseDetail.jsx";
import {useRef} from "react";
export default function RecommendCourseDetail() {
  const modal = useRef();
  return (
    <section>
      {/*<CourseDetailSkeleton/>*/}
      <CourseDetail modal={modal}/>
    </section>
  )
}