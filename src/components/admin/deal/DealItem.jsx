export default function DealItem({deal, onClick}) {
  return (
    <button className="flex justify-between btn btn-outline h-auto" onClick={() => onClick(deal.id)}>
      <div className="flex gap-x-3 items-center">
        <span className="text-sm font-light">{deal.id}</span>
        <span>{deal.name}</span>
        <span className="text-sm font-light">가격: {deal.price}원</span>
      </div>
    </button>
  )
}