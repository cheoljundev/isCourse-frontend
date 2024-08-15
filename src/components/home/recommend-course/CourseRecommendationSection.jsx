import {useNavigate} from "react-router-dom";

export default function CourseRecommendationSection() {
  const navigate = useNavigate();
  function handleToRecommendCourse() {
    navigate("/recommend-course/list");
  }
  return (
    <section className="text-center mb-8">
      <h2 className="text-2xl font-bold mb-4">맞춤 코스 추천</h2>
      <p className="text-lg mb-4">현재 위치에 가까운 데이트 코스를 추천받아보세요.</p>
      <button onClick={handleToRecommendCourse} className="btn btn-primary btn-lg">코스 추천 받기</button>
    </section>
  )
}