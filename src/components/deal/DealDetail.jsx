import DealDetailBodySkeleton from "./DealDetailBodySkeleton.jsx";
import 'swiper/css';
import 'swiper/css/navigation';
import DealDetailBody from "./DealDetailBody.jsx";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import ky from "ky";

export default function DealDetail() {
  const [deal, setDeal] = useState(null); // deal 데이터 상태
  const [loading, setLoading] = useState(true); // 로딩 상태
  // id 는 :id 에서 가져온다.
  const { id } = useParams();

  useEffect(() => {
    // 데이터 가져오기
    ky.get(`http://localhost:8080/api/deal/${id}`)
      .json()
      .then((data) => {
        setDeal(data); // 데이터 저장
        setLoading(false); // 로딩 완료
      })
      .catch((error) => {
        console.error("Failed to fetch deal", error);
        setLoading(false); // 실패 시에도 로딩 완료
      });
  },[]);
  return (
    <section className="px-4">
      <h2 className="text-xl font-semibold mb-4">오늘의 딜</h2>
      { loading && <DealDetailBodySkeleton/> }
      { !loading && deal && <DealDetailBody deal={deal}/> }
    </section>
  )
}