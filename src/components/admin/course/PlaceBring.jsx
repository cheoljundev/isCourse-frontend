import PlaceItem from "../../course/PlaceItem.jsx";
import {Link, useNavigate} from "react-router-dom";
import PlaceItemSkeleton from "../../course/PlaceItemSkeleton.jsx";
import {useEffect, useState} from "react";
import ky from "ky";
import Pagination from "../../util/Pagination.jsx";
import {useDispatch} from "react-redux";
import {setMessage} from "../../redux/modules/modal.js";
import SearchPlaceHeader from "./place/SearchPlaceHeader.jsx";

export default function PlaceBring() {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [places, setPlaces] = useState([]);
  const [page , setPage] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [isFirst, setIsFirst] = useState(false);
  const [isLast, setIsLast] = useState(false);
  const [selectedPlaces, setSelectedPlaces] = useState([]);
  const dispatch = useDispatch();

  function searchPlace(page = 0,
                       placeType = '0000',
                       largeCategory = '0000',
                       middleCategory = '0000',
                       tag = '0000',
                       state = '0000',
                       city = '0000')
  {
    setLoading(true);
    setPlaces([]);

    let url = `http://localhost:8080/api/manager/place/search?page=${page}&size=6`;

    if (placeType !== '0000') {
      url += `&placeTypeCode=${placeType}`;
    }
    if (largeCategory !== '0000') {
      url += `&largeCategoryCode=${largeCategory}`;
    }
    if (middleCategory !== '0000') {
      url += `&middleCategoryCode=${middleCategory}`;
    }
    if (tag !== '0000') {
      url += `&tagCode=${tag}`;
    }
    if (state !== '0000') {
      url += `&stateCode=${state}`;
    }
    if (city !== '0000') {
      url += `&cityCode=${city}`;
    }

    ky.get(url,
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }})
      .json()
      .then(data => {
        setPage(page);
        setPlaces(data.content);
        setIsFirst(data.first);
        setIsLast(data.last);
        setTotalPages(data.totalPages);
        setLoading(false);
      })
      .catch(() => {
        dispatch(setMessage({
          message: "장소 검색에 실패했습니다.",
          isError: true,
          isShow: true,
        }))
        setLoading(false);
      });
  }

  useEffect(() => {
    if (page !== null){
      searchPlace(page);
    }
  }, [page]);

  function handleAddPlace(place) {
    console.log(selectedPlaces);
    setSelectedPlaces((prevSelectedPlaces)=>{
      return [...new Set([...prevSelectedPlaces, place])];
    });
  }

  function handleRemovePlace(place) {
    setSelectedPlaces((prevSelectedPlaces)=>{
      return prevSelectedPlaces.filter(selectedPlace => selectedPlace.title !== place.title);
    });
  }

  function handleSavePlaces() {
    ky.post('http://localhost:8080/api/manager/place',
      {
        json: selectedPlaces,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }})
      .json()
      .then(() => {
        navigate('/admin/course/place/manage');
      })
      .catch(() => {
        dispatch(setMessage({
          message: "장소 등록에 실패했습니다.",
          isError: true,
          isShow: true,
        }))
      });
  }

  return (
    <div className="pb-12">
      <section className="px-4">
        <h2 className="mb-2 font-bold text-lg">장소 가져오기</h2>
        <SearchPlaceHeader onSearch={searchPlace}/>
        <div className="card bg-base-100 w-full shadow-xl mb-6">
          <div className="card-body">
            <h3 className="card-title">검색 결과</h3>
            <div className="form-control w-full mb-4">
              <div className="label">
                <span className="label-text font-semibold">장소 목록</span>
              </div>
              <div className="card shadow-xl bg-gray-50 w-full">
                <div className="card-body">
                  {loading && <PlaceItemSkeleton/>}
                  {
                    places.map((place, index) => <PlaceItem key={index} place={place} onClick={handleAddPlace} type={"+"}/>)
                  }
                </div>
              </div>
              <Pagination page={page} setPage={setPage} isFirst={isFirst} isLast={isLast} totalPages={totalPages}/>
            </div>
            <div className="form-control w-full">
              <div className="label">
                <span className="label-text font-semibold">선택된 장소</span>
              </div>
              <div className="card shadow-xl bg-gray-50 w-full">
              <div className="card-body">
                {
                  selectedPlaces.map((place, index) => (
                    <PlaceItem key={index} place={place} type={"x"} onClick={handleRemovePlace}/>
                  ))
                }
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="join w-full fixed bottom-0">
        <Link to="/admin/course/place/manage" className="btn join-item flex-1">취소</Link>
        <button className="btn btn-primary join-item flex-1" onClick={handleSavePlaces}>등록</button>
      </div>
    </div>
  )
}