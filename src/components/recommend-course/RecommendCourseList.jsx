import CourseListBodySkeleton from "../course/CourseListBodySkeleton.jsx";
import RecommendCourseListBody from "./RecommendCourseListBody.jsx";

export default function RecommendCourseList() {
  return (
    <section className="px-4">
      <h2 className="text-xl font-semibold mb-4">내 주변 코스</h2>
      {/*<CourseListBodySkeleton/>*/}
      <RecommendCourseListBody />
    </section>
  )
}