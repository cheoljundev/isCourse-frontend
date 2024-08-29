export default function PlaceItem({place, type, onClick}) {
  if (place.image === "") {
    place.image = "https://via.placeholder.com/100?text=noimg";
  }
  return (
    <button className="flex justify-between btn btn-outline h-auto" onClick={()=>onClick(place)}>
      <div className="flex gap-x-3 items-center">
        <img className="h-8 rounded-lg" src={place.image} alt="장소 썸네일"/>
        <span>{place.name ? place.name : place.title}</span>
      </div>
      <span>{type}</span>
    </button>
  )
}