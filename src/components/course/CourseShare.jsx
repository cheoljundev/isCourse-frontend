import PlaceItem from "./PlaceItem.jsx";
import PlaceItemSkeleton from "./PlaceItemSkeleton.jsx";
import {X} from "react-bootstrap-icons";
import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import ky from "ky";
import {useDispatch} from "react-redux";
import {setMessage} from "../redux/modules/modal.js";

export default function CourseShare() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [introduce, setIntroduce] = useState("");

  function handleName(event) {
    setName(event.target.value);
  }

  function handleHour(event) {
    setHour(event.target.value);
  }

  function handleMinute(event) {
    setMinute(event.target.value);
  }

  function handleIntroduce(event) {
    setIntroduce(event.target.value);
  }


  const [loading, setLoading] = useState(true); // 로딩 상태
  const [places, setPlaces] = useState(null); // 장소 목록
  const [page , setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isFirst, setIsFirst] = useState(false);
  const [isLast, setIsLast] = useState(false);
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedPlaces, setSelectedPlaces] = useState([]);

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

  let prevClass = "join-item btn";
  let nextClass = "join-item btn";
  if (isFirst) {
    prevClass += " btn-disabled";
  }
  if (isLast) {
    nextClass += " btn-disabled";
  }

  function handlePrev() {
    if (!isFirst) {
      getPlaces(page - 1);
    }
  }

  function handleNext() {
    if (!isLast) {
      getPlaces(page + 1)
    }
  }

  function handlePage() {
    getPlaces(page);
  }

  function handleLastPage() {
    getPlaces(totalPages - 1);
  }

  useEffect(() => {
    ky.get("http://localhost:8080/api/tag")
      .json()
      .then(data =>
        setTags(data)
      )
      .catch(err => console.error(err));
  }, []);


  useEffect(() => {
    getPlaces();
  }, []);

  function getPlaces(thisPage= 0) {
    setPage(thisPage);
    ky.get(`http://localhost:8080/api/user/place?size=6&page=${page}`,
      {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token")
        }
      })
      .json()
      .then((data) => {
        setPlaces(data.content); // 데이터 저장
        setIsFirst(data.first);
        setIsLast(data.last);
        setTotalPages(data.totalPages); // 총 페이지 수
        setLoading(false); // 로딩 완료
      })
      .catch((error) => {
        console.error("Failed to fetch user places", error);
        setLoading(false); // 실패 시에도 로딩 완료
      });
  }

  function handleShareCourse() {
    if (name.length < 1 || introduce.length < 200 || selectedPlaces.length < 1 || hour <= 0 || minute <= 0) {
      dispatch(setMessage({
        message: "입력값을 확인해주세요.",
        error: true,
        isShow: true,
      }));
      return;
    }

    ky.post("http://localhost:8080/api/share-course",
      {
        json: {
          name,
          hour,
          minute,
          introduce,
          tagList: selectedTags.map(tag => tag.code),
          placeIdList: selectedPlaces.map(place => place.id),
        },
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token")
        }
      })
      .then(() => navigate("/user-course/list"))
      .catch(err => {
        console.error("Failed to share course", err);
        dispatch(setMessage({
          message: "코스 공유에 실패했습니다.",
          error: true,
          isShow: true,
        }));
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

  return (
    <div className="pb-12">
      <section className="px-4">
        <h2 className="mb-2 font-bold text-lg">코스 공유하기</h2>
        <div className="card bg-base-100 w-full shadow-xl mb-6">
          <div className="card-body">
            <h3 className="card-title">코스 정보</h3>
            <label className="form-control w-full max-w-xs mb-2">
              <div className="label">
                <span className="label-text font-semibold">코스 제목</span>
              </div>
              <input type="text" placeholder="코스 제목 입력" value={name} onChange={handleName} className="input input-bordered w-full max-w-xs"/>
            </label>
            <label className="form-control w-full max-w-xs mb-2">
              <div className="label">
                <span className="label-text font-semibold">코스 태그</span>
              </div>
              <select className="select select-bordered w-full max-w-xs mb-4" defaultValue="0000" onChange={handleSelectTag}>
                <option disabled value="0000">태그 선택</option>
                {tags && tags.map((tag) => (
                  <option key={tag.code} value={tag.code}>{tag.name}</option>
                ))}
              </select>
              <div className="flex flex-wrap gap-2">
                {
                  selectedTags.map((tag) => (
                    <button onClick={()=>handleRemoveTag(tag)} key={tag.code} className="badge badge-ghost">
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
                <input type="number" placeholder="시간" value={hour} onChange={handleHour} className="input input-bordered w-16 max-w-xs"/>
                <input type="number" placeholder="분" value={minute} onChange={handleMinute} className="input input-bordered w-16 max-w-xs"/>
              </div>
            </label>
          </div>
        </div>
        <div className="card bg-base-100 w-full shadow-xl mb-6">
          <div className="card-body">
            <h3 className="card-title">코스 소개</h3>
            <p className="text-red-500">최소 200자 이상 작성</p>
            <textarea className="textarea textarea-sm textarea-bordered" value={introduce} onChange={handleIntroduce} cols="30" rows="4"
                      maxLength="200"></textarea>
          </div>
        </div>
        <div className="card bg-base-100 w-full shadow-xl mb-6">
          <div className="card-body">
            <h3 className="card-title">코스 구성</h3>
            <p className="text-red-500">방문했던 장소만 목록에 나타납니다.</p>
            <label className="form-control w-full mb-4">
              <div className="label">
                <span className="label-text font-semibold">장소 목록</span>
              </div>
              <div className="card shadow-xl bg-gray-50 w-full">
                <div className="card-body">
                  {loading && <PlaceItemSkeleton/>}
                  {!loading && places && places.map((place) => (
                    <PlaceItem key={place.id} place={place} type={"+"} onClick={handleAddPlace}/>
                  ))}
                </div>
              </div>
              <div className="join m-4 mx-auto flex justify-center">
                <button onClick={handlePrev} className={prevClass}>«</button>
                <button onClick={handlePage} className="join-item btn">{page+1}</button>
                <button className="join-item btn btn-disabled">...</button>
                <button onClick={handleLastPage} className="join-item btn">{totalPages}</button>
                <button onClick={handleNext} className={nextClass}>»</button>
              </div>
            </label>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text font-semibold">선택된 장소</span>
              </div>
              <div className="card shadow-xl bg-gray-50 w-full">
              <div className="card-body">
                {
                  selectedPlaces.map((place) => (
                    <PlaceItem key={place.id} place={place} type={"x"} onClick={handleRemovePlace}/>
                  ))
                }
                </div>
              </div>
            </label>
          </div>
        </div>
      </section>
        <div className="join w-full fixed bottom-16 lg:bottom-0">
          <Link to="/user-course/list" className="btn join-item flex-1">취소</Link>
          <button onClick={handleShareCourse} className="btn btn-primary join-item flex-1">등록</button>
        </div>
    </div>
  )
}