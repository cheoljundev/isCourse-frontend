export default function DealSectionItem({deal}) {
  return <div className="flex gap-x-4 mb-4">
    <img className="rounded-xl flex-shrink-0" src="https://picsum.photos/100" alt="딜 이미지"/>
    <div className="flex flex-col justify-center">
      <small className="font-normal text-sm text-gray-500">Station</small>
      <h3 className="font-semibold text-lg">title</h3>
      <div className="text-gray-700 text-sm">product</div>
      <div className="flex gap-x-2 items-center">
        <strong className="text-blue-800 font-bold text-lg">00%</strong>
        <div className="text-sm">00,000</div>
      </div>
    </div>
  </div>;
}