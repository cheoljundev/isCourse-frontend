import PlaceItemSkeleton from "../../course/PlaceItemSkeleton.jsx";
import {X} from "react-bootstrap-icons";
import PlaceItem from "../../course/PlaceItem.jsx";
import {Link, useNavigate} from "react-router-dom";
import SearchPlaceHeader from "./place/SearchPlaceHeader.jsx";
import ky from "ky";
import {setMessage} from "../../redux/modules/modal.js";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import Pagination from "../../util/Pagination.jsx";
import useField from "../../../hooks/useField.js";

export default function CourseAdd() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [places, setPlaces] = useState([]);
  const [page , setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isFirst, setIsFirst] = useState(false);
  const [isLast, setIsLast] = useState(false);
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedPlaces, setSelectedPlaces] = useState([]);

  const initFieldsState = {
    name: '',
    hour: 0,
    minute: 0,
    introduce: '',
  }
  const {fields, handleFieldChange} = useField(initFieldsState);
  const {
    name,
    hour,
    minute,
    introduce,
  } = fields;

  function handleSelectTag(event) {
    const selectedValue = event.target.value;
    const tagArr = tags.find(tag => tag.code === selectedValue);
    if (selectedValue === "0000") return;
    setSelectedTags((prevSelectedTags)=>{
      return [...new Set([...prevSelectedTags, tagArr])];
    });
  }

  function handleRemoveTag(tag) {
    setSelectedTags((prevSelectedTags)=>{
      return prevSelectedTags.filter(selectedTag => selectedTag.code !== tag.code);
    });
  }

  function handleAddPlace(place) {
    setSelectedPlaces((prevSelectedPlaces)=>{
      return [...new Set([...prevSelectedPlaces, place])];
    });
  }

  function handleRemovePlace(place) {
    setSelectedPlaces((prevSelectedPlaces)=>{
      return prevSelectedPlaces.filter(selectedPlace => selectedPlace.id !== place.id);
    });
  }

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

  function handleAddCourse() {
    const validFields =
      name.length > 0 &&
      hour > 0 &&
      introduce.length >= 200 &&
      selectedPlaces.length > 0
      selectedTags.length > 0;

    if (!validFields) {
      dispatch(setMessage({
        message: "입력값을 확인해주세요.",
        isError: true,
        isShow: true,
      }));
      return;
    }

    ky.post("http://localhost:8080/api/manager/course",
      {
        json: {
          name,
          hour,
          minute,
          introduce,
          placeIdList: selectedPlaces.map(place => place.id),
          tagList: selectedTags.map(tag => tag.code),
        },
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(() => {
        navigate("/admin/course/manage");
      })
      .catch(() => {
        dispatch(setMessage({
          message: "코스 등록에 실패했습니다.",
          isError: true,
          isShow: true,
        }))
      });
  }

  useEffect(() => {
    if (page !== null){
      searchPlace(page);
    }
  }, [page]);

  useEffect(() => {
    ky.get("http://localhost:8080/api/tag")
      .json()
      .then(data =>
        setTags(data)
      )
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="pb-12">
      <section className="px-4">
        <h2 className="mb-2 font-bold text-lg">코스 등록하기</h2>
        <div className="card bg-base-100 w-full shadow-xl mb-6">
          <div className="card-body">
            <h3 className="card-title">코스 정보</h3>
            <label className="form-control w-full max-w-xs mb-2">
              <div className="label">
                <span className="label-text font-semibold">코스 제목</span>
              </div>
              <input type="text" name="name" value={name} onChange={handleFieldChange} placeholder="코스 제목 입력" className="input input-bordered w-full max-w-xs"/>
            </label>
            <label className="form-control w-full max-w-xs mb-2">
              <div className="label">
                <span className="label-text font-semibold">코스 태그</span>
              </div>
              <select className="select select-bordered w-full max-w-xs mb-4" defaultValue="0000"
                      onChange={handleSelectTag}>
                <option disabled value="0000">태그 선택</option>
                {tags && tags.map((tag) => (
                  <option key={tag.code} value={tag.code}>{tag.name}</option>
                ))}
              </select>
              <div className="flex flex-wrap gap-2">
                {
                  selectedTags.map((tag) => (
                    <button onClick={() => handleRemoveTag(tag)} key={tag.code} className="badge badge-ghost">
                      <span>{tag.name}</span>
                      <X className="text-lg"/>
                    </button>
                  ))
                }
              </div>
            </label>
            <label className="form-control w-full max-w-xs mb-2">
              <div className="label">
                <span className="label-text font-semibold">코스 시간</span>
              </div>
              <div className="flex gap-x-2">
                <input type="number" name="hour" value={hour} onChange={handleFieldChange} placeholder="시간"
                       className="input input-bordered w-16 max-w-xs"/>
                <input type="number" name="minute" value={minute} onChange={handleFieldChange} placeholder="분"
                       className="input input-bordered w-16 max-w-xs"/>
              </div>
            </label>
          </div>
        </div>
        <div className="card bg-base-100 w-full shadow-xl mb-6">
          <div className="card-body">
            <h3 className="card-title">코스 소개</h3>
            <p className="text-red-500">최소 200자 이상 작성</p>
            <textarea className="textarea textarea-sm textarea-bordered" name="introduce" value={introduce} onChange={handleFieldChange} cols="30" rows="4"
                      maxLength="200"></textarea>
          </div>
        </div>
        <SearchPlaceHeader onSearch={searchPlace}/>
        <div className="card bg-base-100 w-full shadow-xl mb-6">
          <div className="card-body">
            <h3 className="card-title">코스 구성</h3>
            <div className="form-control w-full mb-4">
              <div className="label">
                <span className="label-text font-semibold">장소 목록</span>
              </div>
              <div className="card shadow-xl bg-gray-50 w-full">
                <div className="card-body">
                  {loading && <PlaceItemSkeleton/>}
                  {!loading && places.map((place, index) => (
                    <PlaceItem key={index} place={place} onClick={handleAddPlace}/>
                  ))}
                </div>
              </div>
              <Pagination page={page} setPage={setPage} totalPages={totalPages} isFirst={isFirst} isLast={isLast}/>
            </div>
            <label className="form-control w-full">
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
            </label>
          </div>
        </div>
      </section>
      <div className="join w-full fixed bottom-0">
        <Link to="/admin/course/manage" className="btn join-item flex-1">취소</Link>
        <button className="btn btn-primary join-item flex-1" onClick={handleAddCourse}>등록</button>
      </div>
    </div>
  )
}