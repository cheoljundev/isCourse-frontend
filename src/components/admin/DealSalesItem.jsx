export default function DealSalesItem({modal}) {
  return (
    <button className="flex justify-between btn btn-outline h-auto" onClick={()=>modal.current.open()}>
      <div className="flex gap-x-3 items-center">
        <span>1</span>
        <span>딜 이름</span>
        <span className="text-xs">구매자명</span>
      </div>
    </button>
  )
}