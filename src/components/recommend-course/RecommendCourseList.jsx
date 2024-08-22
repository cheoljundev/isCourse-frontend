import CourseListBodySkeleton from "../course/CourseListBodySkeleton.jsx";
import RecommendCourseListBody from "./RecommendCourseListBody.jsx";
import {useEffect, useState} from "react";
import ky from "ky";

export default function RecommendCourseList() {
  const [courses, setCourses] = useState(null); // 코스 목록
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [page , setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isFirst, setIsFirst] = useState(false);
  const [isLast, setIsLast] = useState(false);
  const [content, setContent] = useState(null);
  let mapX = 0;
  let mapY = 0;
  const maxDistance = 100;
  async function getLocation() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          mapX = latitude;
          mapY = longitude;

          resolve();
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  useEffect(() => {
    getLocation().then(() => {
      // 테스트 좌표
      // mapX = 129.0598281416;
      // mapY = 35.1448074253;
      const url = `http://localhost:8080/api/recommend-course?size=6&page=${page}&mapx=${mapX}&mapy=${mapY}&maxDistance=${maxDistance}`;
      ky.get(url,
        {
          headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
          }
        })
        .json()
        .then((data) => {
          setCourses(data); // 데이터 저장
          setIsFirst(data.first);
          setIsLast(data.last);
          setTotalPages(data.totalPages); // 총 페이지 수
          setContent(data.content);
          setLoading(false); // 로딩 완료
        })
        .catch((error) => {
          console.error("Failed to fetch recommended courses", error);
          setLoading(false); // 실패 시에도 로딩 완료
        });
    });
  }, [page]);


  return (
    <section className="px-4">
      <h2 className="text-xl font-semibold mb-4">내 주변 코스</h2>
      {loading && <CourseListBodySkeleton/>}
      {!loading && courses && <RecommendCourseListBody
        page={page}
        setpage={setPage}
        isFirst={isFirst}
        isLast={isLast}
        totalPages={totalPages}
        content={content}
      />}
    </section>
  )
}