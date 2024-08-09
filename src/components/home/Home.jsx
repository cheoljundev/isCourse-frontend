import DealSection from "./deal/Deal.jsx";
import CourseRecommendationSection from "./recommend-course/CourseRecommendationSection.jsx";
import UserCourseSection from "./user-course/UserCourseSection.jsx";
import LoginModal from "./user/LoginModal.jsx";

export default function Home({modal}) {
  return (
    <div className="px-3">
      <LoginModal ref={modal}/>
      <DealSection/>
      <CourseRecommendationSection/>
      <UserCourseSection/>
    </div>
  )
}