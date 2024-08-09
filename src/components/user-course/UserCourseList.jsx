import CourseListBodySkeleton from "../common/CourseListBodySkeleton.jsx";
import UserCourseListBody from "./UserCourseListBody.jsx";

export default function UserCourseList() {
  return (
    <section className="px-4">
      <h2 className="text-xl font-semibold mb-4">유저 코스</h2>
      {/*<CourseListBodySkeleton/>*/}
      <UserCourseListBody/>
    </section>
  )
}