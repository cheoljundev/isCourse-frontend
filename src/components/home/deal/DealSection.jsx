import DealSectionItemSkeleton from "./DealSkeleton.jsx";
import DealSectionItem from "./DealSectionItem.jsx";

export default function DealSection() {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold mb-4">오늘의 딜</h2>
      {/*<DealSectionItem/>*/}
      <DealSectionItemSkeleton/>
    </section>
  );
}