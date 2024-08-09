import Deal from "./deal/Deal.jsx";
import RecommendCourse from "./recommend-course/RecommendCourse.jsx";

export default function Home() {
  return (
    <div className="px-3">
      <Deal/>
      <RecommendCourse/>
    </div>
  )
}