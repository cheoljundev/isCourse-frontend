import {Link} from "react-router-dom";

export default function DealSectionItem({deal}) {
  const image = deal.image ? `http://localhost:8080/image/deal/${deal.image.storedFileName}` : "http://placehold.it/400x400";

  return <Link to={`/deal/${deal.id}`} className="flex gap-x-4 mb-4">
    <img className="rounded-xl flex-shrink-0 w-32 h-32 object-cover" src={image} alt="딜 이미지"/>
    <div className="flex flex-col justify-center">
      <small className="font-normal text-sm text-gray-500">{deal.station}</small>
      <h3 className="font-semibold text-lg">{deal.name}</h3>
      <div className="text-gray-700 text-sm">{deal.product}</div>
      <div className="flex gap-x-2 items-center">
        <strong className="text-blue-800 font-bold text-lg">{deal.discountRate}%</strong>
        <div className="text-sm">{deal.price}</div>
      </div>
    </div>
  </Link>;
}