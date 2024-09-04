import PlaceItem from "../../course/PlaceItem.jsx";
import PlaceItemSkeleton from "../../course/PlaceItemSkeleton.jsx";
import {useEffect, useState} from "react";
import ky from "ky";
import Pagination from "../../util/Pagination.jsx";
import {setMessage} from "../../redux/modules/modal.js";
import {useDispatch} from "react-redux";
import SearchPlaceHeader from "./place/SearchPlaceHeader.jsx";

export default function PlaceManage() {
  const [loading, setLoading] = useState(true);
  const [places, setPlaces] = useState([]);
  const [page , setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isFirst, setIsFirst] = useState(false);
  const [isLast, setIsLast] = useState(false);
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

    let url = `http://localhost:8080/api/manager/place?page=${page}&size=6`;

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

  function handleDeletePlace(place) {
    // 컨펌창으로 확인
    if (window.confirm("정말 삭제하시겠습니까?")) {
      ky.delete(`http://localhost:8080/api/manager/place/${place.id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }).json()
        .then(() => {
          searchPlace(page);
        })
        .catch(() => {
          dispatch(setMessage({
            message: "장소 삭제에 실패했습니다.",
            isError: true,
            isShow: true,
          }))
        });
    }
  }

  return (
    <div className="pb-12">
      <section className="px-4">
        <h2 className="mb-2 font-bold text-lg">장소 관리하기</h2>
        <SearchPlaceHeader onSearch={searchPlace}/>
        <div className="card bg-base-100 w-full shadow-xl mb-6">
          <div className="card-body">
            <h3 className="card-title">검색 결과</h3>
            <label className="form-control w-full mb-4">
              <div className="card shadow-xl bg-gray-50 w-full">
                <div className="card-body">
                  {loading && <PlaceItemSkeleton/>}
                  {
                    places.map((place, index) => <PlaceItem key={index} place={place} onClick={handleDeletePlace}/>)
                  }
                </div>
              </div>
              <Pagination page={page} setPage={setPage} totalPages={totalPages} isFirst={isFirst} isLast={isLast}/>
            </label>
          </div>
        </div>
      </section>
    </div>
  )
}