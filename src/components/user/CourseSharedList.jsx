import CourseListBodySkeleton from "../course/CourseListBodySkeleton.jsx";
import CourseSharedListBody from "./CourseSharedListBody.jsx";

export default function CourseSharedList() {
  return (
    <section className="px-4">
      <h2 className="text-xl font-semibold mb-4">공유 코스 확인</h2>
      {/*<CourseListBodySkeleton/>*/}
      <CourseSharedListBody/>
    </section>
  )
}