export default function PlaceItem({place, type, onClick}) {
  return (
    <button className="flex justify-between btn btn-outline h-auto" onClick={()=>onClick(place)}>
      <div className="flex gap-x-3 items-center">
        <img className="h-8 rounded-lg" src={place.image} alt="장소 썸네일"/>
        <span>{place.name}</span>
      </div>
      <span>{type}</span>
    </button>
  )
}