import CourseListBodySkeleton from "../course/CourseListBodySkeleton.jsx";
import CourseSavedListBody from "./CourseSavedListBody.jsx";

export default function CourseSavedList() {
  return (
    <section className="px-4">
      <h2 className="text-xl font-semibold mb-4">가본 코스 확인</h2>
      {/*<CourseListBodySkeleton/>*/}
      <CourseSavedListBody/>
    </section>
  )
}