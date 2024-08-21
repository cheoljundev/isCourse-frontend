import DealSectionItemSkeleton from "./DealSkeleton.jsx";
import DealSectionItem from "./DealSectionItem.jsx";
import ky from "ky";
import {useEffect, useState} from "react";

export default function DealSection() {
  const [deals, setDeals] = useState(null); // deals 데이터 상태
  const [loading, setLoading] = useState(true); // 로딩 상태

  useEffect(() => {
    // 데이터 가져오기
    ky.get("http://localhost:8080/api/deal")
      .json()
      .then((data) => {
        setDeals(data); // 데이터 저장
        setLoading(false); // 로딩 완료
      })
      .catch((error) => {
        console.error("Failed to fetch deals", error);
        setLoading(false); // 실패 시에도 로딩 완료
      });
  }, []);
  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold mb-4">오늘의 딜</h2>
      { loading && <DealSectionItemSkeleton/> }
      { !loading && deals && deals.map((deal) => <DealSectionItem key={deal.id} deal={deal}/>) }
    </section>
  );
}