import Deal from "./deal/Deal.jsx";
import CourseRecommendationSection from "./recommend-course/CourseRecommendationSection.jsx";

export default function Home() {
  return (
    <div className="px-3">
      <Deal/>
      <CourseRecommendationSection/>
    </div>
  )
}