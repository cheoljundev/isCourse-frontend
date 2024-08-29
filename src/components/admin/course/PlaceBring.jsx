import PlaceItem from "../../course/PlaceItem.jsx";
import {Link, useNavigate} from "react-router-dom";
import PlaceItemSkeleton from "../../course/PlaceItemSkeleton.jsx";
import useField from "../../../hooks/useField.js";
import useOption from "../../../hooks/useOption.js";
import {useEffect, useState} from "react";
import ky from "ky";
import Pagination from "../../util/Pagination.jsx";
import {useDispatch} from "react-redux";
import {setMessage} from "../../redux/modules/modal.js";

const initFieldsState = {
  placeType: '0000',
  largeCategory: '0000',
  middleCategory: '0000',
  tag: '0000',
  state: '0000',
  city: '0000',
}

const initOptionsState = {
  placeTypeOptions: [],
  largeCategoryOptions: [],
  middleCategoryOptions: [],
  tagOptions: [],
  stateOptions: [],
  cityOptions: [],
}

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


  const {fields, handleFieldChange, resetArrayFields} = useField(initFieldsState);

  const {
    placeType,
    largeCategory,
    middleCategory,
    tag,
    state,
    city,
  } = fields;

  const {options, setOption} = useOption(initOptionsState);

  const {
    placeTypeOptions,
    largeCategoryOptions,
    middleCategoryOptions,
    tagOptions,
    stateOptions,
    cityOptions,
  } = options;

  useEffect(() => {
    setOption('placeTypeOptions');
    setOption('stateOptions');
  }, []);

  useEffect(() => {
    resetArrayFields(['largeCategory', 'middleCategory', 'tag']);
    setOption('largeCategoryOptions', placeType);
  }, [placeType]);

  useEffect(() => {
    resetArrayFields(['middleCategory', 'tag']);
    setOption('middleCategoryOptions', largeCategory);
  }, [largeCategory]);

  useEffect(() => {
    resetArrayFields(['tag']);
    setOption('tagOptions', middleCategory);
  }, [middleCategory]);

  useEffect(() => {
    resetArrayFields(['city']);
    setOption('cityOptions', state);
  }, [state]);

  function searchPlace(page = 0) {
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
        <div className="card bg-base-100 w-full shadow-xl mb-6">
          <div className="card-body">
            <h3 className="card-title">검색 조건</h3>
            <label className="form-control w-full max-w-xs mb-2">
              <div className="label">
                <span className="label-text font-semibold">장소 타입</span>
              </div>
              <select className="select select-bordered w-full max-w-xs mb-2" name="placeType" value={placeType} onChange={handleFieldChange}>
                <option value="0000" disabled>장소 타입 선택</option>
                {
                  placeTypeOptions.map((option) => (
                    <option key={option.code} value={option.code}>{option.name}</option>
                  ))
                }
              </select>
            </label>
            <label className="form-control w-full max-w-xs mb-2">
              <div className="label">
                <span className="label-text font-semibold">대분류</span>
              </div>
              <select className="select select-bordered w-full max-w-xs mb-2" name="largeCategory" value={largeCategory} onChange={handleFieldChange}>
                <option value="0000" disabled>대분류 선택</option>
                {
                  largeCategoryOptions.map((option) => (
                    <option key={option.code} value={option.code}>{option.name}</option>
                  ))
                }
              </select>
            </label>
            <label className="form-control w-full max-w-xs mb-2">
              <div className="label">
                <span className="label-text font-semibold">중분류</span>
              </div>
              <select className="select select-bordered w-full max-w-xs mb-2" name="middleCategory" value={middleCategory} onChange={handleFieldChange}>
                <option value="0000" disabled>중분류 선택</option>
                {
                  middleCategoryOptions.map((option) => (
                    <option key={option.code} value={option.code}>{option.name}</option>
                  ))
                }
              </select>
            </label>
            <label className="form-control w-full max-w-xs mb-2">
              <div className="label">
                <span className="label-text font-semibold">소분류</span>
              </div>
              <select className="select select-bordered w-full max-w-xs mb-2" name="tag" value={tag} onChange={handleFieldChange}>
                <option value="0000" disabled>소분류 선택</option>
                {
                  tagOptions.map((option) => (
                    <option key={option.code} value={option.code}>{option.name}</option>
                  ))
                }
              </select>
            </label>
            <label className="form-control w-full max-w-xs mb-2">
              <div className="label">
                <span className="label-text font-semibold">광역시/도</span>
              </div>
              <select className="select select-bordered w-full max-w-xs mb-2" name="state" value={state} onChange={handleFieldChange}>
                <option value="0000" disabled>광역시/도 선택</option>
                {
                  stateOptions.map((option) => (
                    <option key={option.code} value={option.code}>{option.name}</option>
                  ))
                }
              </select>
            </label>
            <label className="form-control w-full max-w-xs mb-2">
              <div className="label">
                <span className="label-text font-semibold">시/군/구</span>
              </div>
              <select className="select select-bordered w-full max-w-xs mb-2" name="city" value={city} onChange={handleFieldChange}>
                <option value="0000" disabled>시/군/구 선택</option>
                {
                  cityOptions.map((option) => (
                    <option key={option.code} value={option.code}>{option.name}</option>
                  ))
                }
              </select>
            </label>
            <button className="btn btn-primary join-item flex-1" onClick={()=>searchPlace(0)}>장소 검색하기</button>
          </div>
        </div>
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