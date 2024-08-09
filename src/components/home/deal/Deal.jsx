import DealSkeleton from "./DealSkeleton.jsx";
import DealItem from "./DealItem.jsx";

export default function Deal() {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold mb-4">오늘의 딜</h2>
      {/*<DealItem/>*/}
      <DealSkeleton/>
    </section>
  );
}