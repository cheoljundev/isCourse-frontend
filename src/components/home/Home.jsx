import Deal from "./deal/Deal.jsx";
import CourseRecommendationSection from "./recommend-course/CourseRecommendationSection.jsx";
import UserCourseSection from "./user-course/UserCourseSection.jsx";

export default function Home() {
  return (
    <div className="px-3">
      <Deal/>
      <CourseRecommendationSection/>
      <UserCourseSection/>
    </div>
  )
}