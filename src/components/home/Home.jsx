import DealSection from "./deal/DealSection.jsx";
import CourseRecommendationSection from "./recommend-course/CourseRecommendationSection.jsx";
import UserCourseSection from "./user-course/UserCourseSection.jsx";
import LoginModal from "../user/LoginModal.jsx";

export default function Home() {
  return (
    <div className="px-3">
      <DealSection/>
      <CourseRecommendationSection/>
      <UserCourseSection/>
    </div>
  )
}