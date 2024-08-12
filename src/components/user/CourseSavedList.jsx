import CourseListBodySkeleton from "../course/CourseListBodySkeleton.jsx";
import CourseSavedListBody from "./CourseSavedListBody.jsx";

export default function CourseSavedList() {
  return (
    <section className="px-4">
      <h2 className="text-xl font-semibold mb-4">유저 코스</h2>
      {/*<CourseListBodySkeleton/>*/}
      <CourseSavedListBody/>
    </section>
  )
}