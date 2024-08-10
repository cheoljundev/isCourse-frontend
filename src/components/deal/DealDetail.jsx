import DealDetailBodySkeleton from "./DealDetailBodySkeleton.jsx";
import 'swiper/css';
import 'swiper/css/navigation';
import DealDetailBody from "./DealDetailBody.jsx";

export default function DealDetail() {
  return (
    <section className="px-4">
      <h2 className="text-xl font-semibold mb-4">오늘의 딜</h2>
      {/*<DealDetailBodySkeleton/>*/}
      <DealDetailBody/>
    </section>
  )
}